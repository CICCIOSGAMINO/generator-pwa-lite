import { html } from 'lit-element';
import { PageElement } from './page-element.mjs';
import { SharedStyles } from './shared-styles.mjs';

class PageView404 extends PageElement {

  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
      <section>
        <h1>Oops! You hit a 404!</h1>
        <p>This page is not a thing. 
          Head back <a href="/">to safety</a>
        </p>
      </section>
    `;
  }
}

window.customElements.define('page-view404', PageView404);
