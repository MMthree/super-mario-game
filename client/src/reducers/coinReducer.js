import { 
    JUMP_END, 
    JUMP_START, 
    ALLOW_KEYPRESS, 
    DISALLOW_KEYPRESS, 
    SET_SCORE,
    SET_USER,
    START_LOADING,
    END_LOADING
} from '../types';

const inititalState = {
    score: "000000",
    isJumping: false,
    allowKeypress: true,
    isLoading: false,
    name: 'mario',
    id: null
};

export default function (state = inititalState, action) {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case END_LOADING:
            return {
                ...state,
                isLoading: false
            }
        case SET_USER:
            return {
                ...state,
                name: action.payload.name,
                score: action.payload.score,
                id: action.payload._id,
            }
        case JUMP_START:
            const zeroPad = (num, places) => String(num).padStart(places, '0');
            const parseString = parseInt(state.score);
            const score = parseString + 1;  
            const newScore = zeroPad(score.toString(), 6);
            return {
                ...state,
                score: newScore,
                isJumping: true
            }
        case SET_SCORE: 
            return{
                ...state,
                score: action.payload
        }
        case JUMP_END:
            return {
                ...state,
                isJumping: false
            }
        case ALLOW_KEYPRESS:
            return {
                ...state, 
                allowKeypress: true
            }
        case DISALLOW_KEYPRESS: 
            return {
                ...state,
                allowKeypress: false
            }
        default: 
            return state
    }
}