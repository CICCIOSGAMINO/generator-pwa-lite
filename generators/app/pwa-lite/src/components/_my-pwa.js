/** 
 * @license
 * Copyright (c) 2019 @author @cicciosgamino. All rights reserved.
 * This code may only be used under the license found at https://github.com/CICCIOSGAMINO/LICENSE.txt
*/

import { LitElement, html, css } from 'lit-element';
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
  navigate,
  updateOffline,
  updateDrawerState
} from '../actions/app.js';

// Elements needed
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';

// Shared styles needed by this element.
import { SharedStyles } from './shared-styles.mjs';
import { menuIcon } from './pwa-icons.mjs';

import './snack-bar.js';

class <%= className %> extends connect(store)(LitElement) {

  static get properties() {
    return {
      pwaTitle: { type: String },
      _page: { type: String },
      _drawerOpened: { type: Boolean },
      _snackbarOpened: { type: Boolean },
      _offline: { type: Boolean }
    };
  }

  static get styles() {

    const appDrawerWidth = css`256px`;

    return [
      SharedStyles,
      css`
        :host {
          display: block;

          --app-drawer-width: ${appDrawerWidth};

          /** Main */ 
          --app-primary-color: <%= themeColor %>;
          --app-secondary-color: <%= secondaryColor %>;
          --app-accent-color: <%= accentColor %>;

          --app-dark-text-color: var(--app-secondary-color);
          --app-light-text-color: whitesmoke;
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
          /* Padding the top bar */
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
      `
    ];
  }

  render() {
    // Anything relataed to rendering 
    return html`

    <!-- Header -->
    <app-header condenses reveals effects="waterfall">
      <app-toolbar class="toolbar-top">
        <button class="menu-btn" title="Menu" @click="${this._menuButtonClicked}">${menuIcon}</button>
        <div main-title>${this.pwaTitle}</div>
      </app-toolbar>

      <!-- This gets hidden on a small screen-->
      <nav class="toolbar-list">
        <a ?selected="${this._page === 'home'}" href="/home">Home</a>
        <a ?selected="${this._page === 'view1'}" href="/view1">View One</a>
        <a ?selected="${this._page === 'view2'}" href="/view2">View Two</a>
        <a ?selected="${this._page === 'view3'}" href="/view3">View Three</a>
      </nav>
    </app-header>

    <!-- Drawer content -->
    <app-drawer .opened="${this._drawerOpened}"
          @opened-changed="${this._drawerOpenedChanged}">
        <nav class="drawer-list">
        <a ?selected="${this._page === 'home'}" href="/home">Home</a>
        <a ?selected="${this._page === 'view1'}" href="/view1">View One</a>
        <a ?selected="${this._page === 'view2'}" href="/view2">View Two</a>
        <a ?selected="${this._page === 'view3'}" href="/view3">View Three</a>
      </nav>
    </app-drawer>

    <!-- Main content -->
    <main role="main" class="main-content">
      <page-home class="page" ?active="${this._page === 'home'}"></page-home>
      <page-view1 class="page" ?active="${this._page === 'view1'}"></page-view1>
      <page-view2 class="page" ?active="${this._page === 'view2'}"></page-view2>
      <page-view3 class="page" ?active="${this._page === 'view3'}"></page-view3>
      <page-view404 class="page" ?active="${this._page === 'view404'}"></page-view404>
    </main>

    <footer>
      <p>Made with &hearts; by the Polymer team.</p>
    </footer>
    
    <snack-bar ?active="${this._snackbarOpened}">
        You are now ${this._offline ? 'OFFLINE' : 'ONLINE'}
    </snack-bar>
    `;
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 460px)`,
      () => store.dispatch(updateDrawerState(false)));
  }

  updated(changedProps) {
    if(changedProps.has('_page')) {
      const pageTitle = this.pwaTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
      })
    }
  }

  ready() {
    super.ready();

    /** unresolved  */
    this.removeAttribute('unresolved');
    console.log('READY >>> ')
  }

  _menuButtonClicked() {
    store.dispatch(updateDrawerState(true));
  }

  _drawerOpenedChanged(e) {
    store.dispatch(updateDrawerState(e.target.opened));
  }

  stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened; 
    this._drawerOpened = state.app.drawerOpened;
  }

}

// Register custom element definition using standard platform API
customElements.define('<%= pwaNameTag %>', <%= className %>);


