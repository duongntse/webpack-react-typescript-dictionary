import React from 'react';
import { Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	definition: {
		fontSize: '1em',
		padding: 8
	}
});

type Props = { definition: string };

export default function LdoceDefinition(props: Props) {
	const classes = useStyles();
	const { definition } = props;
	const componentWillRender = (
		<Typography
			className={classes.definition}
			variant={'body2'}
			component={'p'}>
			{definition}
		</Typography>
	);

	return componentWillRender;
}
