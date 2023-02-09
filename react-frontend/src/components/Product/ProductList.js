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
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteProducts,
  getProducts,
} from "../../redux/features/product/productSlice";
import { Link } from "react-router-dom";

const ProductList = ({ allProducts, isLoading }) => {
  const [searchValue, setSearchValue] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 7;

  const filteredProducts = useSelector(selectFilter);
  const dispatch = useDispatch();

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;

    setItemOffset(newOffset);
  };

  const truncate = (string) => {
    return string.length > 16 ? string.substring(0, 10) + "..." : string;
  };

  const handleOnChange = (event) => {
    setSearchValue(event.target.value);
  };

  const dispatchDeleteProduct = async (id) => {
    await dispatch(deleteProducts(id));
    await dispatch(getProducts());
  };

  const deleteDialogue = (id) => {
    confirmAlert({
      title: "Delete Product?",
      message:
        "Are you sure you want to delete this item? This action cannot be undone.",
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Delete?</h1>
            <p>
              Are you sure you want to remove this product? This action can't be
              undone.
            </p>
            <button
              className="btn btn-outline-info"
              onClick={() => {
                dispatchDeleteProduct(id);
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
            <button className="btn btn-outline-secondary" onClick={onClose}>
              No
            </button>
          </div>
        );
      },
    });
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
            <br />
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
                {currentItems.map((item, index) => {
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
                          <Link to={`/product-details/${item._id}`}>
                            <GrView size={18} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-product/${item._id}`}>
                            <FiEdit size={18} />
                          </Link>
                        </span>
                        <span>
                          <FiDelete
                            size={18}
                            onClick={() => deleteDialogue(item._id)}
                            style={{ cursor: "pointer" }}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br />
          </div>

          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-number"
            nextLinkClassName="page-number"
            previousLinkClassName="page-number"
            activeLinkClassName="active"
          />
        </Card>
      )}
    </div>
  );
};

export default ProductList;
