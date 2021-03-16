import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { enableKeyPress, disableKeyPress } from '../actions/coinActions';
import axios from 'axios';

const NameInput = ({ id, name, enableKeyPress, disableKeyPress }) => {

    const [username, setUsername] = useState(name);

    const input = useRef();

    useEffect(() => {
        setUsername(name)
    }, [name])

    const handleFocus = () => {
        disableKeyPress()
    };

    const handleBlur = async (e) => {
        if (!e.target.value.trim()) {
            setUsername(name)
        }
        enableKeyPress()

        const res = await axios.put(`/api/users/${id}`, {name: username});
        return res
    };

    const handleChange = (e) => {
        if (e.target.value.length >= 8) return;
      setUsername(e.target.value.trim())
    };

    const handleSubmit = e => {
        e.preventDefault();
        input.current.blur()
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                className="name-input"
                ref={input}
                type="text"
                name="name"
                onChange={handleChange}
                value={username}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={name}
            />        
        </form>
    )
}

const mapStateToProps = state => ({
    score: state.coin.score,
    name: state.coin.name,
    id: state.coin.id,
    isLoading: state.coin.idLoading,
    jump: state.coin.isJumping,
    allowKeypress: state.coin.allowKeypress
  });
  
export default connect(mapStateToProps, {enableKeyPress, disableKeyPress})(NameInput)
