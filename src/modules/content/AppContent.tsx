import * as React from "react";
import { Ldoce } from "src/modules/ldoce";
import { Giphy } from "src/modules/giphy";
import { DictionaryContainer } from "src/modules/app/";
// import ErrorContainer from './ErrorContainer';
import AppContentDecorator from "./AppContentDecorator";
import {
  ChromeExtCtxInvalidate,
  NotifyMessage,
  PopupIcon,
  PowerBy,
} from "src/modules/common";
import * as _ from "lodash";
import {
  APP_CONTENT_DRAGGABLE,
  IHandleMouseUpEvent,
  handleMouseDownEvent,
  handleMouseUpEvent,
} from "src/modules/utils";
import {
  withStyles,
  WithStyles,
  createStyles,
  Card,
  CardContent,
  CardActions,
  Grid,
  Paper,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
const KeyboardEventHandler: any = require("react-keyboard-event-handler");
import Draggable from "react-draggable";
// import { IApiLdoceByID } from 'src/services/ldoce/interfaces';
import closeImage from "src/assets/img/close-image.png";
const onlineCloseUrl =
  "https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png";

type State = IHandleMouseUpEvent & {
  ldoce: Ldoce;
  giphy: Giphy;
  isExtCxtInvalidate: boolean | undefined;
  isDisabledDraggable: boolean | undefined;
  forceMouseUpUnFired: boolean | undefined;
  savedRange: any;
};

const styles = (theme: Theme) =>
  createStyles({
    divTypo: { backgroundColor: "#cfe8fc", height: "100vh" },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    card: {
      fontSize: 16,
      width: 375,
      backgroundColor: "#fff",
    },
    cardContent: {
      padding: 8,
    },
    xButton: {
      position: "absolute",
      top: "2px",
      right: "2px",
      opacity: 0.9,
      "&:hover, &:focus": {
        cursor: "pointer",
        opacity: 1,
        boxShadow: "0px 0px 5px 0px rgb(0 0 0 / 70%)",
      },
      float: "right",
      marginTop: "0px",
      width: "40px",
    },
    dragButton: {
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1),
      // width: 44,
      // height: 44,
      opacity: 0.9,
      "&:hover, &:focus": {
        cursor: "move",
        opacity: 1,
      },
    },
    movableCard: {
      "&:hover, &:focus": {
        cursor: "move",
      },
    },
  });
type Props = WithStyles<typeof styles>;

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ldoce: {} as Ldoce,
      giphy: {} as Giphy,
      headword: undefined,
      showIcon: false,
      showPopup: false,
      forceMouseUpUnFired: false,
      isDisabledDraggable: true,
      isExtCxtInvalidate: undefined,
      savedRange: new Range(),
    };
  }
  // escapeHandler, xButtonHandler
  escapeHandler = () => {
    this.resetState();
  };

  keysHandlers = (key: string) => {
    try {
      if (key == "esc") {
        this.escapeHandler();
      }
    } catch (error) {
      console.log(`error-keysHandlers: ${error}`);
    }
  };

  xButtonHandler = () => {
    this.resetState();
    
  };

  resetState = () => {
    this.unHighlightWordFromRange();
    this.setState({
      showIcon: false,
      showPopup: false,
      headword: "",
      savedRange: new Range(),
    });
  }

  enableDraggable = () => {
    this.setState({
      isDisabledDraggable: false,
    });
  };

  disableDraggable = () => {
    this.setState({
      isDisabledDraggable: true,
    });
  };

  autoDownloadLdoce = (headword: string) => {
    const ldoce = new Ldoce(headword!);
    ldoce.autoSearch();
    this.setState({
      ldoce,
    });
  };

  autoDownloadGiphy = (headword: string) => {
    const giphy = new Giphy(headword!);
    giphy.autoSearch();
    this.setState({
      giphy,
    });
  };

  getHighlighText = (): string => {
    // let sel = window.getSelection();
    // range = sel && sel.getRangeAt(0).cloneRange();
    return window
      .getSelection()!
      .toString()
      .replace(/[^a-zA-Z0-9-]/g, " ")
      .trim();
  };

  mouseDownHandler = (event: MouseEvent) => {
    const mouseDownResult = handleMouseDownEvent(event);

    if (mouseDownResult) {
      const { isClearContent } = mouseDownResult;
      if (isClearContent) {
        // Start - User click out of Icon, but over HL text. So just don't fire the mouseup event.
        const slElm = window.getSelection();
        const hlTxt = (slElm && slElm.toString()) || null;
        let forceMouseUpUnFired = false;
        if (hlTxt !== null && hlTxt.trim().length > 0) {
          forceMouseUpUnFired = true;
        }
        // End - of above.

        // remove highlight color, and reset state
        this.resetState();

        this.setState({
          forceMouseUpUnFired,
        });

        return false;
      } else {
        // waiting for mouse up event
        return false;
      }
    } else {
      // event.preventDefault();
      return false;
      // will be "undefined" when RIGHT MOUSE CLICKED
    }
  };

  saveRangeToState = () => {
    // alert(`rangeCount: ${document.getSelection()!.rangeCount}`);
    let selection = document.getSelection();
    let decoredRange = selection && selection.getRangeAt(0).cloneRange();
    // debugger;

    // decorate the highlight text  with yellow
    const decoredParent = document.createElement("span");
    decoredParent.style.backgroundColor = "yellow";
    // decoredParent.style.color = "#000";

    
      if (decoredRange) {
        const startContainer = decoredRange.startContainer as HTMLElement
        const htmlElmChilds = startContainer.children;
        const isInputElm = htmlElmChilds ? [...Array.from(htmlElmChilds)].map(child => ["input", "textarea"].includes(child.localName)).length > 0 : false;
        this.setState({ savedRange: decoredRange });

        if(!isInputElm){
          // console.log("decoredRange: ", decoredRange);
          const txt = decoredRange.toString();
          if (txt.trim().length > 0) {
            decoredRange.surroundContents(decoredParent);
          }
          // debugger;
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(decoredRange);
          } else {
            // selection is null
            this.setState({ savedRange: new Range() });
          }
        } else {
          // 
        }
      } else {
        // decoredRange is null
        this.setState({ savedRange: new Range() });
      }
  };

  reSelectHighlightWord = () => {
    let { savedRange } = this.state;
    if (savedRange) {
      let selection = document.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedRange);
      }
    }
  };

  unHighlightWordFromRange = () => {
    const { savedRange } = this.state;
    const text = savedRange.toString();
    const textNode = document.createTextNode(text);

    savedRange.deleteContents();
    savedRange.insertNode(textNode);
    savedRange.selectNode(textNode);
  };

  isValidChromeContext = () => {
    try {
      if (chrome && chrome.runtime && chrome.runtime.connect()) {
        // callback(event);
        return true;
      } else {
        // this.setState({ isExtCxtInvalidate: true });
        return false;
      }
    } catch (error) {
      // this.setState({ isExtCxtInvalidate: true });
      return false;
    }
  };

  mouseUpHandler = (event: MouseEvent) => {
    const mouseUpHandlerFunction = () => {
      const { forceMouseUpUnFired } = this.state;
      // if forceMouseUpUnFired is true, then do nothing.
      if (forceMouseUpUnFired) {
        this.setState({
          forceMouseUpUnFired: false,
        });
      } else {
        // result: showIcon: false, showPopup: false;
        const result = handleMouseUpEvent(event);

        if (result && Object.keys(result).length > 0) {
          const { showPopup, showIcon, top, left, headword } = result;
          // SHOW ICON
          if (showIcon) {
            // execute document copy word
            // document.execCommand("copy");

            // Saving Range to state
            this.saveRangeToState();

            // load data from ldoce
            this.autoDownloadLdoce(headword!);
            // load data from giphy
            this.autoDownloadGiphy(headword!);

            this.setState({
              top,
              left,
              showIcon,
              showPopup,
              headword,
            });

            return;
          }
          // SHOW POPUP
          if (showPopup) {
            // this.reSelectHighlightWord();
            top && this.setState({ top });
            left && this.setState({ left });
            this.setState({ showIcon, showPopup });

            return;
          }
        } else {
          // will be "undefined" when RIGHT MOUSE CLICKED
          // then, do nothing
        }
      }
    };
    mouseUpHandlerFunction();
  };

  componentDidMount() {
    document.body.addEventListener("mousedown", this.mouseDownHandler);
    document.body.addEventListener("mouseup", this.mouseUpHandler);
  }

  render() {
    // const { isExtCxtInvalidate } = this.state;
    if (!this.isValidChromeContext()) {
      return <ChromeExtCtxInvalidate />;
    }
    let closeImgUrl = chrome.runtime.getURL(closeImage) || onlineCloseUrl;
    const { classes } = this.props;

    const {
      showIcon,
      showPopup,
      top,
      left,
      ldoce,
      giphy,
      headword,
    } = this.state;

    // Normally
    if (showIcon) {
      return (
        <AppContentDecorator left={left || 0} top={top || 0}>
          <PopupIcon />
        </AppContentDecorator>
      );
    } else if (showPopup) {
      return (
        <AppContentDecorator left={left || 0} top={top || 0}>
          <Draggable disabled={this.state.isDisabledDraggable}>
            <Card id={APP_CONTENT_DRAGGABLE} className={classes.card}>
              <CardActions
                onMouseOver={this.enableDraggable}
                onMouseOut={this.disableDraggable}
                className={classes.movableCard}
                style={{ padding: 0, marginTop: 8 }}
              >
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <Paper
                      className={classes.paper}
                      elevation={0}
                      style={{ padding: 0 }}
                    >
                      <NotifyMessage
                        align={"center"}
                        variant={"h6"}
                        message="Dictionary"
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </CardActions>
              <img
                src={closeImgUrl}
                className={classes.xButton}
                onClick={this.xButtonHandler}
              />
              <CardContent className={classes.cardContent}>
                <DictionaryContainer
                  content
                  escapeHandler={this.escapeHandler}
                  // xButtonHandler={this.xButtonHandler}
                  ldoce={ldoce}
                  giphy={giphy}
                />
              </CardContent>
              <CardActions
                onMouseOver={this.enableDraggable}
                onMouseOut={this.disableDraggable}
                className={classes.movableCard}
              >
                <PowerBy headword={headword} name={"Giphy"} />
                <PowerBy headword={headword} name={"Ldoce"} />
              </CardActions>
              <KeyboardEventHandler
                handleFocusableElements
                handleKeys={["esc"]}
                onKeyEvent={this.keysHandlers}
              ></KeyboardEventHandler>
            </Card>
          </Draggable>
        </AppContentDecorator>
      );
    }

    return (
      <AppContentDecorator left={left || 0} top={top || 0}>
        <NotifyMessage message={" "} />
      </AppContentDecorator>
    );
  }
}

export default withStyles(styles)(App);
