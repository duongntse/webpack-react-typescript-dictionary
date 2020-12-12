import React from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { NotifyMessage } from 'src/modules/common';

import { Error } from 'src/modules/error';

const styles = (theme: Theme) =>
	createStyles({
		divTypo: { backgroundColor: '#cfe8fc', height: '100vh' },
		root: {
			flexGrow: 1
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary
		},
		card: {
			fontSize: 16,
			width: 375,
			backgroundColor: '#fff'
		},
		cardContent: {
			padding: 8
		}
	});

type Props = WithStyles<typeof styles> & {
	error: Error;
};

class ErrorGiphy extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
		// this.state = {
		// 	error: undefined
		// };
	}

	componentDidMount() {
		// const { error } = this.props;
	}

	render() {
		// const { classes } = this.props;
		const { error } = this.props;
		let errorMessage = <NotifyMessage message={' '} />;
		switch (error.type) {
			case 'NETWORK_ERROR':
				errorMessage = (
					<NotifyMessage
						message={`NETWORK_ERROR: Can't load Giphy images.`}
					/>
				);
				break;
			case 'TIMEOUT_ERROR':
				errorMessage = (
					<NotifyMessage
						message={`REQUEST_TIMEOUT: Your network connection was really slow.`}
					/>
				);
				break;
		}

		return (
			<Grid container spacing={0}>
				<Grid item xs={12}>
					{errorMessage}
				</Grid>
			</Grid>
		);
	}
}
export default withStyles(styles)(ErrorGiphy);
