import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import ErrorBoundary from './ErrorBoundary';
import store from './store';
import theme from './theme';
import GlobalStyle from './theme/GlobalStyle';

const AppRouter = lazy(() => import('./routes/AppRouter'));

const persistor = persistStore(store);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Suspense fallback={null}>
              <GlobalStyle />
              <AppRouter />
            </Suspense>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
