import React, { useEffect, useState } from "react";
import "./productlist.css";
import Loader from "../Loader/Loader";
import Card from "../Card/Card";
import { GrView } from "react-icons/gr";
import { FiEdit, FiDelete } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProduct,
  selectFilter,
} from "../../redux/features/product/filterSlice";

const ProductList = ({ allProducts, isLoading }) => {
  const [searchValue, setSearchValue] = useState("");

  const filteredProducts = useSelector(selectFilter);
  const dispatch = useDispatch();

  const truncate = (string) => {
    return string.length > 16 ? string.substring(0, 10) + "..." : string;
  };

  const handleOnChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    dispatch(filterProduct({ allProducts, searchValue }));
  }, [allProducts, searchValue, dispatch]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Card className="product_list_card">
          <div className="table">
            <h3>Current Inventory</h3>
            <table className="table table-hover">
              <thead>
                <tr className="table-info">
                  <th>Item No.</th>
                  <th>Product Name</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td> {index + 1}</td>
                      <td> {truncate(item.name)}</td>
                      <td>{item.location}</td>
                      <td>{item.category}</td>
                      <td>${parseFloat(item.price)}</td>
                      <td>{item.quantity}</td>
                      <td>${item.quantity * item.price}</td>
                      <td className="table_icons">
                        <span>
                          <GrView size={20} />
                        </span>
                        <span>
                          <FiEdit size={20} />
                        </span>
                        <span>
                          <FiDelete size={20} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="search_bar">
            <div className="search_form">
              <form>
                <input
                  className="form-control me-sm-2"
                  type="search"
                  placeholder="Search by name"
                  value={searchValue}
                  onChange={handleOnChange}
                />
              </form>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProductList;
