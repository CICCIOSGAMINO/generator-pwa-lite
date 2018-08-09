/** 
 * @license
 * Copyright (c) 2018 @author @cicciosgamino. All rights reserved.
 * This code may only be used under the license found at https://github.com/CICCIOSGAMINO/LICENSE.txt
*/

import { LitElement, html } from '@polymer/lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// Redux - this element is connected to the store.
import { store } from '../store.js';

// Redux - these are the actions needed by this element.
import {
  updateDrawerState,
  updateOffline
} from '../actions/app.js';

// Elements needed
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';

import { SharedStyles } from './shared-styles.mjs';
import { menuIcon } from './pwa-icons.mjs';

import './snack-bar.js';

class <%= className %> extends connect(store)(LitElement) {
  _render({pwaTitle, _page, _drawerOpened, _snackbarOpened, _offline}) {
    return html`
      <style>

      :host {
        display: block;

        /** Main */ 
        --app-primary-color: <%= themeColor %>;
        --app-secondary-color: <%= secondaryColor %>;
        --app-accent-color: <%= accentColor %>;

        /** --app-primary-color: #E91E63;
        --app-secondary-color: #293237; **/ 
        --app-dark-text-color: var(--app-secondary-color);
        --app-light-text-color: white;
        --app-section-even-color: #f7f7f7;
        --app-section-odd-color: white;

        /** Header */ 
        --app-header-background-color: white;
        --app-header-text-color: var(--app-dark-text-color);
        --app-header-selected-color: var(--app-primary-color);

        --paper-button-ink-color: var(--app-accent-color);
        --paper-icon-button-ink-color: var(--app-accent-color);
        --paper-spinner-color: var(--app-accent-color);
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

        /** Box */
        --app-box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

        /** Drawer */
        --app-drawer-width: 256px;
        --app-drawer-background-color: var(--app-secondary-color);
        --app-drawer-text-color: var(--app-light-text-color);
        --app-drawer-selected-color: #78909C;

        ${ SharedStyles }
      }

      app-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color);
        border-bottom: 1px solid #eee;
      }

      .toolbar-top {
        background-color: var(--app-header-background-color);
      }

      [main-title] {
        font-family: 'Pacifico';
        text-transform: lowercase;
        font-size: 30px;
        /* In the narrow layout, the toolbar is offset by the width of the
        drawer button, and the text looks not centered. Add a padding to
        match that button */
        padding-right: 44px;
      }

      /** Toolbar List **/
      .toolbar-list {
        display: none;
      }

      .toolbar-list > a {
        display: inline-block;
        color: var(--app-header-text-color);
        text-decoration: none;
        line-height: 30px;
        padding: 4px 24px;
      }

      .toolbar-list > a[selected] {
        color: var(--app-header-selected-color);
        border-bottom: 4px solid var(--app-header-selected-color);
      }

      .menu-btn {
        background: none;
        border: none;
        fill: var(--app-header-text-color);
        cursor: pointer;
        height: 44px;
        width: 44px;
      }

      .drawer-list {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 24px;
        background: var(--app-drawer-background-color);
        position: relative;
      }

      .drawer-list > a {
        display: block;
        text-decoration: none;
        color: var(--app-drawer-text-color);
        line-height: 40px;
        padding: 0 24px;
      }

      .drawer-list > a[selected] {
        color: var(--app-drawer-selected-color);
      }

      .main-content {
        padding-top: 64px;
        min-height: 100vh;
      }

      .page {
        display: none;
      }

      .page[active] {
        display: block;
      }

      footer {
        padding: 24px;
        background: var(--app-drawer-background-color);
        color: var(--app-drawer-text-color);
        text-align: center;
      }

      /* viewport width is bigger than 460px, mid/wide layout. */
      @media (min-width: 460px) {
        .toolbar-list {
          display: block;
        }

        .menu-btn {
          display: none;
        }

        .main-content {
          padding-top: 107px;
        }

        /* drawer button isn't shown in the wide layout, so we don't
        need to offset the title */
        [main-title] {
          padding-right: 0px;
        }
      }
      
    </style>

    <!-- Header -->
    <app-header condenses reveals effects="waterfall">
      <app-toolbar class="toolbar-top">
        <button class="menu-btn" title="Menu" on-click="${_ => store.dispatch(updateDrawerState(true))}">${menuIcon}</button>
        <div main-title>${pwaTitle}</div>
      </app-toolbar>

      <!-- This gets hidden on a small screen-->
      <nav class="toolbar-list">
        <a selected?="${_page === 'view1'}" href="/view1">View One</a>
        <a selected?="${_page === 'view2'}" href="/view2">View Two</a>
        <a selected?="${_page === 'view3'}" href="/view3">View Three</a>
      </nav>
    </app-header>

    <!-- Drawer content -->
    <app-drawer opened="${_drawerOpened}"
        on-opened-changed="${e => store.dispatch(updateDrawerState(e.target.opened))}">
        <nav class="drawer-list">
        <a selected?="${_page === 'view1'}" >View One</a>
        <a selected?="${_page === 'view2'}" >View Two</a>
        <a selected?="${_page === 'view3'}" >View Three</a>
      </nav>
    </app-drawer>

    <!-- Main content -->
    <main role="main" class="main-content">
      <my-view1 class="page" active?="${_page === 'view1'}"></my-view1>
      <my-view2 class="page" active?="${_page === 'view2'}"></my-view2>
      <my-view3 class="page" active?="${_page === 'view3'}"></my-view3>
      <my-view404 class="page" active?="${_page === 'view404'}"></my-view404>
    </main>

    <footer>
      <p>Made with &hearts; by the Polymer team.</p>
    </footer>
    
    <snack-bar active?="${_snackbarOpened}">
        You are now ${_offline ? 'OFFLINE' : 'ONLINE'}
    </snack-bar>
    `;
  }

  static get properties() {
    return {
      pwaTitle: String,
      _page: String,
      _drawerOpened: Boolean,
      _snackbarOpened: Boolean,
      _offline: Boolean
    }
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  _firstRendered() {
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
  }

  ready() {
    super.ready();

    /** unresolved  */
    this.removeAttribute('unresolved');
    console.log('READY >>> ')
  }

  _stateChanged(state) {
    /**this._page = state.app.page; **/ 
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened; 
    this._drawerOpened = state.app.drawerOpened;
  }

}

// Register custom element definition using standard platform API
customElements.define('<%= pwaNameTag %>', <%= className %>);


