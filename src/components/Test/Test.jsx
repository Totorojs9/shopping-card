import React from 'react'
import './Test.css';
// import { productData } from '../utils/constants';
import styled from 'styled-components'

export const Test = ({addProductHandler, store}) => {
  return (
    <div className="Main-card">
    {store.map((el) => {
      return (
        <div key={el.id} className="card">
          <Images src={el.url} />
          <Heading>{el.name}</Heading>
          <Price>{el.price} $</Price>

            {el.quantity>1? null :(

          <button className='button' onClick={()=>addProductHandler(el.id) 
          
          }
          disabled={el.quantity>0}> Add</button>
            )}

        </div>
      );
    })}
  </div>
  )
}

export default Test

const Images = styled.img`
  width: 150px;
  border-radius: 10px;
  margin-top: 20px;
`;
const Price = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
`;
const Heading = styled.h3`
  color: #000000;
  text-transform: uppercase;
`;