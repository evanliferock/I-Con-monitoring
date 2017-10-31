import React from 'react';
import Header from '../src/Header';
import renderer from 'react-test-renderer';

test('Header Renders', () => {
  const component = renderer.create(
    <Header title='Test'/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
