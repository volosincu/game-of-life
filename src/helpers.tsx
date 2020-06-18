// @ts-nocheck
import  React from 'react';

export const renderRating = (rating:number) => {
    const diff = rating - Math.trunc(rating),
        r = [];
        let n = 1;
        while (n < rating) {
          r.push(<div key={`star-${n}`} className="star-rating"></div>);
          n++;
        }
        if (diff > 0) {
            r.push(<div key={"star"} className="star-rating half"></div>);
        }
    return r;
}