
/**
 * Player faction.
 * 
 */
var DD9 = (function(){
    var f = new Faccion("D.D.9","dd9");
    
    function genReturnAgentEvent(a){
        var e = new Event({
            faction_name: f.name,
            faction_slug: f.slug,
            slug: 'retorno_especialista',
            text: `Ha retornado un especialista ${a.desc()}`,   
        });
        return e;
    }

    function bet(data){ f.bet(data); }
    function next(){ f.next(); }

    return {
        bet: bet,
        next: next,
        slug: f.slug,
        name: f.name,
        genReturnAgentEvent: genReturnAgentEvent,
    };

})();