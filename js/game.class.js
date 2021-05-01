/*
Recursos

Soldado: S
Diplomatico: D
Tecnico: T
*/



var Game = (function(){
    function logme(tag,msg){ console.log("[Game]["+tag+"] "+msg)};    

    var soldados = 5;
    var diplomaticos = 3;
    var tecnicos = 2;

    var factions = [];
    factions[Pope.slug] = Pope;

    var turno = 1;

    var colasRecuperacionRecursos = [];


    function getTeam(){
        return {
            soldados: soldados,
            diplomaticos: diplomaticos,
            tecnicos: tecnicos
        };
    }

    function update_ui(){
        logme("update_ui","...");

        var template = $("#ui-template").html();
        var data = getTeam();

        if(1){
            //DEBUG
            data["p_power"] = Pope.f.power;
            data["p_defcon"] = Pope.f.defcon;
            data["p_acumpower"] = Pope.f.acumpower;
        }
        //console.log("Pope.f.power:"+ Pope.f.power);

        var html = Mustache.render(template, data);
        $("#ui-box").html(html);
    }

    function next(){
        logme("next","...");
        //Avanza el turno
        turno++;

        Scene.clear();        
        Pope.next();
        Scene.redraw();
        update_ui();

    }

    function bet(nodo){
        var event_slug = $(nodo).attr("data-event_slug");
        var faction_slug = $(nodo).attr("data-faction_slug");
        var direction = $(nodo).attr("data-direction");
        var cost = $(nodo).attr("data-cost");

        if(factions[faction_slug]){
            var f = factions[faction_slug];

            f.bet({
                event_slug: event_slug,
                direction:direction,
                cost:cost,
                faction_slug:faction_slug,
            });

            //TODO: numero de turnos variable, de momento hardcodeamos a 1 turno
            usarRecurso(cost,1);

            $(nodo).prop("disabled",true)
                .prop("readonly",true)
                .prop("disabled",true)
                .addClass("active")
                ;
        }else{
            console.log("[Game][bet] No encontrada faccion:"+faction_slug+", en:");
            console.log(factions);
        }
    }

    function usarRecurso(recurso,turnos){
        console.log(`[Game][usaRecursos] ...`);
        console.log(`[Game][usaRecursos] recurso:${recurso},turnos:${turnos}`);
        switch(recurso){
            case "D":
                diplomaticos--;
                if(diplomaticos<0)
                    diplomaticos = 0;
                break;
            case "T":
                tecnicos--;
                if(tecnicos<0)
                    tecnicos = 0;
                break;
            case "S":
                soldados--;
                if(soldados<0)
                    soldados = 0;
                break;
        }

        update_ui();
    }

    function canAfford(recurso,qty){
        switch(recurso){
            case "D":
                if(diplomaticos>=qty)
                    return true;
                break;
            case "T":
                if(tecnicos>=qty)
                    return true;
                break;
            case "S":
                if(soldados>=qty)
                    return true;
                break;
        }

        return false;
    }

    $(function(){
        update_ui();
    });

    return {
        canAfford:canAfford,
        usarRecurso:usarRecurso,
        bet:bet,
        next:next,
        getTeam:getTeam
    };

})();