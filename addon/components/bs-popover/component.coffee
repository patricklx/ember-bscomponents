`import Ember from 'ember'`

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

`export default BsPopoverComponent`








