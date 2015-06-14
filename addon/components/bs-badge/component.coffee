`import Ember from 'ember'`
`import TypeSupport from 'ember-cli-bscomponents/mixins/type'`

BsBadgeComponent = Ember.Component.extend(TypeSupport,
  layoutName: 'components/bs-badge'
  tagName: 'span'
  classNames: ['badge']
  classTypePrefix: 'badge'
)

`export default BsBadgeComponent`
