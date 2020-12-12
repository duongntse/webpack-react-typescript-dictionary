import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    headword: {
        fontSize: '1.8em'
    }
});

type Props = { headword?: string };

export default function LdoceHeadword(props: Props) {
    const classes = useStyles();
    const { headword } = props;
    return (
        <Typography
            className={`textHeadword ${classes.headword}`}
            display='inline'
            variant='h4'
            component='h4'
            color='textSecondary'>
            {headword || ' '}
        </Typography>
    );
}
