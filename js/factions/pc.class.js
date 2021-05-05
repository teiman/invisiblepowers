
/**
 * Progreso Social / Derechos de los trabajadores / Transhumanismo
 * 
 */
 var PC = (function(){
    var f = new Faccion("Human Institute","PC");

    FF.registrarAmigo(f.slug,"CPU");
    FF.registrarEnemigo(f.slug,"USA");
    FF.registrarEnemigo(f.slug,"pope");

    /* ---------------- reacciones --------------- */
    var r_apoyar = new Reaction({
        text: "Apoyar",
        direction: "help"
    });

    var r_parar = new Reaction({
        text: "Sabotear",
        direction: "stop"
    })
    /* ---------------- /reacciones --------------- */

    var BALANCE_COST = 21;

    /* ---------------- eventos --------------- */   

    /*--- 0 ---*/
    f.addEvent(new Event({
        slug: "com1",
        defcon: 0,
        delta_power:15,
        cost: 200,
        text: "Huelga en {{country}} pidiendo mejoras sociales.",   
        reactions: [ 
            new Reaction(r_apoyar,{text:"Sabotear huelga",cost:"S"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "com2",
        defcon: 0,
        delta_power:5,
        cost: 200,
        text: "Construccion de viviendas sociales en {{country}}.",   
        reactions: [ 
            new Reaction(r_apoyar,{text:"Comprar por un lobby",cost:"D"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "com3",
        defcon: 0,
        delta_power:5,
        cost: 200,
        text: "Nueva ley de educación publica en {{country}} favore la educacion de todos los niños.",   
        reactions: [ 
            new Reaction(r_apoyar,{text:"Bloquear ley con un lobby",cost:"D"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "smv1",
        defcon: 0,
        delta_power:15,
        min_defcon: 1,
        cost: 200,
        text: "En {{country}} prueban un Salario Minimo Vital.",   
        reactions: [ 
            new Reaction(r_apoyar,{text:"Sabotear prueba",cost:"S"}),
        ], 
    }));

    /*--- 1 ---*/
    f.addEvent(new Event({
        slug: "com1",
        defcon: 1,
        delta_power:15,
        cost: 300,
        text: "Gran escandalo en {{country}}, {{company}} violaba los derechos de los trabajadores.",   
        reactions: [ 
            new Reaction(r_apoyar,{text:"Bloquear difusion de la noticia",cost:"D"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "libro1",
        defcon: 1,
        delta_power:15,
        cost: 300,
        text: "Se publica un libro 'Las 100 formas en las que {{company}} explota a sus trabajadores'.",   
        reactions: [ 
            new Reaction(r_apoyar,{text:"Bloquear difusion del libro",cost:"D"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "negocia1",
        defcon: 1,
        delta_power:10,
        cost: 800+BALANCE_COST,
        text: "{{country}} planea contratar asesores de la HI.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Sabotear negociaciones",cost:"D"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "visita1",
        defcon: 1,
        delta_power:10,
        cost: 800+BALANCE_COST,
        text: "Congreo de la HI en {{country}}.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Sabotear congreso",cost:"D"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "private1",
        defcon: 1,
        min_defcon: 2,//asciende!
        delta_power:20,
        cost: 800+BALANCE_COST,
        text: "{{country}} adopta sanidad universal para todos los ciudadano.",   
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
        text: "{{country}} elogiado por su sanidad de calidad",   
        reactions: [ 
            new Reaction(r_parar,{text:"Sabotear visita",cost:"D"}),
        ], 
    }));

    /*--- 2 ---*/

    f.addEvent(new Event({
        slug: "amigo1",
        defcon: 2,
        delta_power:10,
        cost: 400+BALANCE_COST,
        text: "HI negocia en {{country}} para aumentar el nivel de vida de las familias pobres.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Influir en contra",cost:"T"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "amigo2",
        defcon: 2,
        delta_power:10,
        cost: 400+BALANCE_COST,
        text: "USA y Human Institute en discusiones sobre los derechos humanos en {{country}}.",   
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
        text: "HI organiza una huelga masiva en {{smallnumber}} para pedir igualdad de derechos.",   
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
        text: "HI fuerza a {{country}} a ofrecer un sistema de pensiones para todos los ciudadanos.",   
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
        text: "HI subenciona en {{country}} un grupo anti-neoliberalismo.",   
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
        text: "HI organiza una huelga de mineros en China, con las criticas de USA y la Union Europea.",   
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
        text: "{{country}} prueba nuevos sistemas de cooperacion comunitaria.",   
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
        text: "{{country}} solicita ayuda al HI para reflotar su economia.",   
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
        text: "HI al frente de las Naciones Unidas.",   
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
        playerPerjudica:playerPerjudica,
        playerApoya:playerApoya,
        slug: f.slug,
        name: f.name,
        f:f,
    };

})();