# Ember-cli-bscomponents

This addon is based on bootstrap-for-ember with some changes

to use Modals include 
`{{bs-modal-handler}}`
into your application template

afterwards you can use the service `modal-manager` to call `open(...)`

this function receives `modal, context, properties`
where

* modal - the path to the folder containing either a component or controller/view combination
* context - the target to which actions will be send
* properties - some properties that will be set on the controller or on the `attr` object of a component

to use tooltips include 
`{{bs-tooltipbox-handler}}`
into your application template

then use the `bs-bind-tooltip` or ``bs-bind-popover` in a template 

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
