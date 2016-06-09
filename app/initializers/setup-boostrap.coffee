`import bsBindTooltip from 'ember-cli-bscomponents/keywords/bs-bind-tooltip'`
`import bsBindPopover from 'ember-cli-bscomponents/keywords/bs-bind-popover'`

initialize = (application) ->
  registerKeyword  = Ember.__loader.require("ember-htmlbars/keywords").registerKeyword
  registerKeyword('bs-bind-tooltip', bsBindTooltip)
  registerKeyword('bs-bind-popover', bsBindPopover)
  return

SetupAllInitializer =
  name: 'setup-bootstrap'
  initialize: initialize

`export {initialize}`
`export default SetupAllInitializer`
