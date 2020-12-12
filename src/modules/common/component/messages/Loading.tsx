import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import NotifyMessage from './NotifyMessage';
const useStyles = makeStyles(() => ({
	notifyRoot: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		overflow: 'hidden',
		padding: 4
	}
}));
export default function Loading() {
	const classes = useStyles();
	return (
		<div className={classes.notifyRoot}>
			<NotifyMessage color='textSecondary' message={'Loading...'} />
			<CircularProgress />
		</div>
	);
}
