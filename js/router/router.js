var app = app || {};

(function($){

  //Paso jQuery al router de la funcion
  app.Router = Backbone.Router.extend({

    routes:{
      "" : "collection",
      "index" : "collection",
      "add" : "addWines",
      "id/:identificator" : "viewDetail"
      //"filter/:color" : "urlFilter",

    },

    initialize: function(){
      self = this;
      window.inicio = true;
      // Handle back button throughout the application
      $('.back').live('click', function(event) {
        event.preventDefault();
        self.back = true;
        window.history.back();
        return false;
      });
    },

    // actions for index
    collection: function() {
      console.log("coleccion");
      //app.collection_view = new app.CollectionView();
      //this.changePage(app.collection_view);
      $.mobile.showPageLoadingMsg();
      app.coleccion_vinos = new app.ColeccionVinos();
      app.vista_coleccion_vinos = new app.CollectionWinesView({collection: this.coleccion_vinos});
      app.coleccion_vinos.fetch();
      app.vista_coleccion_vinos.render();
      this.changePage(app.vista_coleccion_vinos);
    },

    addWines: function(){
      console.log("Nuevo vino");
      app.vista_nuevo_vino = new app.VistaNuevoVino();
      this.changePage(app.vista_nuevo_vino);
    },

    viewDetail: function(identificator){
      console.log("Vista detalle");
      app.vino = new app.Vino({id:identificator});
      app.vista_detallada_vino = new app.VistaDetalleVino({model:app.vino});
      app.vino.fetch();
      //app.vista_detallada_vino.render();
      this.changePage(app.vista_detallada_vino);
    },

    changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();

        $('body').append('<div id="menu" style="display: none;">\
  <h3>Menu</h3>\
  <ul>\
    <li class="active"><a href="#home" class="contentLink">Home </a></li>\
    <li><a href="#home" class="contentLink">About </a></li>\
    <li><a href="#home" class="contentLink">Portfolio </a></li>\
    <li><a href="#home" class="contentLink">Contact </a></li>\
  </ul>\
</div>');
        $('body').append($(page.el));

        //var transition = $.mobile.defaultPageTransition;
        // We don't want to slide the first page
        if (self.firstPage) {
            transition = 'none';
            window.inicio = false;
        }
        //De esta< forma habilitamos los cambios de izquierda a derecha y de derecha a izquierda
        //al pulsar sobre back
        if(window.inicio){
            console.log("inicio");
            window.inicio = false;
            $.mobile.changePage($(page.el), {changeHash:false, transition: 'none'});
        }
        else if(self.back){
            console.log("back");
            $.mobile.changePage($(page.el), {changeHash:false, transition: 'slide', reverse: true});
            self.back = false;
        }
        else{
            console.log("no back");
            $.mobile.changePage($(page.el), {changeHash:false, transition: 'slide' , reverse: false});
        }

    }

  });


})(jQuery);

    // urlFilter: function(color){
    //   app.vista_coleccion_vinos.filterType = color;
    // },

    // viewDetail : function(identificator){

    //   if (app.vistaVino !== undefined) app.vistaVino.undelegateEvents();
    //   if (app.vista_coleccion_vinos !== undefined) app.vista_coleccion_vinos.undelegateEvents();
    //   app.vino = new app.Vino({id:identificator});
    //   app.vista_detallada_vino = new app.VistaDetalladaVino({model:app.vino});
    //   app.vino.fetch();
    // },