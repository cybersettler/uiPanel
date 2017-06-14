const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const expect = require('chai').expect;
const PanelWidget = require("../../../../component/ui/Panel/PanelWidget.js");
var view;
var model;
var schema;
var display;
const scope = {
    getModel: function() {
        return Promise.resolve(model);
    }
};

describe('PanelWidget', function() {
    describe('#render()', function() {
        before(function() {
            document = (new JSDOM('<!DOCTYPE html><html><bod></body></html>')).window.document;
        });
        beforeEach(function() {
            model = null;
            schema = null;
            display = null;
        });
        it('should generate panel from content', function(done) {
            givenModel();
            givenViewWithContent('{{ model.name }}');
            let modelValue = "/contact/1";
            view.setAttribute('data-model', modelValue);
            view.dataset.model = modelValue;
            let widget = new PanelWidget(view, scope);
            widget.render().then(function() {
                let panel = view.shadowRoot.querySelector('.panel');
                let panelBody = panel.querySelector('.panel-body');
                expect(panelBody).to.exist;
                expect(panelBody.textContent).to.equal('test');
                done();
            }).catch(done);
        });
    });
});

function givenModel() {
    model = {
        name: 'test'
    };
}

function givenEmptyView() {
    view = document.createElement('div');
    let panel = document.createElement('div');
    panel.classList.add('panel');
    view.shadowRoot = createShadowRoot();
    view.shadowRoot.appendChild(panel);
    view.dataset = {};
}

function givenViewWithContent(content) {
    givenEmptyView();
    var panelBody = document.createElement('div');
    panelBody.classList.add('panel-body');
    panelBody.innerHTML = content;
    view.appendChild(panelBody);
}

function createShadowRoot() {
    return document.createElement('div');
}