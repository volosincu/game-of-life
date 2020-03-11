import React, { useContext } from 'react';
import {store} from "./store";

interface CellProps {
    id: number,
    value: boolean
}

function onChangeCell(dispatch: any, id: number, value: boolean) {
    return () => {
        dispatch({type: 'USER_INPUT', payload: {activate: {id: id, value: !value}}})
    };
}

export const CellComponent = React.memo((props: CellProps) => {
    const globalState = useContext(store);
    const { dispatch } = globalState;
    const { id, value } = props;

    return <label className="cell">
        <input type="checkbox" checked={value} onChange={onChangeCell(dispatch, id, value)}></input>
            <span className="cellbox"></span>
    </label>
});
