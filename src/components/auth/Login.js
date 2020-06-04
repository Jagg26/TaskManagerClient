import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {

    //Extract Alert Context values
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    //Extract Auth Context values
    const authContext = useContext(AuthContext);
    const { message, auth, logIn } = authContext;

    //Auth Succesfull or Duplicated User
    useEffect(() => {
        if(auth){
            props.history.push('/projects');
        }

        if(message) {
            showAlert( message.msg, message.category);
        }
        //eslint-disable-next-line
    }, [message, auth, props.history]);

    //States
    const [user, setUser] = useState({
        email: '',
        password: ''
    });


    const { email, password } = user;

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        //Validation
        if(email.trim() === '' || password.trim() === '') {
            showAlert('All fields are required', 'alerta-error');
        }

        //Pass to action
        logIn({ email, password }); 
    }

    return (
        <div className="form-usuario">
            {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Sign In</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your Password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Sign In"
                        />
                    </div>
                </form>

                <Link to={'/new-account'} className="enlace-cuenta">
                    Create an Account
                </Link>
            </div>
        </div>
    );
}

export default Login;