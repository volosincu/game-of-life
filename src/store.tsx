import React, {createContext, useReducer} from 'react';
import { computeInitialMatrix, computeRandom, computeFlower, computeNextGen, zoomBoard } from './helpers'

export interface CellInterface {
    id: number,
    value: boolean
}

const X:number = 40;
const Y:number = 40;

export const initialState: any = {
    grid: {
        x: X,
        y: Y,
        matrix: computeInitialMatrix(X, Y)
    },
    activate: {
        id: null,
        value: null
    },
    nextgen: {
        id: null
    }
};

const store = createContext(initialState);
const Provider = store.Provider;

const StateProvider = (props:any ) => {
    const [state, dispatch] = useReducer((state:any, action:any) => {
        const activate = action.payload.activate;
        const xAxis = state.grid.x;
        const yAxis = state.grid.y;

        switch(action.type) {
            case 'GLIDERS_GUN':
                console.log("------");
                return Object.assign({}, {grid: {x:X, y: Y, matrix: computeInitialMatrix(X, Y)}, nextgen: 1 });
            case 'FLOWER':
                return Object.assign({}, {grid: {x:X, y: Y, matrix: computeFlower(X, Y)}, nextgen: 1});
            case 'RANDOM':
                return Object.assign({}, {grid: {x:X, y: Y, matrix: computeRandom(X, Y)}, nextgen: 1});
            case 'USER_INPUT':
                let newState = Object.assign({}, state, action.payload);
                if(activate.id != null) {
                    const m = newState.grid.matrix.slice(0);
                    const oldCel = m[activate.id];
                    m[activate.id] = Object.assign({}, oldCel, {value: activate.value});
                    return Object.assign({}, newState, {grid: {x:xAxis, y: yAxis, matrix: m}});
                }
                return newState;
            case 'NEXT_GEN':
                const newGen = computeNextGen(state);
                return Object.assign({},{grid: {x: xAxis, y: yAxis, matrix: newGen}, activate: state.activate}, action.payload);
            case 'ZOOM':
                const zoom = 1.2,
                    scaled = Math.floor(xAxis*zoom),
                    scaledBoard = zoomBoard(zoom, xAxis, yAxis, state);
                return Object.assign({},{grid: {x: scaled, y: scaled, matrix: scaledBoard}, activate: state.activate, nextgen: state.nextgen});
            default:
                throw new Error();
        };
    }, initialState);

    return (
        <Provider value={{ state, dispatch }}>
            {props.children}
        </Provider>
    );
};

export { store, StateProvider }