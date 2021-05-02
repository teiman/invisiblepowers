

/**
 * USA faction.
 * 
 */
 var USA = (function(){
    var f = new Faccion("United States of America","USA");

    FF.registrarAmigo(f.slug,"pope");
    FF.registrarEnemigo(f.slug,"PC");
    FF.registrarAmigo(f.slug,"CPU");

    function bet(data){ f.bet(data); }
    function next(){ f.next(); }
    function playerPerjudica(){ f.playerPerjudica(); }
    function playerApoya(){ f.playerApoya(); }

    return {
        bet: bet,
        next: next,
        playerPerjudica: playerPerjudica,
        playerApoya: playerApoya,
        slug: f.slug,
        name: f.name,
        f:f,
    };

})();