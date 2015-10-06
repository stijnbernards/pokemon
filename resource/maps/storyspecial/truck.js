var map = [
    [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, [7, function(){ pokemonCore.maps.getMap(17); }]],
        [1, 0, 0, 8, [7, function(){ pokemonCore.maps.getMap(17); }]],
        [1, 1, 1, 0, 0],
    ],
    "storyspecial/truck_moving.png"
];

var onEnterFunc = function(){
    $(document).unbind("keydown");
    setTimeout(function(){
        $(".bg").attr("src", "resource/images/storyspecial/truck_stopped.png");
        pokemonCore.player.bindMovement();
    }, 3000);
}