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
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            className={
              activeClass === category ? 'category active' : 'category'
            }
            onClick={(e) => {
              setActiveClass(category);
              setCategory(e.target.textContent);
              setParameters([category, numOfQuestions]);
            }}>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
