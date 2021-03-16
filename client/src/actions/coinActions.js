import { JUMP_START, JUMP_END, SET_SCORE, START_LOADING, END_LOADING, SET_USER, DISALLOW_KEYPRESS, ALLOW_KEYPRESS } from '../types';
import axios from 'axios';
import ipapi from 'ipapi.co';

export const getCoin = () => (dispatch, getState) => {
    const isJumping = getState().coin.isJumping;
    const keypress = getState().coin.allowKeypress;
    const isLoading = getState().coin.isLoading;
    
    if (isJumping || !keypress || isLoading) return

    dispatch({
        type: JUMP_START
    })

    setTimeout(() => {
        dispatch({
            type: JUMP_END
        })
    }, 250);

    const state = getState().coin;
    saveToLocalStorage(state.id, state.name, state.score);

    sendScoreToDB(state.id, state.score)
};

export const setScore = (score) => (dispatch, getState) => {
    const state = getState().coin;
    dispatch({
        type: SET_SCORE,
        payload: score
    })
    saveToLocalStorage(state.id, state.name, state.score)
};

export const createUser = () => async (dispatch, getState) => {
    dispatch({
        type: START_LOADING,
    })
    // const countryCode = ipapi.location((data) => data.country_code);

    // console.log(countryCode)
    const res = await axios.post('/api/users');
    
    try {
        const { _id, name, score } = res.data.results;

        dispatch({ type: END_LOADING });
        dispatch({
            type: SET_USER,
            payload: res.data.results
        })

        saveToLocalStorage(_id, name, score)
    } catch (err) {
        //console.log(err)
    }
};

export const getUser = (id) => async (dispatch, getState) => {
    dispatch({
        type: START_LOADING,
    })

    const res = await axios.get('/api/users/' + id);
    try {
        const { _id, name, score } = res.data;

        dispatch({ type: END_LOADING });
        dispatch({
            type: SET_USER,
            payload: res.data
        })

        saveToLocalStorage(_id, name, score)
    } catch (err) {
        //console.log(err)
    }
};

export const disableKeyPress = () => (dispatch) => {
    dispatch({
        type: DISALLOW_KEYPRESS
    });
};

export const enableKeyPress = () => (dispatch) => {
    dispatch({
        type: ALLOW_KEYPRESS
    });
};


const saveToLocalStorage = (id, name, score) => {
    const user = {
      id,
      name,
      score
    }
    const json = JSON.stringify(user);
    
    localStorage.setItem("mario", json)
};

const sendScoreToDB = async (id, score) => {
    const res = await axios.put('/api/users/' + id, {id, score})

    try {
        return res.data
    } catch (err) {
    }
};