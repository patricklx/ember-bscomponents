


###
The tooltipBox controller is used to render the popovers into the named outlet "bs-tooltip-box"
with the template tooltip-box
###
TooltipBoxController = Ember.Controller.extend(
  popoversBinding: "TooltipBoxManager.popovers"
  tooltipsBinding: "TooltipBoxManager.tooltips"
)

###
The Manager is based on the code from the emberjs action helper.
the tooltip/popover helper sets the attribute TooltipBoxManager.attribute (currently: bootstrap-tip-id)
with an id that will be increased with each tip.
AfterRender the manager binds a function to each element containing the attribute "bootstrap-tip-id"
and on "willClearRender" it will be removed
###
TooltipBoxManager = Ember.Object.create(
  uuid: 0
  attribute: "bootstrap-tip-id"
  willSetup: false
  registeredTips: {}
  registerTip: (type, object, options, env) ->
    id = ++@uuid
    self = this
    @registeredTips[id] =
      id: id
      element: options.element
      data: object
      eventName: object.trigger or ((if type is "popover" then "click" else "hover"))
      bound: false
      type: type
      sticky: object.sticky
      show: ->
        self.showTip id
        return

      hide: ->
        self.hideTip id, true
        return

      toggle: ->
        self.toggleTip id
        return

    unless @willSetup
      @willSetup = true
      Ember.run.scheduleOnce "afterRender", this, ->
        self.setupBindings()
        return

    env.data.view.on "willClearRender", ->
      pop = TooltipBoxManager.removeTip id
      if pop then $(pop.element).unbind()
      delete TooltipBoxManager.registeredTips[id]
      return

    return id

  setupBindings: ->
    for i of @registeredTips
      pop = @registeredTips[i]
      if pop.bound is false
        pop.bound = true
        elem = $(pop.element)
        switch pop.eventName
          when "click"
            elem.on "click", $.proxy(pop.toggle, pop)
          when "hover"
            elem.on "mouseenter", $.proxy(pop.show, pop)
            elem.on "mouseleave", $.proxy(pop.hide, pop)
          when "focus"
            elem.on "focusin", $.proxy(pop.show, pop)
            elem.on "focusout", $.proxy(pop.hide, pop)
          when "manual"
            pop.data.addObserver "show", pop, (sender, key) ->
              value = sender.get(key)
              if value
                @show()
              else
                @hide()
              return

            @show()  if pop.data.show
    @willSetup = false
    return

  popovers: []
  tooltips: []
  showing: {}
  timeout: null
  showTip: (id) ->
    data = @registeredTips[id].data
    type = @registeredTips[id].type
    unless @showing[id]
      @showing[id] = true
      obj = Ember.Object.create(
        data: data
        tip_id: id
      )
      if type is "tooltip"
        @tooltips.pushObject obj
      else
        @popovers.pushObject obj
    return

  hideTip: (id, allowTimer) ->
    if @showing[id]
      data = @registeredTips[id].data
      if allowTimer and data.sticky
        @timedRemove id
      else
        @removeTip id
    return

  toggleTip: (id) ->
    if @showing[id]
      @hideTip id
    else
      @showTip id
    return

  timedRemove: (id) ->
    self = this
    @timeout = setTimeout(->
      self.removeTip id
      return
    , 100)
    return

  removeTip: (id) ->
    pop = @popovers.findProperty("tip_id", id) or @tooltips.findProperty("tip_id")
    @popovers.removeObject pop
    @tooltips.removeObject pop
    delete @showing[id]
    return pop

  addFromView: (view, type, object) ->
    unless view.attributeBindings.contains(TooltipBoxManager.attribute)
      console.warn "TooltipBoxManager.addFromView: You need to add \"TooltipBoxManager.attribute\" to the attributeBindings!"
      return
    options = {
      element: view.$()
    }
    env = {
      data: {
        view: view
      }
    }

    id = TooltipBoxManager.registerTip(type, object, options, env)
    view.set TooltipBoxManager.attribute, id
    return
)
#
#Ember.HTMLBars.registerHelper "bs-bind-popover", (path) ->
#    options = arguments[arguments.length - 1]
#    object = this
#    object = TooltipBoxManager.helper.call(this, path, object, options)
#    id = TooltipBoxManager.registerTip("popover", object, options)
#    new Ember.HTMLBars.SafeString(TooltipBoxManager.attribute + "='" + id + "'")
#
#Ember.HTMLBars.registerHelper "bs-bind-tooltip", (path) ->
#    options = arguments[arguments.length - 1]
#    object = this
#    object = TooltipBoxManager.helper.call(this, path, object, options)
#    id = TooltipBoxManager.registerTip("tooltip", object, options)
#    new Ember.HTMLBars.SafeString(TooltipBoxManager.attribute + "='" + id + "'")

Ember.HTMLBars._registerHelper "bs-bind-popover", (params, hash, options, env) ->
  newHash = {}
  for k,v of hash
    if v.isStream
      newHash[k+"Binding"] = v
    else
      newHash[k] = v
  hash = Ember.Object.create(newHash)

  id = TooltipBoxManager.registerTip("popover", hash, options, env)
  env.dom.setAttribute(options.element, TooltipBoxManager.attribute, id)
  return


Ember.HTMLBars._registerHelper "bs-bind-tooltip", (params, hash, options, env) ->
  newHash = {}
  for k,v of hash
    v = hash[k]
    if v.isStream
      newHash[k+"Binding"] = v
    else
      newHash[k] = v
  hash = Ember.Object.create(newHash)

  id = TooltipBoxManager.registerTip("tooltip", hash, options, env)
  env.dom.setAttribute(options.element, TooltipBoxManager.attribute, id)
  return
