var app = app || {};

(function($){

  app.VistaNuevoVino = Backbone.View.extend({

    template:$("#NuevoVino").html(),

    events:{
      'click #submitButton':'submitButton'
    },

    initialize: function(){
      console.log("initialize nuevo vino");
    },
    render:function(){
      var tmpl = _.template(this.template);
      $(this.el).html(tmpl);

      return this;
    },

    test: function(e){
      console.log(e);
    },

    submitButton: function(e){

      nombre = $('#nombre').val();
      denominacionOrigen = $('#denominacionOrigen').val();
      anyo = $('#anyo').val();
      color = $('#color').val();
      precio = $('#precio').val();
      puntuacion = $('#puntuacion').val();
      cata = $('#cata').val();
      file = $('#inputFile').get(0).files[0];
      isValid = this.validateForm();

        if (!isValid) {
            e.preventDefault();
            //mostrar mensaje de error
            alert("¡Error en el formulario. Debe de rellenar todos los campos!");
            return false;
        }
        else {
            var fd = new FormData();
            fd.append('nombre', nombre); // req.body.date
            fd.append('denominacionOrigen', denominacionOrigen);
            fd.append('anyo', anyo);
            fd.append('color', color);
            fd.append('precio', precio);
            fd.append('puntuacion', puntuacion);
            fd.append('cata', cata);
            fd.append('uploadingFile', file);

            jQuery.ajax({
                type: "POST",
                url: "http://sasij-vinos.eu01.aws.af.cm/wines/",
                data:fd,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    window.location="index.html";
                }
            });

            e.preventDefault();
            return false;
        }

      e.preventDefault();
      return false;
    },

    validateForm: function (){
        var regexPunt = /^[0-9]+$/;

        if(nombre === '' || denominacionOrigen === '' ||
            color === '' || precio === '' || cata === '')
            return false;

        if (typeof file == 'undefined')
            return false;

        if(!regexPunt.test(puntuacion) || !regexPunt.test(anyo))
            return false;

        return true;
    }


  });

})(jQuery);