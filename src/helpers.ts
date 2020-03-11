import {CellInterface} from "./store";

export const LIVE:boolean = true;
export const DEAD:boolean = false;

export const computeRandom= (x:number, y:number) => {
    let k = 0;
    const values = [];

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            const randomCellState = !!(Math.floor(Math.random()*10)%2);
            values[k] = { id: k, value: randomCellState } as CellInterface;
            k++;
        }
    }
    return values;
}

export const computeInitialMatrix = (x:number, y:number):Array<CellInterface> => {
    let k = 0, ini = 0;
    const values = [];
    const init = [428,468,470,491,509,511,516,517,531,532,549,552,556,557,562,563,566,567,572,573,589,591,602,603,606,607,612,613,614,628,630,646,647,652,653,668,691,692,731];

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            if(k === init[ini]) {
                values[k] = {id: k, value: LIVE} as CellInterface;
                ini++;
            }else {
                values[k] = {id: k, value: DEAD} as CellInterface;
            }
            k++;
        }
    }
    return values;
}
export const computeFlower = (x:number, y:number):Array<CellInterface> => {
    let k = 0, ini = 0;
    const values = [];
    const init = [540,541,542,580,582,613,614,615,616,617,618,619,620,621,622,653,655,662,693,694,695,702,735,742,775,782,815,822,823,824,855,862,864,895,896,897,898,899,900,901,902,903,904,935,937,975,976,977];
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            if(k === init[ini]) {
                values[k] = {id: k, value: LIVE} as CellInterface;
                ini++;
            }else {
                values[k] = {id: k, value: DEAD} as CellInterface;
            }
            k++;
        }
    }
    return values;
}

export const isLiveCounter = (neighborCell: CellInterface, countLiveNeighbors: number): number => {
    if (neighborCell.value) {
        ++countLiveNeighbors;
    }
    return countLiveNeighbors;
}

export const aliveNeighborUpDownSidesCounter = (matrix: any, neighborCellId: number, countLiveNeighbors: number, isEdgeLeft: boolean, isEdgeRight: boolean): number => {
    if(!isEdgeRight && !isEdgeLeft) {
        countLiveNeighbors = isLiveCounter(matrix[neighborCellId-1], countLiveNeighbors);
        countLiveNeighbors = isLiveCounter(matrix[neighborCellId+1], countLiveNeighbors);
    }else {
        if(isEdgeLeft && matrix[neighborCellId+1].value) {
            ++countLiveNeighbors;
        }
        if(isEdgeRight && matrix[neighborCellId-1].value) {
            ++countLiveNeighbors;
        }
    }
    return countLiveNeighbors;
}

export const countLiveNeighbors = (id:number, matrix: any, scaleAxis: number):number => {
    let countLiveNeighbors = 0;
    const cellRow = Math.floor(id/scaleAxis)*scaleAxis;
    const isEdgeLeft = id == cellRow,
        isEdgeRight = id == cellRow+scaleAxis-1;

    const topNeighbor = id-scaleAxis,
        bottomNeighbor = id+scaleAxis,
        leftNeighbor = id-1,
        rightNeighbor = id+1;

    if(!isEdgeRight && !isEdgeLeft) {
        countLiveNeighbors = isLiveCounter(matrix[rightNeighbor], countLiveNeighbors);
        countLiveNeighbors = isLiveCounter(matrix[leftNeighbor], countLiveNeighbors);
    }else {
        if(isEdgeLeft && matrix[rightNeighbor].value) {
            ++countLiveNeighbors;
        }
        if(isEdgeRight && matrix[leftNeighbor].value) {
            ++countLiveNeighbors;
        }
    }
    if(id>=scaleAxis) {
        countLiveNeighbors = isLiveCounter(matrix[topNeighbor], countLiveNeighbors);
        countLiveNeighbors = aliveNeighborUpDownSidesCounter(matrix, topNeighbor,countLiveNeighbors, isEdgeLeft, isEdgeRight);
    }
    if(id<matrix.length-scaleAxis) {
        countLiveNeighbors = isLiveCounter(matrix[bottomNeighbor], countLiveNeighbors);
        countLiveNeighbors = aliveNeighborUpDownSidesCounter(matrix, bottomNeighbor, countLiveNeighbors, isEdgeLeft, isEdgeRight);
    }

    return countLiveNeighbors;
}

export const computeNextGen = (state: any):Array<CellInterface> => {
    const newGen = [];
    for (let i = 0; i < state.grid.matrix.length; i++) {
        const liveNeighbors = countLiveNeighbors(i, state.grid.matrix, state.grid.x);
        newGen[i] = Object.assign({}, state.grid.matrix[i]) as CellInterface;
        if (liveNeighbors > 3 && state.grid.matrix[i].value) {
            newGen[i].value = DEAD;
        }
        if (liveNeighbors < 2 && state.grid.matrix[i].value) {
            newGen[i].value = DEAD;
        }
        if (liveNeighbors == 3 && state.grid.matrix[i].value === DEAD) {
            newGen[i].value = LIVE;
        }
    }
    return newGen;
}

export const zoomBoard = (zoom: number, xAxis: number, yAxis: number, state: any):Array<CellInterface> => {
    const scaledBoard = [],
        scaled = Math.floor(xAxis * zoom),
        scaledMid = scaled / 2,
        mid = xAxis / 2;
    let k = 0;
    for (let i = 0; i < scaled; i++) {
        for (let j = 0; j < scaled; j++) {
            scaledBoard[k] = {id: k, value: DEAD} as CellInterface;
            k++;
        }
    }
    k = 0;
    for (let i = 0; i < xAxis; i++) {
        for (let j = 0; j < yAxis; j++) {
            const t1 = (Math.floor(i + scaledMid - mid) * scaled) + Math.floor(scaledMid - mid) + j;
            scaledBoard[t1] = {id: t1, value: state.grid.matrix[k].value} as CellInterface;
            k++;
        }
    }
    return scaledBoard;
}