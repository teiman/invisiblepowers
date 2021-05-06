
function Reaction(r,modifier){
    if(modifier===null || modifier===undefined)
        modifier = {};

    this.text = r.text;
    this.cost = r.cost;
    this.event_slug = r.event_slug;
    this.direction = r.direction;

    for (var key in modifier) {
        if (!modifier.hasOwnProperty(key)){ 
            //console.log(`[Reaction] saltando key:${key}`);
            continue;
        }
    
        var dato = modifier[key];
        //console.log(`[Reaction] event:${r.event_slug},key:${key},tendra valor:${dato}`);
        this[key] = dato;
    }

    this.render = function(){
        var btn = document.createElement("a");
        
        $(btn).attr("href","javascript:Game.bet(this)");    
        $(btn).attr("data-faction_slug",this.faction_slug);  
        $(btn).attr("data-event_slug",this.event_slug); 
        $(btn).attr("data-direction",this.direction);   
        $(btn).attr("data-cost",this.cost);    
        $(btn).text("("+this.cost+") " + this.text);
        $(btn).attr("onclick","Game.bet(this)");
        $(btn).addClass("btn-reaction");
        return btn;
    }
}