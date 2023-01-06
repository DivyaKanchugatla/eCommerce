import React ,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Rating from './Rating';
import { getSingleProduct,removeSelectedProduct } from '../../../store/actions/ProductActions';
import { ADD_CART } from '../../../store/actions/CartActions';
import './ProductDetail.css'

const sizes = [  
    {id:"size-1", size:"XS"},
    {id:"size-2", size:"S"},
    {id:"size-3", size:"M"},
    {id:"size-4", size:"L"},
    {id:"size-5", size:"XL"},
]
const colors = [
  {color:"Black"}, {color:"White"}, {color:"Red"}, {color:"Blue"}, {color:"Green"},
]
const socialIcons = [
  {link:"https://www.facebook.com",icon:"fab fa-facebook-f"},
  {link:"https://www.twitter.com",icon:"fab fa-twitter"},
  {link:"https://www.linkedin.com",icon:"fab fa-linkedin-in"},
  {link:"https://www.pinterest.com",icon:"fab fa-pinterest"},
]

const ProductDetail = () => {
  const dispatch = useDispatch();
  const {productId}=useParams();
    let product = useSelector((state) => state.product);
    const {title,image,description,price,rating}=product;

    useEffect(()=>{
      dispatch(getSingleProduct(productId))
      return()=>{
        dispatch(removeSelectedProduct())
      }
    },[productId,dispatch])
    
    
  return (
    <>
      <div className="ui grid container">
        {Object.keys(product).length === 0 ? (
          <div>...Loading</div>
        ) : (
          <div className="row px-xl-5">
            <div className="col-lg-5 pb-5">
              <img src={image} className="img-fluid w-75 h-100" alt="" />
            </div>
            <div className="col-lg-7 pb-5">
              <h3 className="colorful-heading">{title}</h3>
              <div className="d-flex mb-3">
                <div className="mr-2">
                  <Rating rating={rating.rate} />
                </div>
                <small className="pt-1">({rating.count} Reviews)</small>
              </div>
              <h3 className="colorful-heading mb-4">${price}</h3>
              <p className="mb-4">{description}</p>
              <div className="d-flex mb-3">
                <p className="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
                <form>
                  {sizes.map((item,index)=>{
                    return(
                      <div className="custom-control custom-radio custom-control-inline" key={index}>
                      <input
                        type="radio"
                        className="custom-control-input star"
                        id={item.id}
                        name="size"
                      />
                      <label className="custom-control-label" htmlFor={item.id}>
                        {item.size}
                      </label>
                    </div>
                    )
                  })}
                </form>
              </div>
              <div className="d-flex flex-row mb-4">
                <p className="text-dark font-weight-medium mb-0 mr-3">
                  Colors:
                </p>
                <form>
                  {colors.map((item,index)=>{
                    return(
                      <div className="mr-3" key={index} style={{ display: "inline-block" }}>
                    <input
                      type="radio"
                      className="star"
                      id="specifyColor"
                      name="color"
                    />
                    <label className="ml-1" htmlFor="specifyColor">
                      {item.color}
                    </label>
                  </div>
                    )
                  })}
                </form>
              </div>
              <div className="d-flex mb-4 pt-2 center">
                <div
                  className="add-icon-button-container d-flex flex-row justify-content-center text-center p-2"
                  style={{ width: "130px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="add-icon"
                  >
                    <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                  </svg>
                  <p className="d-inline-block count-value">0</p>
                
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="add-icon"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                  </svg>
                </div>
                <div className="add-icon-button-container d-flex flex-row justify-content-center text-center p-2">
                  <button className=" shopdetail-addtocart-button p-2 text-center" onClick={()=>dispatch({type:ADD_CART,payload:product})}>
                    <i className="fa fa-shopping-cart shopdetail-addtocart" />
                    Add To Cart
                  </button>
                </div>
              </div>
              <div className="d-flex pt-2">
                <p className="text-dark font-weight-medium mb-0 mr-2">
                  Share on:
                </p>
                <div className="d-inline-flex">
                  {socialIcons.map((item,index)=>{
                    return(
                      <a className="text-dark px-2" href={item.link} target="_blank" rel="noreferrer" key={index}>
                      <i className={item.icon} />
                    </a>
                    )
                  })}
                </div>
              </div>
            </div>
            </div>)}
      </div>
    </>
  );
};

export default ProductDetail;

