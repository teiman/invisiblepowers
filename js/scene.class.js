var Scene = (function(){
    function logme(tag,msg){ console.log("[Scene]["+tag+"] "+msg)};

    var events_next = [];

    function getEvents(){
        return events_next;
    }

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
            var defconcocos = datos.defcon;
            var str = "";
            for(var t=0;t<defconcocos;t++){
                str += "⬤";
            }
            datos.defconcocos = str;

            var power = datos.power;

            var podercocos = ( (Math.log10(power)*5+ Math.log2(power)*1)/6 );
            if(podercocos>6)
                podercocos = 6;

            var str2 = "";
            for(var t=0;t<podercocos;t++){
                str2 += "⬤";
            }
            datos.podercocos = str2;

            return datos;
        }

        var informe = {
            lista: [
                forma({power:Pope.f.power,nombre: Pope.name, defcon: Pope.f.defcon}),
                forma({power:CPU.f.power,nombre: CPU.name, defcon: CPU.f.defcon}),
                forma({power:USA.f.power,nombre: USA.name, defcon: USA.f.defcon}),
                forma({power:PC.f.power,nombre: PC.name, defcon: PC.f.defcon}),
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
        //console.log(events_next);
        events_next = Coleccion(events_next).shuffle();
        //console.log(events_next);

        events_next.forEach(function(e){ 
            var html = e.genHTML();
            var div = document.createElement('div');
            $(div).addClass("pastilla");
            $(div).addClass("faction-"+e.faction_slug);
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
        getEvents:getEvents
    };

})();