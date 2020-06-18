// @ts-nocheck
import  React, { useContext, useEffect, useState } from 'react';
import { ItemComponent } from './ItemComponent';
import {renderRating} from "./helpers";
import { store } from './store';
import { data } from './data';
import './main.scss';
    
const renderChildren = () => {
    return data.map((item, i)=>{
        return <ItemComponent key={i} {...item} />
    });
}

const createRatingFilter = () => {
    const filters = [];
    for (let i=2; i<=6; i++){
        filters.push(<li key={`filter-${i}`}><input type="checkbox" /><div>{renderRating(i)}</div></li>);
    }
    return <ul>{filters}</ul>;
}

export const LayoutComponent = () => {
    const globalState = useContext(store);
    const [period, setPeriod] = useState(500);
    
    const children = renderChildren(),
        filters = createRatingFilter(5);

    return (
        <React.Fragment>
            <header>
                <button className="menu-btn">Menu</button>
                <div className="logo"></div>
            </header>
            <div className="container">
                <div className="content">
                    <h1 className="content-child">550 Hotels Available in Melbourne</h1>
                    <div className="content-child">
                        <div className="menu">
                            <h3 className="filters-heading">Filter Results</h3>
                            <hr />
                            <label className="filter-label">Hotel Name</label>
                            <div className="search">
                                <input type="text" />
                                <button name="go">Go</button>
                            </div>
                            <hr />
                            <label className="filter-label">Quality Rating</label>
                            {filters}
                        </div>
                        <ul className="hotel-list">
                            {children}
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
