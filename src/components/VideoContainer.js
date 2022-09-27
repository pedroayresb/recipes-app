import React from 'react';
import PropTypes from 'prop-types';

function VideoContainer({ recipe }) {
  const { strYoutube } = recipe;
  const recipeVideoID = strYoutube?.split('=')[1];

  return (
    recipeVideoID ? (
      <div>
        <h2 className="video-recipe-title">Video</h2>
        <iframe
          className="recipe-video"
          data-testid="video"
          width="560"
          height="315"
          src={ `https://www.youtube.com/embed/${recipeVideoID}` }
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    ) : null
  );
}

VideoContainer.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;

export default VideoContainer;