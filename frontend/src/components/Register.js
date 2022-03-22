import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

        // РЕГИСТРАЦИЯ
function Register({onRegisterUser}) {

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
        onRegisterUser({
            password: isPassword,
            email: isEmail
        });
    }

    //value={initialEmail} value={initialPassword}

    return (
        <div className="register">

            <div className="register-header">
                <div className="register-logo"> </div>
                <Link to="/" className="register-link">Войти</Link>
            </div>

            <h2>Регистрация</h2>

            <form onSubmit={handleSubmit}  className="register__form">
                <input type="email" placeholder="Email" onChange={handleChangeEmail}
                    className="register-text" autoComplete="on" required />
                <input id="registerPassword" type="password" placeholder="Пароль" onChange={handleChangePassword}
                    className="register-text" autoComplete="current-password" required />
                <button className="register-btn" type="submit" >Зарегистрироваться</button>
            </form>
            <div className="register-footer">
            <p> Уже зарегистрированы?</p>
            <Link to="/" className="register-doplink">Войти</Link>
            </div>
        </div>
    )
}

export default Register; 