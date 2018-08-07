/** 
 * @license
 * Copyright (c) 2018 @author @cicciosgamino. All rights reserved.
 * This code may only be used under the license found at https://github.com/CICCIOSGAMINO/LICENSE.txt
*/

import { html } from '@polymer/lit-element';

export const SharedStyles = html`

  <style>
    /** Main */ 
    --app-primary-color: <%= themeColor %>;
    --app-secondary-color: <%= secondaryColor %>;
    --app-accent-color: <%= accentColor %>;

    /** Header */ 
    --app-header-background-color: var(--app-primary-color);
    --app-header-text-color: pink;

    --paper-button-ink-color: var(--app-accent-color);
    --paper-icon-button-ink-color: var(--app-accent-color);
    --paper-spinner-color: var(--app-accent-color);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    
  </style>

`