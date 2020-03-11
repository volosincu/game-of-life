import {computeNextGen} from "../helpers";

// TODO failing tests
describe("computeNextGen ", ()=> {
    it('computeNextGen left', () => {
        computeNextGen(1, [], 10);
    });
    it('computeNextGen right', () => {
        computeNextGen(1, [], 10);
    });
    it('computeNextGen top', () => {
        computeNextGen(1, [], 10);
    });
    it('computeNextGen down', () => {
        computeNextGen(1, [], 10);
    });
    it('computeNextGen top-first-row:  not top neighbors', () => {
        const expectedNeighbors = 5,
            countNeightbors = computeNextGen(8, [], 10);
        expect(expectedNeighbors).toBe(countNeightbors);
    });
    it('computeNextGen top-right-edge corner: not top-right neighbors', () => {
        const expectedNeighbors = 3,
            countNeightbors = computeNextGen(9, [], 10);
        expect(expectedNeighbors).toBe(countNeightbors);
    });
    it('computeNextGen down-right-edge corner: not down-right neighbors', () => {
        const expectedNeighbors = 3,
            countNeightbors = computeNextGen(99, [], 10);
        expect(expectedNeighbors).toBe(countNeightbors);
    });
    it('computeNextGen down-last-row : not down neighbors', () => {
        const expectedNeighbors = 5,
            countNeightbors = computeNextGen(98, [], 10);
        expect(expectedNeighbors).toBe(countNeightbors);
    });
});
