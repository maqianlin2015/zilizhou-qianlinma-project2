import {createStore} from "redux";
import {INITIAL_STATE} from "./stateConstants";
import {CHANGE_APP_STATUS, CHANGE_WINNER } from "./actionConstants";


const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_APP_STATUS:
            return {
                ...state,
                newAppStatus: action.payload.newAppStatus
            };
        case CHANGE_WINNER:
            return {
                ...state,
                newWinner: action.payload.newWinner
            };
        
        default:
            return state;
    }
}

export default createStore(rootReducer);