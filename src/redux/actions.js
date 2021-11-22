import { createStore } from "redux";
import { CHANGE_APP_STATUS, CHANGE_WINNER } from "./actionConstants";

// Action creator functions
export const changeAppStatus = newAppStatus => ({
    type: CHANGE_APP_STATUS,
    payload: {
        newAppStatus: newAppStatus
    }
});

export const changeWinner = newWinner => ({
    type: CHANGE_WINNER,
    payload: {
        newWinner: newWinner
    }
})



// // Reductor check which action you give ,and based on action, modify the store
// //dispatch: execute action


// // action
// const increament = () => {
//     return{
//         type: 'INCREMENT'
//     }
// }
// const decreament = () => {
//     return{
//         type: 'DECREMENT'
//     }
// }
// // reducer，不同的reducer做不同的事
// const conter = (state = 0, action) => {
//     switch(action.type) {
//         case "INCREMENT": // based on name, return sth
        
//             return state+1;
//             case "DECREMENT":
//                 return state-1;
//     }
// }

// // 1. create store:
// import (createStore)
// let store = createStore(counter);

// // dispatch 
// store.dispatch(increment()); 里面放了一个action

