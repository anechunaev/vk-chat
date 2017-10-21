import * as React from 'react';
import { withStyles } from 'material-ui';
import styles from './style'
import View from './view';

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

const EnhancedView: any = withStyles(styles)(View as any);

class PageList extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);

		// Fake state. Sorry for that.
		this.state = {
			rooms: [
				{
					group: "transport",
					type: "train",
					title: "Попутчики в поезде в Москву",
					date: "23 октября 2017",
					isJoined: true,
					city: "Москва",
					users: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
					newMessages: 5,
					hash: '1',
				},
				{
					group: "transport",
					type: "flight",
					title: "Попутчики в самолёте в Амстердам",
					date: "15 декабря 2017",
					isJoined: false,
					city: "Амстердам",
					users: ["1", "2", "3", "4", "5", "6", "7"],
					hash: '2',
				},
				{
					group: "place",
					type: "place",
					title: "Попутчики в Москву",
					date: "23 октября 2017",
					isJoined: true,
					city: "Москва",
					users: ["1", "2", "3", "4", "5"],
					hash: '3',
				}
			],
			selectedGroup: "transport",
			groups: [
				{
					icon: "airport_shuttle",
					name: "Поездки",
					type: "transport"
				},
				{
					icon: "place",
					name: "Города",
					type: "place"
				},
			],
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