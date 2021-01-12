import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

const Applazy = lazy(() => import('./pages/App'));

function Routes() {
  return (
    <Router>
      <Suspense fallback={<Spinner size="xl" />}>
        <Switch>
          <Route exact path="/" component={Applazy} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default Routes;
