import React, { useEffect, useState } from "react";
import Hero from "./Hero/Hero";
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import Sectoion4 from "./Sections/Sectoion4";
import axios from "axios";
import { server } from "../../Setting/GlobalVariable";
import Cookies from "js-cookie";


const Index = () => {
  const [discountProducts, setDiscountProducts] = useState()

  useEffect(() => {
    fetchDiscountProducts()
  }, [])


  const fetchDiscountProducts = async () => {
    try {
      const response = await axios.get(`${server}/product/discount/list`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
      });
      setDiscountProducts(response.data.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Hero />
      <Section1 />
      {discountProducts?.length > 3 && (
        <Section2
          discountProducts={discountProducts}
        />
      )}
      <Section3 />
      <Sectoion4 />
    </>
  );
};

export default Index;
