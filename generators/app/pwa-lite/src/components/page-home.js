import { html } from 'lit-element';
import { PageElement } from './page-element.mjs';
import { SharedStyles } from './shared-styles.mjs';

class PageHome extends PageElement {

  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
      <section>
        <h2>Static page</h2>
        <p>This is a text-only page.</p>
        <p>It doesn't do anything other than display some static text.</p>
      </section>
      <section>
        <h2>Welcome</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac nisi orci. Maecenas sollicitudin diam </p>
      </section>
    `;
  }
}

window.customElements.define('page-home', PageHome);
