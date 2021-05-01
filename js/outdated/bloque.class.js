var Bloque = (function(){   
    function logme(tag,msg){ console.log("[Bloque]["+tag+"] "+msg); }

    function testclon(){
        logme("testclon","..");
        
        var html = $("#testclon").html();

        Scrollmaster.addBlock(html);
    }

    return {
        testclon:testclon
    };
})();