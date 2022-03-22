import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup look-img  ${(props.cardIMG.title!=="") && 'popup_opened'} `} >
      <div className="look-img__container">
        <h3 className="look-img__title">{props.cardIMG.title}</h3>
        <img
          src={props.cardIMG.link}
          alt="картинка увеличена"
          className="look-img__img"
        />
        <button
          onClick={props.onClose}
          className="popup__btn-close look-img__btn-close x-btn"
          type="button"
        ></button>
      </div>
    </ div>
  );
}

export default ImagePopup;