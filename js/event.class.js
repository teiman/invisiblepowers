

function Event(ev){
    if(!ev.delta_power)
        ev.delta_power = 0;
    if(!ev.min_defcon)
        ev.min_defcon = 0;  
    if(!ev.defcon)
        ev.defcon = 0; 
    if(!ev.coste){
        ev.coste = 1;
    }
    if(!ev.text){
        console.log("ERROR: event withouth proper text:");
        console.log(ev);
        ev.text = "ERROR-MALFORMED EVENT!";
    }    
    if(!ev.slug){
        console.log("ERROR: event withouth proper slug:");
        console.log(ev);
    }
    if(!ev.faction_name){
        ev.faction_name = "Faccion ????"; // False flag operations?
    }
    if(ev.reactions === undefined || ev.reactions === null ){
        ev.reactions = [];
    }

    this.slug = ev.slug;
    this.text = ev.text;
    this.delta_defcon = ev.delta_defcon; // modifica el defcon
    this.delta_power = ev.delta_power; 
    this.min_defcon = ev.min_defcon;// empuja el defcon hacia arriba
    this.faction_name = ev.faction_name;
    this.faction_slug = ev.faction_slug;
    this.defcon = ev.defcon;
    this.coste = ev.coste;
    this.reactions = ev.reactions;

    this.asArray = function(){
        return {
            faction_name: this.faction_name,
            text: this.text,
        };
    };


    this.genHTML = function(){
        var template_event = $("#ui-event").html();

        //Templates para texto. Permite randomizar partes de un evento.
        var country = PAISES.rand();
        var smallnum = (Math.random()*100%5).toFixed();
        var instituto = INSTITUTOS.rand();
        var company = COMPANY.rand();
        this.text_render =  Mustache.render(this.text, {
            country: country,
            smallnum: smallnum,
            instituto: instituto,
            company:company
        });

        //Generate
        var html = Mustache.render(template_event, this);

        if(this.reactions.length){
            var div = document.createElement("div");
            
            this.reactions.forEach(function(r){
                if(!Game.canAfford(r.cost /* S D T */,1/*qty*/)){
                    console.log(`[Event][genHTML] r.cost:${r.cost}`);
                    return;
                }    
                var btn = r.render();
                $(div).append(btn);
            });        
            
            html = html + $(div).html();
        }
        return html;
    };
}
