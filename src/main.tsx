import * as React from "react";
import * as ReactDOM from "react-dom";

import { LayoutComponent }  from './LayoutComponent';
import { StateProvider } from './store';

const app = (
    <StateProvider>
        <LayoutComponent />
    </StateProvider>
);
ReactDOM.render(app, document.getElementById('root'));
