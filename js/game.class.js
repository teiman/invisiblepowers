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

    $(function(){
        update_ui();
    });

    return {
        bet:bet,
        next:next,
        getTeam:getTeam
    };

})();