


/**
 * PC faction.
 * 
 */
 var PC = (function(){
    var f = new Faccion("Libertad Trabajadores","PC");

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

    /*--- 0 ---*/
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

        /*--- 0 ---*/
        f.addEvent(new Event({
            slug: "libro1",
            defcon: 1,
            delta_power:15,
            cost: 300,
            text: "Se publica un libro 'Las 100 formas en las que {{company}}' explota a sus trabajadores.",   
            reactions: [ 
                new Reaction(r_apoyar,{text:"Bloquear difusion del libro",cost:"D"}),
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