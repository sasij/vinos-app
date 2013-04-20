var app = app || {};

(function($){

  app.CollectionWinesView = Backbone.View.extend({

    //template: $("#vinoTemplate").html(),

    template:_.template($("#lista").html()),

    initialize: function(){

      _.bindAll(this);

      app.coleccion_vinos.on("reset", this.render, this);

      //$('.navbar li').on('click', this.changeNavbar);
    },

    events: {
      'click .ui-btn-right': 'addWine'
    },

    render:function (eventName) {
      var that = this;

      //Añado la cabecera
      $(this.el).html('\
        <div data-role="header">\
          <h1>Los vinos de sasij</h1>\
          <a data-role="button" class="ui-btn-right" data-icon="plus" data-corners="false" data-iconpos="notext" data-theme="a"></a>\
        </div>');
      //Creo la lista
      $(this.el).append('<ul data-role="listview" id="vinos">');
      //añado los elementos a la lista
      _.each(app.coleccion_vinos.models, function (item){
        that.renderVino(item);
      }, this);
      //Esto permite recargar la vista para que coja los estilos de jQuery mobile
      $(this.el).trigger( "pagecreate" );
      $('#vinos').listview("refresh");

      //Cuando esta la colecciona cargada quito el elemento de carga
      if(app.coleccion_vinos.length > 0)
        $.mobile.hidePageLoadingMsg();

      return this;
    },

    renderVino: function(item){
      app.vistaVino = new app.VistaVino({
        model: item
      });
      $('#vinos').append(app.vistaVino.render().el);
    },

    addWine: function(){
      console.log("dentro");
      app.router.navigate("/add", {trigger: true, replace: true});
    }
});

})(jQuery);

