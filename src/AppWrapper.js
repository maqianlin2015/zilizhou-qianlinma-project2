import React, { useState } from 'react';
import './style/App.css';
import { Provider } from "react-redux";
import store from "../src/redux/store";
import App from './App';

const AppWrapper = () => {
  
    return (
      <Provider store={store}> 
        <App /> 
      </Provider>
    )
  }

  export default AppWrapper; 