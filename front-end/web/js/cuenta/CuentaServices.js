export default class CuentaService {

    static URL_API = 'http://127.0.0.1:8800/api/usuarios';
    static HEADERS = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    static allUsers() {
        return fetch(this.URL_API)
            .then(res => res.json())
            .catch(error => error);
    }

    static searchUserByUsername(username) {
        return fetch(`${this.URL_API}/name/${username}`)
            .then(res => res.json())
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















    static register = (params) => {
        const options = {
            method: 'POST',
            headers: this.HEADERS,
            body: JSON.stringify(params)
        };
        return fetch(this.URL_API, options)
            .then(response => response.json())
            .catch(error => error);
    };
    static login = (params) => {
        const options = {
            method: 'POST',
            headers: this.HEADERS,
            body: JSON.stringify(params)
        };
        return fetch( `${this.URL_API}/log`,options)
            .then(response => response.json())
            .catch(error =>error);
        };

}
