import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import useRedirectLogout from "../../hooks/useRedirectLogout";
import {
  getAProduct,
  getProducts,
} from "../../redux/features/product/productSlice";
import { selectIsLoggedIn } from "../../redux/features/user/userSlice";
import Card from "../Card/Card";
import "./productdetails.css";

const ProductDetails = () => {
  useRedirectLogout("/login");
  const dispatch = useDispatch();
  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const checkProductAvailability = (quantity) => {
    if (quantity > 0) {
      return <span className="text-success">In Stock</span>;
    } else {
      return <span className="text-warning">Out of Stock</span>;
    }
  };

  const truncate = (string) => {
    return string.length > 16 ? string.substring(0, 10) + "..." : string;
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch, id]);

  return (
    <div>
      <Card className="product_details_card">
        <h3>Product Details</h3>
        {product && (
          <div className="product_image">
            {product.image ? (
              <img src={product.image.filePath} alt={product.image.fileName} />
            ) : (
              <p>There is no image associated with this product</p>
            )}
            <div className="product_avail">
              <h4>Product Availability:</h4>
              <div className="avail_text">
                {checkProductAvailability(product.quantity)}
              </div>
            </div>
            <br />
            <table className="table table-hover">
              <thead>
                <tr className="table-header-row">
                  <th className="table-info">Name</th>
                  <th className="table-info">SKU</th>
                  <th className="table-info">Category</th>
                  <th className="table-info">Price</th>
                  <th className="table-info">Quantity</th>
                  <th className="table-info">Created At</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-light">
                  <td>{truncate(product.name)}</td>
                  <td>{product.sku}</td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <code>{product.createdAt.slice(0, 10)}</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetails;
