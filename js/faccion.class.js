
function Faccion(nombre, slug){
    function logme(tag,msg){ console.log("[Faccion]["+tag+"] "+msg)};

    /**
     * Lista de eventos
     * Cosicas que pueden ocurrir. A las que el usuario puede reaccionar.
     */
    this.events = [];

    /**
     * Nombre/codigo de la faccion 
     */
    this.name = nombre;
    this.slug = slug;

    /**
     * Nivel de alerta
     * Indica como de enfadada esta la faccion.  De 0 a 6.  0=sin alerta.
     * Apareceran unos eventos u otros en funcion del nivel de alerta. 
     */
    this.defcon = 0;

    /**
     * Poder actual.
     * Cuanta ganancia de poder obtiene, indica como de fuerte es esta faccion
     */
    this.power = 0;

    /**
     * Poder acumulado. 
     * Se consume para hacer acciones. 
     */
    this.acumpower = 10;

    /**
     * Eventos esperando.
     * Se han producido y si nada lo impide se ejecutaran.
     */
    this.cola_eventos_esperando = [];

    /**
     * Reacciones.
     * El jugador esta reaccionand a los eventos. Favoreciendolos, impidiendolos.
     */
    this.eventos_reaccion = [];


    this.applyDelta = function(delta){
        logme("applyDelta","...");
        if(delta.power && !isNaN(delta.power)){
            this.power = this.power + delta.power;
            if(this.power<0){
                this.power = 0;
            }
        }
        if(delta.defcon && !isNaN(delta.defcon)){
            this.defcon = this.defcon + delta.defcon;
            if(this.defcon<0){
                this.defcon = 0;
            }else if( this.defcon >6){
                this.defcon = 6;
            }
        }

        this.acumpower = this.acumpower + this.power;
        if(delta.coste && !isNaN(delta.coste)){
            this.acumpower = this.acumpower - delta.coste;
            if(this.acumpower<0){
                this.acumpower = 0;
            }
        }

    };

    this.addEvent = function(e){
        logme("addEvent","...");

        //Pone mas info de contexto en evento
        e.faction_slug = this.slug;
        e.faction_name = this.name;

        if(e.reactions===undefined || e.reactions===null){
            e.reactions = [];
        } 
        
        if(e.reactions.length > 0){
            //Pone info de contexto en botones
            e.reactions.forEach(function(r){
                r.faction_slug = e.faction_slug;
                r.event_slug = e.slug;
            });
        }

        this.events.push(e);
    };

    function randomElement(list){
        var len = list.length;
        var r = (Math.random()*1000000 % list.length).toFixed()-1;
        return list[r];
    }

    /**
     * Devuelve los eventos que tienen el nivel defcon correcto
     * 
     * @returns array 
     */
    this.listEventsAvailable = function(){
        var evs = [];
        var defcon = this.defcon;
        this.events.forEach(function(e){
            if(e.defcon == defcon){
                evs.push(e);
            }
        });

        return evs;
    };

    //TODO: aplicar coste de eventos aqui?
    this.buyRandomEvents = function(num){
        logme("buyRandomEvents","...");
        var evs = [];
        var vistos = [];
        var ev_available = this.listEventsAvailable();

        for(var t=0;t<num;t++){
            var e = randomElement(ev_available);
            if(!e){
                //logme("buyRandomEvents","W: no consiguio events");
                continue;
            }
    
            if(vistos[e.slug]){
                continue;
            }

            if(e.coste>this.acumpower){
                console.log(`[Faccion][buyRandomEvents] MUY CARO! e.coste:${e.coste},this.acumpower:${this.acumpower} `);
                continue;
            }
            vistos[e.slug] = true;

            this.acumpower = this.acumpower - e.coste;

            evs.push(e);
        }

        return evs;
    }

    //TODO: ¿Como deberia cambiar el numero de eventos?
    //  De momento 3+defcon parece tener sentido. Mas angry=>mas activos. Como defcon crece despacio, no sera demasiados eventos
    this.getEventsNum = function(){
        return 3+this.defcon;
    }

    /**
     * Aplica las decisiones del jugador en el turno anterior
     * y los efectos que estos tienen
     * @returns 
     */
    this.processPendingEvents = function(){
        if(!this.cola_eventos_esperando.length){
            console.log("[Faccion][processPendingEvents] NO hay eventos");
            return;
        }

        var delta_power_final = 0;
        var delta_defcon = 0;
        var eventos_reaccion = this.eventos_reaccion;

        console.log(`[Faccion][processPendingEvents] Se van a procesar ${eventos_reaccion.length} eventos`);

        this.cola_eventos_esperando.forEach(function(e){            
            if(eventos_reaccion[e.slug]){
                var r = eventos_reaccion[e.slug];
                
                console.log(`[Faction][processPendingEvents] slug:${e.slug},r.dir:${r.direction} `);

                if(r.direction == "block" || r.direction == "stop"){
                    console.log("[processPendingEvents] se ha suprimido el evento")
                    return;
                }
                if(r.direction =="help"){
                    console.log("[processPendingEvents] player favorecio el evento:"+ e.slug)
                }
            }

            delta_power_final += e.delta_power;
            if(e.delta_defcon) delta_defcon += e.delta_defcon;
        });

        //Defon solo puede cambiar en 1, no pude pasar de 1 a 6 de golpe.
        if(delta_defcon>1) delta_defcon = 1;
        if(delta_defcon<-1) delta_defcon = -1;

        if(delta_defcon){
            console.log("[Faccion][processPendingEvents] AVISO!: cambia el DEFCON de la faccion:" + this.name);
        }
        
        var delta = {
            power: delta_power_final,
            defcon: delta_defcon,
        };

        console.log("[Faccion][processPendingEvents] Delta:");
        console.log(delta);

        this.applyDelta(delta);
    };

    /**
     * Memoriza una decision del usuario.
     * @param {*} data 
     */
    this.bet = function(data){
        console.log("[Faccion][bet] apostando para "+data.event_slug);
        console.log(data);
        this.eventos_reaccion[data.event_slug] = data;
    };

    this.setPendingEvents = function(evs){
        this.cola_eventos_esperando = evs;
        this.eventos_reaccion = [];
    };

    this.next = function(){
        //Procesa turnos pendientes
        this.processPendingEvents();

        //Busca siguientes eventos
        var evs = this.buyRandomEvents(this.getEventsNum());
        Scene.addEvents(evs);

        //Recordara eventos para turno actual
        this.setPendingEvents(evs);
    }

}