/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { Scene } from './hex/Scene';
import { VonGrid } from './hex/VonGrid';
import { Board } from './hex/Board';

// Not yet implemented.
export class HexGrid extends React.Component {
  constructor() {
    super();
    this.scene = new Scene(
      {
        cameraPosition: { x: 0, y: 150, z: 150 },
      },
      false
    );

    const grid = new VonGrid();

    grid.generate({
      size: 4,
    });

    const board = new Board(grid);

    board.generateTilemap();

    this.scene.add(board.group);
    this.scene.focusOn(board.group);

    const update = () => {
      this.scene.render();
      requestAnimationFrame(update);
    };

    update();
  }
  render() {
    return null;
  }
}

// Not yet implemented.
export class Hex extends React.Component {
  render() {
    return null;
  }
}
