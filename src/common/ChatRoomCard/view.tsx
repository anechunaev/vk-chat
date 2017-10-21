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

export interface IProps extends IBaseProps {
	classes: Dictionary<string>;
}

const getAvatarClassName = (type: string, classes: Dictionary<string>) => {
	switch(type) {
	case 'train':
		return classes.avatarTrain;
	case 'flight':
		return classes.avatarFlight;
	}

	return classes.avatarTrain;
}

class ChatRoomCardView extends React.PureComponent<IProps> {
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
		} = this.props;
		return (
			<Card className={classes.card}>
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
					<CityImage>{city}</CityImage>
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
						<Button color="default">Вступить</Button>
					)}
				</CardActions>
			</Card>
		)
	}
}

export default ChatRoomCardView;