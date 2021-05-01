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

    var Col = {
        items:items,
        push:push,
        foreach:foreach, 
        count:count,
        indexOf:indexOf,
        splice:splice,
        rand:rand
    };

    return Col;
};