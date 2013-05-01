var app = app || {};

(function($){

  //Paso jQuery al router de la funcion
  app.Router = Backbone.Router.extend({

    routes:{
      "" : "collection",
      "index" : "collection",
      "add" : "addWines",
      "id/:identificator" : "viewDetail"
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
          <h3>Tipos de vino</h3>\
          <ul>\
            <li class="active"><a href="#" class="contentLink" id="Todos">Todos</a></li>\
            <li><a href="#" class="contentLink" id="Tinto">Tinto </a></li>\
            <li><a href="#" class="contentLink" id="Rosado">Rosado </a></li>\
            <li><a href="#" class="contentLink" id="Blanco">Blanco </a></li>\
          </ul>\
        </div>');
        //Cambia el fondo de la opcion elegida en el menu
        $("#menu li a").click(function(){
          var p = $(this).parent();
          if($(p).hasClass('active')){
              $("#menu li").removeClass('active');
          } else {
              $("#menu li").removeClass('active');
              $(p).addClass('active');
          }
        });

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