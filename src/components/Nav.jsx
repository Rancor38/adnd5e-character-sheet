import React from 'react';
import { Link } from 'react-router-dom';
import DownloadPDF from './DownloadPDF';

const Nav = (props) => {
    return (
        <ul className="navBar">
            <Link to='/'>
            <li onClick={props.handler}>About Me</li>
            </Link>
            <DownloadPDF />
            <Link to='/contact'>
            <li onClick={props.handler}>Contact Me</li>
            </Link>
            <Link to='/characterlist'>
            <li onClick={props.handler}>Character List</li>
            </Link>
            <Link to='/charactersheetform'>
            <li onClick={props.handler}>Character Form</li>
            </Link>
        </ul>
    );
};

export default Nav;