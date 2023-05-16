import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import CartTotals from "../components/cart/CartTotals";
import { Spin } from "antd";

const HomePage = () => {
  const [categories, setCategories] = useState();
  const [filtered, setFiltered] = useState([]);
  const [products, setProducts] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/products/get-all"
      );
      const data = await response.json();
      setProducts(data);
      console.log(data);
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/categories/get-all"
      );
      const data = await response.json();
      data &&
        setCategories(
          data.map((item) => {
            return { ...item, value: item.title };
          })
        );
    };
    getCategories();
  }, []);

  return (
    <>
      <Header setSearch={setSearch} />
      {products && categories ? (<div className="home px-6 flex flex-col md:flex-row justify-between gap-10 pb-20 md:pb-0">
      <div className="categories  overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10 h-screen">
        <Categories
          categories={categories}
          setCategories={setCategories}
          setFiltered={setFiltered}
          products={products}
        />
      </div>
      <div className="products flex-[8] overflow-y-auto max-h-[calc(100vh_-_112px)] pb-10 min-h[500px] ">
        <Products
          categories={categories}
          filtered={filtered}
          products={products}
          setProducts={setProducts}
          search={search}
        />
      </div>
      <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
        <CartTotals />
      </div>
    </div>):<Spin size="large" className="absolute top-1/2 left-1/2"/>}
    </>
  );
};

export default HomePage;
