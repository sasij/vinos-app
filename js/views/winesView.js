var app = app || {};

(function($){

  var isPull = false;

  app.CollectionWinesView = Backbone.View.extend({

    template:_.template($("#lista").html()),

    initialize: function(){

      _.bindAll(this);

      app.coleccion_vinos.on("reset", this.switchAction, this);

      //$('.navbar li').on('click', this.changeNavbar);
    },

    events: {
      'click .ui-btn-right': 'addWine',
      'pulled #content': 'pullAction',
    },

    switchAction: function(){
      if(isPull === false)
        this.render();
      else{
        // $('#vinos').html('');
        $('#vinos').remove();
        $('#content').append('<ul data-role="listview" id="vinos">');
        //añado los elementos a la lista
        _.each(app.coleccion_vinos.models, function (item){
          this.renderVino(item);
        }, this);

        isPull = false;
        $(this.el).trigger( "pagecreate" );
        $('#vinos').listview("refresh");
        $('#content').scrollz('hidePullHeader');

      }
    },

    render:function (eventName) {
      var that = this;

      //Añado la cabecera
      $(this.el).html('\
        <div data-role="header">\
          <h1>Los vinos de sasij</h1>\
          <a href="#add" data-role="button" class="ui-btn-right" data-icon="plus" data-corners="false" data-iconpos="notext" data-theme="a"></a>\
        </div>');

      $(this.el).append('<div id="content" data-role="content" data-scrollz="pull">');
      //Creo la lista
      $('#content').append('<ul data-role="listview" id="vinos">');
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
      //app.router.navigate("/add", true);
    },

    pullAction: function(){
      isPull = true;
      app.coleccion_vinos.fetch();
      console.log("FIN PULL");

    }
});

})(jQuery);

