


/**
 * PC faction.
 * 
 */
 var PC = (function(){
    var f = new Faccion("Partido Comunista","PC");

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