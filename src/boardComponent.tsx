import  React, { useContext, useEffect, useState } from 'react';
import { CellComponent } from './cellComponent';
import { store, CellInterface } from './store';


import './main.scss';

function createBoardElements(x: number, y: number, matrix: []): any[] {
    const rows: any[] = [];
    let k = 0;
    for (let i = 0; i < x; i++) {
        const cols = [];
        for (let j = 0; j < y; j++) {
            const cel: CellInterface = matrix[k];
            cols[j] = <CellComponent key={`cel-${cel.id}`} id={cel.id} value={cel.value}/>;
            k++;
        }
        rows[i] = (<div className="row" key={`row-${k}`}>{cols}</div>);
    }
    return rows;
}

export const BoardComponent = () => {

    const globalState = useContext(store);
    const { state, dispatch } = globalState;
    const [period, setPeriod] = useState(500);
    const {state: { grid: {x, y}, nextgen: {id}} } = globalState;

    const rows = createBoardElements(x, y, state.grid.matrix);

    useEffect(() => {
        let gen = 0;
        const interval = setInterval(() => {
            dispatch({ type: 'NEXT_GEN', payload: {nextgen: {id: ++gen}}});
        }, period);
        return () => clearInterval(interval);
    }, [period]);

    return (
        <div className="container">
            <div className="menu">
                <h3>Generatia: {id} <span> Perioada: {period} ms</span></h3>
                <p>Zoom: {x} x {y}</p>
                <button className="speed-btn" onClick={() => {
                    if(period>400){
                        setPeriod(period-300);
                    }
                }}>Speed Up</button>
                <button className="speed-btn" onClick={() => {
                    setPeriod(period+300);
                }}>Speed Down</button>
                <button className="speed-btn" onClick={() => {
                    setPeriod(Math.pow(10, 10));
                }}>Stop</button>
                <button className="speed-btn" onClick={() => {
                    setPeriod(2000);
                }}>Start</button>
                <button className="speed-btn" onClick={() => {
                    dispatch({ type: 'ZOOM', payload: {}});
                }}>Zoom</button>
                <input type="radio" name="game" onChange={() => {
                    dispatch({ type: 'RANDOM', payload: {}});
                }}/>
                <label htmlFor="gg">Random</label>
                <input type="radio" name="game" onChange={() => {
                    dispatch({ type: 'GLIDERS_GUN', payload: {}});
                }}/>
                <label htmlFor="flower">Gliders gun</label>
                <input type="radio" name="game" onChange={() => {
                    dispatch({ type: 'FLOWER', payload: {}});
                }}/>
                <label htmlFor="flower">Flower</label>
            </div>
            <div className="game">
                {rows}
            </div>
        </div>
    );
};
