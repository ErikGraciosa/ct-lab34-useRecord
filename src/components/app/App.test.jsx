import React from 'react';
import { 
  screen,
  render,
  cleanup,
  fireEvent,
  waitFor } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  afterEach(() => cleanup());
  it('renders App', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('verifies that color changes based on input', () => {
    render(<App />);

    const selector = screen.getByTestId('selector');
    const output = screen.getByTestId('output');

    fireEvent.change(selector, {
      target: {
        value: '#FF0000'
      }
    });

    return waitFor(() => {
      expect(output).toHaveStyle({
        backgroundColor: '#FF0000'
      });
    });

  });

  it('verifies that color changes based on undo to previous', () => {
    render(<App />);

    const selector = screen.getByTestId('selector');
    const output = screen.getByTestId('output');
    const undo = screen.getByText('undo');

    fireEvent.change(selector, {
      target: {
        value: '#FF0000'
      }
    });
    fireEvent.change(selector, {
      target: {
        value: '#00FF00'
      }
    });
    fireEvent.change(selector, {
      target: {
        value: '#0000FF'
      }
    });
    fireEvent.click(undo);

    return waitFor(() => {
      expect(output).toHaveStyle({
        backgroundColor: '#00FF00'
      });
    });
  });

  it('verifies color changes based on redo to next index color', () => {
    render(<App />);

    const selector = screen.getByTestId('selector');
    const output = screen.getByTestId('output');
    const undo = screen.getByText('undo');
    const redo = screen.getByText('redo');

    fireEvent.change(selector, {
      target: {
        value: '#FF0000'
      }
    });
    fireEvent.change(selector, {
      target: {
        value: '#00FF00'
      }
    });
    fireEvent.change(selector, {
      target: {
        value: '#0000FF'
      }
    });
    fireEvent.click(undo);
    fireEvent.click(undo);
    fireEvent.click(redo);

    return waitFor(() => {
      expect(output).toHaveStyle({
        backgroundColor: '#00FF00'
      });
    });
  });

});
