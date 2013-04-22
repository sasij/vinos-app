var app = app || {};

(function($){

  app.VistaVino = Backbone.View.extend({

      tagName: 'li',

      template: $("#vino_lista").html(),

      events: {
        'click a': 'viewVine'
      },

      render: function(){
        var tmpl = _.template(this.template);
        $(this.el).html(tmpl(this.model.toJSON()));
        return this;
      },

      viewVine: function(){
       // console.log(this.model.get('_id'));
       app.router.navigate("/id/" + this.model.get('_id'), true);
      }
  });

})(jQuery);