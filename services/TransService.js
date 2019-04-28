let _singleton = Symbol();

class TransServiceClient {
    URL = 'https://mysterious-plains-47047.herokuapp.com';

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TransServiceClient(_singleton);
        return this[_singleton];
    }

    create_trans_service(trans) {
        return fetch(this.URL + '/api/transaction/create', {
            body: JSON.stringify(trans),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(res => res.json());
    }


    read_all_trans_service() {
        return fetch(this.URL + '/api/transaction/readAll').then(res => res.json());
    }

    read_one_user_service(user_id) {
        return fetch(this.URL + 'user/read/' + user_id
        ).then(res => res.json());
    }


}

export default TransServiceClient;