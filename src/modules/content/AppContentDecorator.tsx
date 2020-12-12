import * as React from 'react';
import Container from '@material-ui/core/Container';
import { APP_ID } from 'src/modules/utils';

type Props = {
	top: number;
	left: number;
};

class AppContentDecorator extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	render() {
		const { top, left } = this.props;

		return (
			<Container maxWidth='sm'>
				<div
					id={APP_ID}
					style={{
						// zIndex: 1,
						zIndex: 1200,
						display: 'inline',
						position: 'absolute',
						left: left,
						top: top,
						// clear: 'both',
						fontSize: 14,
					}}>
					{this.props.children}
				</div>
			</Container>
		);
	}
}
export default AppContentDecorator;
