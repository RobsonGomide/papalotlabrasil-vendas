$(document).bind('click', function(){
    var elemento = document.activeElement;
    var baseURL = $(".baseURL").val();
    if(elemento.className == 'galeria') {
        var tipo = "A";
        var img = elemento.getElementsByTagName('img');
        if (img.length == 0) {
            var tipo = "SOURCE";
            var img = elemento.getElementsByTagName('source');
            var url = img[0].getAttribute('src');
            var comment = img[0].getAttribute('comment');
        } else {
            var url = img[0].currentSrc;
            var comment = img[0].getAttribute('comment');
        }
        var seqClique = elemento.getAttribute('seq');

        $(".item[seq=" + seqClique + "]").attr("selected","");

        var seqAtual = $('.FotoPanel').attr('seq');
        if (seqAtual != "") {
            $(".item[seq=" + seqAtual + "]").removeAttr("selected");
        }

        $('.FotoPanel').attr('seq', seqClique);
        if (tipo == 'A') {
            var tags = "<a target='_blank' href='" + baseURL + "fotoshow/index/" + url.replaceAll("/","|") + "/" + comment + "'><img class='imgFoto' src='" + url + "'></a>";
        } else {
            var tags = "<a href=''><video controls autoplay><source src='" + url + "' type='video/mp4' ></video></a>";
        }
        if (comment != "" && tipo == 'A') {
            tags = tags + "<div id='comentario'><div class='texto'>" + comment + "</div></div>";
        }
        document.getElementById("FotoPanelArq").innerHTML = tags;

        var totSeq = $('#MoveRight')[0].getAttribute('seq');
        if (seqClique == 1) {
           $('#MoveLeft').attr('style', "display:none;");
        } else {
           $('#MoveLeft').attr('style', "display:flex;");
        }
        if (seqClique == totSeq) {
           $('#MoveRight').attr('style', "display:none;");
        } else {
           $('#MoveRight').attr('style', "display:flex;");
        }
   };

   if(elemento.className == 'MoveRight') {
        var totSeq = $('#MoveRight')[0].getAttribute('seq');
        var seqNext = $(".FotoPanel").attr('seq');
        $(".item[seq=" + seqNext + "]").removeAttr("selected");
        seqNext++;
        $(".item[seq=" + seqNext + "]").attr("selected","");

        var elemento = document.querySelector('.item[seq="' + seqNext + '"]');
        var img = elemento.getElementsByTagName('img');
        var tipo = "A";
        if (img.length == 0) {
            tipo = "SOURCE";
            var img = elemento.getElementsByTagName('source');
        }
        var comment = img[0].getAttribute('comment');

        var HeightDiv = $(".item[seq=" + seqNext + "]").height() + 7;
        var divScroll = document.getElementById('ListaFotosVideos');
        var HeightScroll = $("#ListaFotosVideos").height();
        var posicao = seqNext * HeightDiv;
        if (posicao > HeightScroll) {
            posicao -= HeightScroll;
        } else {
            posicao = 0;
        }
        divScroll.scrollTop = posicao;

        var url = img[0].getAttribute('src');
        $('.FotoPanel').attr('seq', seqNext);

        if (tipo == 'A') {
            var tags = "<a target='_blank' href='" + baseURL + "fotoshow/index/" + url.replaceAll("/","|") + "/" + comment + "'><img class='imgFoto' src='" + url + "'></a>";
        } else {
            var tags = "<a href=''><video controls autoplay><source src='" + url + "' type='video/mp4' ></video></a>";
        }
        if (comment != "" && tipo == 'A') {
            tags = tags + "<div id='comentario'>" + comment + "</div>";
        }
        document.getElementById("FotoPanelArq").innerHTML = tags;

        $('#MoveLeft').attr('style', "display:flex;");
         if (seqNext == totSeq) {
            $('#MoveRight').attr('style', "display:none;");
         } else {
            $('#MoveRight').attr('style', "display:flex;");
         }
    };

    if(elemento.className == 'MoveLeft') {
        var totSeq = $('#MoveRight')[0].getAttribute('seq');
        var seqNext = $(".FotoPanel").attr('seq');
        $(".item[seq=" + seqNext + "]").removeAttr("selected");
        seqNext--;
        $(".item[seq=" + seqNext + "]").attr("selected","");

        var elemento = document.querySelector('.item[seq="' + seqNext + '"]');
        var img = elemento.getElementsByTagName('img');
        var tipo = "A";
        if (img.length == 0) {
            tipo = "SOURCE";
            var img = elemento.getElementsByTagName('source');
        }
        var comment = img[0].getAttribute('comment');

        var HeightDiv = $(".item[seq=" + seqNext + "]").height() + 7;
        var divScroll = document.getElementById('ListaFotosVideos');
        var HeightScroll = $("#ListaFotosVideos").height();
        var posicao = seqNext * HeightDiv;
        if (posicao > HeightScroll) {
            posicao -= HeightScroll;
        } else {
            posicao = 0;
        }
        divScroll.scrollTop = posicao;

        var url = img[0].getAttribute('src');
        $('.FotoPanel').attr('seq', seqNext);

        if (tipo == 'A') {
            var tags = "<a target='_blank' href='" + baseURL + "fotoshow/index/" + url.replaceAll("/","|") + "/" + comment + "'><img class='imgFoto' src='" + url + "'></a>";
        } else {
            var tags = "<a href=''><video controls autoplay><source src='" + url + "' type='video/mp4' ></video></a>";
        }
        if (comment != "" && tipo == 'A') {
            tags = tags + "<div id='comentario'>" + comment + "</div>";
        }
        document.getElementById("FotoPanelArq").innerHTML = tags;

        $('#MoveRight').attr('style', "display:flex;");
        if (seqNext == 1) {
            $('#MoveLeft').attr('style', "display:none;");
        } else {
            $('#MoveLeft').attr('style', "display:flex;");
        }
    };
});

$(document).ready(function() {
    var path = window.location.pathname;

    if (path.includes("fotoshow")) {
        var url = document.getElementById('foto').value;

        $('#viewer').iviewer({
            src: url,
            update_on_resize: false,
            initCallback: function() {
                var object = this;
                $("in").click(function() { object.zoom_by(1) ;});
                $("#out").click(function(){ object.zoom_by(-1);}); 
                $("#fit").click(function(){ object.fit();}); 
                $("#orig").click(function(){  object.set_zoom(100); }); 
                $("#update").click(function(){ object.update_container_info();});
            },
            onMouseMove: function(object, coords) { },
            onStartDrag: function(object, coords) { return false; }, //this image will not be dragged
            onDrag: function(object, coords) { }
        });

    }

    if (path.includes("home")) {
        $("#AreaPastas").scroll(function() {
            var divScrollPosition = $('#AreaPastas').position();

            clearTimeout($.data(this, 'scrollCheck'));

            $.data(this, 'scrollCheck', setTimeout(function() {
                $("#AreaPastas div").each(function() {
                    var divPosition = $(this).position();

                    var position = (divPosition.top - (divScrollPosition.top + 1)) + $(this).height();

                });
            }, 250));
        });
    }

    if (!path.includes("home")) {

        $("#AreaDados").scroll(function() {
            var divScrollPosition = $('#AreaDados').position();

            clearTimeout($.data(this, 'scrollCheck'));

            $.data(this, 'scrollCheck', setTimeout(function() {
                $("#AreaDados table").each(function() {
                    var divPosition = $(this).position();

                    var position = (divPosition.top - (divScrollPosition.top + 1)) + $(this).height();

                });
            }, 250));
        });
    }

    if (!path.includes("home")) {

        $("#ListaFotosVideos").scroll(function() {
            var divScrollPosition = $('#ListaFotosVideos').position();

            clearTimeout($.data(this, 'scrollCheck'));

            $.data(this, 'scrollCheck', setTimeout(function() {
                $("#ListaFotosVideos div").each(function() {
                    var divPosition = $(this).position();

                    var position = (divPosition.top - (divScrollPosition.top + 1)) + $(this).height();

                });
            }, 250));
        });

        $("#AreaDados").scroll(function() {
            var divScrollPosition = $('#AreaDados').position();

            clearTimeout($.data(this, 'scrollCheck'));

            $.data(this, 'scrollCheck', setTimeout(function() {
                $("#AreaDados div").each(function() {
                    var divPosition = $(this).position();

                    var position = (divPosition.top - (divScrollPosition.top + 1)) + $(this).height();

                });
            }, 250));
        });

        if (path.includes("album")) {
    
            $("#AreaDados").scroll(function() {
                var divScrollPosition = $('#AreaDados').position();
    
                clearTimeout($.data(this, 'scrollCheck'));
    
                $.data(this, 'scrollCheck', setTimeout(function() {
                    $("#AreaDados div").each(function() {
                        var divPosition = $(this).position();
    
                        var position = (divPosition.top - (divScrollPosition.top + 1)) + $(this).height();
    
                    });
                }, 250));
            });
    
        }

        $(".seqfoto").on('change', function() {
            var base = $("#BaseURL").val();
            var idFoto = document.activeElement.getAttribute('idFoto');
            var seq = document.activeElement.value;
            $.ajax({
                url: base + 'foto/Mover/' + idFoto + '/' + seq,
                type: 'POST',
                data: {id:idFoto},
                success: function (data) {
                    location.reload();
                }
            });
        });

        $("#arquivos").on('change', function() {
            var maxArq = $('#maxArq').val();
            var maxSize = $('#maxSize').val();

            var arquivos = $('input#arquivos')[0].files;
            var total = arquivos.length;

            var size = 0;

            for (var i=0; i < total; i++) {
                size += arquivos[i]['size'];
            }
            size = size / (1024 * 1024);

            if (total > maxArq || size > maxSize) {
                alert("Você selecionou " + total + " arquivo(s), totalizando " + size.toFixed(2) + "Mb.\n\rPortanto estes arquivos não serão importados.\n\rSelecione novamente os arquivos.");
                $('input#arquivos').val("");
            }
        });
   }

});
