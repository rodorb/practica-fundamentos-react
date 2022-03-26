import React from 'react';
import { Photo } from '../../layout/Photo';

export const Advert = ({  name, sale, price, tags, photo }) => {
  return (
    <article className="advert bordered">
      <div className="left">
        <Photo src={photo} className="advert-photo" />
      </div>
      <div className="right">
        <div className="advert-header">
          <p className="advert-name">{name}</p>
          <p className="advert-price">{price}</p>
          <p className="advert-sale">{sale? 'En venta': 'Se compra'}</p>
        </div>
        <ul>
            {tags.map((tag, index)=>{
                return <li key={`${tag}-${index}`}>{tag}</li>
            })}
        </ul>
      </div>
    </article>
  );
};