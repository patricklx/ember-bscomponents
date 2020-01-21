`import Ember from 'ember'`

instance = null
###
The Manager is based on the code from the emberjs action helper.
the tooltip/popover helper sets the attribute TooltipBoxManager.attribute (currently: bootstrap-tip-id)
with an id that will be increased with each tip.
AfterRender the manager binds a function to each element containing the attribute 'bootstrap-tip-id'
and on 'willClearRender' it will be removed
###
TooltipBoxManager = Ember.Service.extend({
  uuid: 0
  attribute: 'bootstrap-tip-id'
  willSetup: false
  registeredTips: {}
  init: (args...) ->
    instance = this
    return this._super(args...)

  unregisterTip: (id) ->
    elem = @registeredTips[id].element
    @removeTip(id)
    $(elem).unbind()
    delete @registeredTips[id]
    return

  registerTip: (type, object, target, view) ->
    id = ++@uuid
    self = this
    object.elementId = 'bs-tip-' + id;
    object.target = target;
    @registeredTips[id] = {
      id: id
      view: view
      element: target
      data: object
      eventName: object.trigger or ((if type is 'popover' then 'click' else 'hover'))
      bound: false
      type: type
      sticky: object.sticky
      show: () ->
        self.showTip(id)
        return

      hide: () ->
        self.hideTip(id, true)
        return

      toggle: () ->
        self.toggleTip(id)
        return
    }

    unless @willSetup
      @willSetup = true
      Ember.run.scheduleOnce('afterRender', this, () ->
        self.setupBindings()
        return
      )

    view.on('willClearRender', () ->
      pop = instance.removeTip(id)
      if pop then $(pop.element).unbind()
      delete instance.registeredTips[id]
      return
    )

    return id

  setupBindings: ->
    for i of @registeredTips
      pop = @registeredTips[i]
      if pop.bound is false
        pop.bound = true
        elem = $(pop.element)
        switch pop.eventName
          when 'click'
            elem.on('click', $.proxy(pop.toggle, pop))
          when 'hover'
            elem.on('mouseenter', $.proxy(pop.show, pop))
            elem.on('mouseleave', $.proxy(pop.hide, pop))
          when 'focus'
            elem.on('focusin', $.proxy(pop.show, pop))
            elem.on('focusout', $.proxy(pop.hide, pop))
          when 'manual'
            Ember.addObserver(pop.data, 'show', pop, (sender, key) ->
              value = sender.get(key)
              if value
                pop.show()
              else
                pop.hide()
              return
            )
        pop.show()  if pop.data.show
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
      obj = Ember.Object.create({
        data: data
        tip_id: id
        didInsert: () => Ember.set(@registeredTips[id].view, 'wormholeId', @registeredTips[id].data.elementId)
        didRemove: () => Ember.set(@registeredTips[id].view, 'wormholeId', null)
      })
      if type is 'tooltip'
        @tooltips.pushObject(obj)
      else
        @popovers.pushObject(obj)
    return

  hideTip: (id, allowTimer) ->
    if @showing[id]
      data = @registeredTips[id].data
      if allowTimer and data.sticky
        @timedRemove(id)
      else
        @removeTip(id)
    return

  toggleTip: (id) ->
    if @showing[id]
      @hideTip(id)
    else
      @showTip(id)
    return

  timedRemove: (id) ->
    self = this
    @timeout = setTimeout(() ->
      self.removeTip(id)
      return
    , 100)
    return

  removeTip: (id) ->
    pop = @popovers.findBy('tip_id', id) or @tooltips.findBy('tip_id')
    if pop
      pop.didRemove()
    @popovers.removeObject(pop)
    @tooltips.removeObject(pop)
    delete @showing[id]
    return pop

  addFromView: (view, type, object) ->
    unless view.attributeBindings.includes(instance.attribute)
      console.warn('TooltipBoxManager.addFromView: You need to add "TooltipBoxManager.attribute" to the attributeBindings!')
      return

    element = view.$()

    id = instance.registerTip(type, object, element, view)
    view.set(instance.attribute, id)
    return
})

`export default TooltipBoxManager`
