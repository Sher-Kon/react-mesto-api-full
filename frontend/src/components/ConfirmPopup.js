import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose, onConfirm }) {

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значение карты во внешний обработчик
        onConfirm();
    }

    return (
        <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            buttonText="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
        </PopupWithForm>

    );
}

export default ConfirmPopup;    
