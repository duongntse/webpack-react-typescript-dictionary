import React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { objectExtractor } from 'src/modules/utils';
import { IExample, LdoceExampleElement } from 'src/modules/ldoce';
import { API_LDOCE_DOMAIN } from 'src/modules/utils/defined_ldoce_domain';
import { NotifyMessage } from 'src/modules/common';

const styles = () =>
    createStyles({
        exampleText: {
            fontSize: '0.9em'
        }
    });

type PropStyle = WithStyles<typeof styles>;
type Props = { examples: IExample[] } & PropStyle;

/* 
import LdoceExampleBody from '../example/LdoceExampleBody';
<LdoceExampleBody examples={examples}>
*/

class LdoceExampleBody extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.state = {
            exBodyShows: null
        };
    }

    getAudioUrl = (cur: IExample) => objectExtractor(cur, 'audio', 0, 'url');

    render() {
        const { examples } = this.props;
        let componentWillRender: JSX.Element[] | JSX.Element;
        if (examples && examples.length > 0) {
            componentWillRender = examples.map((example, index) => {
                let audioUrl = this.getAudioUrl(example);
                const example_url = audioUrl ? API_LDOCE_DOMAIN + audioUrl : '';
                const example_text = example.text;
                return (
                    <LdoceExampleElement
                        key={`example-${index}`}
                        audioUrl={example_url}
                        text={example_text || ''}
                    />
                );
            });
        } else {
            componentWillRender = <NotifyMessage message={'No Examples!'} />;
        }

        return componentWillRender;
    }
}

export default withStyles(styles)(LdoceExampleBody);
