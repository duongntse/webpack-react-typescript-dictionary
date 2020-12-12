import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton } from '@material-ui/core';
import { PlayCircleFilledOutlined } from '@material-ui/icons';
import {
	stopAudios,
	cutMoreDescriptionInExample
} from 'src/modules/utils/common';

const useStyle = makeStyles({
	boxMedia: {
		'&:hover, &:focus': {
			cursor: 'pointer'
		}
	},
	iconButtonGoogleSpeaker: {
		color: '#e91e63',
		padding: 0
	},
	exampleText: {
		fontSize: 14
	}
});

// import GoogleSpeaker from './GoogleSpeaker';
// <GoogleSpeaker key={} />

function GoogleSpeaker() {
	const classes = useStyle();
	const onClickHandler = (event: React.MouseEvent) => {
		try {
			const boxElement = $(event.target as HTMLElement)
				.parentsUntil('.example-item')
				.get(0);

			let text = (boxElement.querySelector(
				'.exampleText'
			) as HTMLInputElement).innerText;

			const rootDiv = document.querySelector(
				'#rootPopupPlace'
			) as HTMLElement;

			const audioList: Array<HTMLAudioElement> = Array.from(
				rootDiv.querySelectorAll('audio')
			);

			stopAudios(audioList);

			text = cutMoreDescriptionInExample(text);

			chrome.runtime.sendMessage(
				{ cmd: 'speak', text },
				(message: string) => {
					console.log(`reponse message: ${message}`);
				}
			);
		} catch (error) {
			// console.log(`Speaker throw error: ${error}`);
		}
	};

	return (
		<Box
			className={(classes.boxMedia, 'boxAudioMedia')}
			component={'div'}
			onClick={(event: React.MouseEvent) => onClickHandler(event)}
			display='inline'>
			<IconButton
				className={classes.iconButtonGoogleSpeaker}
				aria-label='delete'>
				{<PlayCircleFilledOutlined></PlayCircleFilledOutlined>}
			</IconButton>
			{``}
		</Box>
	);
}

export default GoogleSpeaker;
