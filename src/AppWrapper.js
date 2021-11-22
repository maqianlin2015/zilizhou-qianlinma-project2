import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CreatePlayer } from './Player';
import Introduction from './components/Introduction';
import NewGame from './components/NewGame';
import Game from './components/Game';
import FreePlayerGame from './components/FreePlayerGame';
import Announcer from './components/Announcer';
import './style/App.css';

import { Provider } from "react-redux";
import store from "../src/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { changeAppStatus } from './redux/actions';
import App from './App';

const AppWrapper = () => {
  
    return (
      <Provider store={store}> // Set context
        <App /> // Now App has access to context
      </Provider>
    )
  }

  export default AppWrapper; 