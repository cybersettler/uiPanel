const PanelWidget = require('./PanelWidget.js');

function PanelController(view, scope) {
    this.super(view, scope);
    var controller = this;

    scope.onAttached.then(function() {
        var bindingAttributes = [];

        if (view.hasAttribute('data-model')) {
            bindingAttributes.push('model');
        }

        if (view.hasAttribute('data-display')) {
            bindingAttributes.push('display');
        }

        scope.bindAttributes(bindingAttributes);

        controller.panelWidget = new PanelWidget(view, scope);
        controller.panelWidget.render();
    });

    this.render = function() {
        this.panelWidget.render();
    };
}

module.exports = PanelController;