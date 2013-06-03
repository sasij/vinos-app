var app = app || {};

(function($){

  app.ColeccionVinos = Backbone.Collection.extend({
    model: app.Vino,
    url : 'http://sasij-vinos.eu01.aws.af.cm/wines',
    //url: '/wines',

    fetch : function() {
      // store reference for this collection
      var collection = this;
      $.ajax({
        type : 'GET',
        url : this.url,
        dataType : 'json',
        success : function(data) {
          app.vinos = data;
          // set collection data (assuming you have retrieved a json object)
          $('#Todos').on('click', app.vista_coleccion_vinos.filterByTodos);
          $('#Tinto').on('click', app.vista_coleccion_vinos.filterByTinto);
          $('#Rosado').on('click', app.vista_coleccion_vinos.filterByRosado);
          $('#Blanco').on('click', app.vista_coleccion_vinos.filterByBlanco);

          collection.reset(data);
        }
      });
    },

    parse: function(response, xhr) {
      _.map(response, function(item) {
        item.id = item._id;
        return item;
      });
      return response;
    }

  });

})(jQuery);