import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { NotifyMessage } from 'src/modules/common';
import LdocePos from './LdocePos';

const styles = () =>
	createStyles({
		// // senses, mobileStepper
		senses: {
			maxHeight: 200,
			minWidth: 357,
			display: 'flex',
			flexWrap: 'wrap',
			flexGrow: 1,
			justifyContent: 'space-around',
			// backgroundColor: theme.palette.background.paper,
			padding: 4,
			overflowY: 'scroll',
			overflowX: 'hidden'
		},
		root: {
			minWidth: 357,
			flexGrow: 1
		},
		paper: {
			minWidth: 357,
			flexGrow: 1,
			width: '100%',
			heigh: 200
			// marginTop: theme.spacing.unit * 0,
		},
		pos: {
			margin: 4
		}
	});

type PropStyle = WithStyles<typeof styles>;
type Props = {
	allPos: string[];
	pos: string;
	handlePosClick: (event: React.MouseEvent) => void;
} & PropStyle;

const LdocePosContainer = withStyles(styles)(
	class extends React.Component<Props, {}> {
		constructor(props: Props) {
			super(props);
			this.state = {
				// definitions
				// examples
				ready: false,
				allPos: null
			};
		}

		render() {
			const { classes, allPos, pos, handlePosClick } = this.props;
			let partOfSpeechs;

			if (pos && allPos && allPos.length > 0) {
				partOfSpeechs = allPos.map((curPos, ind) => (
					<Grid key={'Grid-PartOfSpeech' + ind} item>
						<LdocePos
							key={'PartOfSpeech' + ind}
							text={curPos}
							active={curPos === pos ? true : false}
							clickHandler={handlePosClick}
						/>
					</Grid>
				));
			} else {
				partOfSpeechs = (
					<NotifyMessage color='textSecondary' message={``} />
				);
			}

			return (
				<Grid container className={classes.pos} spacing={1}>
					<Grid item xs={12}>
						<Grid
							container
							spacing={1}
							direction='row'
							alignItems='center'>
							{partOfSpeechs}
						</Grid>
					</Grid>
				</Grid>
			);
		}
	}
);

export default LdocePosContainer;
