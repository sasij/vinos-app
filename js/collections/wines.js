var app = app || {};

(function($){

  app.ColeccionVinos = Backbone.Collection.extend({
    model: app.Vino,
    url : 'http://vinos-sasij.eu01.aws.af.cm/wines',
    //url: '/wines',

    parse: function(response, xhr) {
      _.map(response, function(item) {
        item.id = item._id;
        return item;
      });
      return response;
    }

  });

})(jQuery);