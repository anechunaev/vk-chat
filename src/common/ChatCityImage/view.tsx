import * as React from 'react';

import { IProps as IBaseProps } from './index';
import { CardMedia } from 'material-ui';

export interface IProps extends IBaseProps {
	classes: Dictionary<string>;
	city: string;
}

class CityImageView extends React.PureComponent<IProps> {
	public render() {
		return (
			<CardMedia
				className={this.props.classes.cardMedia}
				image={this.props.city}
			/>
		)
	}
}

export default CityImageView;