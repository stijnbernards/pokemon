var map = [
    [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,[7, function(){pokemonCore.maps.mapLastCoord[0] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(6); }],[7, function(){pokemonCore.maps.mapLastCoord[0] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(6); }],1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,1,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,6,1,1,1,1,1],
        [1,1,1,1,1,6,0,1,1,1,[7, function() { pokemonCore.maps.mapLastCoord[0] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(1);}],1,[4,function(){alert("test")}],0,0,0,0,[4, function(){alert("test")}],1,[7, function(){ pokemonCore.maps.mapLastCoord[0] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(3); }],1,1,1,6,0,1,1,1,1,1],
        [1,1,1,1,1,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,1,1,1,1,1],
        [1,1,1,1,1,6,0,0,6,8,0,0,0,0,0,0,0,0,0,0,0,6,0,6,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,[4, function(){alert("test")}],0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,1,1,1,1,[7, function(){ pokemonCore.maps.mapLastCoord[0] = pokemonCore.gameChar.getCoords(); pokemonCore.maps.getMap(5); }],1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
        [1,1,1,1,1,0,0,0,6,6,6,[4, function(){alert("test")}],0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,6,6,6,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],
    "towns/littleroot/main.jpg"
];
var npc = [

];

var music = {
    ambient: "littleroot.mp3"
}

var onEnterFunc = function(){
    var mom;
    $(".parent.wrapper").append('<div class="truck"></div>');
    $(document).unbind("keydown");
    setTimeout(function(){
        mom = new pokemonCore.npc(
            null,
            "mom",
            ["You saved PROF. BIRCH!<br>I'm so glad!"],
            null,
            null,
            null,
            [11, 11],
            false,
            false
        );

        mom.createNpc();
        setTimeout(function(){
            mom.moveNpc(0 ,1);
            var dialog = [
                "MOM: "+ pokemonCore.gameChar.name +", we're here, honey!",
                "It must be tiring riding with our things in the moving truck.",
                "Well, this is LITTLEROOT TOWN.",
                "How do you like it? This is out new home!",
                "It has a quaint fee, but it seems to be an easy place to live, don't you think?",
                "And, you get your own room, [name]!",
                "Let's go inside.",
            ];
            var dialogIndex = 0;

            createText(dialog[dialogIndex]);
            function createText(text){
                dialogIndex++;
                pokemonCore.utils.createDialog(text, null, function(){
                    if(dialogIndex <= dialog.length) {
                        $(".speech").remove();
                        createText(dialog[dialogIndex]);
                        if(dialogIndex == 7){
                            setTimeout(function(){
                                $(document).unbind("keydown");
                                pokemonCore.maps.getMap(18);
                            }, 500);
                        }
                    }
                });
            }
        }, 500);
    }, 1000)
}