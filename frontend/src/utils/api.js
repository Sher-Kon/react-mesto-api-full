//Класс Api
class Api {
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

    // прочитать карточки
    getInitialCards() {
        return fetch(this._baseUrl + "cards", {
            headers: this._headers
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }
    // прочитать профиль
    readProfile() {
        return fetch(this._baseUrl + "users/me", {
            headers: this._headers
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }
    // сохранить профиль
    writeProfile(data) {
        return fetch(this._baseUrl + "users/me", {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }
    // сохранить карточку
    writeCard(data) {
        return fetch(this._baseUrl + "cards", {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }
    // удалить карточку
    deleteCard(cardId) {
        return fetch(this._baseUrl + "cards/" + cardId, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }
    // сохранить аватар
    writeAvatar(linkAvatar) {
        return fetch(this._baseUrl + "users/me/avatar", {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: linkAvatar
            })
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }
    // добавить лайк
    setLike(cardId) {
        return fetch(this._baseUrl + "cards/" + cardId + "/likes", {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }
    // удалить лайк
    delLike(cardId) {
        return fetch(this._baseUrl + "cards/" + cardId + "/likes", {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }
    // начальная загрузка:прочитать профиль, карточки
    getIniData() {
        return Promise.all([this.readProfile(), this.getInitialCards()]);
    }

}

//--------------------------------------------------------
// Создадим экземпляр class Api 
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-33/',
    headers: {
        authorization: '51ca28f6-a002-497b-8233-6c80bd0cac76',
        'Content-Type': 'application/json'
    }
});

export default api;