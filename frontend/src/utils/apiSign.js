//Класс ApiSign
class ApiSign {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
    }

    // РЕГИСТРАЦИЯ
    register(data) {
        return fetch(this._baseUrl + "signup", {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                "password": data.password,
                "email": data.email
            })
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }

    //АВТОРИЗАЦИЯ
    logo(data) {
        return fetch(this._baseUrl + "signin", {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                "password": data.password,
                "email": data.email
            })
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }

    //Проверка валидности токена (JWT)
    checkToken(JWT) {
        return fetch(this._baseUrl + "users/me", {
            method: 'GET',
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JWT}`
            }
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }

}

//--------------------------------------------------------
// Создадим экземпляр class ApiSign 
// РЕГИСТРАЦИЯ, АВТОРИЗАЦИЯ, Проверка валидности токена (JWT)
const apiSign = new ApiSign({
    baseUrl: 'https://api.domainname.sher-kon.nomoredomains.work/',
    // baseUrl: 'http://localhost:3001/',
    headers: {
        "Content-Type": "application/json"
    }
});

export default apiSign;    