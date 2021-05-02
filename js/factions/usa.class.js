

/**
 * USA faction.
 * 
 */
 var USA = (function(){
    var f = new Faccion("United States of America","USA");

    FF.registrarAmigo(f.slug,"pope");
    FF.registrarEnemigo(f.slug,"PC");
    FF.registrarAmigo(f.slug,"CPU");

    var r_apoyar = new Reaction({
        text: "Apoyar",
        direction: "help"
    });

    var r_parar = new Reaction({
        text: "Sabotear",
        direction: "stop"
    })

    /* ---------------- eventos --------------- */   

    /*--- 0 ---*/
    f.addEvent(new Event({
        slug: "neolib1",
        defcon: 0,
        delta_power:5,
        cost: 200,
        text: "USA negocia tratado de libre comercio con {{country}}.",   
        reactions: [ 
            new Reaction(r_apoyar,{text:"Apoyar negociaciones",cost:"D"}),
            new Reaction(r_parar,{text:"Sabotear negociaciones",cost:"D"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "neolib2",
        defcon: 0,
        delta_power:5,
        cost: 200,
        text: "USA pasa al senado una nueva de Copyright mas restrictiva.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Apoyar economicamente al lobby en contra",cost:"D"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "neolib2",
        defcon: 0,
        delta_power:5,
        cost: 200,
        text: "USA vende armas a {{country}}.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Destruir transporte de armas",cost:"S"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "neolib2",
        defcon: 0,
        delta_power:5,
        cost: 400,
        text: "USA en guerra economica con {{country}}, propone sanciones.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Apoyar economicamente al lobby en contra",cost:"D"}),
            new Reaction(r_parar,{text:"Campaña de propaganda en contra de la acción",cost:"D"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "base1",
        defcon: 0,
        delta_power:50,
        cost: 800,
        min_defcon:1,
        text: "USA crea negocia una base militar en {{country}}.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Sabotear negociaciones",cost:"D"}),
        ], 
    }));

    /*--- 1 ---*/
    f.addEvent(new Event({
        slug: "negocia1",
        defcon: 1,
        delta_power:10,
        cost: 400,
        text: "USA negocia la extradicion de terroristas desde {{country}}.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Sabotear negociaciones",cost:"D"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "visita1",
        defcon: 1,
        delta_power:10,
        cost: 400,
        text: "El presidente de USA visita {{country}}.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Sabotear visita",cost:"D"}),
        ], 
    }));

    /* ---------------- /eventos --------------- */  

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