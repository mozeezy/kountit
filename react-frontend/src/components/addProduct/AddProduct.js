import React from "react";
import useRedirectLogout from "../../hooks/useRedirectLogout";
import Card from "../Card/Card";

const AddProduct = () => {
  useRedirectLogout("/login");
  return (
    <div>
      <Card>
        <h3>Add Product</h3>
        <p>Welcome to Kount it</p>
      </Card>
    </div>
  );
};

export default AddProduct;
