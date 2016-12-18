`import bsBindTooltip from 'ember-bscomponents/modifiers/bs-bind-tooltip'`
`import bsBindPopover from 'ember-bscomponents/modifiers/bs-bind-popover'`

initialize = (application) ->
  try
    glimmerEnv  = application.lookup('service:-glimmer-environment')
    glimmerEnv.builtInModifiers['bs-bind-tooltip'] = new bsBindPopover()
    glimmerEnv.builtInModifiers['bs-bind-popover'] = new bsBindPopover()

  return

SetupAllInitializer = {
  name: 'setup-bootstrap'
  initialize: initialize
}

`export {initialize}`
`export default SetupAllInitializer`
