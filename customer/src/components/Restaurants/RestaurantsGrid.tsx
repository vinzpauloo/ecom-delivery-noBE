import React from "react";
import { Link } from "react-router-dom";

import styles from "./RestaurantsGrid.module.scss";

// Sample restaurants
import restau01 from "../../assets/images/restau01.png";
import restau02 from "../../assets/images/restau02.png";
import restau03 from "../../assets/images/restau03.png";
import restau04 from "../../assets/images/restau04.png";
import restau05 from "../../assets/images/restau05.png";
import restau06 from "../../assets/images/restau06.png";
import restau07 from "../../assets/images/restau07.png";
import restau08 from "../../assets/images/restau08.png";
import restau09 from "../../assets/images/restau09.png";
import restau10 from "../../assets/images/restau10.png";
import restau11 from "../../assets/images/restau11.png";
import restau12 from "../../assets/images/restau12.png";
import restau13 from "../../assets/images/restau13.png";
import restau14 from "../../assets/images/restau14.png";

interface ContainerProps {}

const restaurantRowData = [
  {
    image: restau01,
    title: "Chan's Chinese Restaurant",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
  {
    image: restau02,
    title: "Jollibee",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
  {
    image: restau03,
    title: "Yellow Cab",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
  {
    image: restau04,
    title: "Tokyo Tokyo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
  {
    image: restau05,
    title: "Italianni's Restaurant",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
  {
    image: restau06,
    title: "Al Chubibo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
  {
    image: restau07,
    title: "Al Chubibo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
  {
    image: restau08,
    title: "Al Chubibo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
  {
    image: restau09,
    title: "Al Chubibo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
  {
    image: restau10,
    title: "Al Chubibo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
  {
    image: restau11,
    title: "Al Chubibo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
  {
    image: restau12,
    title: "Al Chubibo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
  {
    image: restau13,
    title: "Al Chubibo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
  {
    image: restau14,
    title: "Al Chubibo",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    link: "https://www.hapchan.com.ph/",
  },
];

const RestaurantsGrid: React.FC<ContainerProps> = ({}) => {
  return (
    <div
      className={`d-flex flex-wrap justify-content-start ${styles.restaurantGrid}`}
    >
      {restaurantRowData.map((item, index) => {
        return (
          <div key={index} className={`flex-grow-1 ${styles.sliderContainer}`}>
            <div className={styles.slideItem}>
              <div className={styles.slideImageContainer}>
                <img src={item.image} alt="" />
              </div>
              <div className={styles.slideContentContainer}>
                <p className={styles.slideTitle}>{item.title}</p>
                <p className={styles.slideDescription}>{item.description}</p>
                <Link to="/restaurant" className={styles.slideLink}>
                  Visit
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantsGrid;
