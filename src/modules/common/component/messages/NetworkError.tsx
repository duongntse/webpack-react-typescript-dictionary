import React from 'react';
import NotifyMessage from './NotifyMessage';

export default function NetworkError(props: { message: string }) {
	const template = `'Please check your internet connection.'`;
	const message = `Network Error: ${props.message || template}`;
	return <NotifyMessage color='textSecondary' message={message} />;
}
