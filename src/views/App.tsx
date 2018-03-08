import * as React from 'react';
import {Route} from 'react-router-dom';
import Layout from './components/Layout';
import List from './pages/List';

export default () => {
  return (
    <Layout>
      <Route exact path="/" component={List}/>
    </Layout>
  );
};
