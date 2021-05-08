var Scene = (function(){
    function logme(tag,msg){ console.log("[Scene]["+tag+"] "+msg)};

    var events_next = [];


    function clear(){
        logme("clear","...");

        events_next = [];
        $("#root-box").html("");
    }

    function addEvents(evs){
        logme("addEvents","...");

        if(!evs){
            logme("addEvents","W:[1] se intento añadir lista vacia de eventos");
            return;
        }
        if(!evs.length){
            logme("addEvents","W:[2] se intento añadir lista vacia de eventos");
            return;
        }

        //console.log("events added:");
        //console.log(evs);

        evs.forEach(function(e){ 
            events_next.push(e)
        });
    }

    function redraw(){
        logme("redraw","...");


        var forma = function(datos){
            var podercocos = datos.podercocos;
            var str = "";
            for(var t=0;t<podercocos;t++){
                str += "⬤";
            }
            datos.podercocos = str;
            return datos;
        }

        var informe = {
            lista: [
                forma({enfadococos:Pope.f.acumhate,nombre: Pope.name, podercocos: Pope.f.defcon}),
                forma({enfadococos:CPU.f.acumhate,nombre: CPU.name, podercocos: CPU.f.defcon}),
                forma({enfadococos:USA.f.acumhate,nombre: USA.name, podercocos: USA.f.defcon}),
                forma({enfadococos:PC.f.acumhate,nombre: PC.name, podercocos: PC.f.defcon}),
            ]
        };
        var template_informe = $("#ui-informe").html();
        var html = Mustache.render(template_informe, informe);
        $("#root-box").append(html);

                
        if(!events_next.length){
            logme("redraw","W: ¡No hay eventos para renderizar!");
            return;
        }

        //Orden de los eventos aleatorios
        events_next = Coleccion(events_next).shuffle();

        events_next.forEach(function(e){ 
            var html = e.genHTML();
            var div = document.createElement('div');
            $(div).addClass("pastilla");
            $(div).html(html);
            if(!Game.TESTBALANCE) $("#root-box").append(div);
        });



        //Part of the balance test mode 
        if(Game.TESTBALANCE){
            var d6 = ( Pope.f.defcon>5 || CPU.f.defcon>5 || USA.f.defcon>5 || PC.f.defcon>5);

            if(!d6){
                setTimeout(function(){
                    $("#btn-next").click();
                },0);
            }
        }
    }

    return {
        addEvents:addEvents,
        redraw:redraw,
        clear:clear, 
    };

})();