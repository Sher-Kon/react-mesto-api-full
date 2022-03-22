import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <form className="form" onSubmit={props.onSubmit}>
          <fieldset className="form__set">
            <h3 className="popup__title">{props.title}</h3>
            <div className="popup__input">
              {props.children}
              <button className="form__submit popup__btn-save" type="submit">{props.buttonText}</button>
            </div>
          </fieldset>
        </form>
        <button onClick={props.onClose} className="popup__btn-close x-btn" type="button"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;