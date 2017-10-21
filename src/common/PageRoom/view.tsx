import * as React from 'react';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import ArrowIcon from 'material-ui-icons/KeyboardArrowLeft';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {formatDate} from './formatter';

import styles from './style.less';

const linkStyle = {
    display: 'inline'
}

export interface IProps {
    messages: IMessage[];
    users: IUser[];
    messageText: string;
    chatName: string;
    showModal: boolean;
    onSendClick?: () => void;
    onChatAvatarClick: () => void;
    onDialogClose: () => void;
    onTextChange: (event) => void;
    onKeyPress: (event) => void;
    listContainerRefHandler: (ref) => void;
    listRefHandler: (ref) => void;
}

export interface IMessage {
    text: string;
    userName: string;
    timestamp: number;
    userUrl: string;
    avatarSrc: string;
}

export interface IUser {
    name: string;
    userUrl: string;
    avatarSrc: string;
}

const RoomView: React.StatelessComponent<IProps> = ({
    messages,
    users,
    messageText,
    chatName,
    showModal, 
    onSendClick, 
    onTextChange,
    onKeyPress,
    onChatAvatarClick,
    onDialogClose,
    listContainerRefHandler,
    listRefHandler
}) => (
    <div className={styles.wrp}>
        <Paper square>
            <Toolbar>
                <div>
                    <Button>
                        <ArrowIcon />
                        Назад
                    </Button>
                </div>
                <div className={styles.centerToolsWrp}>
                    {chatName}
                </div>
                <div className={styles.rightToolsWrp} onClick={onChatAvatarClick}>
                    <Avatar
                        src='https://pp.userapi.com/c639118/v639118164/3f3b8/rTP6v_6Z-iU.jpg'
                    />
                    <Dialog
                        open={showModal}
                        onRequestClose={onDialogClose}
                    >
                        <div className={styles.dialogTitle}>
                            <Typography type="title" gutterBottom>
                                Участники чата &laquo;{chatName}&raquo;
                            </Typography>
                        </div>
                        <List>
                            {users.map(({name, avatarSrc, userUrl}) => (
                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar
                                            component="a"
                                            src={avatarSrc}
                                            href={userUrl} 
                                            target="_blank"
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={name}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Dialog>
                </div>
            </Toolbar>
        </Paper>
        <div className={styles.listWrp} ref={listContainerRefHandler}>
            <div ref={listRefHandler}>
                <List>
                    {messages.map(({text, avatarSrc, userUrl, userName, timestamp}) => (
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar
                                    classes={{root: styles.messageAvatarWrp}}
                                    component="a"
                                    src={avatarSrc}
                                    href={userUrl} 
                                    target="_blank"
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={(
                                    <div>
                                        <Typography 
                                            type="body2"
                                            component="a"
                                            href={userUrl}
                                            target="_blank"
                                            classes={{root: `${styles.link}`}}
                                            style={linkStyle}
                                            gutterBottom
                                        >
                                            {userName}
                                        </Typography>
                                        {!!(userName && timestamp) && (
                                            <Typography 
                                                type="body2"
                                                style={linkStyle}
                                                gutterBottom
                                            >,&nbsp;</Typography>
                                        )}
                                        <Typography 
                                            type="caption"
                                            style={linkStyle}
                                            gutterBottom
                                        >
                                            <span>{formatDate(timestamp)}</span>
                                        </Typography>
                                    </div>
                                )}
                                secondary={text}
                            />
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
        <Paper classes={{root: styles.bottomPaper}} square>
            <div className={styles.bottomWrp}>
                <div className={styles.textFieldWrp}>
                    <Typography type="subheading" gutterBottom>
                        <TextField 
                            placeholder="Введите текст сообщения&hellip;"
                            multiline
                            rowsMax={5}
                            fullWidth
                            onChange={onTextChange}
                            onKeyPress={onKeyPress}
                            value={messageText}
                        />
                    </Typography>
                </div>
                <div className={styles.buttonWrp}>
                    <Button 
                        color="primary"
                        onClick={onSendClick}
                    >
                        Отправить
                    </Button>
                </div>
            </div>
        </Paper>
    </div>
);

RoomView.defaultProps = {
    onSendClick: () => {},
    onChatAvatarClick: () => {},
    onDialogClose: () => {},
    listContainerRefHandler: () => {},
    listRefHandler: () => {}
};

export default RoomView;