import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../StoreStyles.css';
import { useNavigate } from 'react-router-dom';

export default function All() {
  const [productData1, setProductData1] = useState([]);
  const  navigate =  useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/products/all')
      .then(res => {
      setProductData1(res.data.products)
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });

     
  }, []);
 
  const handleView = (id) =>{
    navigate('/view_product', {state: {id}})
  }

  return (
<div   className='store-layout'>
      <div className="store-data">
      {productData1.map((data) => (
        <div className='product-card1' key = {data.id} onClick={()=>handleView(data.id)}>
          <img src={data.image_url} alt="" className='product-image' />
          <div className="card-section">
            <h4>{data.name}</h4>
            <p>{data.price} {data.currency}</p> 
          </div>
        </div>
      ))}
      </div>
    </div>
    
  );
}
