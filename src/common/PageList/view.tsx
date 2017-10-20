import * as React from 'react';
import { IProps as IBaseProps } from './index';

import {
	Drawer,
	Icon,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from 'material-ui';

import ChatRoomCard from '../ChatRoomCard';

export interface IProps extends IBaseProps {
	classes: Dictionary<string>;
}

class PageView extends React.Component<IProps> {
	public render() {
		const { classes } = this.props;
		return (
			<div className={classes.wrapper}>
				<Drawer open type="permanent" className={classes.drawerPaper} classes={{ paper: classes.paper }}>
					<List>
						<ListItem button>
							<ListItemIcon>
								<Icon>airport_shuttle</Icon>
							</ListItemIcon>
							<ListItemText primary="Поездки" />
						</ListItem>
						<ListItem button>
							<ListItemIcon>
								<Icon>home</Icon>
							</ListItemIcon>
							<ListItemText primary="Отели" />
						</ListItem>
						<ListItem button>
							<ListItemIcon>
								<Icon>place</Icon>
							</ListItemIcon>
							<ListItemText primary="Города" />
						</ListItem>
					</List>
				</Drawer>
				<div className={classes.cardHolder}>
					<ChatRoomCard
						usersCount={23}
						newMessagesCount={3}
						group="transport"
						type="train"
						title="Поезд в Москву"
						subtitle="Отправление 23 октября 2017"
						media="http://old.russkie-prostori.com/blog/wp-content/uploads/2013/12/sapsan2009_18-600x384.jpg"
					/>
					<ChatRoomCard
						usersCount={11}
						newMessagesCount={0}
						group="transport"
						type="train"
						title="Поезд в Москву"
						subtitle="Отправление 23 октября 2017"
						media="http://old.russkie-prostori.com/blog/wp-content/uploads/2013/12/sapsan2009_18-600x384.jpg"
					/>
				</div>
			</div>
		)
	}
}

export default PageView;