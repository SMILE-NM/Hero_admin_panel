// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
} from '../../actions';

const HeroesAddForm = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {});

  const validateSchema = Yup.object({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    element: Yup.string().required('Required'),
  });

  const updateListHeroes = () => {
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes')
      .then((data) => {
        dispatch(heroesFetched(data));
      })
      .catch(() => dispatch(heroesFetchingError()));
  };

  const postHero = (values, { setSubmitting, resetForm }) => {
    values.id = uuidv4();
    const data = JSON.stringify(values, null, 2);

    request('http://localhost:3001/heroes', 'POST', data)
      .then(() => setSubmitting(false))
      .then(resetForm)
      .then(updateListHeroes);
  };

  return (
    <Formik
      initialValues={{ name: '', description: '', element: '' }}
      validationSchema={validateSchema}
      onSubmit={postHero}
    >
      {({ isSubmitting }) => (
        <Form className="border p-4 shadow-lg rounded">
          <div className="mb-3">
            <label htmlFor="name" className="form-label fs-4">
              Имя нового героя
            </label>
            <Field
              required
              name="name"
              type="text"
              className="form-control"
              placeholder="Как меня зовут?"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="text" className="form-label fs-4">
              Описание
            </label>
            <Field
              required
              name="description"
              as="textarea"
              className="form-control"
              placeholder="Что я умею?"
              style={{ height: '130px' }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="element" className="form-label">
              Выбрать элемент героя
            </label>
            <Field required name="element" as="select" className="form-select">
              <option value="">Я владею элементом...</option>
              <option value="fire">Огонь</option>
              <option value="water">Вода</option>
              <option value="wind">Ветер</option>
              <option value="earth">Земля</option>
            </Field>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            Создать
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default HeroesAddForm;
