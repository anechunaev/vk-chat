import * as React from 'react';
import { IProps as IBaseProps } from './index';
import {
	Card,
	CardHeader,
	CardMedia,
	CardActions,
	Avatar,
	IconButton,
	Badge,
	Icon,
	Button,
} from 'material-ui';

export interface IProps extends IBaseProps {
	classes: Dictionary<string>;
}

const getAvatarClassName = (type: string, classes: Dictionary<string>) => {
	switch(type) {
	case 'train':
		return classes.avatarTrain;
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
			media,
		} = this.props;
		return (
			<Card className={classes.card}>
				<CardHeader
					avatar={(
						<Avatar className={getAvatarClassName(type, classes)}>
							<Icon>train</Icon>
						</Avatar>
					)}
					title={title}
					subheader={subtitle}
				/>
				{!!media && (
					<CardMedia
						className={classes.cardMedia}
						image={media}
					/>
				)}
				<CardActions>
					<IconButton>
						<Badge color="default" badgeContent={usersCount}>
							<Icon>person</Icon>
						</Badge>
					</IconButton>
					{!!newMessagesCount && (
						<IconButton>
							<Badge color="accent" badgeContent={newMessagesCount}>
								<Icon>message</Icon>
							</Badge>
						</IconButton>
					)}
					{!!join && (
						<Button color="accent">Вступить</Button>
					)}
				</CardActions>
			</Card>
		)
	}
}

export default ChatRoomCardView;