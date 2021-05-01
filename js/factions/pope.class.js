
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
    f.addEvent(new Event({
        slug: "rezo1",
        defcon: 0,
        delta_alerta:0,
        delta_power:1,
        text: "El Papa ha organizado un rezo en la plaza de Roma. 2 millones de personas se han unido.",   
        reactions: [ 
            new Reaction(r_apoyar_d,{text:"Rezar"}),
            new Reaction(r_parar_d,{text:"Crear disturvios"}), 
        ], 
    }));

    f.addEvent(new Event({
        slug: "hospital1",
        defcon: 0,
        delta_alerta:0,
        delta_power:1,
        text: "El Papa visito un hospital de huerfanos repartiendo juguetes.",  
        reactions: [ 
            new Reaction(r_apoyar_d,{}),
            new Reaction(r_parar_d,{}), 
        ],   
    }));

    f.addEvent(new Event({
        slug: "religionobligatoria",
        defcon: 0,
        delta_alerta: 0,
        delta_power: 10,
        coste: 200,
        text: "La Religion se vuelve asignatura obligatoria en la educacion publica de europa.",  
        reactions: [ 
            new Reaction(r_apoyar_d,{}),
            new Reaction(r_parar_d,{}), 
        ],    
    }));

    f.addEvent(new Event({
        slug: "milagro1",
        defcon: 1,
        delta_alerta:0,
        delta_power:1,
        coste: 50, 
        text: "Durante una visita a un hospital de niños, un niño se curo expontaneamente, los medicos hablan de un milagro.", 
        reactions: [ 
            new Reaction(r_apoyar_d,{}),
            new Reaction(r_parar_d,{}), 
        ],    
    }));
    /* ----------------- /eventos -------------- */

    function bet(data){
        f.bet(data);
    }

    function next(){
        f.next();
    }

    return {
        bet: bet,
        next: next,
        slug: f.slug,
        name: f.name,
        f:f,
    };

})();