
function Reaction(r,modifier){
    this.text = r.text;
    this.cost = r.cost;
    this.event_slug = r.event_slug;
    this.direction = r.direction;

    this.render = function(){
        var btn = document.createElement("button");
        $(btn).attr("type","button");
        $(btn).attr("data-faction_slug",this.faction_slug);  
        $(btn).attr("data-event_slug",this.event_slug); 
        $(btn).attr("data-direction",this.direction);   
        $(btn).attr("data-cost",this.cost);        
        $(btn).text("("+this.cost+") " + this.text);
        $(btn).attr("onclick","Game.bet(this)")
        $(btn).addClass("btn-reaction");
        return btn;
    }
}