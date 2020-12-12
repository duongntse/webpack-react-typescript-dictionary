import React from 'react';
import NotifyMessage from './NotifyMessage';

type Props = {
    message?: string
}

export default function WordNotFound(props: Props) {
    const message = props.message || `Sorry, We can't find the word you need.`;
    return <NotifyMessage color='textSecondary' message={message} />;
}
