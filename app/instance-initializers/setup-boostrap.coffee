`import bsBindTooltip from 'ember-bscomponents/modifiers/bs-bind-tooltip'`
`import bsBindPopover from 'ember-bscomponents/modifiers/bs-bind-popover'`

initialize = (application) ->
  try
    container = Ember.__loader.require('container')
    options = application.lookup(container.privatize(['template-options:main']))
    options.resolver.resolver.builtInModifiers['bs-bind-tooltip'] = new bsBindTooltip()
    options.resolver.resolver.builtInModifiers['bs-bind-popover'] = new bsBindPopover()

  return

SetupAllInitializer = {
  name: 'setup-bootstrap'
  initialize: initialize
}

`export {initialize}`
`export default SetupAllInitializer`
