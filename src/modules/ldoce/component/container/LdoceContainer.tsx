import React from "react";
import { NotifyMessage, Searching, Empty } from "src/modules/common";
import { Grid } from "@material-ui/core";
import LdoceHeadwordContainer from "src/modules/ldoce/component/headwordSection/LdoceHeadwordContainer";
import LdoceSenseContainer from "src/modules/ldoce/component/sensesSection/LdoceSenseContainer";
import LdocePosContainer from "src/modules/ldoce/component/posSection/LdocePosContainer";
import Ldoce from "src/modules/ldoce/service/ldoce";
import { IDicData } from "src/modules/ldoce/contract/interfaces/IDicData";
import { IApiLdoceByID } from "src/modules/ldoce/contract/interfaces/IApiLdoceByID";
import { ErrorLdoce } from "src/modules/error";
import Expansion from "src/modules/app/component/Expansion";
import { objectExtractor, Status } from "src/modules/utils";

type Props = {
    ldoce: Ldoce;
    setSearchBox?: (ability: "ENABLE" | "DISABLE") => void;
};

type State = {
    allPos?: string[];
    chosePos?: string;
    lastSearch?: string;
    dicData?: IDicData;
    ldoceDatas?: IApiLdoceByID[];
    status?: Status;
    error?: any;
};

type IHandlePosClick = (event: React.MouseEvent) => void;

class LdoceContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            allPos: undefined,
            chosePos: undefined,
            lastSearch: undefined,
            dicData: undefined,
            ldoceDatas: undefined,
            status: undefined,
            error: undefined,
        };
    }

    handlePosClick: IHandlePosClick = (event: React.MouseEvent): void => {
        const { ldoce } = this.props;
        const { chosePos } = this.state;
        if (ldoce) {
            const target = event!.target! as HTMLElement;
            const posChoseByUser: string = target.textContent!.toLowerCase();
            const wasReChosenPos = posChoseByUser === chosePos;
            if (posChoseByUser && !wasReChosenPos) {
                // ldoceDatas is ldoceDatasFilterByPos
                const { ldoceDatas } = this.state;
                if (ldoceDatas && ldoceDatas.length > 0) {
                    ldoce!
                        .findDicByPos(ldoceDatas, posChoseByUser)
                        .then(ldoce.extractDicData)
                        .then((dicData) => {
                            this.setState({
                                chosePos: posChoseByUser,
                                dicData,
                            });
                        })
                        .catch((error) => {
                            console.log(
                                `ERROR-handlePosClick: ${JSON.stringify(error)}`
                            );
                            throw error;
                        });
                }
            }
        }
    };

    enableSearchBox = () => {
        this.props.setSearchBox && this.props.setSearchBox("ENABLE");
    };

    saveDataToStorage = (key: string, value: any) => {
        chrome.storage.sync.set({ [key]: value }, function () {
            // alert(`ldoce was saved: ` + JSON.stringify(value));
        });
    };

    getLastSearch = (): Promise<string> => {
        return new Promise((resolve, reject) => {
            try {
                chrome.storage.sync.get(["lastSearch"], function (result) {
                    const lastSearchHeadword = result["lastSearch"];
                    if (lastSearchHeadword.length > 0) {
                        resolve(lastSearchHeadword);
                    } else {
                        resolve("");
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    };

    async componentDidMount() {
        try {
            // this.saveDataToStorage('ldoce', JSON.stringify({ isEmpty: true }));
            const { ldoce } = this.props;
            if (ldoce && ldoce.apiLdoceByIDs) {
                this.setState({ status: Status.PENDING });
                const originLdoceDatas = await ldoce.getApiLdoceByIds();
                if (originLdoceDatas.length > 0) {
                    const ldoceDatasFilterByPos = await ldoce.filterLdoceByAvailPos(
                        originLdoceDatas
                    );
                    if (
                        ldoceDatasFilterByPos &&
                        ldoceDatasFilterByPos.length > 0
                    ) {
                        const allPos = await ldoce.getAllPos(
                            ldoceDatasFilterByPos
                        );
                        const chosePos = await ldoce.choosePos(
                            ldoceDatasFilterByPos
                        );
                        if (chosePos && allPos && allPos.length > 0) {
                            const apiLdoceById = await ldoce.findDicByPos(
                                ldoceDatasFilterByPos,
                                chosePos
                            );
                            const dicData = await ldoce.extractDicData(
                                apiLdoceById
                            );
                            // READY
                            if (dicData) {
                                const dataToSave = {
                                    allPos, // 'noun' lowercase
                                    chosePos, // ['noun', 'adjective', 'verb', ...]
                                    dicData,
                                    status: Status.READY,
                                    ldoceDatas: ldoceDatasFilterByPos, // fLdoceDatas[{id, result, status, type, url}]
                                };
                                this.saveDataToStorage(
                                    "lastSearch",
                                    ldoce.headword
                                );
                                this.setState({
                                    ...dataToSave,
                                });
                            } else {
                                this.enableSearchBox();
                                this.setState({
                                    status: Status.EMPTY,
                                });
                            } // EMPTY
                        } else {
                            const apiLdoceById = await ldoce.get1stDic(
                                originLdoceDatas
                            );
                            const dicData = await ldoce.extractDicData(
                                apiLdoceById
                            );
                            // READY
                            if (dicData) {
                                const dataToSave = {
                                    dicData,
                                    status: Status.READY,
                                    ldoceDatas: [],
                                };
                                this.saveDataToStorage(
                                    "lastSearch",
                                    ldoce.headword
                                );
                                this.setState({
                                    ...dataToSave,
                                });
                            } else {
                                this.enableSearchBox();
                                this.setState({
                                    status: Status.EMPTY,
                                });
                            } // EMPTY
                        }
                    } else {
                        // EMPTY ldoceDatasFilterByPos
                        this.enableSearchBox();
                        this.setState({
                            status: Status.EMPTY,
                        });
                    } // EMPTY
                } else {
                    this.enableSearchBox();
                    this.setState({
                        status: Status.EMPTY,
                    });
                } // EMPTY
            } else {
                this.enableSearchBox();
                const lastSearch = await this.getLastSearch();
                this.setState({
                    lastSearch,
                    status: Status.INIT,
                });
            } // INIT | EMPTY
        } catch (error) {
            this.enableSearchBox();
            console.log(`ERROR-LdoceConainer: ${JSON.stringify(error)}`);
            this.setState({ status: Status.ERROR, error });
        }
    }

    render() {
        const { status, allPos, lastSearch } = this.state;
        let { dicData } = this.state;
        let componentWillRender: JSX.Element = (
            <NotifyMessage message={"LdoceContainer Loading..."} />
        );
        if (status) {
            switch (status) {
                case Status.INIT:
                    let notiMsg = `Let do your Search!`;
                    let lastSearchMsg = `Your last search: "${lastSearch}"`;
                    notiMsg = lastSearch ? lastSearchMsg : notiMsg;
                    componentWillRender = <NotifyMessage message={notiMsg} />;
                    break;
                case Status.PENDING:
                    componentWillRender = <Searching />;
                    break;
                case Status.EMPTY:
                    // "headword" was not found from LDOCE!
                    // Word was not found from LDOCE!
                    const headword = objectExtractor(
                        this.props,
                        "ldoce",
                        "headword"
                    );
                    const message = headword
                        ? `"${headword}" was not found from LDOCE!`
                        : `Word was not found from LDOCE!`;
                    componentWillRender = <Empty message={message} />;
                    break;
                case Status.READY:
                    // Show Data
                    if (dicData) {
                        const { pos, senses } = dicData;
                        componentWillRender = (
                            <Grid container spacing={0}>
                                <Expansion
                                    title={
                                        <LdoceHeadwordContainer
                                            headword={dicData!.headword}
                                            br_ipa={dicData!.br_ipa}
                                            br_audio_url={dicData!.br_audio_url}
                                        />
                                    }
                                >
                                    <Grid container spacing={0}>
                                        <Grid item xs={12}>
                                            <LdocePosContainer
                                                pos={pos}
                                                allPos={allPos || []}
                                                handlePosClick={
                                                    this.handlePosClick
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <LdoceSenseContainer
                                                pos={pos}
                                                senses={senses}
                                            />
                                        </Grid>
                                    </Grid>
                                </Expansion>
                            </Grid>
                        );
                    }
                    // else {
                    //     componentWillRender = (
                    //         <NotifyMessage
                    //             message={`Sorry! We Can't find the word you need.`}
                    //         />
                    //     );
                    // }
                    break;
                case Status.ERROR:
                    componentWillRender = (
                        <ErrorLdoce error={this.state.error} />
                    );
                    break;
            }
        }

        return componentWillRender;
    }
}

export default LdoceContainer;
