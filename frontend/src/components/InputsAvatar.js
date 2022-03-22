import React from 'react';

function InputsAvatar({avatarRef}) {
    
    return (
        <>
            <div className="edit-avatar__input-cover">
                <input ref={avatarRef} type="url" placeholder="Ссылка на картинку" id="url-avatar"
                    className="form__input edit-avatar__text edit-avatar__url" name="urlAvatar" required />
                <span className="popup__input-error bild-card-url-error url-avatar-error"></span>
            </div>
        </>
    );
}

export default InputsAvatar;