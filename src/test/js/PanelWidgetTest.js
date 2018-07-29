const {JSDOM} = require('jsdom');
const i18next = require('i18next');
const Handlebars = require('Handlebars');
const expect = require('chai').expect;
const SystemJS = require('systemjs');

let PanelWidget;
let view;
let model;
let display;

const scope = {
  getModel: function() {
    return Promise.resolve(model);
  },
  getDisplay: function() {
    return Promise.resolve(display);
  },
};

const translations = {
  lng: 'en',
  resources: {
    en: {
      translation: {
        user: {
          firstname: 'First name',
          lastname: 'Last name',
          profile: 'Profile',
        },
        login: {
          option: {
            login: 'Log in',
            logout: 'Log out',
          },
          status: {
            anonymous: 'anonymous',
          },
        },
        system: {
          option: {
            settings: 'Settings',
          },
        },
      },
    },
  },
};

describe('PanelWidget', function() {
  describe('#render()', function() {
    before(function(done) {
      let dom = new JSDOM('<!DOCTYPE html><html><bod></body></html>');
      document = dom.window.document;

      SystemJS.config({
        transpiler: false
      });

      scope.templateEngine = {
        render: function(template, data) {
          let doRender = Handlebars.compile(template);
          return doRender(data);
        },
        compile: function(template) {
          return Handlebars.compile(template);
        },
      };

      SystemJS.import('src/main/js/PanelWidget.js').then((module) => {
        PanelWidget = module;
        i18next.init(translations, (err, t) => {
          Handlebars.registerHelper('i18n', function(key, opt) {
            return t(key, opt);
          });
          done(err);
        });
      }, done);
    });
    beforeEach(function() {
      model = null;
      display = null;
    });
    it('should generate panel from content', function(done) {
      givenModel();
      givenViewWithContent();
      let modelValue = '/contact/1';
      view.setAttribute('data-model', modelValue);
      view.dataset.model = modelValue;

      let widget = new PanelWidget(view, scope);
      widget.render().then(function() {
        let header = view.querySelector('.panel-heading');
        let body = view.querySelector('.panel-body');
        let footer = view.querySelector('.panel-footer');
        expect(header).to.exist;
        expect(body).to.exist;
        expect(footer).to.exist;
        expect(header.textContent).to.equal('Profile');
        expect(body.textContent).to.equal('Bruce Banner');
        expect(footer.textContent).to.equal('Log out');
        done();
      }).catch(done);
    });
    it('should generate panel from display', function(done) {
      givenModel();
      givenDisplay();
      let modelValue = '/contact/1';
      let displayValue = '{display}';
      view.setAttribute('data-model', modelValue);
      view.setAttribute('data-display', displayValue);
      view.dataset.model = modelValue;
      view.dataset.display = displayValue;

      let widget = new PanelWidget(view, scope);
      widget.render().then(function() {
        let header = view.querySelector('.panel-heading');
        let body = view.querySelector('.panel-body');
        let footer = view.querySelector('.panel-footer');
        expect(header).to.exist;
        expect(body).to.exist;
        expect(footer).to.exist;
        expect(header.textContent).to.equal('Profile');
        expect(body.textContent).to.equal('Bruce Banner');
        expect(footer.textContent).to.equal('Log out');
        done();
      }).catch(done);
    });
  });
});

function givenModel() {
  model = {
    name: 'Bruce Banner',
  };
}

function givenDisplay() {
  display = {
    heading: '{{i18n \'user.profile\'}}',
    body: '{{model.name}}',
    footer: '{{i18n \'login.option.logout\'}}',
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

function givenViewWithContent() {
  givenEmptyView();
  let panelHeader = document.createElement('div');
  panelHeader.classList.add('panel-heading');
  let panelBody = document.createElement('div');
  panelBody.classList.add('panel-body');
  let panelFooter = document.createElement('div');
  panelFooter.classList.add('panel-footer');
  panelHeader.textContent = '{{i18n \'user.profile\'}}';
  panelBody.textContent = '{{ model.name }}';
  panelFooter.textContent = '{{i18n \'login.option.logout\'}}';

  view.appendChild(panelHeader);
  view.appendChild(panelBody);
  view.appendChild(panelFooter);
}

function createShadowRoot() {
  return document.createElement('div');
}