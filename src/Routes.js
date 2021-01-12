import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

const ViewProductslazy = lazy(() =>
  import('./pages/Products/ViewProducts/ViewProducts')
);

function Routes() {
  return (
    <Router>
      <Suspense fallback={<Spinner size="xl" />}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/products" />
          </Route>
          <Route exact path="/products" component={ViewProductslazy} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default Routes;
