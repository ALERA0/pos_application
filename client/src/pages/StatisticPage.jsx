import React, { useEffect, useState } from "react";

import Header from "../components/header/Header";
import StatisticCard from "../components/statistics/StatisticCard";
import { Area, Pie } from "@ant-design/plots";
import { Spin } from "antd";

const StatisticPage = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState();
  const user = JSON.parse(localStorage.getItem("posUser"));


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
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      process.env.REACT_APP_SERVER_URL + "/api/bills/get-all"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };



  const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Toplam\nDeğer",
      },
    },
  };


  const totalAmount = () =>{
    const total = data.reduce((total, item) => total + item.subTotal, 0);
    return `${total.toFixed(2)} ₺`;
  }

  return (
    <>
      <Header />
      {products ? (<div className="px-6">
      <div className="px-6 md:pb-0 pb-20">
        <h1 className="text-4xl font-bold mb-4 text-center">
          İstatistiklerim
        </h1>
        <div className="statistic-section">
          <h2 className="text-lg">
            Hoş geldin{" "}
            <span className="text-green-700 font-bold text-xl">{user.username}</span>.
          </h2>
          <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2  my-10 md:gap-10 gap-4">
            <StatisticCard
              title={"Toplam Müşteri"}
              amount={data.length}
              img={"images/user.png"}
            />
            <StatisticCard
              title={"Toplam Kazanç"}
              amount={totalAmount()}
              img={"images/money.png"}
            />
            <StatisticCard
              title={"Toplam Satış"}
              amount={data?.length}
              img={"images/sale.png"}
            />
            <StatisticCard
              title={"Toplam Ürün"}
              amount={products?.length}
              img={"images/product.png"}
            />
          </div>
          <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
            <div className="lg:w-1/2 lg:h-full h-72">
              <Area {...config} />
            </div>
            <div className="lg:w-1/2 lg:h-full h-72">
              <Pie {...config2} />
            </div>
          </div>
        </div>
      </div>
    </div>): <Spin size="large" className="absolute top-1/2 left-1/2" /> }
    </>
  );
};

export default StatisticPage;
