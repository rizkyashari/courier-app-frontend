import React, { useEffect, useState } from "react";
import Balance from "../../components/balance/Balance";
import Greetings from "../../components/greetings/Greetings";
import Header from "../../components/header/Header";
import { BtnSquare, ContainerBox } from "../../styled-components/GlobalStyles";
import { useTransactionStore } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { useStorePromo } from "../../store-promo";
import { isConstructSignatureDeclaration } from "typescript";
import Footer from "../../components/footer/Footer";
import { useStoreUserPromo } from "../../store-user-promo";
import { useStoreProfile } from "../../store-shipping";
import CarouselSection from "../../components/carousel/Carousel";

function Game() {
  const transactionState = useTransactionStore((state) => state);
  const userProfileState = useTransactionStore((state) => state);
  const { userPromoResponse } = useTransactionStore((state) => state);
  const { setFetchUserPromo, userPromoDatas } = useStoreUserPromo();
  const { setFetchShipping, shippingDatas, filterShipping } = useStoreProfile();

  const count = shippingDatas.filter((obj) => {
    if (
      obj.shipping_status == "Package is arrived in destination address: done"
    ) {
      return true;
    }

    return false;
  }).length;

  useEffect(() => {
    setFetchUserPromo();
    userProfileState.fetchUserProfiles();
  }, []);
  console.log(userPromoDatas);

  const navigate = useNavigate();
  const { setFetchPromo, promoDatas, filterPromo, dataFilter, loading } =
    useStorePromo();

  useEffect(() => {
    setFetchPromo();
  }, []);

  const [active, setActive] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setActive(!active);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const EPromoID = document.getElementById("promo_id") as HTMLInputElement;

    transactionState.postUserPromo({
      user_id: userProfileState.userProfiles.id,
      promo_id: parseInt(EPromoID.value),
    });
  };

  useEffect(() => {
    console.log(transactionState.message, "2e21ui2gi12eu1ieg12eugeuig2u");
    if (userProfileState.message === "OK") {
      setFetchPromo();
    }
  }, [transactionState.message]);
  // console.log(dataFilter);
  let random = Math.floor(Math.random() * dataFilter.length);
  const [selectedBtn, setSelectedBtn] = useState(random);

  const [counter, setCounter] = useState(Number(localStorage.count || count));

  let decrementCounter = () => {
    setCounter((prevCount) => prevCount - 1);
    localStorage.setItem("count", String(counter - 1));
  };
  if (counter <= 0) {
    decrementCounter = () => setCounter(count);
  }

  return (
    <>
      <Header />
      <CarouselSection />
      <div className="container mt-5 p-5">
        <Link to="/shipping">
          <button className="btn btn-success">Back</button>
        </Link>
        <div className="container">
          <h1 className="fw-bold d-flex justify-content-center">Gacha Game</h1>
          <p className="d-flex justify-content-center">
            Click on this box below to get a random reward!
          </p>

          <p className="d-flex justify-content-center">Chance: {counter}</p>
        </div>
        <ContainerBox>
          <div className="container text-center">
            <div className="row mt-5">
              {dataFilter.map((promoState) => (
                <div className="col">
                  {counter == 0 ? (
                    <button
                      key={promoState.id}
                      onClick={(e) => {
                        setSelectedBtn(promoState.id);
                        handleSubmit(e);
                        decrementCounter();
                      }}
                      className={
                        promoState.id == selectedBtn
                          ? "btn btn-danger btn-lg btn-square-md rounded-circle"
                          : "btn btn-warning btn-lg btn-square-md rounded-circle"
                      }
                      id="promo_id"
                      type="button"
                      value={dataFilter[random].id}
                      // onClick={(e) => handleSubmit(e)}
                      disabled
                    >
                      <BtnSquare>
                        {promoState.id == selectedBtn ? (
                          <h3 className="p-4 mt-4 text-white text-wrap fs-4">
                            {/* {dataFilter[random].name} */}
                            {userPromoResponse.promo.name}
                          </h3>
                        ) : (
                          ""
                        )}
                      </BtnSquare>
                    </button>
                  ) : (
                    <button
                      key={promoState.id}
                      onClick={(e) => {
                        setSelectedBtn(promoState.id);
                        handleSubmit(e);
                        decrementCounter();
                      }}
                      className={
                        promoState.id == selectedBtn
                          ? "btn btn-danger btn-lg btn-square-md rounded-circle"
                          : "btn btn-warning btn-lg btn-square-md rounded-circle"
                      }
                      id="promo_id"
                      type="button"
                      value={dataFilter[random].id}
                      // onClick={(e) => handleSubmit(e)}
                    >
                      <BtnSquare>
                        {promoState.id == selectedBtn ? (
                          <h3 className="p-4 mt-4 text-white text-wrap fs-4">
                            {/* {dataFilter[random].name} */}
                            {userPromoResponse.promo.name}
                          </h3>
                        ) : (
                          ""
                        )}
                      </BtnSquare>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ContainerBox>
      </div>
      <Footer />
    </>
  );
}

export default Game;
