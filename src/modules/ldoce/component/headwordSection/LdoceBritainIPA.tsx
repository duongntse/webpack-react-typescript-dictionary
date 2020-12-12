import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';

const styles = () =>
    createStyles({
        ipa: {
            fontSize: '1em'
        }
    });

type StyleProps = WithStyles<typeof styles>;
type Props = { br_ipa?: string } & StyleProps;

const LdoceBritainIPA = withStyles(styles)(
    class extends React.Component<Props, {}> {
        constructor(props: Props) {
            super(props);
        }

        render() {
            const { classes } = this.props;
            const { br_ipa } = this.props;
            return (
                <Typography
                    className={classes.ipa}
                    style={{ fontSize: '1em' }}
                    display='inline'
                    variant='body1'
                    component='p'
                    color='textSecondary'>
                    {br_ipa ? `/${br_ipa}/` : ''}
                </Typography>
            );
        }
    }
);

export default LdoceBritainIPA;
