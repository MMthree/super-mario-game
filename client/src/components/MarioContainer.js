import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { getCoin } from '../actions/coinActions';

import marioStand from '../images/sm_stand.png';
import marioJump from '../images/sm_jump.png';
import marioBlock from '../images/sm_block.png';

import jumpSound from '../assets/audio/sm_jump.wav';
import coinSound from '../assets/audio/sm_coin.wav';

const MarioContainer = ({ score, isJumping, getCoin }) => {

    const jumpAudio = useRef();
    const coinAudio = useRef();

    useEffect(() => {
        if (jumpAudio.current && coinAudio.current) {
            if (isJumping) {
                jumpAudio.current.currentTime = 0;
                jumpAudio.current.play()
            } 
            
            if (!isJumping && score) {
                coinAudio.current.currentTime = 0;
                coinAudio.current.play()
            }
        }
        //eslint-disable-next-line
    }, [isJumping])

    return (
        <div className="game-area" onClick={() => getCoin()}>
            <div className="mario-container">
                <img 
                    className={`mario-sprites coin-block ${isJumping ? "block-hit" : ""}`} 
                    src={marioBlock} 
                    alt="Super Mario coin block" 
                />

                <img 
                    className={`mario-sprites mario-stand ${isJumping ? "hide" : "show"}`} 
                    src={marioStand} 
                    alt="Super Mario standing" 
                />
                <img 
                    className={`mario-sprites mario-jump ${isJumping ? "jump show" : "hide"}`} 
                    src={marioJump} 
                    alt="Super Mario jumping" 
                />
            </div>
            
            <audio ref={jumpAudio}>
                <source src={jumpSound} type="audio/wav" />
            </audio>
            <audio ref={coinAudio}>
                <source src={coinSound} type="audio/wav" />
            </audio>
        </div>
    )
}

const mapStateToProps = state => ({
    isJumping: state.coin.isJumping,
    score: state.coin.score
});

export default connect(mapStateToProps, { getCoin })(MarioContainer)
