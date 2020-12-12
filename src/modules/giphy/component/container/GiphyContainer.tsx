import React from 'react';
import { NotifyMessage, Searching } from 'src/modules/common';
import { Status } from 'src/modules/utils';
import {
	IConstructedGiphy,
	Giphy,
	GiphyCarouselDisplay,
} from 'src/modules/giphy';

import { ErrorGiphy } from 'src/modules/error';

type Props = {
	giphy: Giphy;
};
type State = {
	giphy?: Giphy;
	giphyImgs?: IConstructedGiphy[];
	status?: Status;
	error?: any;
};

export default class GiphyContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			giphy: undefined,
			giphyImgs: undefined,
			status: undefined,
			error: undefined,
		};
	}

	saveDataToStorage = (key: string, value: any) => {
		chrome.storage.sync.set({ [key]: value }, function () {
			// console.log('Value is set to ' + JSON.stringify(value));
		});
	};

	componentDidMount() {
		const { giphy } = this.props;
		if (giphy && giphy.giphyData) {
			this.setState({
				status: Status.PENDING,
			});
			giphy.giphyData
				.then((giphyData) => {
					// this.saveDataToStorage('giphy', JSON.stringify(giphy));
					this.saveDataToStorage(
						'giphy',
						JSON.stringify({
							giphy,
							giphyData,
						})
					);
					this.setState({
						giphy,
						status: Status.READY,
						giphyImgs: giphyData,
					});
				})
				.catch((error) => {
					this.setState({
						error,
						status: Status.ERROR,
					});
				});
		} else {
			this.setState({ status: Status.EMPTY });
		}
	}

	render() {
		const { giphyImgs, status, giphy } = this.state;
		let componentWillBeRendered = (
			<NotifyMessage message={`GiphyContainer: Init`} />
		);
		switch (status) {
			case Status.EMPTY:
				break;
			case Status.PENDING:
				componentWillBeRendered = <Searching />;
				break;
			case Status.ERROR:
				componentWillBeRendered = (
					<ErrorGiphy error={this.state.error} />
				);
				break;
			case Status.READY:
				if (giphyImgs) {
					if (giphyImgs.length > 0)
						componentWillBeRendered = (
							<GiphyCarouselDisplay
								giphy={giphy}
								giphyImgs={giphyImgs}
							/>
						);
					else
						componentWillBeRendered = (
							<NotifyMessage message={`No images were found!`} />
						);
				} else {
					componentWillBeRendered = (
						<NotifyMessage message={`No images were found!`} />
					);
				}
				break;
		}
		return componentWillBeRendered;
	}
}
