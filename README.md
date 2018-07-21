# uiPanel

> Panel component for websemble application

## Getting started

Include UI Panel in your project dependencies
(see [websemble generator]
  (https://github.com/cybersettler/generator-websemble/wiki)).
In your project's bower.json:

```json
{
  "dependencies": {
    "uiPanel": "cybersettler/uiPanel"
  }
}
```
## Usage

```html
<ui-panel class="panel-default">
    <div class="panel-heading">
        {{i18n 'mypanel.title'}}
    </div>
    <div class="panel-body">
        <p>{{i18n 'firstname'}}: {{model.firstname}}</p>p
        <p>{{i18n 'lastname'}}: {{model.lastname}}</p>
    </div>
</ui-panel>
```

## Supported style classes

* panel-default
* panel-primary
* panel-success
* panel-info
* panel-warning
* panel-danger

## API

### data-model

Data to be used to display panel.

### data-display

The following properties are supported:

* __heading__(string): Header template
* __body__(string): Body template
* __footer__(string): Footer template