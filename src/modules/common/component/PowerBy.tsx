import React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Link } from '@material-ui/core';
import {
	GIPHY_DOMAIN,
	GIPHY_SEARCH,
	LDOCE_DOMAIN,
	LDOCE_SEARCH,
	Name
} from 'src/modules/utils';

import GiphyIcon from 'src/assets/img/PoweredBy_200px-White_HorizText.png';
import LdoceIcon from 'src/assets/img/ldoceLogo.png';

const styles = ({ palette }: Theme) =>
	createStyles({
		img: {
			backgroundColor: 'white',
			color: palette.primary.dark,
			maxWidth: 100,
			maxHeight: 40,
			opacity: 0.8,
			'&:hover, &:focus': {
				cursor: 'pointer',
				opacity: 0.9
			}
		},
		imgLdoce: {
			maxWidth: 23,
			maxHeight: 'auto',
			opacity: 0.8,
			'&:hover, &:focus': {
				cursor: 'pointer',
				opacity: 0.9
			}
		}
	});

type Props = {
	name: Name;
	headword?: string;
} & WithStyles<typeof styles>;
// <PowerBy href={href} imgUrl={imgUrl}, name={'Giphy'}>
// State is never set so we use the '{}' type.

const PowerBy = withStyles(styles)(
	class extends React.Component<Props, {}> {
		constructor(props: Props) {
			super(props);
		}

		componentDidMount() {}

		render() {
			const { classes, headword, name } = this.props;

			let giphyHref = `${GIPHY_DOMAIN}${GIPHY_SEARCH}${
				headword ? headword : ' '
			}`;

			let ldoceHref = `${LDOCE_DOMAIN}${LDOCE_SEARCH}${
				headword ? headword : ' '
			}`;

			let href = ' ';
			let imgUrl = ' ';

			switch (name) {
				case 'Giphy':
					href = giphyHref;
					imgUrl = chrome.runtime.getURL(GiphyIcon);
					break;
				case 'Ldoce':
					href = ldoceHref;
					imgUrl = chrome.runtime.getURL(LdoceIcon);
					break;
			}

			return (
				<Link target='_blank' href={href} color='inherit'>
					<img
						className={
							name === 'Ldoce' ? classes.imgLdoce : classes.img
						}
						src={imgUrl || ''}
						alt={'PowerBy ' + name}
					/>
				</Link>
			);
		}
	}
);
export default PowerBy;
