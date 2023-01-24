import React from "react";
import useRedirectLogout from "../../hooks/useRedirectLogout";
import Card from "../Card/Card";

const AddProduct = () => {
  useRedirectLogout("/login");
  return (
    <div>
      <Card>
        <h1>Add Product</h1>
      </Card>
    </div>
  );
};

export default AddProduct;
