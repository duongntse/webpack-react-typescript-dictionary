import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles(() => ({
	button: {
		// padding: theme.spacing(1),
		fontSize: 8,
	},
}));

type Props = {
	text: string;
	active: boolean;
	clickHandler: (e: React.MouseEvent) => void;
};

export default function LdocePos(props: Props) {
	const classes = useStyles();
	const { text, active, clickHandler } = props;
	return (
		<Button
			size='small'
			onClick={clickHandler}
			className={`${classes.button} posButton`}
			component='span'
			variant={active ? 'contained' : 'text'}
			color={active ? 'primary' : 'default'}>
			{text}
		</Button>
	);
}
