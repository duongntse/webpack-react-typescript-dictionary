import React from 'react';
import { ICON_ID } from 'src/modules/utils';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded';
/// <reference path='typings/index.d.ts'/>
import ldoceLogo from 'src/assets/img/ldoceLogo.png';
import { CardMedia } from '@material-ui/core';

const useStyles = makeStyles(theme => {
	// debugger;
	return createStyles({
		icon: {
			backgroundColor: theme.palette.primary.dark,
			borderRadius: 5,
			color: theme.palette.primary.dark,
			width: 44,
			height: 44,
			opacity: 0.8,
			'&:hover, &:focus': {
				cursor: 'pointer',
				opacity: 0.9
			}
		}
	});
});

const PopupIcon = () => {
	const classes = useStyles();
	const unsplashImg =
		'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1042&q=80';
	const imgUrl =
		unsplashImg ||
		(ldoceLogo && chrome.extension && chrome.runtime.getURL(ldoceLogo)) ||
		'';
	// <LocalLibraryRoundedIcon
	//     color='primary'
	//     className={classes.icon}
	//     id={ICON_ID}
	// />
	return (
		<CardMedia
			className={classes.icon}
			image={imgUrl}
			id={ICON_ID}
			title='Paella dish'
		/>
	);
};

export default PopupIcon;
