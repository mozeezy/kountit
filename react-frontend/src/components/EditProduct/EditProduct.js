import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  getAProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import ProductForm from "../ProductForm/ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const selectedProduct = useSelector(selectProduct);

  const [product, setProduct] = useState(selectedProduct);
  const [productImg, setProductImg] = useState("");
  const [imgPreview, setImgPreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getAProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(selectedProduct);
    setImgPreview(
      selectedProduct && selectedProduct.image
        ? `${selectedProduct.image.filePath}`
        : null
    );
    setDescription(
      selectedProduct && selectedProduct.description
        ? selectedProduct.description
        : ""
    );
  }, [selectedProduct]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImg = (e) => {
    setProductImg(e.target.files[0]);
    setImgPreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProductToDB = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", product?.name);
    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", product?.price);
    formData.append("location", product?.location);
    formData.append("description", description);

    if (productImg) {
      formData.append("image", productImg);
    }

    console.log(...formData);

    await dispatch(updateProduct({ id, formData }));
    await dispatch(getProducts());
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Card className="edit_product_card">
          <h3>Edit Product</h3>
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

export default EditProduct;
