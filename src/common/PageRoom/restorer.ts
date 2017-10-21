declare const window: any;

export default () => {
    return {
        messages: prepareMessages(window.backendData.messages || {}, window.backendData.users || []),
        users: prepareUsers(window.backendData.users || []),
    }
}

export const prepareMessages = (messages, users) => {
    const result: any[] = [];

    for (let key in messages) {
        let currentMessageUser = getUserByVkId(users, messages[key].user.vk_id)

        result.push({
            text: messages[key].text,
            userName: currentMessageUser.name + ' ' + currentMessageUser.surname,
            timestamp: messages[key].timestamp,
            userUrl: 'https://vk.com/id'+messages[key].user.vk_id,
            avatarSrc: currentMessageUser.avatarSrc
        });
    }

    return result;
}

export const getUserByVkId = (users, vkId) => {
    for (let key in users) {
        if (users[key].vk_id === vkId) {
            return users[key];
        }
    }

    return {};
}

const prepareUsers = (users) => {
    const result: any[] = [];

    for (let key in users) {
        result.push({
            name: users[key].name + ' ' + users[key].surname,
            userUrl: 'https://vk.com/id'+users[key].vk_id,
            avatarSrc: users[key].avatarSrc,
            vkId: users[key].vk_id
        });
    }

    return result;
}