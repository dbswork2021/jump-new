import { Suspense } from 'react';
import { HashRouter as Router, useRoutes } from 'react-router-dom';
import Loading from 'components/Loading';
import routes from './routes';

const AllRouter = () => {
  const Routes = () => useRoutes(routes());

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
    </Router>
  );
};

export default AllRouter;
