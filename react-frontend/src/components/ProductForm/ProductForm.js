import React from "react";
import "./ProductForm.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../Card/Card";

const ProductForm = ({
  product,
  productImg,
  imgPreview,
  description,
  setDescription,
  handleOnChange,
  handleImg,
  saveProductToDB,
}) => {
  return (
    <div className="add_product">
      <form onSubmit={saveProductToDB} className="form_class">
        <Card className="add_product_card">
          <label className="form-label mt-4">Product Image</label>

          <br />
          <input
            type="file"
            className="form-control"
            name="image"
            required
            onChange={(e) => handleImg(e)}
          />
          {imgPreview && (
            <div className="img_preview">
              <img src={imgPreview} alt="product-img-preview" />
            </div>
          )}
          <code style={{ color: "gray" }}>
            Supported Formats: jpg, jpeg, png
          </code>
        </Card>
        <Card className="add_product_card">
          <label className="form-label mt-4">Product Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Product Name"
            name="productName"
            value={product?.productName}
            onChange={handleOnChange}
            required
          />
        </Card>
        <Card className="add_product_card">
          <label className="form-label mt-4">Product Category</label>
          <input
            type="text"
            class="form-control"
            placeholder="Product Category"
            name="productCategory"
            value={product?.productCategory}
            onChange={handleOnChange}
            required
          />
        </Card>
        <Card className="add_product_card">
          <label className="form-label mt-4">Product Price</label>
          <input
            type="text"
            class="form-control"
            placeholder="Product Price"
            name="productPrice"
            value={product?.productPrice}
            onChange={handleOnChange}
            required
          />
        </Card>
        <Card className="add_product_card">
          <label className="form-label mt-4">Product Quantity</label>
          <input
            type="text"
            class="form-control"
            placeholder="Product Quantity"
            name="productQuantity"
            value={product?.productQuantity}
            onChange={handleOnChange}
            required
          />
        </Card>
        <Card className="add_product_card">
          <label className="form-label mt-4">Product Location</label>
          <input
            type="text"
            class="form-control"
            placeholder="Product Location"
            name="productLocation"
            value={product?.productLocation}
            onChange={handleOnChange}
            required
          />
        </Card>
        <Card className="add_product_card">
          <label className="form-label mt-4">Product Description</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
          />
        </Card>
        <div>
          <button type="submit" class="btn btn-outline-info">
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
