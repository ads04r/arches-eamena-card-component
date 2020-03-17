define([
    'knockout',
    'viewmodels/card-component'
], function(ko, CardComponentViewModel) {
    return ko.components.register('eamena-card', {
        viewModel: CardComponentViewModel,
        template: {
            require: 'text!templates/views/components/card_components/eamena-card.htm'
        }
    });
});
