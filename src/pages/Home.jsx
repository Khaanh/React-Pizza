import React, { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIstLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating'
  });

  const urlPizza = "https://6487922abeba62972790d1b4.mockapi.io/Items?";

  useEffect(() => {
    setIstLoading(true);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    fetch(`https://6487922abeba62972790d1b4.mockapi.io/Items?${category}&sortBy=${sortBy}&order=${order}`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setIstLoading(false);
      });

    window.scrollTo(0, 0)
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
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