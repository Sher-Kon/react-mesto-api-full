import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ _id, owner, link, name, likes, token, onCardClick, onCardLike, onCardDelete }) {
    // Подписываемся на контекст TranslationContext
    const currentUser = React.useContext(CurrentUserContext);

    //для отрисовки ведра oпределяем, являемся ли мы владельцем текущей карточки
    const isOwn = owner === currentUser._id; // owner._id ===
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = likes.some(i => i === currentUser._id);// i._id === было

    const card = { name, link, likes, _id, token };//сюда бы добавить token(jwt)
    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <div className="element-card">
            <div className="element">
                <button onClick={handleClick} className="element__img-btn" type="button" >
                    <img
                        src={link}
                        className="element__img"
                        alt={"на фотографии " + name}
                    />
                </button>
                <h2 className="element__txt">{name}</h2>
                {isOwn && <button onClick={handleDeleteClick} className="element__del-btn" type="button"></button>}
                <div className="element__like">
                    <button
                        onClick={handleLikeClick}
                        className={`element__like-btn ${isLiked && "element__like-btn_active"}`}
                        type="button">
                    </button>
                    <h3 className="element__like-num">{likes.length}</h3>
                </div>
            </div>
        </div>
    );
}

export default Card;