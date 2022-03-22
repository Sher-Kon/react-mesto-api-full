import React from 'react';

function InputsAddCard({ cardLinkRef, cardNameRef }) {
    return (
        <>
            <div className="bild-card__input-cover">
                <input ref={cardNameRef} type="text" placeholder="Название" id="place-input"
                    className="form__input bild-card__text bild-card__text_input_place bild-card-place"
                    name="placeInput"
                    //minlength="2" maxlength="30" 
                    required />
                <span className="popup__input-error bild-card-place-error place-input-error"></span>
            </div>
            <div className="bild-card__input-cover">
                <input ref={cardLinkRef} type="url" placeholder="Ссылка на картинку" id="url-input"
                    className="form__input bild-card__text bild-card__text_input_url bild-card-url"
                    name="urlInput" required />
                <span className="popup__input-error bild-card-url-error url-input-error"></span>
            </div>  
        </>
    );
}

export default InputsAddCard;