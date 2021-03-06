
function Agent(opt){
    // S=soldado, D=diplomatio, T=tecnico
    this.type = opt.type;

    // Turno hasta el que el agente esta ocupado
    this.busyturn = 0;

    this.isBusy = function(){
        var turno_actual = Game.getTurn();
        if(this.busyturn>turno_actual){
            return true;
        }
        return false;
    };

    this.desc = function(){
        switch(this.type){
            case "S":
                return "Soldado";
            case "D":   
                return "Diplomatico";
            case "T":
                return "Tecnico";
        }
    };
}