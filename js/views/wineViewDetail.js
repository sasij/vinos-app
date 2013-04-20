var app = app || {};

(function($){

  app.VistaDetalleVino = Backbone.View.extend({

    template: $("#detalleVino").html(),

    initialize: function(){
      console.log("initialize vista detalle");
    },

    render: function(){
      var tmpl = _.template(this.template);
      $(this.el).html(tmpl(this.model.toJSON()));
      return this;
    }


  });

})(jQuery);