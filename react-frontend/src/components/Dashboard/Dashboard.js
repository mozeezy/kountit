import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLogout from "../../hooks/useRedirectLogout";
import { getProducts } from "../../redux/features/product/productSlice";
import { selectIsLoggedIn } from "../../redux/features/user/userSlice";
import Card from "../Card/Card";
import ProductStats from "../Product/ProductStats";
import ProductList from "../Product/ProductList";

const Dashboard = () => {
  useRedirectLogout("/login");

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { allProducts, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="dashboard">
      <Card>
        <h2>Inventory Stats</h2>
        <ProductStats />
      </Card>
        <ProductList allProducts={allProducts} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
