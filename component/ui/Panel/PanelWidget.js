function PanelWidget(view, scope) {
    this.view = view;
    this.scope = scope;

    let heading = view.querySelector('.panel-heading');
    let body = view.querySelector('.panel-body');
    let list = view.querySelector('.panel-list');
    let table = view.querySelector('.panel-table');
    let footer = view.querySelector('.panel-footer');

    if (heading) {
        this.renderHeadingTemplate = scope.templateEngine.compile(heading.innerHTML);
    }

    if (body) {
        this.renderBodyTemplate = scope.templateEngine.compile(body.innerHTML);
    }

    if (list) {
        this.renderListTemplate = scope.templateEngine.compile(list.innerHTML);
    }

    if (table) {
        this.renderTableTemplate = scope.templateEngine.compile(table.innerHTML);
    }

    if (footer) {
        this.renderFooterTemplate = scope.templateEngine.compile(footer.innerHTML);
    }

    this.heading = heading;
    this.body = body;
    this.listGroup = list;
    this.table = table;
    this.footer = footer;

}

PanelWidget.prototype.render = function() {
    return this.fetchData().then(renderPanel);
};

PanelWidget.prototype.fetchData = function() {
    var promises = [];
    var widget = this;

    promises.push(widget.scope.onAppReady);

    if (this.view.hasAttribute('data-model')) {
        promises.push(
            this.scope.getModel().then(function(result) {
                widget.model = result;
            })
        );
    }

    if (this.view.hasAttribute('data-display')) {
        promises.push(
            this.scope.getDisplay().then(function(result) {
                widget.display = result;
            })
        );
    }

    return Promise.all(promises).then(function() {
        return widget;
    });
};

function renderPanel(widget) {

    if (widget.display) {
        renderPanelFromDisplay(widget);
    } else {
        renderPanelFromContent(widget);
    }
}

function renderPanelFromContent(widget) {
    let data = {
        model: widget.model
    };

    if (widget.heading) {
        widget.heading.innerHTML = widget.renderHeadingTemplate(data);
    }

    if (widget.body) {
        widget.body.innerHTML = widget.renderBodyTemplate(data);
    }

    if (widget.listGroup) {
        widget.listGroup.innerHTML = widget.renderListTemplate(data);
    }

    if (widget.table) {
        widget.table.innerHTML = widget.renderTableTemplate(data);
    }

    if (widget.footer) {
        widget.footer.innerHTML = widget.renderFooterTemplate(data);
    }
}

function renderPanelFromDisplay(widget) {
    renderPanelheadingFromDisplay(widget);
    renderPanelBodyFromDisplay(widget);
    renderPanelFooterFromDisplay(widget);
}

function renderPanelheadingFromDisplay(widget) {
    if (!widget.display.heading) {
        return;
    }
    if (!widget.heading) {
        let heading = document.createElement('div');
        heading.classList.add('panel-heading');
        widget.heading = heading;
    }
    widget.heading.innerHTML = widget.scope.templateEngine.render(
        widget.display.heading, {model: widget.model});
}

function renderPanelBodyFromDisplay(widget) {
    if (!widget.display.body) {
        return;
    }
    if (!widget.body) {
        let body = document.createElement('div');
        body.classList.add('panel-heading');
        widget.body = body;
    }
    widget.body.innerHTML = widget.scope.templateEngine.render(
        widget.display.body, {model: widget.model});
}

function renderPanelFooterFromDisplay(widget) {
    if (!widget.display.footer) {
        return;
    }
    if (!widget.footer) {
        let footer = document.createElement('div');
        footer.classList.add('panel-footer');
        widget.footer = footer;
    }
    widget.footer.innerHTML = widget.scope.templateEngine.render(
        widget.display.footer, {model: widget.model});
}

module.exports = PanelWidget;