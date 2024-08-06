import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import axios from 'axios';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import Component from './component';
import { User } from './component.type';

const server = setupServer(
  http.get('/user/info', () => {
    return HttpResponse.json({
      message: 'Ok',
      data: {
        id: '1',
        fullName: 'Nguyen Hong Duc',
        email: 'duc@example.com'
      },
      status: 200
    });
  }),
  http.get('/user/empty', () => {
    return HttpResponse.json({
      message: 'Empty',
      data: null,
      status: 200
    });
  }),
  http.get('/user/error', () => {
    return HttpResponse.error();
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const getData = (url: string) => {
  return axios.get(url).then((response) => response.data as User);
};

it('Test component case 1: Has data', async () => {
  const { findByTestId } = render(<Component loaderTest={() => getData('/user/info')} />);
  const componentHasData = await findByTestId('has-data');
  expect(componentHasData).toBeInTheDocument();
});

it('Test component case 2: Has loading', async () => {
  const { findByTestId } = render(<Component loaderTest={() => getData('/user/info')} />);
  const componentHasData = await findByTestId('loading');
  expect(componentHasData).toBeInTheDocument();
});

it('Test component case 3: Empty data', async () => {
  const { findByTestId } = render(<Component loaderTest={() => getData('/user/empty')} />);
  const componentHasData = await findByTestId('loading');
  expect(componentHasData).toBeInTheDocument();
});

it('Test component case 4: Has error', async () => {
  const { findByTestId } = render(<Component loaderTest={() => getData('/user/error')} />);
  const componentHasData = await findByTestId('error');
  expect(componentHasData).toBeInTheDocument();
});
