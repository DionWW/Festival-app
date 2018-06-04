import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';

import {App} from "./components/App"

const mainComponent =
    <BrowserRouter>
        <App/>
    </BrowserRouter>

ReactDOM.render(mainComponent, document.getElementById('react-root'));

