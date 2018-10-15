/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import { UI, HexGrid, Token } from 'boardgame.io/ui';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <UI three={true}>
        <HexGrid levels={3}>
          <Token x={this.state.x} y={this.state.y} z={this.state.z} />
        </HexGrid>
      </UI>
    );
  }
}

const App = Client({
  game: Game({}),
  board: Board,
  debug: false,
});

const Singleplayer = () => (
  <div style={{ padding: 50 }}>
    <App gameID="single" />
  </div>
);

export default Singleplayer;
