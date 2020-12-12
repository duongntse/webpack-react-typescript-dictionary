import React from 'react';
import {
	// Card,
	// CardContent,
	// CardActions,
	Grid,
} from '@material-ui/core';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
// import Fab from '@material-ui/core/Fab';
// import CloseIcon from '@material-ui/icons/Close';
import {
	// PowerBy,
	NotifyMessage,
	// CloseButton,
	// Loading
} from 'src/modules/common';
/// <reference path='../../typings/index.d.ts'/>
import { LdoceContainerConnect } from 'src/containers';
import { GiphyContainer } from 'src/modules/giphy';
import { Ldoce } from 'src/modules/ldoce';
import { Giphy } from 'src/modules/giphy';

import {
	DICTIONARY_CONTAINER_ID,
	// Status,
	// objectExtractor
} from 'src/modules/utils';

type StyleProps = WithStyles<typeof styles>;
type Props = {
	popup?: boolean;
	content?: boolean;
	ldoce?: Ldoce;
	giphy: Giphy;
	escapeHandler?: () => void;
	// xButtonHandler?: () => void;
} & StyleProps;

type State = {
	ldoceStatus?: string;
	giphyStatus?: string;
};

// type TApiStatusName = 'ldoceStatus' | 'giphyStatus';

const styles = (theme: Theme) =>
	createStyles({
		divTypo: { backgroundColor: '#cfe8fc', height: '100vh' },
		root: {
			flexGrow: 1,
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
		},
		card: {
			fontSize: 16,
			width: 375,
			backgroundColor: '#fff',
		},
		cardContent: {
			padding: 8,
		},
		xButton: {
			position: 'absolute',
			bottom: theme.spacing(2),
			right: theme.spacing(2),
			// width: 44,
			// height: 44,
			opacity: 0.9,
			'&:hover, &:focus': {
				cursor: 'pointer',
				opacity: 1,
			},
		},
	});

class DictionaryContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			ldoceStatus: undefined,
			giphyStatus: undefined,
		};
	}

	componentDidMount() {
		//
	}

	render() {
		// props: ldoceResultById, classes
		try {
			const {
				// classes,
				ldoce,
				giphy,
				// content
				// headword
			} = this.props;
			return (
				<Grid id={DICTIONARY_CONTAINER_ID} container spacing={0}>
					{/* {closeButton} */}
					<Grid item xs={12}>
						<LdoceContainerConnect ldoce={ldoce} />
					</Grid>
					<Grid item xs={12}>
						<GiphyContainer giphy={giphy} />
					</Grid>
				</Grid>
			);
		} catch (error) {
			return (
				<NotifyMessage
					message={`It's out of context. So, please reload the page to use the dictionary!`}
				/>
			);
		}
	}
}

export default withStyles(styles)(DictionaryContainer);
