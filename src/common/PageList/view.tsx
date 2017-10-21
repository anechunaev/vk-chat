import * as React from 'react';
import { IProps as IBaseProps, IState, ChatRoom, ChatGroupType } from './index';

import {
	Drawer,
	List,
} from 'material-ui';

import ChatRoomCard from '../ChatRoomCard';
import ChatGroupListItem from '../ChatGroupListItem';

export interface IProps extends IBaseProps, IState {
	classes: Dictionary<string>;
	callbacks: Dictionary<Dictionary<() => void>>;
}

const getRooms = (rooms: ChatRoom[], selectedGroup: ChatGroupType) => {
	const roomNodes = rooms.filter(room => room.group === selectedGroup).map((room, index) => (
		<ChatRoomCard
			key={index}
			usersCount={room.users.length}
			newMessagesCount={room.newMessages}
			join={!room.isJoined}
			group={room.group}
			type={room.type}
			title={room.title}
			subtitle={room.date}
			city={room.city}
			hash={room.hash}
		/>
	));

	if (!!roomNodes) {
		return roomNodes;
	}

	return <div>Нет доступных чатов</div>;
}

class PageView extends React.Component<IProps> {
	public render() {
		const { classes, rooms, selectedGroup, groups, callbacks } = this.props;
		return (
			<div className={classes.wrapper}>
				<Drawer open type="permanent" className={classes.drawerPaper} classes={{ paper: classes.paper }}>
					<List>
						{groups.map((group, index) => (
							<ChatGroupListItem
								icon={group.icon}
								text={group.name}
								key={index}
								onClick={callbacks.group[group.type]}
							/>
						))}
					</List>
				</Drawer>
				<div className={classes.cardHolder}>
					{getRooms(rooms, selectedGroup)}
				</div>
			</div>
		)
	}
}

export default PageView;