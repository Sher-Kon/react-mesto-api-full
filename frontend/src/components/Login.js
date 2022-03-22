import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

// АВТОРИЗАЦИЯ

function Login({onLoginUser}) {

    const [isEmail, setEmail] = React.useState("");
    const [isPassword, setPassword] = React.useState("");

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }
    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onLoginUser({
            password: isPassword,
            email: isEmail
        });
    }

    return (
        <div className="log_in">

            <div className="log_in-header">
                <div className="log_in-logo"> </div>

                <Link to="/sign-up" className="log_in-link">Регистрация</Link>
            </div>

            <h2>Вход</h2>

            <form onSubmit={handleSubmit} className="log_in__form">
                <input type="email" placeholder="Email" onChange={handleChangeEmail}
                    className="log_in-text" autoComplete="on" required />
                <input id="loginPassword" type="password" placeholder="Пароль" onChange={handleChangePassword}
                    className="log_in-text" autoComplete="current-password" required />
                <button className="log_in-btn" type="submit" >Войти</button>
            </form >

        </div>
    )
}

export default Login; 