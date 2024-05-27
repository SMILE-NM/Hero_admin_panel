// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { heroesFetched, filtersFetched } from '../../actions';
import { useEffect, useState } from 'react';

const HeroesFilters = () => {
  const [renderFilter, setRenderFilter] = useState(null);
  const { filters, heroes } = useSelector((state) => state);
  const { request } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    getFilters();
  }, []);

  const getFilters = () => {
    request('http://localhost:3001/filters')
      .then((filters) => dispatch(filtersFetched(filters)))
      .then(() => filterByElements('all'));
  };

  const filterByElements = (element) => {
    const filteredHeroes = heroes.filter((hero) => hero.element === element);
    dispatch(heroesFetched(filteredHeroes));
  };

  const handleClick = (e, name) => {
    e.target.classList.add('active');
    filterByElements(name);
  };

  const renderFilters = () => {
    return filters.map(({ name, id }) => (
      <button
        key={id}
        onClick={(e) => handleClick(e)}
        className="btn btn-outline-dark"
      >
        {name}
      </button>
    ));
  };

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {/* <button className="btn btn-outline-dark active">Все</button>
          <button className="btn btn-danger ">Огонь</button>
          <button className="btn btn-primary">Вода</button>
          <button className="btn btn-success">Ветер</button>
          <button className="btn btn-secondary">Земля</button> */}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
