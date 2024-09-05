import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';
import './ProfileStyles.css';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";


export default function ViewProducts() {
  const [productData, setProductData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [currency, setCurrency] = useState([]);
  const navigate = useNavigate();
  const { sellerId } = useContext(AuthContext);
  

  useEffect(() => {
    axios.get(`http://localhost:3000/sellers/${sellerId}/profile`)
      .then(response => {
        setCurrency(response.data);
      })
      .catch(err => {
        console.log(err);
      });

    axios.get(`http://localhost:3000/products/seller_product/${sellerId}`)
      .then(res => {
        setProductData(res.data.products); 
      })
      .catch(err => {
        console.log(err);
      });
  }, [sellerId]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/sellers/${sellerId}/products/${id}`)
      .then(res => {
        console.log(res.status);
        setProductData(prevData => prevData.filter(product => product.id !== id));
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setSuccess(false);
      });
  };
  const  closeSuc= ()=>{
    setSuccess(false)
  }

  const handleEdit = (id) => {
    navigate('/update_product', { state: { id } });
  };

  return (
    <div className='product-list'>
      {success && (
        <div className='success'>
          <p>Product successfully deleted</p>
          <p onClick={closeSuc} className='text'>✖</p>
        </div>
      )}
      <h2>Product List</h2>
      {productData.map((data) => (

        <div className="card" key={data.id}>
          <img src={data.image_url} alt={data.name} id='product-image'/>

          <div className="detail-1">
            <h1>{data.name}</h1>
            <h3><span className="global-span">Price: </span>{data.price}{currency.currency}</h3>
            <h4> <span className="global-span">Quantity:   </span> {data.quantity} left</h4>
            <p> <span className="global-span">Date created:</span> {new Date(data.created_at).toLocaleDateString()}</p>
            <p>  <span className="global-span">Product description:</span> {data.description}</p>

          <div className="cong">
            <div className="i" >

            <CiEdit className='icon-e' onClick={() => handleEdit(data.id)} /> <p>Edit</p>
            </div>

            <div className="i" >
            <MdDeleteForever style={{ color: 'red' }} onClick={() => handleDelete(data.id)} className='icon-e' /> <p>Delete</p>
            </div>
          </div>
          </div>

        </div>
      ))}
    </div>
  );
}
