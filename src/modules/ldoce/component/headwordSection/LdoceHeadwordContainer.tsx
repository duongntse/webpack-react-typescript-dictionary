// LdoceHeadwordSection
import React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Grid } from '@material-ui/core';
import LdoceHeadword from './LdoceHeadword';
import LdoceBritainIPA from './LdoceBritainIPA';
// import { Speaker } from 'src/modules/common';
import SpeakerContainer from 'src/containers/SpeakerContainer';
import { SpeakerType } from 'src/modules/utils';
import { API_LDOCE_DOMAIN } from 'src/modules/utils';
import { BRITAIN_SPEAKER_HEADWORD } from 'src/modules/utils';

const styles = (theme: Theme) =>
    createStyles({
        notifyRoot: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: 4
        },
        root: {
            backgroundColor: theme.palette.background.paper,
            padding: 4
        }
    });

type Props = {
    headword: string;
    br_ipa?: string;
    br_audio_url?: string;
} & WithStyles<typeof styles>;
type State = {};
const LdoceHeadwordContainer = withStyles(styles)(
    class extends React.Component<Props, State> {
        constructor(props: Props) {
            super(props);
            this.state = {};
        }

        render() {
            const { classes } = this.props;

            const { headword, br_ipa, br_audio_url } = this.props;
            const audioUrlAttachedDomain =
                (br_audio_url && `${API_LDOCE_DOMAIN}${br_audio_url}`) || '';

            return (
                <Grid className={classes.root} item xs={12}>
                    <LdoceHeadword headword={headword} />
                    {` `}
                    <LdoceBritainIPA br_ipa={br_ipa} />
                    {` `}
                    <SpeakerContainer
                        speakerName={BRITAIN_SPEAKER_HEADWORD}
                        autoPlay={true}
                        isIPA={true}
                        br_audio_url={audioUrlAttachedDomain}
                        speakerType={
                            (br_audio_url && SpeakerType.LDOCE) ||
                            SpeakerType.GOOGLE
                        }
                    />
                </Grid>
            );
        }
    }
);
export default LdoceHeadwordContainer;
// export default withStyles(styles)(LdoceHeadwordContainer);
