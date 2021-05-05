

/**
 * Computer faction. Conglomerado de inteligencias artificiales.
 * Humanos fans de las inteligencias artificiales, cientificos y tecnicos.
 * 
 */
 var CPU = (function(){
    var f = new Faccion("Conglomerado AI","CPU");

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
        delta_power:10,
        cost: 200,
        min_defcon:1,//avance
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
        cost: 100,
        text: "{{instituto}} publica una tecnica de IA mejorada.",   
    }));

    f.addEvent(new Event({
        slug: "art1",
        defcon: 0,
        delta_power:1,
        cost: 200,
        text: "Un artista en {{country}} realiza una exposición de arte digital.",  
        reactions: [ 
            new Reaction(r_apoyar,{text:"Sabotear exposición",cost:"S"}),
        ] 
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

    f.addEvent(new Event({
        slug: "id1",
        defcon: 1,
        delta_power:5,
        cost: 200,
        min_defcon: 2,
        text: "{{instituto}} investiga una tecnologia de interfaz hombre-maquina.",   
        reactions: [ 
            new Reaction(r_apoyar,{text:"Invertir en la tecnologia",cost:"D"}),
        ], 
    }));

    /*--- 2 ---*/

    f.addEvent(new Event({
        slug: "cpu1",
        defcon: 2,
        delta_power:10,
        coste: 200,
        min_defcon: 3,
        text: "{{company}} anuncia nueva tecnologia de gestion desarrollada por {{instituto}}.",   
        reactions: [ 
            new Reaction(r_parar,{text:"Atacar las instalaciones, destruir computadoras",cost:"S"}),
            new Reaction(r_parar,{text:"Poner la opinion publica en contra",cost:"D"}), 
        ], 
    }));

    /*--- 3 ---*/

    f.addEvent(new Event({
        slug: "cpu2",
        defcon: 3,
        delta_power:10,
        coste: 200,
        text: "{{company}} revoluciona la domotica con una grid ",   
        reactions: [ 
            new Reaction(r_parar,{text:"Atacar las instalaciones, destruir computadoras",cost:"S"}),
            new Reaction(r_parar,{text:"Poner la opinion publica en contra",cost:"D"}), 
        ], 
    }));
    
    f.addEvent(new Event({
        slug: "cpu3",
        defcon: 3,
        delta_power:10,
        min_defcon: 4,
        coste: 200,
        text: "Melissa, un sistema de IA, se convierte en el CEO de {{company}}",   
        reactions: [ 
            new Reaction(r_parar,{text:"Atacar las instalaciones, destruir computadoras",cost:"S"}),
            new Reaction(r_parar,{text:"Poner la opinion publica en contra",cost:"D"}), 
        ], 
    }));

    /*--- 4 ---*/

    f.addEvent(new Event({
        slug: "cpu4",
        defcon: 4,
        delta_power:10,
        coste: 200,
        text: "Grupo de IAs pasan el test de turing en {{institute}}",   
        reactions: [ 
            new Reaction(r_apoyar,{text:"Apoyar publicamente",cost:"D"}),
            new Reaction(r_parar,{text:"Destruir instalaciones",cost:"S"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "cpu5",
        defcon: 4,
        delta_power:10,
        coste: 200,
        text: "Tetraplejico vuelve a andar con IA integrada",   
        reactions: [ 
            new Reaction(r_apoyar,{text:"Apoyar publicamente",cost:"D"}),
            new Reaction(r_parar,{text:"Savotear sistema",cost:"S"}),
        ], 
    }));

    f.addEvent(new Event({
        slug: "cpu5",
        defcon: 4,
        delta_power:10,
        coste: 200,
        min_defcon: 5,
        text: "{{company}} anuncia AI revolucionaria capaz de pensamiento similar al humano",   
        reactions: [ 
            new Reaction(r_apoyar,{text:"Apoyar publicamente",cost:"D"}),
            new Reaction(r_parar,{text:"Savotear sistema",cost:"S"}),
        ], 
    }));

    /*--- 5 ---*/   

    f.addEvent(new Event({
        slug: "cpu5",
        defcon: 4,
        delta_power:10,
        coste: 200,
        min_defcon: 6,
        text: "En una gran ceremonia, el gobierno de {{country}} ha sido cedido a un nuevo sistema IA.",   
        reactions: [ 
            new Reaction(r_apoyar,{text:"Apoyar publicamente",cost:"D"}),
            new Reaction(r_parar,{text:"Denunciar publicamente",cost:"S"}),
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