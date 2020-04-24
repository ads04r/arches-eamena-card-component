define([
    'knockout',
    'viewmodels/card-component'
], function(ko, CardComponentViewModel) {

    var viewModel = function(params) {
        var self = this;
        this.card = params.card;
        this.form = params.form;
        this.expanded = ko.observable(true);
        this.data = ko.observableArray();

	for(i = 0; i < 100; i++) { this.data.push(ko.observable('')); } // still hacky

        this.saveValue = function(arg)
        {
            var index = arg();
            var value = this.data()[index]();
            var atile = this.card.tiles()[0];

            // At this point, if atile is undefined, we need to create it.
            if(atile == null)
            {
                var topcard = this.card; // Explicitly set this here so the callback can access it
                self.tile.save(null, function(tileData) {

                    var newcard = topcard.tiles()[0].cards[index];
                    var newtile = newcard.getNewTile();
                    var dataid = newtile.nodegroup_id;
                    newtile.data[dataid] = value;
                    newtile.save(null, function(created){ newcard.parent.selected(true); });
		});
            } else {

                var newcard = this.card.tiles()[0].cards[index];
                var newtile = newcard.getNewTile();
                var dataid = newtile.nodegroup_id;
                newtile.data[dataid] = value;
                newtile.save(null, function(created){ newcard.parent.selected(true); });
            }
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
