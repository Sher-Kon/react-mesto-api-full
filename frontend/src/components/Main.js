import React from 'react';

import imgStilus from '../images/Vector.svg';
import imgPlus from '../images/Plus.svg';
import imgPensil from '../images/pensil.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Footer from './Footer';


function Main({ cards, onCardLike, onCardDelete, onEditAvatar, 
                onEditProfile, onAddPlace, onCardClick, email, onExit }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        
        <main>
            <Header email={email} onExit={onExit} />
            <div className="profile">
                <button onClick={onEditAvatar} className="profile__avatar-btn" type="button">
                    <img src={currentUser.avatar} className="profile__avatar" alt="картинка-аватарка" />
                    <img src={imgStilus} className="profile__vector" alt="изображение стилуса" />
                </button>
                <div className="profile__info">
                    <h1 className="txt-ovf profile__info-name">{currentUser.name}</h1>
                    <button onClick={onEditProfile} className="profile__info-edit-btn" type="button">
                        <img src={imgPensil} className="profile__edit-btn-img" alt="значок карандаш" />
                    </button>
                    <p className="txt-ovf profile__info-job">{currentUser.about}</p>
                </div>
                <button onClick={onAddPlace} className="profile__add-btn" type="button">
                    <img src={imgPlus} className="profile__add-btn-img" alt="плюс" />
                </button>
            </div>
            <div className="elements">
                {cards.map(({ _id, ...props }) =>
                (<Card key={_id} {...props}
                    _id={_id}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                />))}
            </div>
            <Footer />
        </main>
    );
}

export default Main;