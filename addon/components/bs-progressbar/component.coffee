`import Ember from 'ember'`
`import TypeSupport from 'ember-cli-bscomponents/mixins/type'`

BsProgressbarComponent = Ember.Component.extend(TypeSupport,
    layoutName: 'components/bs-progressbar'
    classNames: ['progress-bar']
    attributeBindings: ['style', 'role', 'aria-valuemin', 'ariaValueNow:aria-valuenow', 'aria-valuemax']
    classTypePrefix: 'progress-bar'
    role: 'progressbar'
    'aria-valuemin': 0
    'aria-valuemax': 100

    init: ->
        @._super()

    style: ( ->
        "width:#{@progress}%;"
    ).property('progress')

    ariaValueNow: ( ->
        @progress
    ).property('progress')
)


