var app = app || {};

(function($){

  app.SplashView = Backbone.View.extend({

    template: $("#vinoTemplate").html(),

    template:_.template($("#splash").html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

})(jQuery);

