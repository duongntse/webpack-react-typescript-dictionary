import React from 'react';
// import { Card, CardContent, Grid } from '@material-ui/core';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { eRequestError } from 'src/modules/utils/errors/eRequestError';
import { NotifyMessage, NetworkError } from 'src/modules/common';
import RequestError from 'src/modules/utils/errors/requestError';

import {
	REQUEST_RAW_GIPHY_ERROR,
	SEARCH_GIPHY_ERROR,
	objectExtractor
} from 'src/modules/utils';

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

type Error = {
	[name: string]: any;
};
type Props = WithStyles<typeof styles> & {
	error?: any;
};

class ErrorGiphy extends React.Component<Props, Error> {
	constructor(props: Props) {
		super(props);
		this.state = {
			giphyError: undefined
		};
	}

	componentDidMount() {
		const { error } = this.props;
		if (error) {
			const rrgeError = objectExtractor(
				error,
				SEARCH_GIPHY_ERROR,
				REQUEST_RAW_GIPHY_ERROR
			) as RequestError;

			if (rrgeError) {
				switch (rrgeError.errorType) {
					case eRequestError.NETWORK_ERROR:
						this.setState({
							giphyError: (
								<NetworkError
									message={`Can't load images from Giphy, please fix your Internet!`}
								/>
							)
						});
						break;
					case eRequestError.HTTP_ERROR:
						this.setState({
							giphyError: (
								<NotifyMessage message={rrgeError.message} />
							)
						});
						break;
					case eRequestError.SOMETHING_WEIRD:
						this.setState({
							giphyError: (
								<NetworkError
									message={`It's WEIRD. It should be the time to go to the Church or Pagoda to be in peace. `}
								/>
							)
						});
						break;
				}
			}
		} else {
			// this.setState({})
		}
	}

	render() {
		// const { classes } = this.props;
		const { giphyError } = this.state;
		let errorGiphyContent: JSX.Element = <NotifyMessage message={' '} />;

		if (giphyError) {
			errorGiphyContent = giphyError;
		}

		return errorGiphyContent;
	}
}
export default withStyles(styles)(ErrorGiphy);
