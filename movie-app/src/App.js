import "./scss/main.scss";
import React, { useState, useEffect } from "react";
import { getMoviesByName } from "./utilities/utils";
import NavBar from "./header/NavBar";
import Searched from "./body/Searched";
import { Home } from "./body/Home";
import Footer from './body/Footer';

function App() {
  const [movie, setMovie] = useState({});
  const [movieSearch, setMovieSearch] = useState();
  const [page, setPage] = useState(1);

  // modal toggle and card movie id
  const [selected, setSelected] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  // handle modal events
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    getMoviesByName(movieSearch, page).then((res) => setMovie(res));
  }, [movieSearch, page]);

  const detailClick = (e) => {
    setSelected(e.target.id);
    toggleModal();
  };

  return (
    <div className="App">
      <NavBar setPage={setPage} setMovieSearch={setMovieSearch} />
      {movieSearch ? (
        movie.Search ? (
          <Searched
            detailClick={detailClick}
            totalResults={movie.totalResults}
            movies={movie.Search}
            setPage={setPage}
            page={page}
            selected={selected}
            setSelected={setSelected}
            toggleModal={toggleModal}
            modalOpen={modalOpen}
          />
        ) : (
          <div className="error-container">
            <h2 className="error-text"> Please enter a valid movie title </h2>
          </div>
        )
      ) : (
        <Home
          selected={selected}
          setSelected={setSelected}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          toggleModal={toggleModal}
          detailClick={detailClick}
        />
      )}

      {/* Footer */}
        <Footer/>

    </div>
  );
}

export default App;
