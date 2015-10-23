var map = [
    [

    ],
    "towns/storyspecial/intro.png"
];

var onEnterFunc = function(){
    var dialog = [
        "Hi! Sorry to keep you waiting!",
        "Welcome to the world of POK&eacute;MON!",
        "My name is BIRCH.",
        "But everyone calls me the POK&eacute;MON PROFESSOR.",
        'This is what we call a "POK&eacute;MON."',
        "This world is widely inhabited by creature known as POK&eacute;MON.",
        "We humans live alongside POK&eacute;MON, at times as friendly playmates,",
        "and at times as cooperative workmates.",
        "And sometimes, we band together and battle others like us.",
        "But despite our closeness, we don't know everything about POK&eacuteMON.",
        "In fact, there are many, many secrets surrounding POK&eacute;MON.",
        "To unravel POK&eacuteMON mysteries, I've een undertaking research. That's what I do.",
        "You're Stijn who's moving to my hometown of LITTLEROOT. I get it now!",
        "All right, are you ready?",
        "Your very own adventure is about to unfold.",
        "Take courage, and leap into the world of POK&eacute;MON where dreams,",
        "adventure, and friendships await!",
        "Well, I'll be expecting you later. Come see me in my POK&eacute;MON LAB."
    ];
    var dialogIndex = 0;

    createText(dialog[dialogIndex]);
    function createText(text){
        dialogIndex++;
        pokemonCore.utils.createDialog(text, null, function(){
            if(dialogIndex < dialog.length) {
                $(".speech").remove();
                createText(dialog[dialogIndex]);
                if(dialogIndex == 5){
                    $(".parent.wrapper").append('<div class="birch-animate"></div>');
                }
                if(dialogIndex == 17){
                    pokemonCore.maps.getMap(15);
                }
            }
        });
    }
};

var music = {
    ambient: "birch.mp3"
}