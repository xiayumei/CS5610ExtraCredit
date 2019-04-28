let _singleton = Symbol();

class UserServiceClient {
    URL = 'https://mysterious-plains-47047.herokuapp.com';

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new UserServiceClient(_singleton);
        return this[_singleton];
    }

        // http://localhost:8080/api/user/register
    create_user_service(user) {
        console.log(user)
        return fetch(this.URL + '/api/user/register', {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(res =>console.log(res));
    }



    update_user_service(user) {
        return fetch(this.URL + '/api/user/update/' + user.id, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        });
    }

    read_all_users_service() {
        return fetch(this.URL + '/api/user/readAll').then(res => res.json());
    }

    read_one_user_service(user_id) {
        return fetch(this.URL + 'user/read/' + user_id
        ).then(res => res.json());
    }


}

export default UserServiceClient;