// @ts-nocheck
import {store} from "./store";
import {renderRating} from "./helpers";
import React, { useContext } from 'react';
import { useInView } from 'react-intersection-observer'


export const ItemComponent = React.memo((props: ItemProps) => {
    const globalState = useContext(store);
    const { dispatch } = globalState;
    const { imgsrc, name, price, rating, room} = props;
    
    const [ref, inView, entry] = useInView({
        //triggerOnce: true
    });

    return <li className="hotel" ref={ref}>
        <img
          src={inView ? imgsrc : ""}
          className="img-l"
          alt={name}
          loading="lazy"
        />
        <div className="hotel-info">
            <label className="hotel-name">{name}</label>
            <div>{renderRating(rating)}</div>
            <label className="hotel-room-type">Room Type: <span>{room}</span></label>
        </div>
        <div className="hotel-menu-l">
            <label className="hotel-price">{price}$</label>
        </div>
    </li>
});
