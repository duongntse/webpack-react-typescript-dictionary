import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles({
    message: {
        // fontSize: 14
    }
});

interface iProp {
    message?: string;
    color?: any;
    variant?: any;
    align?: any;
}

export default function NotifyMessage(props: iProp) {
    const classes = useStyles();
    const { message, color, align, variant } = props;
    return (
        <Typography
            className={classes.message}
            color={(color as any) || 'textSecondary'}
            gutterBottom
            align={align ? align : "left"}
            variant={variant ? variant : "body2"}
            {...props}
        >
            {message || ' '}

        </Typography>
    );
}
