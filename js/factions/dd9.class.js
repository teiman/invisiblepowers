
/**
 * Player faction. Proteger la humanidad del apocalipsis
 * 
 */
var DD9 = (function(){
    var f = new Faccion("D.D.9","dd9");
    f.acumpower = 100;
    f.power = 24;
    
    function genReturnAgentEvent(a){
        var e = new Event({
            faction_name: f.name,
            faction_slug: f.slug,
            slug: 'retorno_especialista',
            text: `Ha retornado un especialista ${a.desc()}`,   
        });
        return e;
    }

    f.addEvent(new Event({
        slug: "congreso1",
        coste: 240, 
        delta_power:10,
        text: "El DD9 organiza un congreso de seguridad.",   
    }));

    f.addEvent(new Event({
        slug: "congreso2",
        coste: 210, 
        delta_power:10,
        text: "El DD9 realiza un entrenamiento en el mar del norte.",   
    }));

    f.addEvent(new Event({
        slug: "informeG7",
        coste: 250, 
        text: "El DD9 presenta su informe al G7.",   
    }));

    function bet(data){ f.bet(data); }
    function next(){ f.next(); }
    function playerPerjudica(){ f.playerPerjudica(); }
    function playerApoya(){ f.playerApoya(); }

    return {
        bet: bet,
        next: next,
        playerPerjudica:playerPerjudica,
        playerApoya:playerApoya,
        slug: f.slug,
        name: f.name,
        genReturnAgentEvent: genReturnAgentEvent,
        f:f,
    };

})();