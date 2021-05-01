var Bigotes = (function(){

    function logme(tag,msg){
        console.log("["+tag+"] "+msg);
    }

    function removeLastComma(strng){        
        var n=strng.lastIndexOf(",");
        var a=strng.substring(0,n) 
        return a;
    }

    function hidratar(id, data){

        data["trim_coma"] = function () {
            return function(val, render) {
              return removeLastComma($.trim( render(val) ));
              //return render(val);
            };
        };  

        var $item = $("#"+id);
        var template_name = "#"+id+"-template";
        var template = $(template_name).html(); 

        if(!template){
            logme("hidratar","Error: id="+template_name+" no encontrado");
            return;
        }

        var output = Mustache.render(template, data);

        logme("hidratar","id="+id);
        console.log(data);        
        console.log(output);

        $item.html( output );
    }

    return {
        hidratar:hidratar
    };

})(); 