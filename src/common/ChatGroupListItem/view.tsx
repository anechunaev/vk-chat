import * as React from 'react';
import {
	Icon,
	ListItem,
	ListItemIcon,
	ListItemText,
} from 'material-ui';

import { IProps as IBaseProps } from './index';

export interface IProps extends IBaseProps {
	classes?: Dictionary<string>;
}

class GroupListItemView extends React.PureComponent<IProps> {
	public render() {
		return (
			<ListItem button onClick={this.props.onClick}>
				<ListItemIcon>
					<Icon>{this.props.icon}</Icon>
				</ListItemIcon>
				<ListItemText primary={this.props.text} />
			</ListItem>
		)
	}
}

export default GroupListItemView;