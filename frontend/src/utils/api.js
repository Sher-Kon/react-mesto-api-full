//Класс Api
class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
    }

    // прочитать карточки
    getInitialCards(JWT) {
        return fetch(this._baseUrl + "cards", {
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
    // прочитать профиль
    readProfile(JWT) {
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
    // сохранить профиль
    writeProfile(data, JWT) {
        return fetch(this._baseUrl + "users/me", {
            method: 'PATCH',
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JWT}`
            },
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
    // добавить карточку
    writeCard(data, JWT) {
        return fetch(this._baseUrl + "cards", {
            method: 'POST',
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JWT}`
            },
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
    deleteCard(cardId, JWT) {
        return fetch(this._baseUrl + "cards/" + cardId, {
            method: 'DELETE',
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
    // сохранить аватар
    writeAvatar(linkAvatar, JWT) {
        return fetch(this._baseUrl + "users/me/avatar", {
            method: 'PATCH',
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JWT}`
            },
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
    setLike(cardId, JWT) {
        return fetch(this._baseUrl + "cards/" + cardId + "/likes", {
            method: 'PUT',
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
    // удалить лайк
    delLike(cardId, JWT) {
        return fetch(this._baseUrl + "cards/" + cardId + "/likes", {
            method: 'DELETE',
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
    // начальная загрузка:прочитать профиль, карточки
    getIniData() {
        return Promise.all([this.readProfile(), this.getInitialCards()]);
    }

}

//--------------------------------------------------------
// Создадим экземпляр class Api 
const api = new Api({
    baseUrl: 'https://api.domainname.sher-kon.nomoredomains.work/',
    // baseUrl: 'http://localhost:3001/',
});

export default api;