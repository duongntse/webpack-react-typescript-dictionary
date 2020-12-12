import React from 'react';
import NotifyMessage from './NotifyMessage';

interface iProp {
    message?: string;
}

export default function Empty(props: iProp) {
    const { message } = props;
    return (<NotifyMessage message={message || 'Its Empty'} />);
}
