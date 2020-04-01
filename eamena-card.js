define([
    'knockout',
    'viewmodels/card-component'
], function(ko, CardComponentViewModel) {

    var viewModel = function(params) {
        var self = this;
        this.card = params.card;
        this.form = params.form;
        this.expanded = ko.observable(true);

        this.saveValue = function(arg)
        {
            var index = arg();
            var tiles = this.card.tiles()[0].cards[index].tiles();

            var newtile = this.card.tiles()[0].cards[index].getNewTile();
            var dataid = newtile.nodegroup_id;
            newtile.data[dataid] = "Temporary value";
            newtile.save();
        };

        params.configKeys = ['selectSource', 'selectSourceLayer'];

        CardComponentViewModel.apply(this, [params]);
    };
    return ko.components.register('eamena-card', {
        viewModel: viewModel,
        template: {
            require: 'text!templates/views/components/card_components/eamena-card.htm'
        }
    });
});
