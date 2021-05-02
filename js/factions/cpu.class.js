

/**
 * Computer faction.
 * 
 */
 var CPU = (function(){
    var f = new Faccion("Hivemind AI","CPU");

    FF.registrarAmigo(f.slug,"CPU");
    FF.registrarEnemigo(f.slug,"USA");
    FF.registrarEnemigo(f.slug,"pope");


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
        f:f,
    };

})();