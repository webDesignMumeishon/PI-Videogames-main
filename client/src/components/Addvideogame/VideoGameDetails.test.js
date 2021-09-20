import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// import { addTodo } from '../../actions';
// import configureStore from "redux-mock-store";
import AddvideogameDefault, { Addvideogame } from './Addvideogame';

configure({adapter: new Adapter()});

describe('<Addvideogame />',() => {

  describe('Estructura', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Addvideogame />);
    })
    it('Renderiza un <form>', () => {
      expect(wrapper.find('form')).toHaveLength(1)
    })
    it('Renderiza 22 labels <label>', () => {
      expect(wrapper.find('label')).toHaveLength(22)
    })

    it('Renderiza un label con el texto igual a "Name"', () => {
      expect(wrapper.find('label').at(0).text()).toEqual('Name: ');
    })

    it('Renderiza un input con la propiedad "name" igual a "vd_name"', () => {
      expect(wrapper.find('input[name="vd_name"]')).toHaveLength(1);
    })

    it('Renderiza un label con el texto igual a "Description"', () => {
      expect(wrapper.find('label').at(1).text()).toEqual('Description: ');
    })

    it('Renderiza una textarea con la propiedad "name" igual a "vd_description"', () => {
      expect(wrapper.find('input[name="vd_description"]')).toHaveLength(1);
    })
  });
});