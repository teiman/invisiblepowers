var Scene = (function(){
    function logme(tag,msg){ console.log("[Scene]["+tag+"] "+msg)};

    var events_next = [];


    function clear(){
        logme("clear","...");

        events_next = [];
        $("#root").html("");
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
            $("#root").append(div);
        });
    }

    return {
        addEvents:addEvents,
        redraw:redraw,
        clear:clear, 
    };

})();