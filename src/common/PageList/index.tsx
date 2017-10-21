import * as React from 'react';
import { withStyles } from 'material-ui';
import styles from './style'
import View from './view';
import * as moment from 'moment';
import getTitle from '../getTitle';

export interface IProps {
}
export interface IState {
	rooms: ChatRoom[];
	selectedGroup: ChatGroupType|null;
	groups: ChatGroup[];
}
export type ChatGroupType = "transport"|"hotel"|"place"|null;
export type ChatRoom = {
	group: ChatGroupType;
	type: string;
	title: string;
	date: string;
	isJoined?: boolean;
	city: string;
	users: string[];
	newMessages?: number;
	hash: string;
}
export type ChatGroup = {
	icon: string;
	name: string;
	type: ChatGroupType;
}

declare interface Window {
	backendData: any;
}
declare const window:Window;

const EnhancedView: any = withStyles(styles)(View as any);
moment.locale('ru');

class PageList extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);

		if (!SERVER) {
			this.state = {
				rooms: (() => {
					const result: any[] = [];
					for (const key in window.backendData.roomList) {
						const room = window.backendData.roomList[key];

						result.push({
							group: room.group,
							type: room.type,
							title: getTitle(room.group, room.type, room.city, room.title),
							date: moment(room.date).format('DD MMMM YYYY'),
							isJoined: room.isJoined,
							city: room.city,
							users: room.users,
							newMessages: room.newMessages || 0,
							hash: key
						})
					}
					return result;
				})(),
				selectedGroup: null,
				groups: [
					{
						icon: "airport_shuttle",
						name: "Поездки",
						type: "transport"
					},
					{
						icon: "home",
						name: "Отели",
						type: "hotel"
					},
					{
						icon: "place",
						name: "Города",
						type: "place"
					}
				]
			};
		} else {
			this.state = {
				rooms: [],
				selectedGroup: null,
				groups: []
			};
		}
	}

	public render() {
		const callbacks = {
			group: {
				transport: () => this.setState({selectedGroup: this.state.selectedGroup === "transport" ? null : "transport"}),
				place: () => this.setState({selectedGroup: this.state.selectedGroup === "place" ? null : "place"}),
				hotel: () => this.setState({selectedGroup: this.state.selectedGroup === "hotel" ? null : "hotel"}),
			}
		}
		return (
			<EnhancedView {...this.state} callbacks={callbacks} />
		)
	}
}

export default PageList;