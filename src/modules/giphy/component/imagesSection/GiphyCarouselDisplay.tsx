import React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { NotifyMessage } from 'src/modules/common';
const KeyboardEventHandler: any = require('react-keyboard-event-handler');
import { ROOT_GIPHY_IMAGES } from 'src/modules/utils';
import { Giphy, IConstructedGiphy } from 'src/modules/giphy';

const NUM_OF_IMGS = 3;
const LIMIT = 2;

type StyleProps = WithStyles<typeof styles> & { theme: Theme };

type Props = {
	giphyImgs: IConstructedGiphy[];
	giphy?: Giphy;
} & StyleProps;

type State = {
	imgElmsStorageArr: HTMLImageElement[];
	imgElmsStorageArrTotal: HTMLImageElement[][];
	activeStep: number;
	steps: number;
	offset: number;
};

const styles = (theme: Theme) =>
	createStyles({
		rootGif: {
			maxHeight: 110,
			minHeight: 110,
			maxWidth: 400,
			display: 'flex',
			flexWrap: 'wrap',
			flexGrow: 1,
			justifyContent: 'space-around',
			overflow: 'hidden',
			backgroundColor: theme.palette.background.paper,
			padding: 4,
		},
		rootMobileStepper: {
			maxHeight: 180,
			maxWidth: 400,
			display: 'flex',
			flexWrap: 'wrap',
			flexGrow: 1,
			justifyContent: 'space-around',
			overflow: 'hidden',
			padding: 4,
		},
		gif: {
			// padding: 4,
			borderRadius: 5,
			width: 110, //120,
			height: 110,
			'&:hover, &:focus': {
				cursor: 'initial',
				// width: 180,
				// height: 140
			},
		},
	});

class GiphyCarouselDisplay extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			imgElmsStorageArr: [],
			imgElmsStorageArrTotal: [],
			activeStep: 0,
			offset: 0,
			steps: 0,
		};
		this.handleNext = this.handleNext.bind(this);
		this.handleBack = this.handleBack.bind(this);
		this.createImages = this.createImages.bind(this);
		this.renderImages = this.renderImages.bind(this);
		this.keysHandlers = this.keysHandlers.bind(this);
		this.sliceHtmlImgElms = this.sliceHtmlImgElms.bind(this);
		this.downloadMoreImages = this.downloadMoreImages.bind(this);
		this.queryRootImage = this.queryRootImage.bind(this);
		this.getNextImgElms = this.getNextImgElms.bind(this);
		this.doPeopleNeedMoreImgs = this.doPeopleNeedMoreImgs.bind(this);
		this.isNotLastOffset = this.isNotLastOffset.bind(this);
		this.isForwardStepInRange = this.isForwardStepInRange.bind(this);
		this.isBackwardStepInRange = this.isBackwardStepInRange.bind(this);
		this.isForwardLimit = this.isForwardLimit.bind(this);
		this.isLastActiveStep = this.isLastActiveStep.bind(this);
		this.isLastCollection = this.isLastCollection.bind(this);
		this.isFirstActiveStep = this.isFirstActiveStep.bind(this);
		this.isFirstCollection = this.isFirstCollection.bind(this);
		// this.renderNextDownloadedImages = this.renderNextDownloadedImages.bind(
		// 	this
		// );
	}

	resetState() {
		this.setState({
			activeStep: 0,
			steps: 0,
		});
	}

	downloadMoreImages(): Promise<IConstructedGiphy[]> {
		return new Promise((resolve, reject) => {
			let { giphy } = this.props;
			if (giphy) {
				giphy.autoSearchNext();
				let giphyImgsPromise = giphy.giphyData;
				if (giphyImgsPromise && 'then' in giphyImgsPromise) {
					giphyImgsPromise
						.then((giphyImgs) => {
							if (giphyImgs.length > 0) resolve(giphyImgs);
							else resolve([]);
						})
						.catch((error) => {
							console.log(
								`ERROR: downloadMoreImages: ${JSON.stringify(
									error
								)}`
							);
							reject(error);
						});
				} else {
					// giphy.giphyImgsPromise, undefined, not Promise -> do nothing
				}
			} else {
				// Giphy undefined -> do nothing
			}
		});
	}

	// renderNextDownloadedImages(
	// 	giphyImgs: IConstructedGiphy[],
	// 	activeStep: number
	// ) {
	// 	const { imgElmsStorageArrTotal, offset } = this.state;
	// 	const imageObjects = this.createImages(giphyImgs);

	// 	const nextImgElms = this.getNextImgElms(imageObjects, activeStep);

	// 	this.renderImages(nextImgElms);

	// 	this.setState({
	// 		activeStep: 0,
	// 		steps: this.calSteps(imageObjects),
	// 		imgElmsStorageArr: [...imageObjects],
	// 		offset: offset + 1,
	// 		imgElmsStorageArrTotal: [...imgElmsStorageArrTotal, imageObjects],
	// 	});
	// }

	getNextImgElms(
		imgElmsStorageArr: HTMLImageElement[],
		activeStep: number
	): HTMLImageElement[] {
		const start = activeStep * 3;
		const end = activeStep * 3 + 3;
		const nextImgElms = this.sliceHtmlImgElms(
			imgElmsStorageArr,
			start,
			end
		);
		return nextImgElms;
	}

	doPeopleNeedMoreImgs(): boolean {
		let { activeStep, steps, imgElmsStorageArrTotal, offset } = this.state;
		if (offset === imgElmsStorageArrTotal.length - 1) {
			return activeStep === steps - 3;
		}
		return false;
	}

	isNotLastOffset(): boolean {
		let { imgElmsStorageArrTotal, offset } = this.state;
		return offset < imgElmsStorageArrTotal.length - 1;
	}

	isForwardStepInRange(): boolean {
		let { activeStep, steps } = this.state;
		const nextStep = activeStep + 1;
		return nextStep < steps && nextStep >= 0;
	}

	isBackwardStepInRange(): boolean {
		let { activeStep, steps } = this.state;
		const backStep = activeStep - 1;
		return backStep >= 0 && backStep < steps;
	}

	handleNext() {
		let {
			activeStep,
			// steps,
			imgElmsStorageArr,
			imgElmsStorageArrTotal,
			offset,
		} = this.state;
		activeStep += 1;
		if (this.isForwardStepInRange()) {
			this.setState({
				activeStep,
			});
			// render images as normally
			const nextImgElms = this.getNextImgElms(
				imgElmsStorageArr,
				activeStep
			);

			this.renderImages(nextImgElms);
		} else {
			const nextOffset = offset + 1,
				nextImgElmsCollection = imgElmsStorageArrTotal[nextOffset],
				steps = this.calSteps(nextImgElmsCollection),
				nextImgElms = this.sliceHtmlImgElms(
					nextImgElmsCollection,
					0,
					3
				);
			this.renderImages(nextImgElms);

			// Render the next one
			this.setState({
				steps,
				activeStep: 0,
				offset: nextOffset,
				imgElmsStorageArr: [...nextImgElmsCollection],
			});
		}
	}

	calSteps(giphyImgs: any[]) {
		if (Array.isArray(giphyImgs) && NUM_OF_IMGS > 0)
			return Math.floor(giphyImgs.length / NUM_OF_IMGS);

		return 0;
	}

	handleBack() {
		let { activeStep } = this.state;
		const {
			imgElmsStorageArr,
			offset,
			imgElmsStorageArrTotal,
		} = this.state;
		activeStep -= 1;
		if (this.isBackwardStepInRange()) {
			// just go back.
			this.setState({
				activeStep,
			});
			// render images
			const nextImgs = this.getNextImgElms(imgElmsStorageArr, activeStep);
			this.renderImages(nextImgs);
		} else {
			// activeStep < 0,
			if (activeStep === -1) {
				if (offset > 0) {
					const backOffset = offset - 1,
						backImageObjects = imgElmsStorageArrTotal[backOffset],
						steps = this.calSteps(backImageObjects),
						backActiveStep = steps - 1,
						imgs = this.getNextImgElms(
							backImageObjects,
							backActiveStep
						);
					this.renderImages(imgs);
					this.setState({
						offset: backOffset,
						activeStep: backActiveStep,
						steps,
						imgElmsStorageArr: [...backImageObjects],
					});
				}
			}
		}
	}

	createImages(giphyImgs: IConstructedGiphy[]): HTMLImageElement[] {
		return giphyImgs.map((img) => {
			let image = new Image();
			image.src = img.imgPath;
			image.title = img.label;
			image.className = this.props.classes.gif;
			return image;
		});
	}

	queryRootImage(): HTMLElement {
		return document.querySelector('.rootImages') as HTMLElement;
	}

	renderImages(nextImgElms: HTMLImageElement[]): void {
		const rootImage: HTMLElement = this.queryRootImage();
		rootImage.innerHTML = ' ';
		nextImgElms.map((imgObj: HTMLImageElement) =>
			rootImage.appendChild(imgObj)
		);
	}

	isForwardLimit(): boolean {
		const { offset } = this.state;
		return offset + 1 >= LIMIT;
	}

	isLastActiveStep(): boolean {
		const { activeStep, steps } = this.state;
		return activeStep === steps - 1;
	}

	isLastCollection(): boolean {
		const { offset, imgElmsStorageArrTotal } = this.state;
		return offset === imgElmsStorageArrTotal.length - 1;
	}

	isFirstActiveStep(): boolean {
		const { activeStep } = this.state;
		return activeStep === 0;
	}

	isFirstCollection(): boolean {
		const { offset } = this.state;
		return offset === 0;
	}

	keysHandlers(key: string, event: KeyboardEvent) {
		event.preventDefault();
		try {
			// const {
			// 	activeStep,
			// 	steps,
			// 	offset,
			// 	imgElmsStorageArrTotal
			// } = this.state;

			// const key = event.key || event.which;
			const rightDisabled = this.isLastActiveStep();
			//&&
			// !this.isLastCollection() &&
			// this.isForwardLimit();

			const leftDisabled =
				this.isFirstActiveStep() && this.isFirstCollection();

			if (key === 'right') {
				if (!rightDisabled) this.handleNext();
			}
			if (key === 'left') {
				if (!leftDisabled) this.handleBack();
			}
		} catch (error) {
			console.log(`error-keysHandlers: ${error}`);
		}
	}

	sliceHtmlImgElms(
		giphyImgs: HTMLImageElement[],
		start = 0,
		end = 3
	): HTMLImageElement[] {
		return giphyImgs.slice(start, end);
	}

	componentDidMount() {
		// giphyData as IConstructedGiphy[], count <= 25
		const { giphyImgs } = this.props;
		// steps
		const steps = this.calSteps(giphyImgs);
		// render images
		const imageObjects = this.createImages(giphyImgs);
		const nextImgElms = this.sliceHtmlImgElms(imageObjects, 0, 3);
		this.renderImages(nextImgElms);
		// set: steps, activeStep, offset
		// debugger;
		this.setState({
			steps,
			activeStep: 0,
			offset: 0,
			imgElmsStorageArr: [...imageObjects],
			imgElmsStorageArrTotal: [imageObjects],
		});
	}

	render() {
		const { theme, classes } = this.props;
		const { giphyImgs } = this.props;
		const { activeStep, steps } = this.state;

		if (giphyImgs && giphyImgs.length === 0)
			return (
				<div className={classes.rootGif}>
					<NotifyMessage
						color='textSecondary'
						message={`No Images were found.`}
					/>
				</div>
			);

		return (
			<div>
				<div
					id={ROOT_GIPHY_IMAGES}
					className={`${classes.rootGif} rootImages`}></div>
				<div className={classes.rootMobileStepper}>
					<MobileStepper
						style={{ flexGrow: 1 }}
						steps={steps}
						position='static'
						variant='dots'
						activeStep={activeStep}
						nextButton={
							<Button
								size='small'
								onClick={this.handleNext}
								disabled={this.isLastActiveStep()}>
								Next
								{theme.direction === 'rtl' ? (
									<KeyboardArrowLeft />
								) : (
									<KeyboardArrowRight />
								)}
							</Button>
						}
						backButton={
							<Button
								size='small'
								onClick={this.handleBack}
								disabled={
									this.isFirstActiveStep() &&
									this.isFirstCollection()
								}>
								{theme.direction === 'rtl' ? (
									<KeyboardArrowRight />
								) : (
									<KeyboardArrowLeft />
								)}
								Back
							</Button>
						}
					/>
				</div>
				<KeyboardEventHandler
					handleFocusableElements
					handleKeys={['left', 'right']}
					onKeyEvent={(key: string, e: KeyboardEvent) =>
						this.keysHandlers(key, e)
					}></KeyboardEventHandler>
			</div>
		);
	}
}

// export default withStyles(styles)(GiphyCarouselDisplay);
export default withStyles(styles, { withTheme: true })(GiphyCarouselDisplay);
