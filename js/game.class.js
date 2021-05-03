/*
Recursos

Soldado: S
Diplomatico: D
Tecnico: T
*/

var Game = (function(){
    function logme(tag,msg){ console.log("[Game]["+tag+"] "+msg)};    

    //Preparamos team con los agentes iniciales
    var team = [];
    team.push( new Agent({type:'S'}));
    team.push( new Agent({type:'S'}));
    team.push( new Agent({type:'S'}));
    team.push( new Agent({type:'S'}));
    team.push( new Agent({type:'S'}));
    team.push( new Agent({type:'D'}));
    team.push( new Agent({type:'D'}));
    team.push( new Agent({type:'D'}));
    team.push( new Agent({type:'T'}));
    team.push( new Agent({type:'T'}));

    //Preparamos las facciones originales
    // TODO: ¿creacion dinamica de facciones?
    var factions = [];
    factions.push(Pope);
    factions.push(DD9);
    factions.push(CPU);
    factions.push(PC);
    factions.push(USA);

    //Indica el turno, los agentes se van N turnos, pero vuelven :D
    var turno = 1;

    /**
     * Cuenta cuantos agentes de este tipo hay disponibles
     * 
     * @param string tipo 
     * @returns integer
     */
    function colaCount(tipo){
        var count = 0;
        for(var t=0;t<team.length;t++){
            var a = team[t];
            if(!a) continue;
            if(a.type != tipo){
                //console.log(`[Game][colaCount] a.type:${a.type} != tipo:${tipo}`);
                continue;
            }
            if(a.isBusy()) continue;
            count++;
        }
        return count;
    }

    /**
     * Devuelve el primer agente de este tipo disponible
     * 
     * @param string tipo 
     * @returns Agent|null
     */
    function colaFirstAvailTypo(tipo){
        for(var t=0;t<team.length;t++){
            var a = team[t];
            if(!a) continue;
            if(a.type != tipo) continue;
            if(a.isBusy()) continue;
            return a;
        }
        return null;
    }


    function getTeam(){
        return {
            soldados: colaCount('S'),
            diplomaticos: colaCount('D'),
            tecnicos: colaCount('T')
        };
    }

    function update_ui(){
        logme("update_ui","...");

        var template = $("#ui-template").html();
        var data = getTeam();

        if(1){
            //DEBUG
            data["p_power"] = Pope.f.power;
            data["p_defcon"] = Pope.f.defcon;
            data["p_acumpower"] = Pope.f.acumpower;
            data["p_acumhate"] = Pope.f.acumhate;
        }

        //console.log("Pope.f.power:"+ Pope.f.power);

        var html = Mustache.render(template, data);
        $("#ui-box").html(html);

        $(".btn-reaction").each(function(){
            //<button type="button" data-faction_slug="pope" data-event_slug="hospital1" 
            //data-direction="stop" data-cost="D" onclick="Game.bet(this)" class="btn-reaction">(D) Sabotear</button>
            var cost = $(this).attr("data-cost");
            if(!canAfford(cost,1)){
                desactivarBoton(this);
            }else{
                //Una vez desactivado, ya no se activan, las acciones no tienen uno
                // ¡Mano firme director!, que no le tiemble la mano.
                //activarBoton(this);
            }
        });
    }

    function playerEvents(){
        for(var t=0;t<team.length;t++){
            var a = team[t];
            if(!a) continue;
            if(a.busyturn == turno){
                console.log(`[Game][playerEvents] ¡Volvio especialista!`)
                var e = DD9.genReturnAgentEvent(a);
                Scene.addEvents([e]);
            }
        }
    }

    /**
     * El juego avanza un turno.
     * Corren los eventos, se redibuja la pantalla.
     */
    function next(){
        logme("next","...");

        var DELAY_RENDER = 200;//normalmente 200

        //Avanza el turno
        turno++;

        //Borramos escena
        Scene.clear(); 

        //Generamos eventos especificos de game para player
        playerEvents();
        
        //Generamos otros eventos
        factions.forEach(function(f){
            f.next();
        });

        //Esperamos y re-renderizamos juego
        setTimeout(function(){
            Scene.redraw();
            update_ui();
        },DELAY_RENDER);
    }

    function desactivarBoton(nodo){
        $(nodo).prop("disabled",true)
        .prop("readonly",true)
        .prop("disabled",true)
        .addClass("disabled")
        ;
    }

    function activarBoton(nodo){
        $(nodo).prop("disabled",false)
        .prop("readonly",false)
        .prop("disabled",false)
        .removeClass("disabled")
        ;
    }

    function findFaction(slug){
        var found = null;
        factions.forEach(function(f){
            if(f.slug == slug)
                found = f;
        })
        return found;
    }

    /**
     * El usuario apuesta un recurso en un evento.
     * El UI se actualizara, porque el recurso apostado se va N turnos. 
     * Otros botones pueden desactivarse si se agota el recurso.
     * 
     * @param HTMLNode nodo 
     */
    function bet(nodo){
        var event_slug = $(nodo).attr("data-event_slug");
        var faction_slug = $(nodo).attr("data-faction_slug");
        var direction = $(nodo).attr("data-direction");
        var cost = $(nodo).attr("data-cost");

        var f = findFaction(faction_slug);
        if(f){
            f.bet({
                event_slug: event_slug,
                direction:direction,
                cost:cost,
                faction_slug:faction_slug,
            });

            //TODO: numero de turnos variable, de momento hardcodeamos a 5 turno
            usarRecurso(cost,5);

            desactivarBoton(nodo);
        }else{
            console.log("[Game][bet] No encontrada faccion:"+faction_slug+", en:");
            console.log(factions);
        }
    }

    function usarRecurso(recurso,turnos){
        console.log(`[Game][usaRecurso] ...`);
        console.log(`[Game][usaRecurso] recurso:${recurso},turnos:${turnos}`);
        if(!turnos)
            turnos = 1;

        //Coge el primer desocupado
        var agent = colaFirstAvailTypo(recurso);
        if(!agent){
            console.log(`[Game][usaRecurso] ERROR: no se pudo consumir recurso de tipo:${recurso} `)
            return;
        }

        //Aumenta hasta que turno estara ocupado
        agent.busyturn = turno + turnos;

        update_ui();
    }

    function canAfford(recurso,qty){
        return (colaCount(recurso)>=qty);
    }

    function getTurn(){
        return turno;
    }

    function perjudicaFaccion(slug){
        console.log(`[Game][perjudicaFaccion] perjudica a ${slug}`);
        var f = findFaction(slug);
        if(!f)return;
        f.playerPerjudica();
    }
    function favoreceFaccion(slug){
        console.log(`[Game][favoreceFaccion] ayuda a ${slug}`);
        var f = findFaction(slug);
        if(!f)return;
        f.playerApoya();
    }

    $(function(){
        //Initial update so the game always have a ui even on turn 0 
        update_ui();
    });

    return {
        canAfford:canAfford,
        usarRecurso:usarRecurso,
        bet:bet,
        next:next,
        getTurn:getTurn,
        getTeam:getTeam,
        perjudicaFaccion: perjudicaFaccion,
        favoreceFaccion: favoreceFaccion,
        factions:factions,
    };

})();