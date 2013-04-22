var app = app || {};

(function($){

  app.VistaDetalleVino = Backbone.View.extend({

    template: $("#detalleVino").html(),

    initialize: function(){
      console.log("initialize vista detalle");
      this.model.on('change', this.render, this);
      this.model.on("reset", this.render, this);
    },

    render: function(){
      var tmpl = _.template(this.template);
      $(this.el).html(tmpl(this.model.toJSON()));

      $(this.el).trigger( "pagecreate" );
      return this;
    }

  });

})(jQuery);