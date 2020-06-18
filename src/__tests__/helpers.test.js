import {renderRating} from "../helpers";


describe("renderRating ", ()=> {
   it('should have expected stars', () => {
       //TODO fix the 0 case
         expect(renderRating(3)).toHaveLength(2);
    });
    
    it('should have expected stars - with half case', () => {
         expect(renderRating(2.5)).toHaveLength(3);
    });
});
