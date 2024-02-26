import React from 'react';
import {Text} from '../../components/Text';

const Component = React.lazy(() => import('./FirstModule'));

export default () => (
  <React.Suspense fallback={<Text>Loading Local Module...</Text>}>
    <Component />
  </React.Suspense>
);
