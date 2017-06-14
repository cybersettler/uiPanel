const Handlebars = require('Handlebars');

function PanelWidget(view, scope) {
    this.view = view;
    this.scope = scope;
    this.template = Handlebars.compile(view.innerHTML);
    this.panel = view.shadowRoot.querySelector('.panel');
}

PanelWidget.prototype.render = function() {
    return this.fetchData().then(renderPanel);
};

PanelWidget.prototype.fetchData = function() {
    var promises = [];
    var widget = this;

    if (this.view.hasAttribute('data-model')) {
        promises.push(
            this.scope.getModel().then(function(result) {
                widget.model = result;
            })
        );
    }

    if (this.view.hasAttribute('data-context')) {
        promises.push(
            this.scope.getContext().then(function(result) {
                widget.context = result;
            })
        );
    }

    return Promise.all(promises).then(function() {
        return widget;
    });
};

function renderPanel(widget) {
    widget.panel.innerHTML = widget.template({
        model: widget.model
    });
}

module.exports = PanelWidget;