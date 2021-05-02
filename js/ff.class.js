var FF = (function(){

    var ffes = {};

    function registrarFaccion(slug){
        ffes[slug] =  {
            friend: [],//lita de amigos
            foe: [],//lista de slug enemigos            
        };
    }

    function registrarAmigo(slug, slug_amigo){
        if(!ffes[slug]){
            registrarFaccion(slug);
        }
        ffes[slug].friend.push(slug_amigo);
    }
    function registrarEnemigo(slug, slug_enemigo){
        if(!ffes[slug]){
            registrarFaccion(slug);
        }
        ffes[slug].foe.push(slug_enemigo);
    }

    function perjudicaFaccion(slug){
        console.log(`[FF][perjudicaFaccion] perjudica a ${slug}`);
        if(!ffes[slug]) return;

        var ff = ffes[slug];

        if(ff.friend)
            ff.friend.forEach(function(faction_slug){
                Game.perjudicaFaccion(faction_slug);
            });

        if(ff.foe)
            ff.foe.forEach(function(faction_slug){
                Game.favoreceFaccion(faction_slug);
            });
    }

    function favoreceFaccion(slug){
        console.log(`[FF][favoreceFaccion] ayuda a ${slug}`);
        if(!ffes[slug]) return;

        var ff = ffes[slug];

        if(ff.friend)
            ff.friend.forEach(function(faction_slug){
                Game.favoreceFaccion(faction_slug);
            });

        if(ff.foe)
            ff.foe.forEach(function(faction_slug){
                Game.perjudicaFaccion(faction_slug);
            });
    }

    return {
        registrarAmigo: registrarAmigo,
        registrarEnemigo: registrarEnemigo,
        registrarFaccion: registrarFaccion,
        perjudicaFaccion: perjudicaFaccion,
        favoreceFaccion: favoreceFaccion,
    };
})();