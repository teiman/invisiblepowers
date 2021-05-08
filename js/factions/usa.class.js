

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
    
    var BALANCE_COST = 15;

    /* ---------------- eventos --------------- */   

    /*--- 0 ---*/
    f.addEvent(new Event({
        slug: "neolib1",
        defcon: 0,
        delta_power:5,
        cost: 200+BALANCE_COST,
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
        cost: 200+BALANCE_COST,
        text: "USA pasa al senado una nueva de Copyright mas restrictiva.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Apoyar economicamente al lobby en contra",cost:"D"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "neolib2",
        defcon: 0,
        delta_power:5,
        cost: 200+BALANCE_COST,
        text: "USA vende armas a {{country}}.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Destruir transporte de armas",cost:"S"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "neolib2",
        defcon: 0,
        delta_power:5,
        cost: 400+BALANCE_COST,
        text: "USA en guerra economica con {{country}}, propone sanciones.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Apoyar economicamente al lobby en contra",cost:"D"}),
            new Reaction(r_parar,{text:"Campaña de propaganda en contra de la acción",cost:"D"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "base1",
        defcon: 0,
        delta_power:15,
        cost: 800+BALANCE_COST,
        min_defcon:1,//asciende
        text: "USA crea negocia una base militar en {{country}}.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Sabotear negociaciones",cost:"D"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "base1",
        defcon: 0,
        delta_power:5,
        cost: 800+BALANCE_COST,
        min_defcon:1,//asciende
        text: "Disturvios raciales en California tras muerte de un negro a manos de la policia.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Instigar revuelta",cost:"D"}),
        ], 
    }));


    /*--- 1 ---*/
    f.addEvent(new Event({
        slug: "negocia1",
        defcon: 1,
        delta_power:10,
        cost: 800+BALANCE_COST,
        text: "USA negocia la extradicion de terroristas desde {{country}}.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Sabotear negociaciones",cost:"D"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "visita1",
        defcon: 1,
        delta_power:10,
        cost: 800+BALANCE_COST,
        text: "El presidente de USA visita {{country}}.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Sabotear visita",cost:"D"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "private1",
        defcon: 1,
        min_defcon: 2,//asciende!
        delta_power:20,
        cost: 800+BALANCE_COST,
        text: "{{country}} privatiza su sistema de sanidad, con ayuda de empresas americanas.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Sabotear visita",cost:"D"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "private2",
        defcon: 1,
        min_defcon: 2,//asciende!
        delta_power:10,
        cost: 800+BALANCE_COST,
        text: "{{country}} privatiza su sistema educativo. Sale al mercado en Wall Street",   
        reactions: [ 
            new Reaction(r_apoyar,{text:"Apoyar salida a bolsa",cost:"D"}),
            new Reaction(r_parar,{text:"Sabotear salida a bolsa",cost:"D"}),
        ], 
    }));

    /*--- 2 ---*/

    f.addEvent(new Event({
        slug: "amigo1",
        defcon: 2,
        delta_power:10,
        cost: 400+BALANCE_COST,
        text: "USA aconseja a {{country}} a mantener el salario minimo bajo.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Influir en contra",cost:"T"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "amigo2",
        defcon: 2,
        delta_power:10,
        cost: 400+BALANCE_COST,
        text: "USA mantiene una guerra con {{country}} por los aranceles.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Influir en la opinion public en contra",cost:"T"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "amigo2a",
        defcon: 2,
        delta_power:10,
        cost: 400+BALANCE_COST,
        min_defcon: 3,//asciende
        text: "La sexta flota avanza hacia el mar del indico en otra accion belica.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Influir en la opinion public en contra",cost:"T"}),
            new Reaction(r_parar,{text:"Sabotear operaciones",cost:"T"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "amigo3",
        defcon: 2,
        delta_power:10,
        cost: 400+BALANCE_COST,
        text: "USA pide a la union europea a apoyar sus sanciones contra {{country}}.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Influir en contra",cost:"T"}),
        ], 
    }));

    /*--- 3 ---*/

    f.addEvent(new Event({
        slug: "amigo4",
        defcon: 3,
        delta_power: 25,
        min_defcon: 4,//asciende
        cost: 800+BALANCE_COST,
        text: "USA realiza una operacion militar en {{country}}, asesinando a lideres de este pais.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Sabotear operación",cost:"T"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "amigo4",
        defcon: 3,
        delta_power:25,
        min_defcon: 4,//asciende
        cost: 800+BALANCE_COST,
        text: "USA disuelve una huelga de mineros utilizando un producto quimico toxico rociado en la zona de la huelga.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Sabotear operación",cost:"T"}),
        ], 
    }));

    /*--- 4 ---*/

    f.addEvent(new Event({
        slug: "amigo5",
        defcon: 4,
        delta_power:25,
        min_defcon: 5,//asciende
        cost: 800+BALANCE_COST,
        text: "{{country}} adopta el dolar como su moneda oficial.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Sabotear operación",cost:"T"}),
        ], 
    }));

    /*--- 5 ---*/

    f.addEvent(new Event({
        slug: "amigo5",
        defcon: 5,
        delta_power:25,
        min_defcon: 6,//asciende
        cost: 800+BALANCE_COST,
        text: "{{country}} en la bancarrota, pide ayudas a USA.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Sabotear operación",cost:"T"}),
        ], 
    }));
    
    /*--- 6 ---*/

    f.addEvent(new Event({
        slug: "amigo5",
        defcon: 6,
        delta_power:25,
        cost: 800+BALANCE_COST,
        text: "Se celebra en New York el quinto año de la PAX Americana, con los lideres de las principales corporaciones mundiales.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Sabotear fiesta",cost:"S"}),
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