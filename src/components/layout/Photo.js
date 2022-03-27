import React from 'react';
import classNames from 'classnames';
import './Photo.css';

export const Photo = ({ className, ...props }) => ( <
    img className = { classNames('photo', className) }
    alt = "" {...props }
    />
);