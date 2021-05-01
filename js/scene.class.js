var Scene = (function(){
    function logme(tag,msg){ console.log("[Scene]["+tag+"] "+msg)};

    var events_next = [];

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

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
        events_next = shuffle(events_next);

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