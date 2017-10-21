const accessToken = '211ecdca211ecdca211ecdca362141ca9b2211e211ecdca78f4db3c07e7e5a261fd122a';

export const actualizeNamesAndAvatars = (data) => {
    const {users} = data;
    let apiUserList = '';
    const newUsers = {...users};

    for (let key in users) {
        apiUserList += `${apiUserList ? ',' : ''}${users[key].vk_id}`;
    }

    return fetch(`https://api.vk.com/method/users.get?user_ids=${apiUserList}&fields=first_name,last_name,photo_50&name_case=nom&v=5.52&access_token=${accessToken}`).then((response) => {
        return response.json();
    }).then((apiData) => {
        const apiUsers = apiData.response || [];

        for (let key in newUsers) {
            apiUsers.forEach((apiUser) => {
                if (apiUser.id === newUsers[key].vk_id) {
                    newUsers[key].name = apiUser.first_name;
                    newUsers[key].surname = apiUser.last_name;
                    newUsers[key].avatarSrc = apiUser.photo_50;
                }
            });
        }

        return {
            ...data,
            users: newUsers
        };
    })
}