import * as React from 'react';
import View, {IUser, IMessage} from './view';

import {messages, users} from "./data";

interface IState {
    messages: IMessage[];
    users: IUser[];
    messageText: string;
    showModal: boolean;
}

interface IInitData {
    messages: IMessage[];
    users: IUser[];
}

export default class Room extends React.Component<{}, IState> {
    private listRef;
    private listContainerRef;

    constructor (props) {
        super(props);

        this.state = {
            messages: [],
            users: [],
            messageText: '',
            showModal: false
        }
    }

    public componentDidMount () {
        setTimeout(() => {
            this.onReceiveInitData({
                messages,
                users
            });
        }, 2000);


        setTimeout(() => {
            this.onNewMessage({
                userName: 'Александр Диатонический',
                timestamp: 1508533730223,
                avatarSrc: 'https://pp.userapi.com/c638418/v638418148/22dca/hXwDDWklt4I.jpg',
                userUrl: 'https://vk.com/diatonic',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            })
        }, 10000);
    }

    private onReceiveInitData (data: IInitData) {
        this.setState(data);

        this.scrollDown();
    }

    private onNewMessage (message: IMessage) {
        const prevListHeight = this.listRef ? this.listRef.getBoundingClientRect().height : 0;

        this.setState(
            (prevState, props) => {
                prevState.messages.push(message);

                return prevState;
            }, 
            () => {
                if (prevListHeight <= Math.ceil(this.listContainerRef.getBoundingClientRect().height + this.listContainerRef.scrollTop) + 100) {
                    this.scrollDown();
                }
            }
        );
    }

    // private onNewUser (user: IUser) {
    //     this.setState((prevState, props) => {
    //         prevState.users.push(user);

    //         return prevState;
    //     });
    // }

    private onSendMessage (message: IMessage) {
        //Тут должен быть эмит сообщения
        this.onNewMessage(message);
    }

    private onChatAvatarClick = () => {
        this.setState({
            showModal: true
        });
    }

    private onDialogClose = () => {
        this.setState({
            showModal: false
        });
    }

    private onSendClick = () => {
        if (!this.state.messageText) {
            return;
        }

        this.onSendMessage({
            text: this.state.messageText,
            userName: 'Александр Диатонический',
            timestamp: (new Date()).valueOf(),
            userUrl: 'https://vk.com/diatonic',
            avatarSrc: 'https://pp.userapi.com/c638418/v638418148/22dca/hXwDDWklt4I.jpg'
        });

        this.setState({
            messageText: ''
        });
    }

    private onKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.onSendClick();
        }
    } 

    private onTextChange = (event) => {
        this.setState({
            messageText: event.target.value.replace(/\n/g, '')
        })
    }

    private scrollDown () {
        this.listContainerRef && (this.listContainerRef.scrollTop = 999999);
    }

    private listRefHandler = (el) => {
        this.listRef = el;
    }

    private listContainerRefHandler = (el) => {
        this.listContainerRef = el;
    }

    public render () {
        return <View 
            chatName='Поезд Москва&nbsp;&mdash; Махачкала, 13.11.2017'
            messages={this.state.messages}
            users={this.state.users}
            showModal={this.state.showModal}
            onChatAvatarClick={this.onChatAvatarClick}
            onDialogClose={this.onDialogClose}
            onTextChange={this.onTextChange}
            onKeyPress={this.onKeyPress}
            onSendClick={this.onSendClick}
            messageText={this.state.messageText}
            listContainerRefHandler={this.listContainerRefHandler}
            listRefHandler={this.listRefHandler}
        />
    }
}