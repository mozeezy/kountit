import React from "react";
import useRedirectLogout from "../../hooks/useRedirectLogout";
import Card from "../Card/Card";

const AddProduct = () => {
  useRedirectLogout("/login");
  return (
    <div>
      <Card>
        <h3>Add Product</h3>
      </Card>
    </div>
  );
};

export default AddProduct;
