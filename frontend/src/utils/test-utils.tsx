import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import searchReducer from '../redux/searchSlice';
import { RootState } from '../redux/store';

function customRender(
  ui: React.ReactElement,
  {
    initialState: RootState = {
      search: {
        searchTerm: '',
        page: 1,
        sorting: {
          sortBy: 'popularity',
          sortOrder: -1,
        },
        selectedGenre: 'Genres',
        _persist: {
          version: -1,
          rehydrated: true
        }
      },
    } as RootState,
    store = configureStore({
      reducer: {
        search: searchReducer,
      }
    }),
    ...options
  } = {}
) {
  const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
  });

  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <ChakraProvider>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <Router>
              {children}
            </Router>
          </Provider>
        </ApolloProvider>
      </ChakraProvider>
    ),
    ...options,
  });
}

export * from '@testing-library/react';
export { customRender as render };