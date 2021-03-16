import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCoin, setScore, createUser, getUser } from './actions/coinActions';

import Navbar from './components/Nav';
import Footer from './components/Footer';
import MarioContainer from './components/MarioContainer';
import './app.scss';


function App({ isLoading, allowKeypress, getCoin, createUser, getUser }) {

  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (localStorage.mario) {
      const mario = JSON.parse(localStorage.mario);

      getUser(mario.id)
    } else {
      createUser()
    }
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (allowKeypress) {
      document.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
          getCoin()
        }
      }); 
    } else {
      window.removeEventListener("keydown", (e) => {
      });
    }
    //eslint-disable-next-line
  }, [allowKeypress]);

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('loading')
    } else {
      document.body.classList.remove('loading')
    }
  }, [isLoading])

  return (
    <div>
      {!isLoading ? <div className="loading"></div> : ""}
      <Navbar />
      <MarioContainer />
      <Footer />
    </div>
  );
}

const mapStateToProps = state => ({
  score: state.coin.score,
  name: state.coin.name,
  id: state.coin.id,
  isLoading: state.coin.isLoading,
  jump: state.coin.isJumping,
  allowKeypress: state.coin.allowKeypress
});

export default connect(mapStateToProps, { getCoin, setScore, createUser, getUser })(App);
