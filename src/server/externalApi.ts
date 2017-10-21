export const fetchChatList = (userId) => {
    return fetch(`http://vk-travel-chat.com:8080/getChatList?vk_id=${userId}`).then((response) => {
        return response.json();
    })
}

export const fetchInitialChatData = (userId, chatId) => {
    const url = `http://vk-travel-chat.com:8080/initializeChatForUser?chat_id=${chatId}&vk_id=${userId}`;
    return fetch(url).then((response) => {
        return response.json();
    })
}

export const fetchSendMessage = ({chatId, vkId, message}) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-type", "application/x-www-form-urlencoded");

    return fetch('http://vk-travel-chat.com:8080/addMessage', {
        method: "POST",
        headers: myHeaders,
        body: `chat_id=${chatId}&vk_id=${vkId}&message=${message}`
    });
}