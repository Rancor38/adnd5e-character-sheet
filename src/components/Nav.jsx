import React from 'react';
import { Link } from 'react-router-dom';
import DownloadPDF from './DownloadPDF';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

const Nav = (props) => {
    const { isAuthenticated } = useAuth0();
    return (
        <ul className="navBar">
            <Link to='/'>
            <li onClick={props.handler}>About Me</li>
            </Link>
            {/* <DownloadPDF /> */}
            <Link to='/contact'>
            <li onClick={props.handler}>Contact Me</li>
            </Link>
            <Link to='/characterlist'>
            <li onClick={props.handler}>Character List</li>
            </Link>
            <Link to='/charactersheetform'>
            <li onClick={props.handler}>Character Form</li>
            </Link>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </ul>
    );
};

export default Nav;