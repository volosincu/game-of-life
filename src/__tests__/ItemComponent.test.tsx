// @ts-nocheck
import React from 'react';
import { shallow } from "enzyme";
import { ItemComponent } from '../ItemComponent';


describe("ItemComponent component", ()=> {
    let wrapper: any;
    beforeEach(()=> {
        const props = {
            price: 200,
            name: "Hotel Regina Maria",
            rating: 5.0,
            room: "Studio Apartament",
            imgsrc: "https://hotelimages.webjet.com.au/hotels/7000000/6430000/6428700/6428660/215090a4_z.jpg"
        };
        wrapper = shallow(<ItemComponent key="1" {...props} />);
    });

    it('renders correctly - toMatchSnapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
