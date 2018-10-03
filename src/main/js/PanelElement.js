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
    let element = this;

    this.scope.onAppReady.then(() => {
      element.panelWidget = new PanelWidget(element, element.scope);
      element.render();
    });

  }

  render() {
    this.panelWidget.render();
  }
}

customElements.define('wkui-panel', PanelElement);

export default PanelElement;