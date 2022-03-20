import React from 'react';
import classNames from 'classnames';
import defaultPhoto from '../../assets/photo-not-found.jpg';
import './Photo.css';

export const Photo = ({ className, ...props }) => (
  <img
    className={classNames('photo', className)}
    src={defaultPhoto}
    alt=""
    {...props}
  />
);


