`import Ember from 'ember'`
`import TypeSupport from 'ember-cli-bscomponents/mixins/type'`

BsLabelComponent = Ember.Component.extend(TypeSupport,
    layoutName: 'components/bs-label'
    tagName: 'span'
    classNames: ['label']
    classTypePrefix: 'label'
)

`export default BsLabelComponent`
