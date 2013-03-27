var app = app || {};

$(document).on("ready", function(){
  //Cuando el documento esta listo creamos el router
    console.log('document ready');
    app.router = new app.Router();
    Backbone.history.start();

});