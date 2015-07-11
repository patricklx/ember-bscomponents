`import Ember from 'ember'`
`import TypeSupport from 'ember-cli-bscomponents/mixins/type'`
`import layout from './template'`

BsBadgeComponent = Ember.Component.extend(TypeSupport, {
  layout: layout
  tagName: 'span'
  classNames: ['badge']
  classTypePrefix: 'badge'
})

`export default BsBadgeComponent`
