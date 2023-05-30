export default class FogonesServices {

    static URL_API = 'http://127.0.0.1:8800/api/postres';
    static HEADERS = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    static todoProductosFogones() {
        return fetch(this.URL_API)
            .then(res => res.json())
            .catch(error => error);
    }

    static buscadorProductos(product) {
        return fetch(`${this.URL_API}/${product}`)
            .then(res => res.json())
            .catch(error => error);
    }
    static searchItemByName(name) {
        return fetch(`${this.URL_API}/${name}`)
            .then(res => res.json())
            .catch(error => error);
    }
    static searchItemById(id) {
        return fetch(`${this.URL_API}/id/${id}`)
            .then(res => res.json())
            .catch(error => error);
    }

}
