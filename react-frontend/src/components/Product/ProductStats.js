import React, { useEffect } from "react";
import Card from "../Card/Card";
import "./productstats.css";
import { HiOutlineShoppingCart, HiOutlineCurrencyDollar } from "react-icons/hi";
import { AiOutlineStop } from "react-icons/ai";
import { BsGraphDown } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateLowStock,
  calculateOutOfStock,
  calculateTotalStoreValue,
  selectLowStock,
  selectOutOfStock,
  selectTotalStoreValue,
} from "../../redux/features/product/productSlice";

const ProductStats = ({ allProducts }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const lowStock = useSelector(selectLowStock);

  useEffect(() => {
    dispatch(calculateTotalStoreValue(allProducts));
    dispatch(calculateOutOfStock(allProducts));
    dispatch(calculateLowStock(allProducts));
  }, [dispatch, allProducts]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <Card>
      <h2>Product Summary</h2>
      <div className="product_stats_card">
        <Card className="total_inventory_card">
          <div className="total_items">
            <HiOutlineShoppingCart color="white" size={30} />
            <div className="total_text">
              <h2 className="text__white">{allProducts.length}</h2>
              <span>Total Items</span>
            </div>
          </div>
        </Card>
        <Card className="total_store_card">
          <div className="total_items">
            <HiOutlineCurrencyDollar color="white" size={30} />
            <div className="total_text">
              <h2 className="text__white">
                ${numberWithCommas(totalStoreValue.toFixed(2))}
              </h2>
              <span>Total Store Value</span>
            </div>
          </div>
        </Card>
        <Card className="out_of_stock_card">
          <div className="total_items">
            <AiOutlineStop color="white" size={30} />
            <div className="total_text">
              <h2 className="text__white">{outOfStock}</h2>
              <span>Out of Stock</span>
            </div>
          </div>
        </Card>
        <Card className="low_stock_card">
          <div className="total_items">
            <BsGraphDown color="white" size={30} />
            <div className="total_text">
              <h2 className="text__white">{lowStock}</h2>
              <span>Low Stock</span>
            </div>
          </div>
        </Card>
        <Card className="total_categories_card">
          <div className="total_items">
            <BiCategory color="white" size={30} />
            <div className="total_text">
              <h2 className="text__white">{allProducts.length}</h2>
              <span>Total Categories</span>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default ProductStats;
