import * as React from 'react';
import { IProps as IBaseProps } from './index';

export interface IProps extends IBaseProps {
	classes: Dictionary<string>;
}

class PageView extends React.Component<IProps> {
	public render() {
		return (
			<div className={this.props.classes.wrapper}>It works!</div>
		)
	}
}

export default PageView;