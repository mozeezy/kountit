import React from "react";
import "./productlist.css";
import Loader from "../Loader/Loader";
import Card from "../Card/Card";

const ProductList = ({ allProducts, isLoading }) => {
  const truncate = (string) => {
    return string.length > 16 ? string.substring(0, 10) + "..." : string;
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Card>
          <div className="product_list_container">
            <div className="table_container">
              <h3 style={{ textAlign: "left" }}>Inventory Table</h3>
              <table className="table_morph">
                <thead>
                  <tr className="table-info">
                    <th>Item No.</th>
                    <th>Product Name</th>
                    <th>Location</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Value</th>
                  </tr>
                </thead>

                <tbody>
                  {allProducts.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td> {index + 1}</td>
                        <td> {truncate(item.name)}</td>
                        <td>{item.location}</td>
                        <td>{item.category}</td>
                        <td>${parseFloat(item.price)}</td>
                        <td>{item.quantity}</td>
                        <td>${item.quantity * item.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProductList;
