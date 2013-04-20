var app = app || {};

(function($){

  app.VistaNuevoVino = Backbone.View.extend({

    template:$("#NuevoVino").html(),

    initialize: function(){
      console.log("initialize nuevo vino");
    },

    render:function(){
      var tmpl = _.template(this.template);
      $(this.el).html(tmpl);
      return this;
    }

  });

})(jQuery);