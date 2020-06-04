import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {

    //Extract Alert Context values
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    //Extract Auth Context values
    const authContext = useContext(AuthContext);
    const { message, auth, registerUser } = authContext;

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
        name: '',
        email: '',
        password: '',
        confirm: ''
    });


    const { name, email, password, confirm } = user;

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        //Validation
        if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirm.trim() === '') {
            showAlert('All fields are required', 'alerta-error');
            return;
        }
        //Password min 6 characters.
        if (password.length < 6) {
            showAlert('Password must be at least 6 characters', 'alerta-error');
            return;
        }
        //Both password are iqual
        if (password !== confirm) {
            showAlert('Passwords do not match', 'alerta-error');
            return;
        }
        //Pass to action
        registerUser({
            name,
            email,
            password
        });
        
    }

    return (
        <div className="form-usuario">
            {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Create an Account</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your Name"
                            value={name}
                            onChange={handleChange}
                        />
                    </div>

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
                        <label htmlFor="confirm">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            placeholder="Confirm your Password"
                            value={confirm}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Sign Up"
                        />
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Back to Sign In
                </Link>
            </div>
        </div>
    );
}

export default Register;