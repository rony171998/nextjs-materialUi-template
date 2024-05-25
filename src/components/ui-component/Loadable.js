import { Suspense } from 'react';

// project imports
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => {
  const LoadableComponent = (props) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

  // Asignar displayName al componente
  const componentName = Component.displayName || Component.name || 'Component';
  LoadableComponent.displayName = `Loadable(${componentName})`;

  return LoadableComponent;
};

export default Loadable;