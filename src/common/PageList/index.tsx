import * as React from 'react';
import { withStyles } from 'material-ui';
import styles from './style'
import View from './view';
import * as moment from 'moment';

export interface IProps {
}
export interface IState {
	rooms: ChatRoom[];
	selectedGroup: ChatGroupType;
	groups: ChatGroup[];
}
export type ChatGroupType = "transport"|"hotel"|"place";
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

const getTitle = (group, type, city) => {
	if (group === 'transport') {
		let result = 'Попутчики в ';
		switch (type) {
		case 'flight':
			result += 'самолёте в город ' + city;
			break;
		default:
			result += 'поезде в город ' + city;
		}

		return result;
	}

	return 'Попутчики в город ' + city;
}

class PageList extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);

		if (!SERVER) {
			console.log(window.backendData);
			
			this.state = {
				rooms: (() => {
					const result: any[] = [];
					for (const key in window.backendData.roomList) {
						const room = window.backendData.roomList[key];

						result.push({
							group: room.group,
							type: room.type,
							title: getTitle(room.group, room.type, room.city),
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
				selectedGroup: 'transport',
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
				selectedGroup: 'transport',
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
		}
	}

	public render() {
		const callbacks = {
			group: {
				transport: () => this.setState({selectedGroup: "transport"}),
				place: () => this.setState({selectedGroup: "place"}),
				hotel: () => this.setState({selectedGroup: "hotel"}),
			}
		}
		return (
			<EnhancedView {...this.state} callbacks={callbacks} />
		)
	}
}

export default PageList;