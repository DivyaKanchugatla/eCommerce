import React from 'react'
import { Link } from 'react-router-dom';
import { DefaultConstants } from '../../constants/constants';
import './JustArrived.css';
import { useDispatch,useSelector } from 'react-redux';
import { ADD_CART } from './../../store/actions/CartActions';

const JustArrived = () => {
  const dispatch=useDispatch()
  const products=useSelector((state)=>state.allProducts.products)
    
  return (
    <>
      <div className="trandy-heading-container">
      <h2 className="decorated mb-4"><span>{DefaultConstants.JUSTARRIVED}</span></h2>
      </div>
       <div className="container-fluid pt-5">
         <div className="row">
         {products.map((product,key) => {
                  const {title,image,price,id} = product; 
           return (
                 <div key={key} className="col-12 col-md-6 col-lg-3 pb-1"  >
                 
                         <div className="card border-0 mb-4">
                             <div className="card-header p-0 product-img border bg-transparent overflow-hidden">
                                 <img className="img-fluid w-100 h-100 img-styling" src={image} alt=""/>
                             </div>
                             <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                 <h6 className="text-truncate mb-3">{title}</h6>
                                 <div className="d-flex justify-content-center" >
                                     <h6>${price}</h6><h6 className="text-muted ml-2"><del>${price}</del></h6>
                                 </div>
                             </div>
                             <div className="card-footer d-flex justify-content-between bg-light border">
                             
                        
                               
                            
                           
                               {/* <a href="/" className=" text-dark p-0 view-button"><i className="fas fa-eye mr-1 fas-color"></i><span className="view-button">View Detail</span></a> */}
                               <Link to={`/product/${id}`} style={{textDecoration:"none"}} className="linkText">
                               <i className="fas fa-eye mr-1 fas-color"></i><span className='view-button' style={{color:"black"}} >View Detail</span>
                                </Link>
                               <button onClick={()=>dispatch({type:ADD_CART,payload:{...product,quantity:1}})} className=" text-dark p-0 view-button"><i className="fas fa-shopping-cart mr-1 fas-color"></i><span className = "view-button">{DefaultConstants.ADDTOCART}</span></button>
                             </div>
                         </div>
                     </div>
                   
                  );
                 })}
         </div>
      </div>
    </>
  )
}

export default JustArrived;