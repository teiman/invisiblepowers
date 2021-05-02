

/**
 * Computer faction.
 * 
 */
 var CPU = (function(){
    var f = new Faccion("Hivemind AI","CPU");

    FF.registrarAmigo(f.slug,"CPU");
    FF.registrarEnemigo(f.slug,"USA");
    FF.registrarEnemigo(f.slug,"pope");

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
        slug: "aiplus1",
        defcon: 0,
        delta_power:50,
        cost: 400,
        min_defcon:1,
        text: "Salto tecnologico realizado en sistemas de AI. Nuevos sistemas automotivados de logica.",   
        reactions: [ 
            new Reaction(r_apoyar,{text:"Invertir en la tecnologia",cost:"D"}),
            new Reaction(r_parar,{text:"Hackear los datos de investigacion, destruir todos los datos",cost:"T"}), 
            new Reaction(r_parar,{text:"Convencer a los responsables para destruir los datos",cost:"D"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "aiplus2",
        defcon: 0,
        delta_power:5,
        cost: 200,
        text: "Avances en coches autopilotados. Nuevas pruebas en {{country}}.",   
        reactions: [ 
            new Reaction(r_apoyar,{text:"Invertir en la tecnologia",cost:"D"}),
            new Reaction(r_parar,{text:"Hackear los datos de investigacion, destruir todos los datos",cost:"T"}), 
            new Reaction(r_parar,{text:"Convencer a los responsables para destruir los datos",cost:"D"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "aiplus3",
        defcon: 0,
        delta_power:5,
        cost: 200,
        text: "{{instituto}} publica una tecnica de IA mejorada.",   
    }));

    /*--- 1 ---*/
    f.addEvent(new Event({
        slug: "aiplus4",
        defcon: 1,
        delta_power:10,
        coste: 200,
        text: "Nuevos avances en Inteligencia Artificial en el {{instituto}}.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Atacar las instalaciones, destruir computadoras",cost:"S"}),
            new Reaction(r_parar,{text:"Poner la opinion publica en contra",cost:"D"}), 
        ], 
    }));

    f.addEvent(new Event({
        slug: "robots1",
        defcon: 1,
        delta_power:10,
        coste: 200,
        text: "{{instituto}} muestra un video en el que se ven impresionantes avances en robotica.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Hackear el instituto y destruir datos de investigacion",cost:"T"}), 
        ], 
    }));
    /* ---------------- /eventos --------------- */   


    function bet(data){ f.bet(data); }
    function next(){ 
        console.log(`[CPU][next] DEBUG: f.power: ${f.power}`);
        console.log(`[CPU][next] DEBUG: f.defcon: ${f.defcon}`);
        console.log(`[CPU][next] DEBUG: f.acumpower: ${f.acumpower}`);
        f.next(); 
    }
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