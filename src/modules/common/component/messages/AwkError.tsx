import React from 'react';
import NotifyMessage from './NotifyMessage';

export default function AwkError() {
	const message =
		'Something Awk occured: Please notify me to upgrade the extension.';
	return <NotifyMessage color='textSecondary' message={message} />;
}
