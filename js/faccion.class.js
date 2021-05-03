
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
     * HATE. 
     * El odio que tiene esta faccion por el jugador. 
     */
    this.acumhate = 0;

    /**
     * LOVE. 
     * El amor que tiene esta faccion por el jugador. 
     */
    this.acumlove = 0;

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
        
        if(delta.delta_defcon && !isNaN(delta.delta_defcon)){
            this.defcon = this.defcon + delta.delta_defcon;
            
            if(this.defcon<0){
                this.defcon = 0;
            }else if( this.defcon >6){
                this.defcon = 6;
            }
        }

        if(delta.min_defcon && !isNaN(delta.min_defcon)){
            if(delta.min_defcon > this.defcon){
                this.defcon = this.defcon + 1;
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
            //NOTA: podria ser igual, pero si escribimos pocos eventos entonces se repetiran mucho
            // que fuera igual pondria mucha presion en escribir muchos eventos y nivelar el juego a todos los
            // niveles.
            // Al hacerlo igual o menos se mezclaran los eventos con lo que habra una variedad mayor
            // mas facilmente.  Los eventos de defcon alto seran mas especiales y llamativos?
            if(e.defcon <= defcon){
                evs.push(e);
            }
        });

        return evs;
    };

    //La faccion intenta cosas, le cueste poder acumulado
    this.buyRandomEvents = function(num){
        logme("buyRandomEvents","...");
        var evs = [];
        var vistos = [];
        var ev_available = this.listEventsAvailable();

        for(var t=0;t<num;t++){
            var e = randomElement(ev_available);
            if(!e){
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
    this.getEventsNum = function(){
        return 3;
    }

    
    /**
     * Aplica las decisiones del jugador en el turno anterior
     * y los efectos que estos tienen
     * @returns 
     */
    this.processPendingEvents = function(){
        var delta_power_final = 0;
        var delta_defcon = 0;
        var min_defcon = 0;
        var eventos_reaccion = this.eventos_reaccion;
        var faction_slug = this.slug;

        var self = this;
        var deltaHate = function(m){
            self.acumhate = self.acumhate + m;    
            if(self.acumhate<0)
                self.acumhate = 0;    

            console.log(`[Faction][playerPerjudica].deltaHate ${self.slug} (${m}) acumhate: ${self.acumhate} `);
        };
        var deltaLove = function(m){
            self.acumlove = self.acumlove + m;    
            if(self.acumlove<0)
                self.acumlove = 0;    

            console.log(`[Faction][playerPerjudica].deltaLove ${self.slug} (${m}) acumlove: ${self.acumlove} `);
        };

        console.log(`[Faccion][processPendingEvents] Se van a procesar ${eventos_reaccion.length} eventos`);
        if(this.cola_eventos_esperando.length){           

            this.cola_eventos_esperando.forEach(function(e){            
                if(eventos_reaccion[e.slug]){
                    var r = eventos_reaccion[e.slug];
                    
                    console.log(`[Faction][processPendingEvents] slug:${e.slug},r.dir:${r.direction} `);

                    if(r.direction == "block" || r.direction == "stop"){
                        console.log("[processPendingEvents] se ha suprimido el evento")
                        FF.perjudicaFaccion(faction_slug);
                        deltaHate(5);
                        deltaLove(-1);
                        return;
                    }
                    if(r.direction =="help"){
                        console.log("[processPendingEvents] player favorecio el evento:"+ e.slug)
                        FF.favoreceFaccion(faction_slug);
                        deltaHate(-1); 
                        deltaLove(5);
                        console.log(`[Faction][playerPerjudica] ${this.slug} -acumhate: ${this.acumhate} `);
                    }
                }

                delta_power_final += e.delta_power;
                if(e.delta_defcon) delta_defcon += e.delta_defcon;

                if(e.min_defcon){
                    if(e.min_defcon>min_defcon){
                        min_defcon = e.min_defcon;
                    }
                }
            });
        }else{
            console.log("[Faccion][processPendingEvents] NO hay eventos");
        }

        //Delta_defcon solo puede cambiar en 1, no pude pasar de 1 a 6 de golpe.
        if(delta_defcon>1) delta_defcon = 1;
        if(delta_defcon<-1) delta_defcon = -1;

        if(delta_defcon){
            console.log("[Faccion][processPendingEvents] AVISO!: cambia el DEFCON de la faccion:" + this.name);
        }
        
        var delta = {
            power: delta_power_final,
            delta_defcon: delta_defcon,
            min_defcon: min_defcon,
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
    };

    this.playerPerjudica = function(){
        console.log(`[Faction][playerPerjudica] ${this.slug} se perjudica de acciones del jugador`);
        this.acumpower = this.acumpower - 10;
        if(this.acumpower<0) this.acumpower = 0;

        this.power = this.power - 5;
        if(this.power<1)
            this.power = 1;
    };

    this.playerApoya = function(){
        console.log(`[Faction][playerApoya] ${this.slug} se beneficia de acciones del jugador`);
        this.acumpower = this.acumpower + 10;
        this.power = this.power + 5;

        this.acumhate = this.acumhate - 1;
        if(this.acumhate<0)
            this.acumhate = 0;  
    };

}