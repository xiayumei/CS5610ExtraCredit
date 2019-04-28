let _singleton = Symbol();

class ProductServiceClient {
    URL = 'https://mysterious-plains-47047.herokuapp.com';

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ProductServiceClient(_singleton);
        return this[_singleton];
    }

    create_product_service(product) {
        return fetch(this.URL + '/api/product/create', {
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(res => res.json());
    }

    update_product_service(product) {
        console.log(product)
        console.log(product.id)
        return fetch(this.URL + '/api/product/update/' + product.id, {
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        });
    }

    read_all_products_service() {
        return fetch(this.URL + '/api/product/readAll').then(res => res.json());
    }

    read_one_product_service(product_id) {
        return fetch(this.URL + 'user/read/' + uproduct_id
        ).then(res => res.json());
    }


}

export default ProductServiceClient;