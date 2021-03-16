import React from 'react'
import NameInput from './NameInput';
import { connect } from 'react-redux';

const Nav = ({ name, score }) => {
    return (
        <nav className="navbar"> 
            <ul>
                <li className="score-label"><NameInput name={name} /> <span className="score">{score}</span> </li>
                <li className="scores-link">high <br></br>scores</li>
            </ul>

        </nav>
    )
}

const mapStateToProps = state => ({
    name: state.coin.name,
    score: state.coin.score
});

export default connect(mapStateToProps)(Nav)