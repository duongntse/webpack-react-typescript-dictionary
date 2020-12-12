import React from 'react';
import { PropTypes } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function ChromeExtCtxInvalidate() {
	const [open, setOpen] = React.useState(true);

	// const handleClick = () => {
	// 	setOpen(true);
	// };

	const handleClose = (event: any, reason?: any) => {
		if (event && reason === 'clickaway') {
			return;
		}
		console.log(`handleClose:  ${JSON.stringify(event)}`);
		setOpen(false);
	};

	const color: PropTypes.Color = 'secondary';

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left'
			}}
			open={open}
			autoHideDuration={6000}
			onClose={handleClose}
			message={`Outdated Dictionary Extension. Please Reload this page to use.`}
			action={
				<React.Fragment>
					<Button color={color} size={'small'} onClick={handleClose}>
						UNDO
					</Button>
					<IconButton
						size={'small'}
						aria-label={'close'}
						color={'inherit'}
						onClick={handleClose}>
						<CloseIcon fontSize={'small'} />
					</IconButton>
				</React.Fragment>
			}
		/>
	);
}
