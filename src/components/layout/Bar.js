import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Bar = () => {

    // Extract Auth Info
    const authContext = useContext(AuthContext);
    const { user, authUser, logOut } = authContext; 

    useEffect(() => {
        authUser();

        //eslint-disable-next-line
    }, []);

    return ( 
        <header className="app-header">
            {user ? <p className="nombre-usuario">Hello <span>{user.name}</span></p> : null}
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={ () => logOut() }
                >Log Out</button>
            </nav>
        </header>
     );
}
 
export default Bar;