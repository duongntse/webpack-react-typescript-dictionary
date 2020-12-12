import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	title: {
		fontSize: '1em'
	}
});
type Props = {
	title: string;
};
// import ExampleTitle from './ExampleTitle';
// <ExampleTitle title={'Examples: '} />
const LdoceExampleTitle = (props: Props) => {
	const { title } = props;
	const classes = useStyles();
	return (
		<Typography
			className={classes.title}
			color='primary'
			variant='body1'
			component='h5'>
			{title}
		</Typography>
	);
};

export default LdoceExampleTitle;
