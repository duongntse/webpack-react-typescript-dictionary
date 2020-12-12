import React from "react";
import {
    Card,
    CardContent,
    // Grid,
    CardActions,
    TextField,
} from "@material-ui/core";
const KeyboardEventHandler: any = require("react-keyboard-event-handler");
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import { Giphy } from "src/modules/giphy";
import { Ldoce } from "src/modules/ldoce";
import RequestError from "src/modules/utils/errors/requestError";

import { DictionaryContainer } from "src/modules/app";

import { NotifyMessage, PowerBy } from "src/modules/common";

import { Status, SEARCH_BOX_ID } from "src/modules/utils";

// const moment: any = require('moment');

const styles = (theme: Theme) =>
    createStyles({
        divTypo: { backgroundColor: "#cfe8fc", height: "100vh" },
        root: {
            flexGrow: 1,
            fontSize: 16,
            width: 375,
            backgroundColor: "#fff",
        },
        rootForm: {
            "& > *": {
                margin: theme.spacing(1),
                width: "100%",
            },
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: "center",
            color: theme.palette.text.secondary,
        },
    });

type Props = WithStyles<typeof styles> & {
    disabled: boolean;
    setSearchBox: (ability: "ENABLE" | "DISABLE") => void;
};
type State = {
    giphy: Giphy;
    ldoce: Ldoce;
    headword: string;
    lastSearch: string;
    errorLdoce: RequestError | undefined;
    errorGiphy: RequestError | undefined;
    status: Status;
    isSearching: boolean;
};

class AppPopup extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            ldoce: {} as Ldoce,
            giphy: {} as Giphy,
            headword: "",
            errorLdoce: undefined,
            errorGiphy: undefined,
            isSearching: false,
            status: Status.UNINIT,
            lastSearch: "",
        };
        this.preProcessingInputText = this.preProcessingInputText.bind(this);
        this.keysHandlers = this.keysHandlers.bind(this);
        this.autoDownloadLdoce = this.autoDownloadLdoce.bind(this);
        this.autoDownloadGiphy = this.autoDownloadGiphy.bind(this);
    }

    preProcessingInputText(text?: string): string {
        return text ? text.trim() : "";
    }

    getDataFromStorage = (key: string) => {
        chrome.storage.sync.get([key], function (result) {
            console.log("Value currently is " + result[key]);
        });
    };

    autoDownloadLdoce = (headword: string) => {
        try {
            const ldoce = new Ldoce(headword!);
            ldoce.autoSearch();
            this.setState({
                ldoce,
            });
        } catch (error) {
            console.log(
                `App.tsx-autoDownloadLdoce-ERROR: ${JSON.stringify(error)}`
            );
            this.setState({ errorLdoce: error, status: Status.ERROR });
            throw error;
        }
    };

    autoDownloadGiphy = (headword: string) => {
        try {
            const giphy = new Giphy(headword!);
            giphy.autoSearch();
            this.setState({
                giphy,
            });
        } catch (error) {
            console.log(
                `App.tsx-autoDownloadGiphy-ERROR: ${JSON.stringify(error)}`
            );
            this.setState({ errorGiphy: error, status: Status.ERROR });
            throw error;
        }
    };

    keysHandlers(key: string, event: KeyboardEvent): void {
        event.preventDefault();
        // console.log(`event: ${JSON.stringify(event)}`);
        if (key === "enter") {
            // multiple enter, get the last one
            const textBox = document.querySelector(
                `#${SEARCH_BOX_ID}`
            ) as HTMLInputElement;

            // ALREADY RUN, Please Wait untill it's done.
            if (textBox.disabled === false) {
                this.setState({ status: Status.PENDING });
                // get text
                if (textBox) {
                    const inputText = this.preProcessingInputText(
                        textBox.value
                    );
                    textBox.value = "";
                    if (inputText.length > 0) {
                        // 1st, disable input search box
                        this.props.setSearchBox("DISABLE");
                        // do it, search
                        this.autoDownloadLdoce(inputText);
                        this.autoDownloadGiphy(inputText);
                        this.setState({
                            isSearching: true,
                            headword: inputText,
                            status: Status.READY,
                        });
                    } else {
                        this.setState({ status: Status.EMPTY });
                    }
                } else {
                    this.setState({ status: Status.EMPTY });
                }
            }
        }
    }

    componentDidMount() {
        const thisAppPopup = this;

        // chrome.storage.sync.get(['ldoce'], function (result) {
        // 	const savedLdoce = JSON.parse(result['ldoce']);
        // alert(JSON.stringify(savedLdoce));
        // if (!savedLdoce.isEmpty) {
        // const savedLdoce = JSON.parse(res);
        // alert(JSON.stringify(res));
        // const {
        // 	allPos, // 'noun' lowercase
        // 	chosePos, // ['noun', 'adjective', 'verb', ...]
        // 	dicData,
        // 	status,
        // 	ldoceDatas, // fLdoceDatas[{id, result, status, type, url}]
        // } = savedLdoce;
        //
        // thisAppPopup.setState({
        // 	savedLdoce,
        // 	status: Status.LASTRESULT,
        // });
        // 	}
        // });
        //

        // chrome.storage.sync.get(["lastSearch"], function (result) {
        //     thisAppPopup.setState({
        //         lastSearch: result["lastSearch"],
        //     });
        // });

        chrome.storage.sync.get(["giphy"], function (result) {
            const savedGiphy = JSON.parse(result["giphy"]);
            const giphy = savedGiphy.giphy;
            const giphyData = savedGiphy.giphyData;
            giphy.giphyData = new Promise((resolve) => resolve(giphyData));
            if (giphy && giphy.giphyData) {
                if (giphyData.length > 0) {
                    thisAppPopup.setState({
                        giphy,
                        status: Status.READY,
                    });
                }
            }
        });
    }

    componentDidUpdate() {
        const {disabled} = this.props;
        const searchBox = document.getElementById(SEARCH_BOX_ID);
        if(disabled === false && searchBox)
            searchBox.focus();
        // console.log(`this.props.disabled: ${this.props.disabled}`);
    }
    

    render() {
       
        const { classes } = this.props;
        const {
            ldoce,
            giphy,
            // errorGiphy,
            // errorLdoce,
            status,
        } = this.state;
        // 1. first render: UNINIT
        // 2. error: ERROR
        // 3. downloading: READY
        // 4. download finished: READY
        let content = <NotifyMessage message={" "} />;

        // console.log(`Status: ${status}`);

        switch (status) {
            case Status.UNINIT:
                content = <NotifyMessage message={" "} />;
                break;
            case Status.LASTRESULT:
                content = (
                    <DictionaryContainer popup ldoce={ldoce} giphy={giphy} />
                );
                break;
            case Status.READY:
                content = (
                    <DictionaryContainer popup ldoce={ldoce} giphy={giphy} />
                );
                break;
            case Status.PENDING:
                content = <NotifyMessage message={"PENDING"} />;
                break;
            case Status.EMPTY:
                content = <NotifyMessage message={"EMPTY"} />;
                break;
            case Status.ERROR:
                content = <NotifyMessage message={"ERROR"} />;
                break;
        }

        return (
            <React.Fragment>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <form
                            className={classes.rootForm}
                            autoComplete="on"
                        >
                            <TextField
                                id={SEARCH_BOX_ID}
                                label="Searching..."
                                disabled={this.props.disabled}
                                autoFocus={true}
                                autoComplete={"on"}
                            />
                        </form>
                    </CardContent>
                    <CardActions>{content}</CardActions>
                    <CardActions>
                        <CardActions>
                            <PowerBy headword={""} name={"Giphy"} />
                            <PowerBy headword={""} name={"Ldoce"} />
                        </CardActions>
                    </CardActions>
                    <KeyboardEventHandler
                        handleFocusableElements
                        handleKeys={["enter"]}
                        onKeyEvent={(key: string, e: KeyboardEvent) =>
                            this.keysHandlers(key, e)
                        }
                    ></KeyboardEventHandler>
                </Card>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AppPopup);
