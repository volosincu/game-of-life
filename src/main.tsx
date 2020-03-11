import * as React from "react";
import * as ReactDOM from "react-dom";

import { BoardComponent }  from './boardComponent';
import { StateProvider } from './store';

const app = (
    <StateProvider>
        <BoardComponent />
    </StateProvider>
);
ReactDOM.render(app, document.getElementById('root'));
