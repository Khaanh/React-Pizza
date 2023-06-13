import React, { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIstLoading] = useState(true);
  const urlPizza = "https://6487922abeba62972790d1b4.mockapi.io/Items";

  useEffect(() => {
    fetch(urlPizza)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setIstLoading(false);
      });

    window.scrollTo(0, 0)
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : [items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)]}
      </div>
    </div>
  )
}

export default Home;