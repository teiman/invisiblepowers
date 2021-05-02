
/*
 Plan de dominacion mundial: 
 0=> influir opinion 
 1=> influir las leyes
 2=> hacer que las leyes se ejecuten al maximo
 3=> demonizar a quienes vayan en contra
 4=> milagros, santos
 5=> destruir reinos enemigos
 6=> activar el rapture 
*/

var Pope = (function(){
    var f = new Faccion("El Papa de Roma","pope");

    /* ---------------- reacciones --------------- */  
    var r_apoyar_d = new Reaction({
        text: "Apoyar",
        cost: "D",
        direction: "help"
    });

    var r_parar_d = new Reaction({
        text: "Sabotear",
        cost: "D",
        direction: "stop"
    })
    /* ---------------- /reacciones --------------- */  

    /* ---------------- eventos --------------- */   

    /*--- 0 ---*/
    f.addEvent(new Event({
        slug: "rezo1",
        defcon: 0,
        delta_power:5,
        text: "El Papa ha organizado un rezo en la plaza de Roma. {{smallnum}} millones de personas se han unido.",   
        reactions: [ 
            new Reaction(r_apoyar_d,{text:"Rezar"}),
            new Reaction(r_parar_d,{text:"Crear disturvios"}), 
            new Reaction(r_parar_d,{text:"Romper tuberia para indundar la plaza",cost:"T"}), 
        ], 
    }));

    f.addEvent(new Event({
        slug: "hospital1",
        defcon: 0,
        delta_power:7,
        text: "El Papa visito un hospital de huerfanos repartiendo juguetes.",  
        reactions: [ 
            new Reaction(r_apoyar_d,{text:"Aportar dinero de ayuda"}),
            new Reaction(r_parar_d,{text:"Robar los juguetes",cost:"S"}), 
        ],   
    }));

    f.addEvent(new Event({
        slug: "religionobligatoria",
        defcon: 0,
        min_defcon: 1,//Asciende el defcon!
        delta_power: 40,
        coste: 200,
        text: "Se discute una ley para hacer obligatoria la religion en la educacion publica en {{country}}.",  
        reactions: [ 
            new Reaction(r_apoyar_d,{}),
            new Reaction(r_parar_d,{text:"Encontrar irregularidades en la ley", cost:"D"}), 
        ],    
    }));

    f.addEvent(new Event({
        slug: "tv1",
        defcon: 0,
        min_defcon: 1,//Asciende el defcon!
        delta_power: 100,
        coste: 200,
        text: "La iglesia catolica abre un nuevo canal de television en {{country}}.",  
        reactions: [ 
            new Reaction(r_apoyar_d,{}),
            new Reaction(r_parar_d,{text:"Interferir la señal", cost:"T"}), 
        ],    
    }));

    /*--- 1 ---*/

    f.addEvent(new Event({
        slug: "milagro1",
        defcon: 1,
        delta_power:50,
        coste: 500, 
        text: "Durante una visita a un hospital de niños, un niño se curo expontaneamente, los medicos hablan de un milagro.", 
        reactions: [ 
            new Reaction(r_apoyar_d,{}),
            new Reaction(r_parar_d,{text:"Encontrar explicacion cientifica",cost:"T"}), 
        ],    
    }));

    f.addEvent(new Event({
        slug: "milagro2",
        defcon: 1,
        delta_power:20,
        coste: 600, 
        text: "El presidente de {{country}} visita al papa, durante su visita una paloma se posa en su brazo.", 
        reactions: [ 
            new Reaction(r_parar_d,{text:"Entrar trapos sucios del politico",cost:"D"}), 
        ],    
    }));

    f.addEvent(new Event({
        slug: "tv2",
        defcon: 1,
        delta_power:20,
        coste: 600, 
        text: "La television papal, la mas popular en {{country}}.", 
        reactions: [ 
            new Reaction(r_parar_d,{text:"Sabotear economia de la cadena",cost:"D"}), 
            new Reaction(r_parar_d,{text:"Interferir señal",cost:"T"}), 
        ],    
    }));

    f.addEvent(new Event({
        slug: "comiteetico",
        defcon: 1,
        min_defcon: 2,//asciende 
        delta_power:20,
        coste: 700, 
        text: "El Papa elegido para liderar un comite etico en {{country}}.", 
        reactions: [ 
            new Reaction(r_parar_d,{text:"Bloquear funcionamiento comite",cost:"D"}), 
        ],    
    }));

    /*--- 2 ---*/

    f.addEvent(new Event({
        slug: "presoscuras",
        defcon: 2,
        delta_power:50,
        min_defcon: 3, //asciende
        coste: 800, 
        text: "El partido conservador en el poder colaboran con El Papa en carceles para asistir a los presos.", 
        reactions: [ 
            new Reaction(r_parar_d,{text:"Encontrar tecnicismo legal para evitarlo",cost:"D"}), 
        ],    
    }));

    /*--- 3 ---*/

    f.addEvent(new Event({
        slug: "takeover1",
        defcon: 3,
        delta_power:150,
        min_defcon:4,//asciende
        coste: 900, 
        text: "El Partido conservador de {{country}} cede sus puestos a varios obispos.", 
        reactions: [ 
            new Reaction(r_parar_d,{text:"Organizar una campaña politica en contra",cost:"D"}), 
            new Reaction(r_parar_d,{text:"Asesinar uno de los obispos para evitar la accion.",cost:"S"}), 
        ],    
    }));

    /*--- 4 ---*/

    f.addEvent(new Event({
        slug: "takeover1",
        defcon: 4,
        delta_power:150,
        min_defcon:5,//asciende
        coste: 900, 
        text: "El Partido conservador de {{country}} cede sus puestos a varios obispos.", 
        reactions: [ 
            new Reaction(r_parar_d,{text:"Organizar una campaña politica en contra",cost:"D"}), 
            new Reaction(r_parar_d,{text:"Asesinar uno de los obispos para evitar la accion.",cost:"S"}), 
        ],    
    }));

    /*--- 5 ---*/

    f.addEvent(new Event({
        slug: "takeover2",
        defcon: 5,
        delta_power:150,
        min_defcon:6,//asciende
        coste: 900, 
        text: "El Papa publica 'Comentarios Iluminados' con textos inspirados por un angel.", 
        reactions: [ 
            new Reaction(r_parar_d,{text:"Organizar una campaña politica en contra",cost:"D"}), 
            new Reaction(r_parar_d,{text:"Destruir imprentas e impidir distribucion.",cost:"S"}), 
        ],    
    }));

    f.addEvent(new Event({
        slug: "takeover3",
        defcon: 5,
        delta_power:150,
        volatil_destruccion_mundo: 10,//20% posibilidad destruccion del mundo
        coste: 900, 
        min_defcon:6,
        text: "Fotografias del papa conversando con un Angel salen a la luz.", 
        reactions: [ 
            new Reaction(r_parar_d,{text:"Desmentir las imagenes",cost:"D"}), 
            new Reaction(r_parar_d,{text:"Impedir la distribucion de las fotos.",cost:"S"}), 
        ],    
    }));

    /*--- 6 ---*/

    f.addEvent(new Event({
        slug: "takeover3",
        defcon: 6,
        delta_power:150,
        volatil_destruccion_mundo: 90,//posibilidad destruccion del mundo
        coste: 900, 
        text: "El Papa da bienvenida al nuevo mundo, la gente empieza a desaparecer, es la rapture.", 
    }));

    /* ----------------- /eventos -------------- */

    /* ------------- FF -------------- */
    FF.registrarAmigo(f.slug,"USA");
    FF.registrarEnemigo(f.slug,"CPU");
    FF.registrarEnemigo(f.slug,"PC");

    /* ------------- /FF -------------- */

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