import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {LoginPage} from '../LoginPage';
import { login, uiResetError } from '../../../store-redux/actions';

jest.mock('../../../store-redux/actions');

describe('LoginPage', () => {
  test('snapshot', () => {
    const state = {
      ui: {
        error: null,
        isLoading: false,
      },
    };
    const store = {
      getState: () => state,
      dispatch: jest.fn(),
      subscribe: () => {},
    };
    const { container } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  test('should authLogin action', () => {
    login.mockReturnValue('action');
    const state = {
      ui: {
        error: null,
        isLoading: false,
      },
    }; 
    const username = 'asd';
    const password = '1234';
    const store = {
      getState: () => state,
      dispatch: jest.fn(),
      subscribe: () => {},
    };
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );
    const usernameInput = screen.getByLabelText(/User Email/);
    const passwordInput = screen.getByLabelText(/Password/); 
    const submitButton = screen.getByRole('button');

    expect(submitButton).toBeDisabled();
    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);
    // const credentials = login.mock.calls[0][0];
    // expect(credentials).toMatchObject({ username, password });
    expect(store.dispatch).toHaveBeenCalledWith('action');
  });

});
