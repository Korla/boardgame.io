/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import DragDrop from './components/drag-n-drop';
import Hex from './components/hex';

const routes = [
  {
    path: '/ui',
    text: 'Drag and Drop',
    component: DragDrop,
  },
  {
    path: '/hex',
    text: 'Hex',
    component: Hex,
  },
];

export default routes;
