`import bsBindTooltip from 'ember-bscomponents/modifiers/bs-bind-tooltip'`
`import bsBindPopover from 'ember-bscomponents/modifiers/bs-bind-popover'`

initialize = (application) ->
  try
    container = Ember.__loader.require('container')
    options = application.lookup(container.privatize(['template-compiler:main']))
    options.resolver.resolver.builtInModifiers['bs-bind-tooltip'] = {
      manager: new bsBindTooltip()
    }
    options.resolver.resolver.builtInModifiers['bs-bind-popover'] = {
      manager: new bsBindPopover()
    }
  return

SetupAllInitializer = {
  name: 'setup-bootstrap'
  initialize: initialize
}

`export {initialize}`
`export default SetupAllInitializer`
