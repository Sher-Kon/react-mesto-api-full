import React from 'react';

function InputsEditProfile({onChangeName, onChangeDescription, initialName, initialJob}) {
    return (
        <>
            <div className="popup__input-cover">
                <input type="text" placeholder="Имя" id="name-input" onChange={onChangeName}
                    className="form__input popup__text popup__text_input_name popup-name" name="nameInput"
                    required value={initialName} />
                <span className="popup__input-error popup-name-error name-input-error"></span>
            </div>
            <div className="popup__input-cover">
                <input type="text" placeholder="О себе" id="job-input" onChange={onChangeDescription}
                    className="form__input popup__text popup__text_input_job popup-job" name="jobInput"
                    required value={initialJob} />
                <span className="popup__input-error popup-job-error job-input-error"></span>
            </div>
        </>
    );
}

export default InputsEditProfile;