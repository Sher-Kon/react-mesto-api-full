import React from 'react';

function Header(props) {
    return (
        <div className="header">
            <div className="header__logo"> </div>
            <div  className="header__email-block">
                <p className="header__email">{props.email}</p>
                <button onClick={props.onExit} className="header__btn" type="button" >Выйти</button>
            </div>
        </div>
    );
}

export default Header;