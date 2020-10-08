import React from 'react';
import PropTypes from 'prop-types'


type HeaderProps = {
    titulo:string;
}

const Header = (props: HeaderProps) => {
    return (
        <nav>
            <div className="nav-wrapper light-blue darken-2">
                <a href="#!" className="brand-logo">{props.titulo}</a>
            </div>
        </nav>
    );
};

Header.propTypes = {
    titulo: PropTypes.string.isRequired
}

export default Header;