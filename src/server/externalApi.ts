//const request = require('request');

export default () => {
    // request('http://www.google.com', function (error, response, body) {
    //     console.log('error:', error); // Print the error if one occurred
    //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //     console.log('body:', body); // Print the HTML for the Google homepage.
    // });
    fetch('https://api.vk.com/method/users.get?user_ids=1&fields=first_name,last_name,photo_50&name_case=nom&v=5.52&access_token=211ecdca211ecdca211ecdca362141ca9b2211e211ecdca78f4db3c07e7e5a261fd122a')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err)
        })
}

export const fetchChatList = (userId) => {
    return fetch(`http://vk-travel-chat.com:8080/getChatList?vk_id=${userId}`).then((response) => {
        return response.json();
    })

    //return fetch(`127.0.0.1:8080/getChatList${userId}`)
}