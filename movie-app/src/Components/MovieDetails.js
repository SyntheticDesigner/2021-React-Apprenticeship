import { useState, useEffect } from 'react'
import { getMovieById } from '../utilities/utils'
import cancelIcon from '../assets/cancel.svg'
import tomato from '../assets/rottentomatoes.png'
import metacritic from '../assets/metacritic.png'
import star from '../assets/star.svg'
//........................................................................
// Left off at modal container hover issue
// Modal container sits as an overlay on hide modal class and messing with the hover functionality of the card

const MovieDetails = ({ selected, toggleModal, modalOpen, movies }) => {
  // console.log(`movieList in details`, movieList)
  const [targetMovie, setTargetMovie] = useState({})

  useEffect(() => {
    getMovieById(selected).then((movieData) => setTargetMovie(movieData))
  }, [selected])

  const {
    Year,
    Title,
    Ratings,
    Rated,
    Genre,
    Plot,
    Actors,
    Director,
    Poster,
    Runtime,
  } = targetMovie
  // Create an array of tags containing ratings sources and value
  // Function for returning images depending on if Rating [] have the rating
  const sourceLogo = (source) => {
    // check if source exists, and return the correct icons
    if (source === 'Rotten Tomatoes') {
      // return logo
      return tomato
    }
    if (source === 'Metacritic') {
      return metacritic
    }
    if (source === 'Internet Movie Database') {
      return star
    }
  }
  let tags = []
  // Check for modal info and Ratings length, map and generate images and rating divs for each
  if (modalOpen) {
    if (targetMovie && Ratings) {
      tags = Ratings.map((ratingObj, i) => {
        let source = ratingObj['Source']
        let value = ratingObj['Value']
        return (
          <div className="rating-container" key={i}>
            <img
              className="rating-logo"
              src={sourceLogo(source)}
              alt={`${source}`}
            />
            <h3 className="rating-tag">{`${value}`}</h3>
          </div>
        )
      })
    }
  }
  const modalPoster = {
    backgroundImage: `url(${Poster})`,
  }

  const modalPosterOverlay = {
    backgroundImage: `url(${Poster})`,
    backgroundSize: `cover`,
  }
  // Function to prevent modal from closing on click within modal-container
  const stopClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div
      className={`modal-container ${modalOpen ? `show-modal` : `hide-modal`}`}
      onClick={toggleModal}
    >
      {/* Background overlay */}''
      <div style={modalPosterOverlay} className="modal" onClick={stopClick}>
        <div style={modalPoster} className="modal-poster"></div>
        {/* Right section   */}
        <div className="modal-info">
          <div className="info-title">
            <h1>{Title}</h1>
            <h2>({Year})</h2>
          </div>

          {/* Runtime/rated */}
          <div className="info-tags">
            <div className="tag-bubble">
              <h3>{Runtime}</h3>
            </div>
            <div className="tag-bubble">
              <h3>{Rated}</h3>
            </div>
            <div className="tag-bubble">
              <h3>{Genre}</h3>
            </div>
          </div>

          {/* Imdb, Rotten Tomatoes, Metacritics tags */}
          <div className="info-rating">{tags}</div>

          <div className="info-directors">
            <div className="info-subheading">
              <h3>Director:</h3>
              <div className="info-content">{Director}</div>
            </div>
          </div>

          <div className="info-actors">
            <div className="info-subheading">
              <h3>Actors:</h3>
            </div>
            <div className="info-content">{Actors}</div>
          </div>

          <div className="info-plot">
            <div className="info-subheading">
              <h3>Plot:</h3>
            </div>
            <div className="info-content">{Plot}</div>
          </div>
        </div>
        {/* Close modal 'x' button */}
        <div className="close-modal">
          <img src={cancelIcon} onClick={toggleModal} alt="close modal" />
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
