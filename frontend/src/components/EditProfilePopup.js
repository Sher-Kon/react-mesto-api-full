import React from 'react';
import PopupWithForm from './PopupWithForm';
import InputsEditProfile from './InputsEditProfile';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");


    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name || "");
        setDescription(currentUser.about || "");
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <InputsEditProfile
                onChangeName={handleChangeName}
                onChangeDescription={handleChangeDescription}
                initialName={name}
                initialJob={description}
            />
        </PopupWithForm>
    );
}

export default EditProfilePopup;