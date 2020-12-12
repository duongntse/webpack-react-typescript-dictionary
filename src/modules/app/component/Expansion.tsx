import React from 'react';
import {
	Theme,
	createStyles,
	makeStyles,
	withStyles
} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormControlLabel } from '@material-ui/core';

const GlobalCss = withStyles({
	// @global is handled by jss-plugin-global.
	'@global': {
		// You should target [class*="MuiButton-root"] instead if you nest themes.
		'.MuiExpansionPanelSummary-root.Mui-expanded': {
			minHeight: 48
		},
		'.MuiExpansionPanelSummary-content.Mui-expanded': {
			margin: 0
		}
	}
})(() => null);

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		expanded: {
			margin: '0 0'
		},
		panel: {
			margin: '0 0 0 0',
			minHeight: 45
		},
		header: {
			margin: 0,
			padding: '0 0px 0 0px'
		},
		detail: {
			margin: 0,
			padding: '0 0 0 0'
		},
		root: {
			width: '100%'
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			fontWeight: theme.typography.fontWeightRegular
		},
		controlLabel: {
			marginLeft: 4,
			marginRight: 0
		}
	})
);

type Props = {
	title?: any;
	children: any;
};

export default function SimpleExpansionPanel(props: Props) {
	const classes = useStyles();
	const { title } = props;

	return (
		<React.Fragment>
			<GlobalCss />
			<div className={classes.root}>
				<ExpansionPanel className={classes.panel}>
					<ExpansionPanelSummary
						className={classes.header}
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel1a-content'
						id='panel1a-header'>
						<FormControlLabel
							className={classes.controlLabel}
							aria-label='Acknowledge'
							onClick={event => event.stopPropagation()}
							onFocus={event => event.stopPropagation()}
							control={title || ' '}
							label={''}
						/>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails className={classes.detail}>
						{props.children}
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		</React.Fragment>
	);
}
