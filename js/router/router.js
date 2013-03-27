var app = app || {};

(function($){

  //Paso jQuery al router de la funcion
  app.Router = Backbone.Router.extend({

    routes:{
      "" : "splash",
      //"filter/:color" : "urlFilter",
      //"id/:identificator" : "viewDetail"
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
    splash: function() {
      console.log("splash");
      app.splash_view = new app.SplashView();
      this.changePage(app.splash_view);
      //app.coleccion_vinos = new app.ColeccionVinos();
      //app.vista_coleccion_vinos = new app.VistaColeccionVinos({collection: this.coleccion_vinos});
      //app.coleccion_vinos.fetch();
      //app.vista_coleccion_vinos.render();
    },

    changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
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