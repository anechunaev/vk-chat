import * as React from 'react';

import {
	withStyles,
	CircularProgress as Progress,
} from 'material-ui';

import View from './view';
import styles from './style';

export interface IProps {
	city: string;
}
export interface IState {
	city: string;
}


declare interface Window {
	google: any;
}
declare const window: Window;

class ChatCityImage extends React.Component<IProps, IState> {
	private _map;

	constructor(props) {
		super(props);

		this.state = {
			city: ''
		};
	}

	public render() {
		const EnhancedView: any = withStyles(styles)(View as any);
		const EnhancedProgress: any = withStyles(() => ({
			progress: {
				color: '#ccc'
			}
		}))(({ classes }) => (
			<div style={{width: '100%', height: '150px', position: 'relative', backgroundColor: '#eee'}}>
				<div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
					<Progress color="primary" className={classes.progress} />
				</div>
			</div>
		));

		return (
			<div>
				<div key="map" ref={n => this._map = n} />
				{console.log('Draw image', this.state.city)}
				{!!this.state.city ? (
					<EnhancedView {...this.state} />
				) : (
					<EnhancedProgress />
				)}
			</div>
		)
	}

	public googleQuery = () => {
		const service = new window.google.maps.places.PlacesService(this._map);
		service.textSearch({
			query: this.props.city
		}, (data, status) => {
			console.log('send query', this.props.city, this.state.city);
			if (status == window.google.maps.places.PlacesServiceStatus.OK) {
				service.getDetails({
					placeId: data[0].place_id
				}, (place, requestStatus) => {
					if (!!place.photos.length) {
						this.setState({
							city: place.photos[0].getUrl({'maxWidth': 600, 'maxHeight': 600})
						});
					}
				})
			}
		})
	}

	public componentDidUpdate(nextProps, nextState) {
		if (nextProps.city !== this.props.city) {
			this.googleQuery();
			this.forceUpdate();
		}
	}

	public componentDidMount() {
		console.log('mount', this.props.city);
		if (!SERVER && !this.state.city) {
			setTimeout(this.googleQuery.bind(this), 1000);
		}
	}
}

export default ChatCityImage;