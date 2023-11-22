/* eslint-disable react-refresh/only-export-components */
import { render as rtlRender } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { configureStore } from "@reduxjs/toolkit";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import searchReducer from "../redux/searchSlice";
import { Dispatch, AnyAction } from "redux";
import alertReducer from "../redux/alertSlice";

export const spyMiddleware =
  () => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    spyMiddleware.actions.push(action);
    return next(action);
  };

spyMiddleware.actions = [] as AnyAction[];

function customRender(
  ui: React.ReactElement,
  {
    store = configureStore({
      reducer: {
        search: searchReducer,
        alert: alertReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(spyMiddleware),
    }),
    initialRoutes = ["/"],
    ...options
  } = {},
) {
  const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
  });

  function Wrapper({ children }: { children?: React.ReactNode }) {
    return (
      <ChakraProvider>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <MemoryRouter initialEntries={initialRoutes}>
              {children}
            </MemoryRouter>
          </Provider>
        </ApolloProvider>
      </ChakraProvider>
    );
  }

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...options }),
    store,
  };
}

export * from "@testing-library/react";
export { customRender as render };
