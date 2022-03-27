import React from 'react';
import './Advert.css'
export const Advert = ({  name, sale, price, tags }) => {
  return (
    <article className="advert bordered">
      <div className="right">
        <div className="advert-header">
          <p className="advert-name">{name}</p>
          <p className="advert-price">Precio: {price}€</p>
          <p className="advert-sale">{sale? 'En venta': 'Se compra'}</p>
        </div>
        <div>
          Tags:
            <ul style={{listStyleType: 'square'}}>
              {tags.map((tag, index)=>{
                  return <li key={`${tag}-${index}`}>{tag}</li>
              })}
          </ul>
        </div>
        
      </div>
    </article>
  );
};