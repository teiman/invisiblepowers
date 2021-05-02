var Coleccion = function(items){

    function rand(){
        var len = items.length;
        var r =  (Math.random()*10000000 % len).toFixed();
        return items[r];
    }

    function push(item){
        items.push(item);
    }

    function foreach(method){
        items.forEach(function(element) {
            method(element);
        });
    }

    function count(){
        return items.length;
    }

    function indexOf(element){
        return items.indexOf(element);
    }

    function splice(offset,c){
        return items.splice(offset,c);
    }

    function shuffle() {
        var array = items;
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }

    var Col = {
        items:items,
        push:push,
        foreach:foreach, 
        count:count,
        indexOf:indexOf,
        splice:splice,
        shuffle:shuffle,
        rand:rand
    };

    return Col;
};