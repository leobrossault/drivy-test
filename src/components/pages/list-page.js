/* @jsx h */
import { h } from 'preact';

import DefaultLayout from '../layouts/default-layout';
import ListView from '../views/list-view';

function ListPage() {
  return (
    <DefaultLayout>
      <ListView />
    </DefaultLayout>
  );
}

export default ListPage;
