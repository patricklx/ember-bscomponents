`import Ember from 'ember'`
`import TypeSupport from 'ember-cli-bscomponents/mixins/type'`
`import layout from './template'`

BsLabelComponent = Ember.Component.extend(TypeSupport,
  layout: layout
  tagName: 'span'
  classNames: ['label']
  classTypePrefix: 'label'
)

`export default BsLabelComponent`
