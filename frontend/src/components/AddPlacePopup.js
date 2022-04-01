import React from 'react';
import PopupWithForm from './PopupWithForm';
import InputsAddCard from './InputsAddCard';

function AddPlacePopup({ isOpen, onClose, token, onAddPlace }) {

    const cardLinkRef = React.useRef(); // записываем объект, возвращаемый хуком, в переменную
    const cardNameRef = React.useRef(); // записываем объект, возвращаемый хуком, в переменную

    React.useEffect(() => {
        cardNameRef.current.value = "";
        cardLinkRef.current.value = "";
    }, [isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значение инпута во внешний обработчик
        onAddPlace(
            {
            name: cardNameRef.current.value/* Значение инпута, полученное с помощью рефа */,
            link: cardLinkRef.current.value/* Значение инпута, полученное с помощью рефа */,
            },
            token
        );
    }

    return (
        <PopupWithForm 
            name="bild-card" 
            title="Новое место" 
            buttonText="Создать" 
            isOpen={isOpen} 
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <InputsAddCard
                cardLinkRef={cardLinkRef}
                cardNameRef={cardNameRef}
            />
        </PopupWithForm>
    );
}

export default AddPlacePopup;    