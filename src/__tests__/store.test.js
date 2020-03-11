import { initialState } from "../store";

describe("Store tests", ()=> {
    it('should have expected keys in the store', () => {
        const keys = Object.keys(initialState);
        console.log(keys);
        ["grid", "activate", "nextgen"].forEach((key)=>{
            expect(keys.includes(key)).toBe(true);
        });
    });
});
