// @ts-nocheck
import React from "react";
import { shallow } from "enzyme";
import { LayoutComponent } from "../LayoutComponent";

jest.mock('react', () => {
    const ActualReact = require.requireActual('react')
    return {
        ...ActualReact,
        useContext: () => ({ state: {}, dispatch: jest.fn() }),
    }
});

describe("LayoutComponent", ()=> {
   let wrapper: any;
    beforeEach(()=> {
        wrapper = shallow(<LayoutComponent />);
    });

    it('renders correctly - toMatchSnapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
});