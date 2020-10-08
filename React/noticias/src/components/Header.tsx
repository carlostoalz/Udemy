import React from 'react';
import PropTypes from 'prop-types'


type HeaderProps = {
    titulo: string;
};

const Header = ({ titulo }: HeaderProps) => {
    return (
        <nav className="nav-wrapper light-blue darken-3">
            <a href="#!" className="brand-logo center">{titulo}</a>
        </nav>
    );
};

Header.propTypes = {
    titulo: PropTypes.string.isRequired
};

export default Header;