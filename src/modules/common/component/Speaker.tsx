import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { IconButton } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { PlayCircleFilledOutlined } from '@material-ui/icons';
import {
	// playAudio,
	objectExtractor
	// cutMoreDescriptionInExample,
} from 'src/modules/utils';
import { SpeakerType } from 'src/modules/utils';
import {
	DICTIONARY_CONTAINER_ID
	// BRITAIN_SPEAKER_HEADWORD
} from 'src/modules/utils';

const styles = () =>
	createStyles({
		boxMedia: {
			'&:hover, &:focus': {
				cursor: 'pointer'
			}
			// padding: 8
		},
		iconButton: {
			fontSize: 22,
			padding: 0
		},

		speakerIcon: {
			fontSize: '24px'
		},
		headwordSpeakerIcon: {
			float: 'right',
			margin: '7px 0 0 0'
		},

		googleIcon: {
			color: '#e91e63'
		}
	});

type State = {
	autoPlay: boolean;
	isIPA: boolean;
	audioUrl?: string;
	speakerName?: string;
};
type Props = {
	br_audio_url: string;
	autoPlay?: boolean;
	isIPA: boolean;
	speakerName: string;
	speakerType: SpeakerType;
	setSearchBox?: (ability: 'ENABLE' | 'DISABLE') => void;
} & WithStyles<typeof styles>;

const Speaker = withStyles(styles)(
	class extends React.Component<Props, State> {
		constructor(props: Props) {
			super(props);
			this.state = {
				autoPlay: false,
				isIPA: false,
				audioUrl: undefined,
				speakerName: undefined
			};
		}
		stopAudios = (
			audioElementList: Array<HTMLMediaElement> | null
		): void => {
			if (audioElementList) {
				audioElementList.forEach(x => {
					x.pause();
					x.currentTime = 0;
				});
			}
		};

		playAudio = (audioElement: HTMLMediaElement | null): void => {
			if (audioElement) {
				audioElement.load();
				audioElement.play();
			}
		};

		onClickGoogleSpeaker = (event: React.MouseEvent): void => {
			const { speakerName } = this.state;
			try {
				if (!speakerName) {
					let textElm = objectExtractor(
						event.currentTarget,
						'nextElementSibling'
					) as HTMLElement;
					let text = (textElm && textElm.innerText) || '';
					// text = cutMoreDescriptionInExample(text).trim();
					if (text.length > 0) {
						chrome.runtime.sendMessage(
							{ cmd: 'speak', text },
							(message: string) => {
								console.log(
									`reponse message: ${JSON.stringify(
										message
									)}`
								);
							}
						);
					} else {
						// Empty Text: DO nothing
					}
				} else {
					let rootHeadword = objectExtractor(
						event.currentTarget,
						'parentElement'
					) as HTMLElement;

					let headwordElm =
						rootHeadword &&
						(rootHeadword.firstChild as HTMLElement);

					let text = (headwordElm && headwordElm.innerText) || '';

					if (text.length > 0) {
						chrome.runtime.sendMessage(
							{ cmd: 'speak', text },
							(message: string) => {
								console.log(
									`reponse message: ${JSON.stringify(
										message
									)}`
								);
							}
						);
					} else {
						// Empty Text: DO nothing
					}
				}
			} catch (error) {
				console.log(
					`ERROR-onClickGoogleSpeaker: ${JSON.stringify(error)}`
				);
				throw error;
			}
		};

		onClickLdoceSpeaker = (event: React.MouseEvent): void => {
			try {
				let audioElm = event.currentTarget.querySelector('audio');
				const rootDiv = this.getRootDiv();
				const audioList = this.getSpeakerMediaElmList(rootDiv);
				this.stopAudios(audioList);
				this.playAudio(audioElm);
			} catch (error) {
				// console.log(`Speaker throw error: ${error}`);
			}
		};

		onClickHandler = (event: React.MouseEvent) => {
			// box: className = boxAudioMedia
			try {
				const speakerType = this.props.speakerType;
				switch (speakerType) {
					case SpeakerType.GOOGLE:
						this.onClickGoogleSpeaker(event);
						break;
					case SpeakerType.LDOCE:
						this.onClickLdoceSpeaker(event);
						break;
					default:
						break;
				}
			} catch (error) {
				console.log(`Speaker throw error: ${error}`);
			}
		};

		getRootDiv = (): HTMLElement | null => {
			return document.querySelector(
				`#${DICTIONARY_CONTAINER_ID}`
			) as HTMLElement;
		};

		getSpeakerMediaElm = (
			rootDiv: HTMLElement | null,
			speakerName: string
		) => {
			if (rootDiv) {
				const boxElm = rootDiv.querySelector(
					`.${speakerName}`
				) as HTMLElement;
				const audioElm =
					boxElm &&
					(boxElm.querySelector(`audio`) as HTMLMediaElement);
				return audioElm;
			} else {
				return null;
			}
		};
		getSpeakerMediaElmList = (
			rootDiv: HTMLElement | null
		): HTMLMediaElement[] => {
			let audioList =
				(rootDiv && rootDiv.querySelectorAll('audio')) || [];
			return Array.from(audioList);
		};

		componentDidMount() {
			// examples: [{audio[{type, url}], text}]
			const { br_audio_url, autoPlay, speakerName, isIPA } = this.props;
			if (autoPlay && isIPA && br_audio_url && br_audio_url.length > 0) {
				//speak IPA in the first times rendered.
				const rootDiv = this.getRootDiv();
				if (rootDiv) {
					const audioElm = this.getSpeakerMediaElm(
						rootDiv,
						speakerName
					);
					if (audioElm) {
						audioElm.src = br_audio_url;
						audioElm.load();
						audioElm.play();
					} else {
						// do nothing
					}
				} else {
					//
				}
			}

			if (br_audio_url) {
				this.setState({
					speakerName,
					isIPA
					// audioUrl: br_audio_url
				});
			}

			// enalbe search box
			this.props.setSearchBox && this.props.setSearchBox('ENABLE');
		}

		render() {
			const { classes } = this.props;
			const { speakerName, br_audio_url } = this.props;
			const audioUrl = br_audio_url;
			const googleIconClassName = !audioUrl ? classes.googleIcon : '';

			return (
				<Box
					className={`${
						classes.boxMedia
					} boxAudioMedia ${speakerName || ''}`}
					component={'div'}
					onClick={this.onClickHandler}
					display='inline'>
					<IconButton
						className={`${classes.iconButton} ${googleIconClassName}`}
						aria-label='delete'
						color='primary'>
						<CardMedia
							preload={'auto'}
							autoPlay={false}
							src={audioUrl ? audioUrl : 'empty src'}
							component={'audio'}></CardMedia>
						{
							<PlayCircleFilledOutlined
								className={`${
									classes.speakerIcon
								} ${speakerName ||
									classes.headwordSpeakerIcon}`}></PlayCircleFilledOutlined>
						}
					</IconButton>
				</Box>
			);
		}
	}
);

export default Speaker;
