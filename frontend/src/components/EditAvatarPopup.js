import React from 'react';
import PopupWithForm from './PopupWithForm';
import InputsAvatar from './InputsAvatar';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarRef = React.useRef(); // записываем объект, возвращаемый хуком, в переменную

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значение инпута во внешний обработчик
        onUpdateAvatar({
            avatar: avatarRef.current.value/* Значение инпута, полученное с помощью рефа */,
        });
    }

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <InputsAvatar
            avatarRef={avatarRef}
            />
        </PopupWithForm>
    );
}

export default EditAvatarPopup;    