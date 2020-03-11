import React from 'react';
import { shallow } from "enzyme";
import { CellComponent } from '../cellComponent';

/**
 @TODO mock store and spy dispatch and onChange event
const mockDispatch = jest.fn();

jest.mock("react", ()=>{
   useContext: () => {
       return {
           dispatch: mockDispatch
       }
   }
});*/


describe("CellComponent component", ()=> {
    let wrapper: any;
    beforeEach(()=> {
        wrapper = shallow(<CellComponent id={1} value={true}/>);
    });

    it('renders correctly - toMatchSnapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('renders the element with \" cell \" className', () => {
        expect(wrapper.find(".cell")).toHaveLength(1);
    });

    it('renders the element with input and span children elements ', () => {
        expect(wrapper.find("input")).toHaveLength(1);
        expect(wrapper.find("span.cellbox")).toHaveLength(1);
    });
});
