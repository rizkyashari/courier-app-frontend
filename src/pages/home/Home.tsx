import React from "react";
import Balance from "../../components/balance/Balance";
import Greetings from "../../components/greetings/Greetings";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import HomeImage from "../../assets/delivery.png";
import Footer from "../../components/footer/Footer";
import CarouselSection from "../../components/carousel/Carousel";

function Home() {
  return (
    <>
      <Header />
      <CarouselSection />
      <div className="container mt-2 p-2">
        <Greetings />
        {/* <Table /> */}
        <div className="container-lg d-flex justify-content-center">
          <img
            src={HomeImage}
            className="img-fluid"
            width="600px"
            alt="Home Image"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
