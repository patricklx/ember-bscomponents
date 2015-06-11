BsPills = ItemsView.extend(Nav,
    navType: 'pills'
    classNameBindings: ['stacked:nav-stacked', 'justified:nav-justified']
    attributeBindings: ['style']

    itemViewClass: BsPill
)

Ember.Handlebars.helper 'bs-pills', BsPills
