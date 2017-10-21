import * as React from 'react';
import { IProps as IBaseProps } from './index';
import {
	Card,
	CardHeader,
	CardActions,
	Avatar,
	IconButton,
	Badge,
	Icon,
	Button,
} from 'material-ui';
import CityImage from '../ChatCityImage';

declare interface Window {
	location: any;
}
declare const window: Window;

export interface IProps extends IBaseProps {
	classes: Dictionary<string>;
}

const getAvatarClassName = (type: string, classes: Dictionary<string>) => {
	switch(type) {
	case 'train':
		return classes.avatarTrain;
	case 'flight':
		return classes.avatarFlight;
	case 'hotel':
		return classes.avatarHotel;
	case 'place':
		return classes.avatarPlace;
	}

	return classes.avatarTrain;
}

class ChatRoomCardView extends React.Component<IProps> {
	public render() {
		const {
			classes,
			usersCount,
			newMessagesCount,
			join = false,
			type,
			title,
			subtitle,
			city,
			hash,
		} = this.props;
		return (
			<Card className={classes.card} onClick={() => window.location = `/room/${hash}${window.location.search}`}>
				<CardHeader
					avatar={(
						<Avatar className={getAvatarClassName(type, classes)}>
							<Icon>{type}</Icon>
						</Avatar>
					)}
					title={title}
					subheader={subtitle}
				/>
				{!!city && (
					<CityImage city={city} />
				)}
				<CardActions>
					<IconButton>
						<Badge color="default" badgeContent={usersCount}>
							<Icon>person</Icon>
						</Badge>
					</IconButton>
					{(!!newMessagesCount && !join) && (
						<IconButton>
							<Badge color="primary" badgeContent={newMessagesCount}>
								<Icon>message</Icon>
							</Badge>
						</IconButton>
					)}
					{!!join && (
						<Button color="primary">Вступить</Button>
					)}
				</CardActions>
			</Card>
		)
	}
}

export default ChatRoomCardView;