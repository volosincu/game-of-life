import React from "react";
import { shallow } from "enzyme";
import { BoardComponent } from "../boardComponent";

jest.mock('react', () => {
    const ActualReact = require.requireActual('react')
    return {
        ...ActualReact,
        useContext: () => ({ state: {
            grid: {
                x: 1,
                y: 1,
                matrix: [{id: 1, value: true}]
            }, nextgen: {id: 1}
            }, dispatch: jest.fn() }),
    }
})

/**
 @TODO test the behaviour
 const mockDispatch = jest.fn();

 jest.mock("react", ()=>{
   useContext: () => {
       return {
           dispatch: mockDispatch
       }
   }
});*/

describe("BoardComponent", ()=> {
    let wrapper: any;
    beforeEach(()=> {
        wrapper = shallow(<BoardComponent />);
    });

    it('renders correctly - toMatchSnapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    describe("Should have expected styling and layout", ()=> {
        it('should renders the element with \" container \" className', () => {
            expect(wrapper.find(".container")).toHaveLength(1);
        });

        it('should render the menu', () => {
            expect(wrapper.find(".menu")).toHaveLength(1);
        });
    });

    describe("Should render the grid from the state matrix", ()=> {
        /*it('@TODO', () => {
            expect(wrapper.find("")).toHaveLength(1);
        });*/
    });
});