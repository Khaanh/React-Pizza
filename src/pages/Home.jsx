import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice'

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(state => state.filter);
  // const sort.sortProperty = sort.sortProperty;
  // const sort.sortProperty = useSelector(state => state.filter.sort.sortProperty);

  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  }

  const { searchValue } = useContext(SearchContext)
  const [items, setItems] = useState([]);
  const [isLoading, setIstLoading] = useState(true);
  // const [pageCount, setCurrentPage] = useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  const urlPizza = "https://6487922abeba62972790d1b4.mockapi.io/Items?";

  useEffect(() => {
    setIstLoading(true);

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : ''

    axios.get(`https://6487922abeba62972790d1b4.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then(res => {
        setItems(res.data)
        setIstLoading(false);
      });

    window.scrollTo(0, 0)
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzas}
      </div>
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home;