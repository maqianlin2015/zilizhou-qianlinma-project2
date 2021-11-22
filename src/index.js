import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import AppWrapper from './AppWrapper';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);

ReactDOM.render(
	<React.StrictMode>
		<AppWrapper/>
	</React.StrictMode>,
	document.getElementById('root')
);
