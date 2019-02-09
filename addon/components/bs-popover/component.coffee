`import Ember from 'ember'`
`import layout from './template'`


BsPopoverComponent = Ember.Component.extend({
  tooltipBoxManager: Ember.inject.service('tooltip-box-manager')
  layout: layout
  classNames: 'popover'
  classNameBindings: ['fade', 'in', 'realPlacement']
  attributeBindings: ['style']
  title: Ember.computed.alias('data.title')
  content: Ember.computed.alias('data.content')
  html: false
  delay: 0
  animation: true

  fade: Ember.computed.oneWay('animation')

  in: Ember.computed.oneWay('isVisible')

  placement: (->
    return @get('data.placement') or 'top'
  ).property('data.placement')

  $element: null
  $tip: null

  style: Ember.computed('content', 'realPlacement', 'isVisible', () ->
    return if not @$tip or not @get('isVisible')
    @$tip.css({
      top: 0
      left: 0
      display: 'block'
    }).addClass(@get('realPlacement'))
    placement = @get('realPlacement')
    pos = @getPosition()
    actualWidth = @$tip[0].offsetWidth
    actualHeight = @$tip[0].offsetHeight
    calculatedOffset = @getCalculatedOffset(placement, pos, actualWidth, actualHeight)
    return Ember.String.htmlSafe("top: #{calculatedOffset.top}px; left: #{calculatedOffset.left}px; display: block")
  )

  init: ->
    @_super()
    @set('html', @get('data.html') or false)
    @set('template', @get('data.template') isnt `undefined`)
    if @get('template')
      tpl = @get('data.template')
      @set('partialTemplateName', tpl)
    return

  didInsertElement: ->
    @$tip = @$()
    name = @get('tooltipBoxManager.attribute')
    name = '[' + name + '=\'' + @get('tip_id') + '\']'
    @$element = $(name)

    if @get('data.trigger') in ['hover', undefined] and @get('data.sticky')
      @$().on('mouseenter', () =>
        clearTimeout(@get('tooltipBoxManager.timeout'))
        return
      )

      @$().on('mouseleave', () =>
        @get('tooltipBoxManager').removeTip(@get('tip_id'))
        return
      )

    Ember.run.scheduleOnce('afterRender', this, @afterRender)
    @$().find('img').on('load', () =>
      @afterRender()
      return
    )
    return

  afterRender: ->
    this.set('isVisible', true)
    @notifyPropertyChange('content')
    return

  realPlacement: (->
    return null  unless @$tip
    placement = @get('placement') or ''
    autoToken = /\s?auto?\s?/i
    autoPlace = autoToken.test(placement)
    placement = placement.replace(autoToken, '') or 'top'  if autoPlace
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

      placement = (if placement is 'bottom' and pos.top + pos.height + actualHeight - docScroll > parentHeight then 'top' \
      else (if placement is 'top' and pos.top - docScroll - actualHeight < 0 then 'bottom' \
        else (if placement is 'right' and pos.right + actualWidth > parentWidth then 'left' \
          else (if placement is 'left' and pos.left - actualWidth < parentLeft then 'right'\
            else placement))))

    return placement
  ).property('placement', 'content')

  hasContent: () ->
    return @get('title')

  getPosition: ->
    el = @$element[0]
    pos = $.extend({}, (
      if (typeof el.getBoundingClientRect is 'function')
        el.getBoundingClientRect()
      else
        {
          width: el.offsetWidth
          height: el.offsetHeight
        }
    ), @$element.offset())
    return pos

  getCalculatedOffset: (placement, pos, actualWidth, actualHeight) ->
    if placement is 'bottom'
      return {
        top: pos.top + pos.height
        left: pos.left + pos.width / 2 - actualWidth / 2
      }
    else if placement is 'top'
      return {
        top: pos.top - actualHeight
        left: pos.left + pos.width / 2 - actualWidth / 2
      }
    else if placement is 'left'
      return {
        top: pos.top + pos.height / 2 - actualHeight / 2
        left: pos.left - actualWidth
      }
    else
      return {
        top: pos.top + pos.height / 2 - actualHeight / 2 # placement == 'right'
        left: pos.left + pos.width
      }

  actions: {
    close: () ->
      @get('tooltipBoxManager').removeTip(@get('tip_id'))
      return
  }
})

`export default BsPopoverComponent`








