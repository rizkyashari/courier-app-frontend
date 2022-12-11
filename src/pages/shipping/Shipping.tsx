import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CarouselSection from "../../components/carousel/Carousel";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import TableShipping from "../../components/table/TableShipping";
import { useTransactionStore } from "../../store";
import { useStoreProfile } from "../../store-shipping";
import {
  Badge,
  Container,
  ContainerForm,
  IconGreen,
  Notification,
  Wrapper,
} from "../../styled-components/GlobalStyles";

function Shipping() {
  const [pages, setPage] = useState(1);

  const handlePrevPage = (prevPage: number) => {
    // console.log(prevPage);
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = (nextPage: number) => {
    console.log(nextPage);
    setPage((nextPage) => nextPage + 1);
  };
  const navigate = useNavigate();
  const {
    setFetchShipping,
    shippingDatas,
    filterShipping,
    dataFilter,
    loading,
  } = useStoreProfile();
  useEffect(() => {
    console.log("d2g2g2uegyge2ge1e");
    setFetchShipping(pages);
  }, [pages]);

  const count = shippingDatas.filter((obj) => {
    if (
      obj.shipping_status == "Package is arrived in destination address: done"
    ) {
      return true;
    }

    return false;
  }).length;

  const [counter, setCounter] = useState(Number(localStorage.count || count));

  let decrementCounter = () => {
    setCounter((prevCount) => prevCount - 1);
    localStorage.setItem("count", String(count - 1));
  };
  return (
    <>
      <Header />
      <CarouselSection />
      {count > 0 ? (
        <Wrapper>
          <Notification
            onClick={() => {
              navigate(`/game`, {
                replace: true,
              });
            }}
          >
            <span>Game</span>
            <p>Gacha</p>
            <Badge>{counter}</Badge>
          </Notification>
        </Wrapper>
      ) : (
        <></>
      )}
      <div className="container mt-2 p-5">
        <Link
          className="d-flex justify-content-center justify-content-xl-end p-2"
          to="/create-shipping"
        >
          <button className="btn btn-success">Create New Shipping</button>
        </Link>
        <TableShipping />
      </div>
      <Footer />
    </>
  );
}

export default Shipping;
