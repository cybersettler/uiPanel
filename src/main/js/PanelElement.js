import {FragmentElement} from '/node_modules/weldkit/index.js';
import PanelWidget from './PanelWidget.js';

class PanelElement extends FragmentElement {

  static get observedAttributes() {
    return ['data-model', 'data-display'];
  }
  /**
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Connected callback
   */
  connectedCallback() {
    console.log('Panel element attached');

    let bindingAttributes = [];

    if (this.hasAttribute('data-model')) {
      bindingAttributes.push('model');
    }

    if (this.hasAttribute('data-display')) {
      bindingAttributes.push('display');
    }

    this.scope.bindAttributes(bindingAttributes);

    this.panelWidget = new PanelWidget(this, this.scope);
    this.render();
  }

  render() {
    this.panelWidget.render();
  }
}

customElements.define('ui-panel', PanelElement);

export default PanelElement;