
import React, { lazy } from "react";
import styled from "styled-components";

import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

const Card = lazy(() => import("../../components/card/index"));

const Section = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 5rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    pointer-events: none;
    z-index: 1;
  }
`;

const Title = styled.h1`
  color: #ffffff;
  display: inline-block;
  font-size: calc(1rem + 1.5vw);
  margin-top: 1.5rem;
  position: relative;
  &::before {
    content: "";
    height: 4px;
    width: 80%;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0.5rem);
    /* or 100px */
    background: linear-gradient(90deg, var(--green), var(--red));
    border-radius: 2px;
  }
`;

const Carousal = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only Screen and (max-width: 40em) {
    width: 90vw;
    .slick-slider .slick-arrow {
      display: none;
    }
  }
  .slick-slider .slick-arrow:before {
    color: #0a0b10;
    font-size: 1.5rem;
    @media only Screen and (max-width: 40em) {
      display: none;
    }
  }
  .slick-slider .slick-dots button:before {
    color: #0a0b10;
    font-size: 1.5rem;
  }
  .slick-slide.slick-active {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0;
    padding: 0;
    margin-bottom: 3rem;
  }
`;

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,

    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Section>
      <Title>Few good words about us!</Title>
      <Carousal>
        <Slider {...settings}>
          <Card
            text="CodeBucks has been essential part of our business. I would definetly
        recommend CodeBucks. It has been amazing to have them."
            name="Jenny (CodeCall)"
            image="avatar-1"
          />

          <Card
            text="CodeBucks has been essential part of our business. I would definetly recommend CodeBucks. It has been amazing to have them."
            name="Jenny (CodeCall)"
            image="avatar-2"
          />

          <Card
            text="CodeBucks has been essential part of our business. I would definetly recommend CodeBucks. It has been amazing to have them."
            name="Jenny (CodeCall)"
            image="avatar-3"
          />

          <Card
            text="CodeBucks has been essential part of our business. I would definetly recommend CodeBucks. It has been amazing to have them."
            name="Jenny (CodeCall)"
            image="avatar-4"
          />
        </Slider>
      </Carousal>
    </Section>
  );
};

export default Testimonials;
