/** 
 * @license
 * Copyright (c) 2018 @cicciosgamino Author. All rights reserved.
 * This code may only be used under the license found at https://github.com/CICCIOSGAMINO/LICENSE.txt
*/

import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

class <%= className %> extends LitElement {
  _render({appTitle, _page, _drawerOpened, _snackbarOpened, _offline}) {
    return html`
    <style>
      :host {
        display: block;
      }
    </style>
    <!-- Main content -->
    <h1>Ok Component start RUNNING </h1>
    <main role="main" class="main-content">
      <p>Menu</p>
    </main>
    <footer>
      <p>Made with &hearts; by the Polymer team.</p>
    </footer>

    <snack-bar active?="${_snackbarOpened}">
        You are now ${_offline ? 'offline' : 'online'}.
    </snack-bar>
    `;
  }

  static get properties() {
    return {
      appTitle: String,
      _page: String,
      _drawerOpened: Boolean,
      _snackbarOpened: Boolean,
      _offline: Boolean
    }
  }

  constructor() {
    super();
    this.appTitle = 'TITLE';
    this._page = "Page";
    this._offline = true;
    this._snackbarOpened = true;
    this._drawerOpened = true;
  }

}


// Register custom element definition using standard platform API
customElements.define('<%= pwaNameTag %>', <%= className %>);


