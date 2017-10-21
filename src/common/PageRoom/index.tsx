import * as React from 'react';
import View, {IUser, IMessage} from './view';

import restoreData from "./restorer";
import * as Echo from "laravel-echo"

interface IState {
    messages: IMessage[];
    users: IUser[];
    messageText: string;
    showModal: boolean;
}

// interface IInitData {
//     messages: IMessage[];
//     users: IUser[];
// }

export default class Room extends React.Component<{}, IState> {
    private listRef;
    private listContainerRef;

    constructor (props) {
        super(props);

        this.state = {
            ...restoreData(),
            messageText: '',
            showModal: false
        }
    }

    public componentDidMount () {
        this.scrollDown();

        (window as any).Pusher = require('pusher-js');
        (window as any).Echo = new Echo({
            broadcaster: 'pusher',
            key: '04cd0d5b4a6e54bb90c7',
            cluster: 'eu',
            encrypted: true
        });

        (window as any).Echo.channel('chat.1')
            .listen('NewMessage', (e) => {
                console.log(e);
            });
    }

    // private onNewMessage (message: IMessage) {
    //     const prevListHeight = this.listRef ? this.listRef.getBoundingClientRect().height : 0;

    //     this.setState(
    //         (prevState, props) => {
    //             prevState.messages.push(message);

    //             return prevState;
    //         }, 
    //         () => {
    //             if (prevListHeight <= Math.ceil(this.listContainerRef.getBoundingClientRect().height + this.listContainerRef.scrollTop) + 100) {
    //                 this.scrollDown();
    //             }
    //         }
    //     );
    // }

    // private onNewUser (user: IUser) {
    //     this.setState((prevState, props) => {
    //         prevState.users.push(user);

    //         return prevState;
    //     });
    // }

    private onSendMessage (message: IMessage) {
        //Тут должен быть эмит сообщения
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const xhr = new XMLHttpRequest();
        xhr.open("POST", '/ajax/send', true);
        
        //Передает правильный заголовок в запросе
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        xhr.onreadystatechange = function() {//Вызывает функцию при смене состояния.
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                // Запрос завершен. Здесь можно обрабатывать результат.
            }
        }
        xhr.send(`chat_id=${(window as any).backendData.roomId}&vk_id=${(window as any).backendData.userId}&message=${this.state.messageText}`);         

        //this.onNewMessage(message);
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