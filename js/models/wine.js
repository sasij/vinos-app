var app = app || {};

(function($){

    app.Vino = Backbone.Model.extend({

        defaults:{
            nombre:"",
            denominacionOrigen:"",
            color:"",
            anyo:"",
            precio:"",
            cata:"",
            targetPath: "./img/wine.png"
        },

        urlRoot: function(){
            return "http://sasij-vinos.eu01.aws.af.cm/wines/";
        }
    });

})(jQuery);