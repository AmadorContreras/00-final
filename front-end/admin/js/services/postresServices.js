export default class UserService {

    static URL_API= 'http://127.0.0.1:8800/api/postres';
    static HEADERS = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    static allUsers() {
        return fetch(this.URL_API)
            .then(res => res.json())
            .catch(error => error);
    }
    static getItemById(id) {
        return fetch(`${this.URL_API}/id/${id}`)
            .then(res => res.json())
            .catch(error => error);
    }
    static searchItemByName(name) {
        return fetch(`${this.URL_API}/${name}`)
            .then(res => res.json())
            .catch(error => error);
    }

    static insert(params) {
        const options = {
            method: 'POST',
            headers: this.HEADERS,
            body: JSON.stringify(params)
        };
        return fetch(this.URL_API, options)
        .then(response => response.json())
        .catch(error => error);
    }
   

    static update(params,user) {
        const options = {
            method: 'PUT',
            headers: this.HEADERS,
            body: JSON.stringify(params)
        };
        return fetch(`${this.URL_API}/${user}`, options)
            .then(response => response.json())
            .catch(error => error);
    }

    static delete(id) {
        const options = { method: 'DELETE' };
        return fetch(`${this.URL_API}/${id}`, options)
            .then(response => response.json())
            // .catch(error => error);
    }
















    // export const login = (params) => {
    //     const options = {
    //         method: 'POST',
    //         headers: HEADERS,
    //         body: JSON.stringify(params)
    //     };
    //     return fetch( 'http://127.0.0.1:8800/api/login', options)
    //     .then(response => response.json())
    //     .catch(error =>error);
    // };




    // export const register = (params) => {
    //     const options = {
    //         method: 'POST',
    //         headers: HEADERS,
    //         body: JSON.stringify(params)
    //     };
    //     return fetch('http://127.0.0.1:8800/api/register', options)
    //     .then(response => response.json())
    //     .catch(error => error);
    // };

}