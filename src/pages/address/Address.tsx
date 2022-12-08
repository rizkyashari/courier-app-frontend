import React, { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CarouselSection from "../../components/carousel/Carousel";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import TableAddress from "../../components/table/TableAddress";
import TableShipping from "../../components/table/TableShipping";
import { useTransactionStore } from "../../store";
import {
  Container,
  ContainerForm,
  IconGreen,
} from "../../styled-components/GlobalStyles";

function Address() {
  // const transactionState = useTransactionStore((state) => state);
  // const userProfileState = useTransactionStore((state) => state);

  // useEffect(() => {
  //   transactionState.fetchUserTransactions();
  //   userProfileState.fetchUserProfiles();
  // }, []);

  // const [input, setInput] = useState({
  //   to: "",
  //   amount: 0,
  //   description: "",
  // });

  // const handleChange = (event: FormEvent<HTMLInputElement>) => {
  //   console.log(event.currentTarget);
  //   setInput({
  //     ...input,
  //     [event.currentTarget.name]: event.currentTarget.value,
  //   });
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   transactionState.postUserTransferTransactions(input);
  // };

  // function makeid(length: number) {
  //   let result = "";
  //   let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  //   let charactersLength = characters.length;
  //   for (var i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }

  return (
    <>
      <Header />
      <CarouselSection />
      <div className="container mt-2 p-5">
        <Link to="/create-address">
          <button className="btn btn-success">Create New Address</button>
        </Link>
        <TableAddress />
      </div>
      <Footer />
    </>
  );
}

export default Address;
