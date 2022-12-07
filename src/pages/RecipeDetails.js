import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import RecipeImage from '../components/RecipeImage';
import HeaderRecipe from '../components/HeaderRecipe';
import ButtonStart from '../components/ButtonStart';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import IngredientsContainer from '../components/IngredientsContainer';
import InstructionsContainer from '../components/InstructionsContainer';
import RecomendationsCard from '../components/RecomendationsCard';
import VideoContainer from '../components/VideoContainer';
import LoadingComponent from '../components/LoadingComponent';
import Footer from '../components/Footer';

function RecipeDetails(props) {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState('ingredients');
  const { history, match: { params: { id } } } = props;
  const { match: { path } } = props;
  const type = path.split('/')[1];
  const urlType = type === 'meals' ? 'themealdb' : 'thecocktaildb';
  const url = `https://www.${urlType}.com/api/json/v1/1/lookup.php?i=${id}`;
  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(url);
      const data = await response.json();
      if (type === 'meals') {
        setRecipe(data.meals[0]);
        setLoading(false);
      } else {
        setRecipe(data.drinks[0]);
        setLoading(false);
      }
    };
    fetchRecipe();
  }, []);

  return (
    <motion.section
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      exit={ { opacity: 0 } }
    >
      { loading ? <LoadingComponent />
        : (
          <motion.div
            initial={ { opacity: 0 } }
            animate={ { opacity: 1 } }
            exit={ { opacity: 0 } }
            className="details__screen"
          >
            <section className="user__actions">
              <FavoriteButton recipe={ recipe } id={ id } type={ type } />
              <ShareButton history={ history } />
            </section>
            <RecipeImage type={ type } recipe={ recipe } />
            <section className="page-recipe-container">
              <div className="recipe-container">
                <HeaderRecipe type={ type } recipe={ recipe } setShow={ setShow } />
                {show === 'ingredients'
                  ? <IngredientsContainer recipe={ recipe } />
                  : <InstructionsContainer recipe={ recipe } />}
              </div>
              {type === 'meals' ? <VideoContainer recipe={ recipe } /> : null}
              <h3 className="recomentation-text">Recommentations</h3>
            </section>
            <RecomendationsCard type={ type } id={ id } />
            <div className="recipe-footer">
              <ButtonStart
                history={ history }
                id={ id }
                type={ type }
                recipe={ recipe }
              />
            </div>
            <Footer />
          </motion.div>)}
    </motion.section>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    path: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default RecipeDetails;
