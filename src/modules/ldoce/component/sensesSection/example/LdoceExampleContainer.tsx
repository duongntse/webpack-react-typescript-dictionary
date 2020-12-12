import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import LdoceExampleTitle from './LdoceExampleTitle';
import LdoceExampleBody from './LdoceExampleBody';
import { NotifyMessage } from 'src/modules/common';
import { IExample } from 'src/modules/ldoce';

const useStyles = makeStyles({
	exampleContainer: {
		padding: 8,
		fontSize: '1em',
		width: '100%',
		height: 150
	}
});

type Props = { examples: IExample[] };

export default function LdoceExampleContainer(props: Props) {
	const classes = useStyles();
	const { examples } = props;
	if (examples && examples.length === 0)
		return (
			<div className={classes.exampleContainer}>
				<NotifyMessage message={` `} />
			</div>
		);
	// examples: [{audio[{type, url}], text}]
	return (
		<div className={classes.exampleContainer}>
			<Grid item xs={12} key={`example-title-outer`}>
				<LdoceExampleTitle title={'Examples: '} />
			</Grid>
			<Grid item xs={12} key={`example-body-outer`}>
				<LdoceExampleBody examples={examples} />
			</Grid>
		</div>
	);
}
