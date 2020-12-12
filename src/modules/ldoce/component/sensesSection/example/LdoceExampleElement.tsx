import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { Speaker } from 'src/modules/common';
import { SpeakerType, BRITAIN_SPEAKER_HEADWORD } from 'src/modules/utils';

const styles = () =>
	createStyles({
		root: {
			padding: 8
		},
		exampleText: {
			fontSize: '0.9em'
		}
	});

type Props = { text: string; audioUrl: string } & WithStyles<typeof styles>;

class LdoceExampleElement extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
	}

	// <LdoceExampleElement audioUrl={example_url} text={example_text}/>
	render() {
		const { classes } = this.props;
		const { text, audioUrl } = this.props;
		return (
			<Grid className='example-item root' item xs={12}>
				<Speaker
					isIPA={false}
					speakerName={BRITAIN_SPEAKER_HEADWORD}
					br_audio_url={audioUrl}
					speakerType={
						audioUrl ? SpeakerType.LDOCE : SpeakerType.GOOGLE
					}
				/>
				{` `}
				<Typography
					className={`${classes.exampleText} exampleText`}
					display='inline'
					color='textSecondary'
					variant='body1'
					component='p'>
					{text}
				</Typography>
			</Grid>
		);
	}
}

export default withStyles(styles)(LdoceExampleElement);
