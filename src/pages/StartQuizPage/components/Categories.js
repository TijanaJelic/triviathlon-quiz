import React from 'react';
import { useEffect, useState } from 'react';
import { questionCategoriesUrl } from '../../../api/urls';
import '../start-quiz.css';

const Categories = ({ setCategory, setParameters, numOfQuestions }) => {
  const [categories, setCategories] = useState([]);
  const [activeClass, setActiveClass] = useState('');

  const fetchCategories = async () => {
    const url = questionCategoriesUrl;

    const response = await fetch(url);
    const json = await response.json();
    setCategories(json);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="categories-container">
      <h2>Choose category</h2>
      <div className="all-categories">
        {Object.entries(categories).map((category) => (
          <button
            key={category[0]}
            className={
              activeClass === category[0] ? 'category active' : 'category'
            }
            onClick={(e) => {
              setActiveClass(category[0]);
              setCategory(category[1]);
              setParameters([category[1], numOfQuestions]);
            }}>
            {category[0]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
