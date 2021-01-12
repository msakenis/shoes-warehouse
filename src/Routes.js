import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Spinner, Container } from '@chakra-ui/react';
import { NavBar } from './components';

const ViewProductslazy = lazy(() =>
  import('./pages/Products/ViewProducts/ViewProducts')
);
const CreateProductlazy = lazy(() =>
  import('./pages/Products//CreateProduct/CreateProduct')
);

function Routes() {
  return (
    <Router>
      <NavBar />
      <Suspense fallback={<Spinner size="xl" />}>
        <Switch>
          <Container maxW="6xl">
            <Route exact path="/">
              <Redirect to="/products" />
            </Route>
            <Route exact path="/products" component={ViewProductslazy} />
            <Route
              exact
              path="/products/create"
              component={CreateProductlazy}
            />
          </Container>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default Routes;
