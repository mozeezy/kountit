import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLogout from "../../hooks/useRedirectLogout";
import Card from "../Card/Card";
import ProductForm from "../ProductForm/ProductForm";
import {
  addNewProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";
import { useNavigate } from "react-router";
import Loader from "../Loader/Loader";
import "./addproduct.css";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
  location: "",
};

const AddProduct = () => {
  useRedirectLogout("/login");
  const [product, setProduct] = useState(initialState);
  const [productImg, setProductImg] = useState("");
  const [imgPreview, setImgPreview] = useState(null);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, category, quantity, price, location } = product;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImg = (e) => {
    setProductImg(e.target.files[0]);
    setImgPreview(URL.createObjectURL(e.target.files[0]));
  };

  const createSKU = () => {
    const number = Math.random().toString().slice(2, 12);
    return number;
  };

  const saveProductToDB = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("sku", createSKU());
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("image", productImg);

    // console.log(...formData);

    await dispatch(addNewProduct(formData));
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Card className="ap_card">
          <h3>Add Product</h3>
          <ProductForm
            product={product}
            productImg={productImg}
            imgPreview={imgPreview}
            description={description}
            setDescription={setDescription}
            handleOnChange={handleOnChange}
            handleImg={handleImg}
            saveProductToDB={saveProductToDB}
          />
        </Card>
      )}
    </div>
  );
};

export default AddProduct;
