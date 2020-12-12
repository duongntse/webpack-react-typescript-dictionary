import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { NotifyMessage } from 'src/modules/common';
import { objectExtractor } from 'src/modules/utils';
import { ISense } from 'src/modules/ldoce';
import { LdoceExampleContainer, LdoceDefinition } from 'src/modules/ldoce';

const KeyboardEventHandler: any = require('react-keyboard-event-handler');

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
			overflowX: 'hidden',
		},
		mobileStepper: {
			minWidth: 357,
			flexGrow: 1,
		},
		root: {
			minWidth: 357,
			flexGrow: 1,
		},
		paper: {
			minWidth: 357,
			flexGrow: 1,
			width: '100%',
			heigh: 200,
			// marginTop: theme.spacing.unit * 0,
		},
	});

type StyleProp = WithStyles<typeof styles> & { theme: Theme };
type Props = {
	pos: string;
	senses: ISense[];
} & StyleProp;

type State = {
	ready: boolean | undefined;
	senses: any[] | undefined;
	activeStep: number | undefined;
	steps: number | undefined;
};

const LdoceSenseContainer = withStyles(styles, { withTheme: true })(
	class extends React.Component<Props, State> {
		constructor(props: Props) {
			super(props);
			this.state = {
				ready: undefined,
				senses: undefined,
				activeStep: 0,
				steps: 0,
			};
		}

		handleNext = () => {
			const { activeStep } = this.state;
			this.setState({
				activeStep: 1 + activeStep!,
			});
		};

		handleBack = () => {
			const { activeStep } = this.state;
			this.setState({
				activeStep: (activeStep || 0) - 1,
			});
		};

		keysHandlers = (key: string, event: KeyboardEvent) => {
			event.stopImmediatePropagation();
			try {
				const { activeStep, steps } = this.state;
				// const key = event.key || event.which;
				const rightDisabled = activeStep === steps! - 1;
				const leftDisabled = activeStep === 0;
				if (key === 'right') {
					if (!rightDisabled) this.handleNext();
				}
				if (key === 'left') {
					if (!leftDisabled) this.handleBack();
				}
			} catch (error) {
				console.log(`error-keysHandlers: ${error}`);
			}
		};

		componentDidMount() {
			const { senses } = this.props;
			if (senses && senses.length > 0) {
				const filterdSenses = senses.filter((d) =>
					objectExtractor(d, 'definition', 0)
				);
				const maxSteps = filterdSenses.length;
				this.setState({
					ready: true,
					steps: maxSteps,
					senses: filterdSenses,
				});
			} else {
				this.setState({ ready: true });
			}
		}

		componentDidUpdate(prevProps: Props) {
			const prevPos = prevProps.pos;
			const { pos, senses } = this.props;
			if (prevPos !== pos) {
				if (senses && senses.length > 0) {
					const filterdSenses = senses.filter((d) =>
						objectExtractor(d, 'definition', 0)
					);
					const maxSteps = filterdSenses.length;
					this.setState({
						ready: true,
						activeStep: 0,
						steps: maxSteps,
						senses: filterdSenses,
					});
				} else {
					this.setState({ ready: true });
				}
			}
		}

		componentWillUnMount() {}

		render() {
			const { classes } = this.props;
			const { senses, steps, ready, activeStep } = this.state;

			let examples, definition;
			let componentWillRender = (
				<div className={classes.root}>
					<NotifyMessage
						color='textSecondary'
						message={`Loading...`}
					/>
				</div>
			);

			if (ready === undefined) {
				return componentWillRender;
			}

			if (senses && senses.length > 0) {
				const nextSenses = senses!.slice(
					activeStep,
					activeStep! + 1
				)[0];
				if (nextSenses) {
					examples = nextSenses.examples;
					let nextDefinition = nextSenses.definition;
					definition =
						nextDefinition && nextDefinition.length > 0
							? nextDefinition[0]
							: null;
				}
				componentWillRender = (
					<NotifyMessage color='textSecondary' message={``} />
				);
			} else {
				componentWillRender = (
					<NotifyMessage color='textSecondary' message={``} />
				);
			}

			return (
				<Paper className={classes.paper}>
					<div className={classes.senses}>
						<Grid item xs={12}>
							<LdoceDefinition definition={definition} />
						</Grid>
						<LdoceExampleContainer examples={examples} />
					</div>
					<div className={classes.mobileStepper}>
						<MobileStepper
							style={{ flexGrow: 1 }}
							steps={steps!}
							position='static'
							variant='text'
							activeStep={activeStep}
							nextButton={
								<Button
									size='small'
									onClick={this.handleNext}
									disabled={activeStep === steps! - 1}
									component={'span'}
									variant={'text'}
									color={'default'}>
									Next <KeyboardArrowRight />
								</Button>
							}
							backButton={
								<Button
									size='small'
									onClick={this.handleBack}
									disabled={activeStep === 0}
									component={'span'}
									variant={'text'}
									color={'default'}>
									<KeyboardArrowLeft /> Back
								</Button>
							}
						/>
					</div>

					<KeyboardEventHandler
						handleFocusableElements
						handleKeys={['left', 'right']}
						onKeyEvent={this.keysHandlers}></KeyboardEventHandler>
				</Paper>
			);
		}
	}
);

export default LdoceSenseContainer;
