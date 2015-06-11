#Contributed by: patricklx https://github.com/patricklx
popoverTemplate =
"""
    <div class="arrow"></div>
    {{#if title}}<h3 class="popover-title">{{title}}</h3>{{/if}}
    <div class="popover-content">
    {{#if template}}
       {{partial partialTemplateName}}
    {{else}}
       {{#if content}}
           {{#if html}}
               {{{content}}}
           {{else}}
               {{content}}
           {{/if}}
       {{else}}
           {{yield}}
       {{/if}}
    {{/if}}
    </div>
"""

Ember.TEMPLATES["components/bs-popover"] = Ember.HTMLBars.compile(popoverTemplate)

Ember.TEMPLATES["components/bs-tooltip"] = Ember.HTMLBars.compile(tooltipTemplate)

BsPopoverComponent = Ember.Component.extend(
    layoutName: 'components/bs-popover'
    classNames: "popover"
    classNameBindings: ["fade", "in", "realPlacement"]
    titleBinding: "data.title"
    content: Ember.computed.alias('data.content')
    html: false
    delay: 0
    animation: true

    fade: Ember.computed.oneWay("animation")

    in: Ember.computed.oneWay("isVisible")

    placement: (->
        @get("data.placement") or "top"
    ).property("data.placement")

    $element: null
    $tip: null
    inserted: false

    styleUpdater: (->
        return  if not @$tip or not @get("isVisible")
        @$tip.css(
            top: 0
            left: 0
            display: "block"
        ).addClass @get("realPlacement")
        placement = @get("realPlacement")
        pos = @getPosition()
        actualWidth = @$tip[0].offsetWidth
        actualHeight = @$tip[0].offsetHeight
        calculatedOffset = @getCalculatedOffset(placement, pos, actualWidth, actualHeight)
        @$tip.css "top", calculatedOffset.top
        @$tip.css "left", calculatedOffset.left

        if @firstTime
            @firstTime = false
            @styleUpdater()
            @firstTime = true
    ).observes("content", "realPlacement", "inserted", "isVisible")

    init: ->
        @_super()
        @set "html", @get("data.html") or false
        @set "template", @get("data.template") isnt `undefined`
        if @get("template")
            name = "components/bs-popover/_partial-content-" + @get("tip_id")
            tpl = @get("data.template")
            if typeof tpl is "object"
                Ember.TEMPLATES[name] = tpl
            else
                Ember.TEMPLATES[name] = Ember.HTMLBars.compile(tpl)
            @set "partialTemplateName", name

    didInsertElement: ->
        @$tip = @$()
        name = TooltipBoxManager.attribute
        name = "[" + name + "='" + @get("tip_id") + "']"
        @$element = $(name)
        @set "inserted", true

        if @get("data.trigger") is "hover" and @get("data.sticky")
            @$().on "mouseenter", ->
                clearTimeout TooltipBoxManager.timeout

            @$().on "mouseleave", =>
                TooltipBoxManager.removeTip @get("tip_id")

        Ember.run.scheduleOnce 'afterRender', this, @afterRender
        @$().find("img").load =>
            @afterRender()

    afterRender: ->
        @notifyPropertyChange "content"

    realPlacement: (->
        return null  unless @$tip
        placement = @get("placement") or ""
        autoToken = /\s?auto?\s?/i
        autoPlace = autoToken.test(placement)
        placement = placement.replace(autoToken, "") or "top"  if autoPlace
        pos = @getPosition()
        actualWidth = @$tip[0].offsetWidth
        actualHeight = @$tip[0].offsetHeight

        if autoPlace
            $parent = @$element.parent()
            orgPlacement = placement
            docScroll = document.documentElement.scrollTop or document.body.scrollTop
            parentWidth = window.innerWidth
            parentHeight = window.innerHeight
            parentLeft = 0

            placement = (if placement is "bottom" and pos.top + pos.height + actualHeight - docScroll > parentHeight then "top" else (if placement is "top" and pos.top - docScroll - actualHeight < 0 then "bottom" else (if placement is "right" and pos.right + actualWidth > parentWidth then "left" else (if placement is "left" and pos.left - actualWidth < parentLeft then "right" else placement))))

        return placement
    ).property("placement", "inserted")

    hasContent: ->
        @get "title"

    getPosition: ->
        el = @$element[0]
        $.extend {}, (
            if (typeof el.getBoundingClientRect is "function")
                el.getBoundingClientRect()
            else
                width: el.offsetWidth
                height: el.offsetHeight
        ), @$element.offset()

    getCalculatedOffset: (placement, pos, actualWidth, actualHeight) ->
        if placement is "bottom"
            top: pos.top + pos.height
            left: pos.left + pos.width / 2 - actualWidth / 2
        else if placement is "top"
            top: pos.top - actualHeight
            left: pos.left + pos.width / 2 - actualWidth / 2
        else if placement is "left"
            top: pos.top + pos.height / 2 - actualHeight / 2
            left: pos.left - actualWidth
        else
            top: pos.top + pos.height / 2 - actualHeight / 2 # placement == 'right'
            left: pos.left + pos.width

    actions:
        close: ->
            TooltipBoxManager.removeTip @get("tip_id")
)

Ember.Handlebars.helper 'bs-popover', BsPopoverComponent

BsTooltipComponent = BsPopoverComponent.extend(
    classNames: "tooltip"
    layoutName: 'components/bs-tooltip'
    init: ->
        @_super()
        @classNames.removeObject "popover"
        @set "content", @get("content") or @get("title")
)

Ember.Handlebars.helper 'bs-tooltip', BsTooltipComponent












###
The tooltipBox controller is used to render the popovers into the named outlet "bs-tooltip-box"
with the template tooltip-box
###
TooltipBoxController = Ember.Controller.extend(
  popoversBinding: "TooltipBoxManager.popovers"
  tooltipsBinding: "TooltipBoxManager.tooltips"
)

template = "" +
    "{{#each pop in popovers}}" +
    "   {{bs-popover" +
    "       tip_id=pop.tip_id" +
    "       data=pop.data" +
    "   }}" +
    "{{/each}}" +
    "{{#each pop in tooltips}}" +
    "   {{bs-tooltip" +
    "       tip_id=pop.tip_id" +
    "       data=pop.data" +
    "   }}" +
    "{{/each}}"

Ember.TEMPLATES["bs-tooltip-box"] = Ember.HTMLBars.compile(template)

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
