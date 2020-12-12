import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
/// <reference path='typings/index.d.ts'/>

const useStyles = makeStyles(theme => {
    // debugger;
    return createStyles({
        xicon: {
            backgroundColor: theme.palette.primary.dark,
            borderRadius: 5,
            color: theme.palette.primary.dark,
            width: 22,
            height: 22,
            opacity: 0.9,
            '&:hover, &:focus': {
                cursor: 'pointer',
                opacity: 0.9
            }
        }
    });
});

const CloseButton = (props: any) => {

    const onClickHandler = () => {
        props.xButtonHandler();
    }

    const classes = useStyles();

    return (
        <CloseIcon onClick={onClickHandler} className={classes.xicon} color="primary" />
    );
};

export default CloseButton;
