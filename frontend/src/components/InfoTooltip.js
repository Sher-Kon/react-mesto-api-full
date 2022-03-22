import React from 'react';
import './InfoTooltip.css';

import imgSuccess from "../images/success_ico.svg";
import imgFail from "../images/fail_ico.svg";


function InfoTooltip({ isOpen, onClose, isOk }) {

    return (
        <div className={`infotool ${isOpen && 'infotool_opened'}`}>
            <div className="infotool__container">
                {isOk === true
                    ?   <img src={imgSuccess} className="infotool__img" alt="иконка успешного выполнения" />
                    :   <img src={imgFail} className="infotool__img" alt="иконка ошибочного выполнения" />
                }
                <h3 className="infotool__title">{isOk === true
                    ? "Вы успешно зарегистрированы"
                    : "Что-то пошло не так! Попробуйте еще раз."}
                </h3>
                <button onClick={onClose} className="infotool__x-btn" type="button"></button>
            </div>
        </div>
    );
}

export default InfoTooltip;