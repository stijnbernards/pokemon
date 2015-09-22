//TODO: Fix spaghetti code

var resFolder = "resource/images/";

var $gameDiv;
var $gameWrapper;

var maps = [
    "maps/towns/littleroot/main.js",
    "maps/towns/littleroot/player_home_f1.js",
    "maps/towns/littleroot/player_home_f2.js",
    "maps/towns/littleroot/rival_home_f1.js",
    "maps/towns/littleroot/rival_home_f2.js",
    "maps/towns/littleroot/laboratory.js",
    "maps/routes/101/main.js",
    "maps/towns/oldale_town/main.js",
    "maps/towns/buildings/pokemart.js"
];

$(document).ready(function(){
    $gameDiv = $("#game");
    $gameWrapper = $("#game .parent.wrapper");
});

//Core
var pokemonCore = {
    canKeyPress: true,
    timeouts: [],
    displayGrid: false,
    gameChar: null,
    specialInteract: [12],
    specialItems: [4, 5],
    specialRender: {
        6: function(x, y){
            $gameWrapper.append('<div class="flower-1" style="top: '+ (x * 64) +'px; left: '+ (y * 64) +'px"></div>');
        }
    },
    passable: [0, 6, 2, 7, 8, 9],

    //Main init function
    init: function(){
        pokemonCore.maps.getMap(8);
        pokemonCore.player.bindMovement();
    },

    //Maps class
    maps: {
        mapLastCoord: new Array(),
        map: null,
        getMap: function(mapId){
            for (var i = 0; i < pokemonCore.timeouts.length; i++) {
                clearTimeout(pokemonCore.timeouts[i]);
            }
            pokemonCore.timeouts = [];
            $.getScript("resource/" + maps[mapId], function(){
                pokemonCore.gameChar = null;
                $gameWrapper.attr("data-animate", "false");
                $gameWrapper.css("left", "");
                $gameWrapper.css("top", "");
                $gameWrapper.children().remove();
                $("#player").remove();
                $(".speech").remove();
                $gameWrapper.append('<img class="bg">');
                $gameWrapper.find(".bg").attr("src", resFolder + map[1]);
                pokemonCore.maps.map = map[0];
                for(var X = 0; X < pokemonCore.maps.map.length; X++){
                    for(var Y = 0; Y < pokemonCore.maps.map[X].length; Y++){
                        var selectedTile = pokemonCore.maps.map[X][Y];
                        if(isFunction(pokemonCore.specialRender[selectedTile])){
                            pokemonCore.specialRender[selectedTile](X, Y);
                        }else if(selectedTile == 8 && pokemonCore.maps.mapLastCoord[mapId] == null){
                            pokemonCore.player.createPlayerAt(Y + 1, X + 1);
                        }
                    }
                }

                if(pokemonCore.maps.mapLastCoord[mapId] != null) {
                    pokemonCore.player.createPlayerAt(pokemonCore.maps.mapLastCoord[mapId].X, pokemonCore.maps.mapLastCoord[mapId].Y);
                    pokemonCore.maps.mapLastCoord[mapId] = null;
                }

                if(pokemonCore.displayGrid)
                    $gameWrapper.append('<div class="grid"></div>');

                if(typeof npc != 'undefined' && npc != null) {
                    for (var i = 0; i < npc.length; i++) {
                        npc[i].createNpc();
                    }
                }
            });
        }
    },

    //Player class
    player: {
        walkInterval: null,
        lastKeyPress: null,
        initBag: function(){
            var curNr = 0;
            var keys = {
                ITEMS: null,
                "POK&eacute; BALLS": null,
                "TMs & HMs": null,
                BERRIES: null,
                "KEY ITEMS": null
            };

            $("#game").append('<div class="bag-gui"><div class="pokeball-icon"></div><div class="arrow-left"></div><div class="arrow-right"></div><div class="type-name"></div><div class="item-display"></div><div class="item-desc"></div></div>');
            $(".bag-gui .type-name").append('<span style="margin-left: -268px">KEY ITEMS</span><span data-animate="true">ITEMS</span><span>POK&eacute; BALLS</span><span>TMs & HMs</span><span>BERRIES</span><span>KEY ITEMS</span><span>ITEMS</span>');
            for(var item in pokemonCore.gameChar.bag) {
                keys[pokemonCore.gameChar.bag[item].type] = pokemonCore.gameChar.bag[item];
            }

            $(document).bind("keydown", function(e){
                switch(e.which){
                    case 39:
                        curNr++;
                        removeArrow();
                        if(curNr > 4){
                            $(".bag-gui .type-name span:first-of-type").next().css("margin-left", "-" + (curNr * 268) + "px");
                            setTimeout(function(){
                                $(".bag-gui .type-name span:first-of-type").next().attr("data-animate", "false");
                                $(".bag-gui .type-name span:first-of-type").next().css("margin-left", "0px");
                                setTimeout(function(){
                                    $(".bag-gui .type-name span:first-of-type").next().attr("data-animate", "true");
                                }, 20);
                            }, 200);
                            curNr = 0;
                        }else {
                            $(".bag-gui .type-name span:first-of-type").next().css("margin-left", "-" + (curNr * 268) + "px");
                        }
                        $(".bag-gui .pokeball-icon").attr("data-animate", "none");
                        setTimeout(function(){
                            $(".bag-gui .pokeball-icon").attr("data-animate", "right);
                        }, 20);
                        break;
                    case 37:
                        curNr--;
                        removeArrow();
                        if(curNr == 0){
                            $(".bag-gui .type-name span:first-of-type").next().css("margin-left", "-" + (curNr * 268) + "px");
                            setTimeout(function(){
                                $(".bag-gui .type-name span:first-of-type").next().attr("data-animate", "false");
                                $(".bag-gui .type-name span:first-of-type").next().css("margin-left", "-" + (5 * 268) + "px");
                                setTimeout(function(){
                                    $(".bag-gui .type-name span:first-of-type").next().attr("data-animate", "true");
                                }, 20);
                            }, 200);
                            curNr = 5;
                        }else {
                            $(".bag-gui .type-name span:first-of-type").next().css("margin-left", "-" + (curNr * 268) + "px");
                        }
                        $(".bag-gui .pokeball-icon").attr("data-animate", "none");
                        setTimeout(function(){
                            $(".bag-gui .pokeball-icon").attr("data-animate", "left");
                        }, 20);
                        break;
                }

                function removeArrow(){

                    $(".arrow-left, .arrow-right").css("display", "none");
                    setTimeout(function(){
                        $(".arrow-left, .arrow-right").css("display",  "block");
                    }, 200);
                }

                function DisplayKey(key){
                    $(".bag-gui .type-name").append(key);
                }
            });
        },
        openMenu: function(){
            var menuItems = {
                'POK&eacute;DEX': function () {

                },
                'POK&eacute;MON': function () {

                },
                BAG: function () {
                    pokemonCore.player.initBag();
                },
                char: function(){

                },
                SAVE: function () {

                },
                OPTION: function () {

                },
                EXIT: function () {
                    $(document).unbind("keydown");
                    $(".game-menu").remove();
                    pokemonCore.player.bindMovement();
                }
            };

            $(document).unbind("keydown");
            $("#game").append('<div class="game-menu"></div>');

            for(var key in menuItems){
                if(menuItems.hasOwnProperty(key)){
                    if(key === "char"){
                        $(".game-menu").append('<div data-func="' + key + '">' + pokemonCore.gameChar.getName() + '</div>');
                    }else {
                        $(".game-menu").append('<div data-func="' + key + '">' + key + '</div>');
                    }
                }
            }

            $(".game-menu div:first-of-type").attr("data-selected", "true");

            $(document).bind("keydown", function(e){
                var selected = $('.game-menu div[data-selected="true"]');
                switch(e.which){
                    case 38:
                        if(selected.prev().length > 0){
                            selected.attr("data-selected", "false");
                            selected.prev().attr("data-selected", "true");
                        }else{
                            selected.attr("data-selected", "false");
                            $(".game-menu div:last-of-type").attr("data-selected", "true");
                        }
                        break;
                    case 40:
                        if(selected.next().length > 0){
                            selected.attr("data-selected", "false");
                            selected.next().attr("data-selected", "true");

                        }else{
                            selected.attr("data-selected", "false");
                            $(".game-menu div:first-of-type").attr("data-selected", "true");
                        }
                        break;
                    case  32:
                        menuItems[selected.attr("data-func")]();
                        break;
                    case 13:
                        menuItems["EXIT"]();
                        break;
                }
            });
        },
        createPlayerAt: function(x, y){
            pokemonCore.gameChar = new character(new coords(x, y), "Peter");
        },
        bindMovement: function(){
            $(document).keydown(function(e) {
                //if(pokemonCore.canKeyPress) {
                    if(pokemonCore.player.walkInterval === 'null' || pokemonCore.player.walkInterval == null) {
                        playerSwitch();
                        if (pokemonCore.canKeyPress == false) {
                            setTimeout(function () {
                                setTimeout(function () {
                                    $("#player").attr("data-animate", "false");
                                    pokemonCore.canKeyPress = true;
                                }, 100);
                            }, 150);
                        }
                        (function walk(){
                            if(e.which != 32) {
                                pokemonCore.player.lastKeyPress = e.which
                                pokemonCore.player.walkInterval = setTimeout(function () {
                                    playerSwitch();
                                    if (pokemonCore.canKeyPress == false) {
                                        setTimeout(function () {
                                            setTimeout(function () {
                                                $("#player").attr("data-animate", "false");
                                                pokemonCore.canKeyPress = true;
                                            }, 100);
                                        }, 150);
                                    }
                                    walk();
                                }, 280);
                            }
                        })();
                    }
                //}

                function playerSwitch(){
                    switch (e.which) {
                        case 37: // left
                            pokemonCore.gameChar.direction = "left";
                            $("#player").attr("data-direction", "left");
                            if (pokemonCore.player.checkMove(-1, 0)) {
                                pokemonCore.gameChar.setX(-1);
                                $("#player").attr("data-animate", "true");
                                pokemonCore.canKeyPress = false;
                                dataFoot();
                            }
                            break;
                        case 38: // up
                            pokemonCore.gameChar.direction = "up";
                            $("#player").attr("data-direction", "up");
                            if (pokemonCore.player.checkMove(0, -1)) {
                                pokemonCore.gameChar.setY(-1);
                                $("#player").attr("data-animate", "true");
                                pokemonCore.canKeyPress = false;
                                dataFoot();
                            }
                            break;
                        case 39: // right
                            pokemonCore.gameChar.direction = "right";
                            $("#player").attr("data-direction", "right");
                            if (pokemonCore.player.checkMove(1, 0)) {
                                pokemonCore.gameChar.setX(1);
                                $("#player").attr("data-animate", "true");
                                pokemonCore.canKeyPress = false;
                                dataFoot();
                            }
                            break;
                        case 40: // down
                            pokemonCore.gameChar.direction = "down";
                            $("#player").attr("data-direction", "down");
                            if (pokemonCore.player.checkMove(0, 1)) {
                                pokemonCore.gameChar.setY(1);
                                $("#player").attr("data-animate", "true");
                                pokemonCore.canKeyPress = false;
                                dataFoot();
                            }
                            break;
                        case 32: //space
                            clearInterval(pokemonCore.player.walkInterval);
                            pokemonCore.player.walkInterval = null;
                            if (pokemonCore.player.checkInteract());
                            break;

                        case 13:
                            pokemonCore.player.openMenu();
                            break;
                        default:
                            return;
                    }
                }

                function dataFoot(){
                    if($("#player").attr("data-foot") === "left"){
                        $("#player").attr("data-foot", "right");
                    }else{
                        $("#player").attr("data-foot", "left");
                    }
                }
                e.preventDefault();
            });

            $(document).bind("keyup", function(e){
                if(e.which == pokemonCore.player.lastKeyPress) {
                    clearInterval(pokemonCore.player.walkInterval);
                    pokemonCore.player.walkInterval = null;
                }
            });
        },
        checkMove: function(x, y){
            var coords = pokemonCore.gameChar.getCoords();
            coords.X += x;
            coords.Y += y;
            if(pokemonCore.passable.indexOf(pokemonCore.maps.map[coords.Y - 1][coords.X - 1]) >= 0){
                if(pokemonCore.maps.map[coords.Y - 1][coords.X - 1] == '9') {
                    pokemonCore.battle.grassTrigger();
                    return true;
                }
                if(typeof npc != 'undefined' && npc != null) {
                    for (var i = 0; i < npc.length; i++) {
                        if(npc[i].getCoords()[0] == coords.getBoth()[0] && npc[i].getCoords()[1] == coords.getBoth()[1]){
                            return false;
                        }
                    }
                }
                return true;
            }else if(pokemonCore.passable.indexOf(pokemonCore.maps.map[coords.Y - 1][coords.X - 1][0]) >= 0){
                if(pokemonCore.maps.map[coords.Y - 1][coords.X - 1][0] == 2){
                    if(pokemonCore.gameChar.direction == pokemonCore.maps.map[coords.Y - 1][coords.X - 1][1]) {
                        switch(pokemonCore.gameChar.direction){
                            case "left":
                                pokemonCore.gameChar.setX(-1);
                                break;
                            case "right":
                                pokemonCore.gameChar.setX(1);
                                break;
                            case "down":
                                pokemonCore.gameChar.setY(1);
                                break;
                            case "up":
                                pokemonCore.gameChar.setY(-1);
                                break;
                        }
                        return true;
                    }
                }else{
                    pokemonCore.maps.map[coords.Y - 1][coords.X - 1][1]();
                    return false;
                }
            }else{
                if(pokemonCore.specialItems.indexOf(pokemonCore.maps.map[coords.Y - 1][coords.X - 1][0]) >= 0){
                    pokemonCore.maps.map[coords.Y - 1][coords.X - 1][1]();
                }
                return false;
            }
        },
        checkInteract: function(){
            var x, y, findNpc;
            var coords = pokemonCore.gameChar.getCoords();
            findNpc = false;
            switch(pokemonCore.gameChar.direction){
                case "left":
                    x = -1;
                    y = 0;
                    break;
                case "right":
                    x = 1;
                    y = 0;
                    break;
                case "down":
                    x = 0;
                    y = 1;
                    break;
                case "up":
                    x = 0;
                    y = -1;
                    break;
                default:
                    x = 0;
                    y = 0;
                    break;
            }
            coords.X += x;
            coords.Y += y;
            if(typeof npc != 'undefined') {
                for (var i = 0; i < npc.length; i++) {
                    if(npc[i].getCoords()[0] == coords.getBoth()[0] && npc[i].getCoords()[1] == coords.getBoth()[1]){
                        npc[i].interact();
                        findNpc = true;
                    }
                }
            }

            if(findNpc == false && pokemonCore.maps.map[coords.Y - 1][coords.X - 1][0] == "12"){
                pokemonCore.maps.map[coords.Y - 1][coords.X - 1][1]();
            }

            return true;
        }
    },

    //NPC class
    npc: function(pA, nm, dia, aDC, bC, txt, start, battle, shouldTurn, beforeFight, afterFight){
        var _this = this;
        var direction = null;
        var beforeCreate = bC;
        var patrolArea = pA;
        this.name = nm;
        this.dialog = dia;
        var afterDialogComplete = aDC;
        var texture = txt;
        var startPoint = start;
        var coords = start;
        this.battle = battle;
        var canUpdate = true;
        this.curDialog = 0;
        this.clear = false;
        this.shouldTurn = shouldTurn;
        this.beforeFight = beforeFight;
        this.afterFight = afterFight;

        this.getCoords = function(){
            return jQuery.extend(true, {}, coords);
        }

        update();

        this.interact = function () {
            $('.speech').remove();
            canUpdate = false;
            switch (pokemonCore.gameChar.direction) {
                case "up":
                    direction = "down";
                    break;
                case "left":
                    direction = "right";
                    break;
                case "down":
                    direction = "up";
                    break;
                case "right":
                    direction = "left";
                    break;
            }
            if (this.curDialog < this.dialog.length)
                pokemonCore.utils.createDialog(this.dialog[this.curDialog], this);
            else {
                pokemonCore.player.bindMovement();
                this.curDialog = 0;
                canUpdate = true;
            }

        }

        this.createNpc = function(){
            $gameWrapper.append('<div class="npc npc-'+ nm +'" style="top: '+ ((startPoint[1] - 1) * 64) +'px; left: '+ ((startPoint[0] - 1) * 64) +'px; background-image: url('+ this.name +'.png)" data-direction="up"></div>');
            direction = "up";
        }

        this.pokemonAlive = function(){
            for(var i = 0; i < pokemonCore.battle.trainerNpc.battle.pokemon.length; i++){
                if(pokemonCore.battle.trainerNpc.battle.pokemon[i].pokemon.pokemon.stats.HP[1] > 0){
                    return i;
                }
            }
            return false;
        }

        function moveNpc(x, y){
            coords[0] += x;
            coords[1] += y;
            $(".npc-"+ nm).css({"top" : ((coords[1] - 1) * 64) + "px", "left" : ((coords[0] - 1) * 64) + "px"});
            if(x == 1)
                direction = "right";
            else if(x == -1)
                direction = "left";
            else if(y == 1)
                direction = "down";
            else if(y == -1)
                direction = "up";

            $(".npc-"+ nm).attr("data-direction", direction);
        }

        function update(){
            if(patrolArea != null && (shouldTurn === "false" || shouldTurn == false)) {
                (function timeOut() {
                    pokemonCore.timeouts.push(setTimeout(function () {
                        if(canUpdate){
                            var randomX = 0;
                            var randomY = 0;
                            (function move(){
                                if (Math.round(Math.random() * (2)) - 1 == 0)
                                    randomX = Math.floor(Math.random() * (2 - -1)) + -1;
                                else
                                    randomY = Math.floor(Math.random() * (2 - -1)) + -1;

                                if (coords[0] + randomX <= patrolArea[0][0] && coords[1] + randomY <= patrolArea[0][1] && coords[0] + randomX >= patrolArea[1][0] && coords[1] + randomY >= patrolArea[1][1] && (coords[0] + randomX != pokemonCore.gameChar.getCoords().X && coords[1] + randomY != pokemonCore.gameChar.getCoords().Y))
                                    moveNpc(randomX, randomY);
                                else
                                    move();
                            })();
                        }
                        timeOut();
                    }, 2000));
                })();
            }else{
                (function timeOut(){
                    pokemonCore.timeouts.push(setTimeout(function(){
                        if(canUpdate){
                            var rand = Math.floor(Math.random() * 4);
                            var directions = ["up", "down", "left", "right"];
                            var x, y;

                            direction = directions[rand];
                            if(shouldTurn)
                                $(".npc-"+ nm).attr("data-direction", directions[rand]);
                            switch(direction){
                                case "left":
                                    x = -1;
                                    y = 0;
                                    break;
                                case "right":
                                    x = 1;
                                    y = 0;
                                    break;
                                case "down":
                                    x = 0;
                                    y = 1;
                                    break;
                                case "up":
                                    x = 0;
                                    y = -1;
                                    break;
                                default:
                                    x = 0;
                                    y = 0;
                                    break;
                            }
                            if(_this.battle !== "false" && _this.battle != false) {
                                checkPlayer(x, y);
                            }
                        }
                        timeOut();
                    }, 500));
                })();
            }
        }

        function checkPlayer(x, y){
            var collisions = [[parseInt(coords[0]) + x, parseInt(coords[1]) + y]];
            var player = [pokemonCore.gameChar.getCoords().X, pokemonCore.gameChar.getCoords().Y];
            var arrCol;
            for(var i = 0; i < 5; i++){
                collisions.push([parseInt(collisions[i][0]) + x, parseInt(collisions[i][1]) + y]);
            }

            if(equalsArr()){
                $(document).unbind("keydown");
                canUpdate = false;
                $(".npc-"+ nm).prepend('<div class="exclamation-mark"></div>');
                setTimeout(function(){
                    $(".npc-"+ nm +" .exclamation-mark").remove();
                    (function walkTo() {
                        setTimeout(function () {
                            moveNpc(x, y);
                            if (coords[0] != player[0] - 1 && coords[1] != player[1] - 1 && coords[0] != player[0] + 1 && coords[1] != player[1] + 1)
                                walkTo();
                            else {
                                pokemonCore.utils.createDialog(_this.dialog[_this.curDialog], _this);
                            }
                        }, 300)
                    })();
                }, 1000);
            }

            function equalsArr(){
                for(var i = 0; i < collisions.length; i++){
                    for(var i2 = 0; i2 < collisions[i].length; i2++ ){
                        if(collisions[i][i2] != player[i2])
                            break;

                        if(i2 == 1) {
                            arrCol = collisions[i];
                            return true;
                        }
                    }
                }
                return false;
            }
        }
    },

    utils:{
        createEmptyDialog: function(text){
            var breakDialog = true;
            var brCount = 0;
            var pos;
            var pos2;

            $gameDiv.append('<div class="speech" style="width: 100%; height: 160px;"></div>');
            if(text.indexOf("<br>") > -1){
                pos = text.indexOf("<br>");
                text = text.replace("<br>", "");
            }
            if(text.indexOf("&eacute;") > -1){
                pos2 = text.indexOf("&eacute;");
                text = text.replace("&eacute;", "");
            }
            (function writer(i) {
                setTimeout(function(){
                    if(i < text.length && breakDialog){
                        $(".speech").append(text[i]);
                        i++;
                        if(i == pos){
                            $(".speech").append("<br>");
                        }else if (i == pos2){
                            $(".speech").append("&eacute;");
                        }
                        writer(i);
                    }
                }, 50);
            })(0);
        },

        createDialog: function(text, npc){
            var breakDialog = true;
            var brCount = 0;
            var pos;
            var pos2;
            $(document).unbind("keydown");
            $(document).unbind("keyup");

            $gameDiv.append('<div class="speech" style="width: 100%; height: 160px;"></div>');
            if(text.indexOf("<br>") > -1){
                pos = text.indexOf("<br>");
                text = text.replace("<br>", "");
            }
            if(text.indexOf("&eacute;") > -1){
                pos2 = text.indexOf("&eacute;");
                text = text.replace("&eacute;", "");
            }
            (function writer(i) {
                setTimeout(function(){
                    if(i < text.length && breakDialog){
                        $(".speech").append(text[i]);
                        i++;
                        if(i == pos){
                            $(".speech").append("<br>");
                        }else if (i == pos2){
                            $(".speech").append("&eacute;");
                        }
                        writer(i);
                    }
                }, 50);
            })(0);
            $(document).keydown(function(e){
                switch(e.which){
                    case 32:
                        $(document).unbind("keydown");
                        breakDialog = false;
                        npc.curDialog++;
                        if(npc.battle === "false" || npc.battle == false)
                            npc.interact();
                        else if (npc.curDialog < npc.dialog.length)
                            pokemonCore.utils.createDialog(npc.dialog[npc.curDialog], npc);
                        else{
                            npc.battle.pokemon[0].pokemon.pokemon.level = npc.battle.pokemon[0].pokemon.level;
                            pokemonCore.battle.trainerNpc = npc;
                            pokemonCore.battle.startBattleScreen(npc.battle.pokemon[0].pokemon);
                            pokemonCore.battle.isTrainer = true;
                            $(".speech").remove();
                        }
                        break;
                }
            });
        }
    },

    battle:{
        trainerNpc: null,
        isTrainer: null,
        encounter: null,
        grassTrigger: function(){
            var enc = Math.random();
            var totalrar = 0;
            for(var i = 0; i < pokemon.length; i++){
                totalrar += (pokemon[i].rarity / 187.5);
                var level = Math.ceil(Math.random() * pokemon[i].level.length);
                if(enc < totalrar){
                    pokemon[i].pokemon.level = level;
                    pokemonCore.battle.startBattleScreen(pokemon[i]);
                    break;
                }
            }
        },

        startBattleScreen: function(pokemon) {
            var breakDialog = true;
            $(document).unbind("keydown");
            $gameDiv.append('<div class="battle-screen" data-bg="cyan"></div>');
            $(".battle-screen").append('<div class="action-menu" data-bg="start"></div>');

            if (pokemonCore.battle.trainerNpc == null){
                writer(0, ["Wild " + pokemon.pokemon.name + " appeared!", "Go " + pokemonCore.gameChar.pokemon.name + "!", "What will " + pokemonCore.gameChar.pokemon.name + " do?"], 0);
            }else{
                writer(0, [pokemonCore.battle.trainerNpc.beforeFight[0], pokemonCore.battle.trainerNpc.name + " sent out " + pokemon.pokemon.name + "!", "Go " + pokemonCore.gameChar.pokemon.name + "!", "What will " + pokemonCore.gameChar.pokemon.name + " do?"], 0);
            }

            function writer(i, text, i2) {
                setTimeout(function(){
                    if(i < text[i2].length && breakDialog){
                        $(".action-menu").append(text[i2][i]);
                        i++;
                        writer(i, text, i2);
                    }else{
                        setTimeout(function(){
                            i2++;
                            if(i2 != text.length) {
                                $(".action-menu").text("");
                                writer(0, text, i2);
                            }else{
                                pokemonCore.battle.initFight(pokemon);
                            }
                        }, 1000);
                    }
                }, 50);
            };
        },

        initFight: function(pokemon){
            $(".action-menu").append('<div class="action-box"><span class="fight" data-selected="true">FIGHT</span><span class="bag" data-selected="false">BAG</span><span class="pokemon" data-selected="false">POK&eacute;MON</span><span class="run" data-selected="false">RUN</span></div>');
            $(".battle-screen").append('<div class="enemy-health"><div class="health-bar"></div><span class="pokemon-name"></span><span class="pokemon-lvl"></span></div><div class="ally-health" data-active="true"><div class="health-bar"></div><span class="pokemon-name"></span><span class="pokemon-lvl"></span><span class="pokemon-health"><span class="cur-health"></span></span></div><div class="enemy-pokemon"></div><div class="ally-pokemon" data-selected="true"></div>');
            $(".enemy-pokemon").css("background-image", "url(resource/images/pokemon/" + pokemon.pokemon.nN + ".png)");
            $(".ally-pokemon").css("background-image", "url(resource/images/pokemon/" + pokemonCore.gameChar.pokemon.nN +".png)");
            $(".enemy-health .pokemon-name").append(pokemon.pokemon.name);
            $(".ally-health .pokemon-name").append(pokemonCore.gameChar.pokemon.name);
            $(".enemy-health .pokemon-lvl").append("Lv:" + pokemon.pokemon.level);
            $(".ally-health .pokemon-lvl").append("Lv:" + pokemonCore.gameChar.pokemon.level);
            $(".ally-health .pokemon-health").prepend(pokemonCore.gameChar.pokemon.stats.HP[0] + "/ ");
            $(".ally-health .pokemon-health .cur-health").append(pokemonCore.gameChar.pokemon.stats.HP[1]);
            pokemonCore.battle.setBattleKeybinds(".action-box");
            pokemonCore.battle.encounter = pokemon;
            pokemonCore.battle.animateHealth();
        },

        stopBattle: function(){
            $(".battle-screen").remove();
        },

        setBattleKeybinds: function(itemclass){
            $(document).keydown(function(e) {
                var action = $(itemclass + ' [data-selected="true"]');
                switch(e.which) {
                    case 37: // left
                        if(selected() == "bag" || selected() == "run" || selected() == "move-2" || selected() == "move-4"){
                            action.attr("data-selected", "false");
                            action.prev().attr("data-selected", "true");
                        }
                        break;
                    case 38: // up
                        if(selected() == "pokemon" || selected() == "run" || selected() == "move-3" || selected() == "move-4"){
                            action.attr("data-selected", "false");
                            action.prev().prev().attr("data-selected", "true");
                        }
                        break;
                    case 39: // right
                        if(selected() == "pokemon" || selected() == "fight" || selected() == "move-1" || selected() == "move-3"){
                            action.attr("data-selected", "false");
                            action.next().attr("data-selected", "true");
                        }
                        break;
                    case 40: // down
                        if(selected() == "fight" || selected() == "bag" || selected() == "move-1" || selected() == "move-2"){
                            action.attr("data-selected", "false");
                            action.next().next().attr("data-selected", "true");
                        }
                        break;
                    case 32: //space
                        select();
                        break;

                    default: return;
                }
                e.preventDefault();
            });

            function selected(){
                return $(itemclass + ' [data-selected="true"]').attr("class");
            }

            function select(){
                switch(selected()){
                    case "run":
                        if(pokemonCore.battle.isTrainer == false || pokemonCore.battle.isTrainer === "false" || typeof pokemonCore.battle.isTrainer == 'undefined') {
                            pokemonCore.battle.stopBattle();
                            $(document).unbind("keydown");
                            pokemonCore.player.bindMovement();
                            return;
                        }
                        break;
                    case "fight":
                        $(document).unbind("keydown");
                        fightMenu();
                        return;
                        break;
                }
                if(selected().indexOf("move") >= -1){
                    pokemonCore.battle.handleMove(selected(), false);
                }
            }

            function fightMenu(){
                $(".battle-screen").append('<div class="fight-box"><div class="moves"><span class="move-1" data-selected="true"></span><span class="move-2" data-selected="false"></span><span class="move-3" data-selected="false"></span><span class="move-4" data-selected="false"></span></div></div>');
                for(var i = 0; i < pokemonCore.gameChar.pokemon.moves.length; i++){
                    $(".moves .move-" + (i + 1)).append(pokemonCore.gameChar.pokemon.moves[i][0]);
                }
                pokemonCore.battle.setBattleKeybinds(".moves");
            }
        },

        handleMove: function(move, enemy){
            var move = move
            var moveNr = move;
            if(!enemy)
                moveNr = move.substr(5) - 1;
            var pokemon = pokemonCore.gameChar.pokemon;
            var encounter = pokemonCore.battle.encounter;
            var text;
            var damage;
            if(enemy)
                damage = pokemonCore.battle.encounter.pokemon.moves[move][2];
            else
                damage = pokemonCore.gameChar.pokemon.moves[moveNr][2];

            if(enemy || ( !enemy && pokemon.moves[moveNr][1] > 0 )){
                $(document).unbind("keydown");
                if(!enemy)
                    pokemon.moves[moveNr][1]--;
                if(!enemy)
                    encounter.pokemon.stats.HP[1] -= damage;
                else
                    pokemon.stats.HP[1] -= damage;
                $(".action-menu").text("");
                $(".fight-box").remove();
                $(".action-box").remove();

                if(!enemy){
                    text = pokemon.name + " used " + pokemon.moves[moveNr][0] + "!";
                }else{
                    text = encounter.pokemon.name + " used " + encounter.pokemon.moves[move][0] + "!";
                }

                function writer(i, noAfter, callback) {
                    setTimeout(function(){
                        if(i < text.length){
                            $(".action-menu").append(text[i]);
                            i++;
                            writer(i, noAfter, callback);
                        }else if(noAfter){
                            afterWrite(damage);
                        }else if(typeof callback != 'undefined'){
                            callback();
                        }
                    }, 50);
                }
                writer(0, true)
            }

            function afterWrite(damage){
                pokemonCore.battle.animateHealth(damage, enemy);
                if(!enemy) {
                    setTimeout(function () {
                        if(pokemonCore.battle.encounter.pokemon.stats.HP[1] <= 0) {
                            if(pokemonCore.battle.trainerNpc !== "null" && pokemonCore.battle.trainerNpc !== null) {
                                text = pokemonCore.battle.encounter.pokemon.name + " fainted!";
                                var alivePokemon = pokemonCore.battle.trainerNpc.pokemonAlive();
                                if(alivePokemon > 0){
                                    pokemonCore.battle.trainerNpc.battle.pokemon[alivePokemon].pokemon.pokemon.level = pokemonCore.battle.trainerNpc.battle.pokemon[alivePokemon].pokemon.level;
                                    $(".action-menu").text("");
                                    writer(0, false, function(){
                                            text = pokemonCore.battle.trainerNpc.name + " send out " + pokemonCore.battle.trainerNpc.battle.pokemon[alivePokemon].pokemon.pokemon.name;
                                            $(".action-menu").text("");
                                            setTimeout(function(){
                                                $(".action-menu").text("");
                                                writer(0, false, function() {
                                                    text = "What wil " + pokemonCore.gameChar.pokemon.name + " do?";
                                                    setTimeout(function(){
                                                        $(document).unbind("keydown");
                                                        $(".battle-screen").children().remove();
                                                        $(".battle-screen").append('<div class="action-menu" data-bg="start"></div>');
                                                        writer(0, false, function(){
                                                            pokemonCore.battle.initFight(pokemonCore.battle.trainerNpc.battle.pokemon[alivePokemon].pokemon);
                                                        });
                                                    }, 1000);
                                                });
                                        }, 1000);
                                    });
                                } else {
                                    writer(0, false);
                                    pokemonCore.battle.encounter = null;
                                    setTimeout(function () {
                                        var text = pokemonCore.battle.trainerNpc.name + ": " + pokemonCore.battle.trainerNpc.afterFight[0];
                                        $(".action-menu").text("");
                                        function writer(i) {
                                            setTimeout(function () {
                                                if (i < text.length) {
                                                    $(".action-menu").append(text[i]);
                                                    i++;
                                                    writer(i);
                                                } else {
                                                    setTimeout(function () {
                                                        pokemonCore.battle.stopBattle();
                                                        $(document).unbind("keydown");
                                                        pokemonCore.player.bindMovement();
                                                        pokemonCore.battle.trainerNpc = null;
                                                        pokemonCore.battle.isTrainer = false;
                                                    }, 1000);
                                                }
                                            }, 50);
                                        }

                                        writer(0);
                                    }, 2000);
                                }
                            }else{
                                $(".action-menu").text("");
                                text = encounter.pokemon.name + " fainted!";
                                writer(0, false);
                                setTimeout(function(){
                                    pokemonCore.battle.stopBattle();
                                    $(document).unbind("keydown");
                                    pokemonCore.player.bindMovement();
                                    pokemonCore.battle.trainerNpc = null;
                                    pokemonCore.battle.isTrainer = false;

                                }, 2000);
                            }
                        }else{
                            pokemonCore.battle.enemyMove();
                        }
                    }, 1000);
                }else{
                    setTimeout(function(){
                        if(pokemonCore.gameChar.pokemon.stats.HP[1] <= 0){
                            $(".action-menu").text("");
                            text = pokemonCore.gameChar.pokemon.name + " fainted!";
                            setTimeout(function(){
                                $("body").remove();
                            }, 2000);
                        }else {
                            $(".action-menu").text("");
                            $(".action-menu").append('<div class="action-box"><span class="fight" data-selected="true">FIGHT</span><span class="bag" data-selected="false">BAG</span><span class="pokemon" data-selected="false">POK&eacute;MON</span><span class="run" data-selected="false">RUN</span></div>');
                            pokemonCore.battle.setBattleKeybinds(".action-box");
                            text = "What will " + pokemonCore.gameChar.pokemon.name + " do?";
                        }
                        writer(0, false);
                    }, 1000);
                }
            }
        },

        //TODO: improve
        enemyMove: function(){
            var randMove = Math.floor(Math.random() * 3);
            pokemonCore.battle.handleMove(randMove, true);
        },

        animateHealth: function(damage, enemy){
            var allyBar = $(".ally-health .health-bar");
            var enemyBar = $(".enemy-health .health-bar");
            if(enemy) {
                (function textAnim(i) {
                    if (i < damage) {
                        setTimeout(function () {
                            $(".ally-health .pokemon-health .cur-health").text($(".ally-health .pokemon-health .cur-health").text() - 1);
                            i++;
                            textAnim(i);
                        }, (1000 / damage));
                    }
                })(0);
            }
            var allyBarWidth = 194 / pokemonCore.gameChar.pokemon.stats.HP[0] * pokemonCore.gameChar.pokemon.stats.HP[1];
            var enemyBarWidth = 204 / pokemonCore.battle.encounter.pokemon.stats.HP[0] * pokemonCore.battle.encounter.pokemon.stats.HP[1];
            $(allyBar).css("width", allyBarWidth + "px");
            $(enemyBar).css("width", enemyBarWidth + "px");
        }
    },

    pokemon:{
        instantiate: function(id)
        {
            var id = id;
            $.ajax({
                async: false,
                url: "resource/pokemons/" + id + ".js",
                dataType: "script"
            });
            return pokeInfo;
        }
    },

    specialInteract:{
        pokemart: function(items){
            var lastScroll = 0;
            $(document).unbind("keydown");
            $gameDiv.append('<div class="pokemart-gui"><ul class="items"></ul><div class="money"></div><div class="item-img"></div><div class="item-desc"></div></div>');
            $(".pokemart-gui .money").append(pokemonCore.gameChar.getMoney());
            for(var i = 0; i < items.length; i++){
                $(".items").append('<li class="'+ i +'"><div class="wrapper"><span class="item-name"></span><span class="item-cost"></span></div></li>');
                $("li."+ i +" .item-name").prepend(items[i].name);
                $("li."+ i +" .item-cost").prepend(items[i].price);
            }

            items.push(new pokemonCore.item("Cancel", "", "", "Quit shopping.", "quit"));
            $(".items").append('<li class="'+ (items.length - 1) +'"><div class="wrapper"><span class="item-name cancel"></span><span class="item-cost"></span></div></li>');
            $("li."+ (items.length - 1) +" .item-name").prepend("Cancel");

            $("li.0").attr("data-selected", "true");
            $(".pokemart-gui .item-img").css("background-image", "url(resource/images/items/"+ items[0].img +".png)");
            $(".pokemart-gui .item-desc").prepend(items[0].desc);

            bindMartKey();

            function bindMartKey() {
                var number = 1;
                var baseMoney = items[selectedItem().attr("class")].price;
                $(document).bind("keydown", function (e) {
                    var selected = $('li[data-selected="true"]');
                    switch (e.which) {
                        case 38:
                            if (selected.prev().length > 0) {
                                selected.prev().attr("data-selected", "true");
                                selected.attr("data-selected", "false");
                                $(".pokemart-gui .item-img").css("background-image", "url(resource/images/items/" + items[selected.prev().attr("class")].img + ".png)");
                                $(".pokemart-gui .item-desc").text("");
                                $(".pokemart-gui .item-desc").prepend(items[selected.prev().attr("class")].desc);
                                if(selected.index() > 3 && ($(".pokemart-gui .items > li").length - 2) > selected.index()){
                                    lastScroll -= 74.5;
                                    $(".pokemart-gui .items").scrollTop(lastScroll);
                                }
                            }
                            break;
                        case 40:
                            if (selected.next().length > 0) {
                                selected.next().attr("data-selected", "true");
                                selected.attr("data-selected", "false");
                                $(".pokemart-gui .item-img").css("background-image", "url(resource/images/items/" + items[selected.next().attr("class")].img + ".png)");
                                $(".pokemart-gui .item-desc").text("");
                                $(".pokemart-gui .item-desc").prepend(items[selected.next().attr("class")].desc);
                                if(selected.index() > 2 && ($(".pokemart-gui .items > li").length - 3) > selected.index()){
                                    lastScroll += 74.5;
                                    $(".pokemart-gui .items").scrollTop(lastScroll);
                                }
                            }
                            break;
                        case 32:
                            if (selectedItem().find(".item-name").attr("class") === 'item-name cancel') {
                                $(document).unbind("keydown");
                                $(".pokemart-gui").remove();
                                pokemonCore.player.bindMovement();
                                $(".pokemart-gui .money").append(pokemonCore.gameChar.getMoney());
                                items.pop();
                            } else {
                                $(document).unbind("keydown");
                                pokemonCore.utils.createEmptyDialog(items[selectedItem().attr("class")].name + "? Certainly. How many would you like?");
                                $(".pokemart-gui").append('<div class="in-bag"><span>IN BAG:</span><span class="items-bag"></span></div><div class="amount"><span class="amount-buy"></span><span class="amount-price"></span></div>');
                                $(".pokemart-gui .in-bag .items-bag").text(pokemonCore.gameChar.getItemAmount(items[selectedItem().attr("class")].name));
                                updatePrice(1, items[selectedItem().attr("class")].price);
                                $(document).bind("keydown", function(e){
                                    switch(e.which){
                                        case 32:
                                            for(var i = 0; i < number + 1; i++) {
                                                items[selectedItem().attr("class")].buy();
                                                $(".pokemart-gui .money").text(pokemonCore.gameChar.getMoney());
                                            }
                                            $(".pokemart-gui .in-bag").remove();
                                            $(".pokemart-gui .amount").remove();
                                            $(".speech").remove();
                                            $(document).unbind("keydown");
                                            bindMartKey();
                                            break;
                                        case 38:
                                            number++;
                                            if(number * baseMoney <= pokemonCore.gameChar.getMoney()) {
                                                updatePrice(number, baseMoney);
                                            }else{
                                                number = 1;
                                                updatePrice(number, baseMoney);
                                            }
                                            break;
                                        case 40:
                                            number--;
                                            if(number == 0) {
                                                number = pokemonCore.gameChar.getMoney() / baseMoney;
                                                updatePrice(number, baseMoney);
                                            }else {
                                                updatePrice(number, baseMoney);
                                            }
                                            break;
                                    }
                                });

                                function updatePrice(number, price){
                                    $(".pokemart-gui .amount .amount-buy").text("x" + number);
                                    $(".pokemart-gui .amount .amount-price").text((number * price));
                                }
                            }
                            break;
                    }
                });
            }

            function selectedItem(){
                return $('li[data-selected="true"]');
            }
        }
    },

    item: function(name, use, price, desc, img, type){
        this.name = name;
        this.use = use;
        this.price = price;
        this.desc = desc;
        this.img = name;
        this.amount = 0;
        this.type = type

        if(typeof img !== 'undefined')
            this.img = img;

        this.buy = function(){
            if(pokemonCore.gameChar.getMoney() >= this.price){
                if(pokemonCore.gameChar.getItemByName(this.name) != 'undefined' && pokemonCore.gameChar.getItemByName(this.name) != undefined) {
                    pokemonCore.gameChar.setMoney(-this.price);
                    pokemonCore.gameChar.getItemByName(this.name).amount += 1;
                }else{
                    pokemonCore.gameChar.bag.push(this);
                }
            }
        }
    },

    items:{
        instantiate: function(name){
            $.ajax({
                async: false,
                url: "resource/items/" + name + ".js",
                dataType: "script"
            });
            return new pokemonCore.item(item.name, item.use, item.price, item.desc, item.img, item.type);
        }
    }
}

//Helper classes
function coords(x, y){
    this.X = 0;
    this.Y = 0;

    this.setX = function(cx){
        this.X += cx;
        $gameWrapper.css("left", ((-this.X + 8) * 64));
    }

    this.setY = function(cy){
        this.Y += cy;
        $gameWrapper.css("top", ((-this.Y + 6) * 64));
    }
    this.getBoth = function(){
        return jQuery.extend(true, {}, [this.X, this.Y]);
    }
    this.setX(x);
    this.setY(y);
    setTimeout(function(){
        $gameWrapper.attr("data-animate", "true");
    }, 50);
}

function character(coords, nm){
    this.bag = [];
    var coords = coords;
    var $character;
    var name = nm;
    var money = 1000;

    this.pokemon = {
        nN: 255,
        name: "Torchic",
        species: "Chick Pokémon",
        height: "1'4\" (0.41m)",
        weight: "5.5 lbs (2.5 kg)",
        abilities: [],
        stats: {
            HP: [45, 45],
            ATT: [60, 0],
            DEF: [40, 0],
            SPATT: [70, 0],
            SPDEF: [50, 0],
            SPD: [45, 0],
        },
        entry: "TORCHIC sticks with its TRAINER, following behind with unsteady steps. This POKéMON breathes fire of over 1,800 degrees F, including fireballs that leave the foe scorched black.",
        moves: [
            ["Growl", 10, 1000000000000000000000000000000000000000000000],
            ["Scratch", 10, 10],
            ["Ember", 10, 10],
            ["Sand Attack", 10, 10],
        ],
        level: 20
    }

    this.direction = null;

    $gameDiv.append('<div id="player"></div>');

    $character = $gameWrapper.find("#player");

    this.getPlayerDiv = function(){
        return $character;
    }

    this.getCoords = function(){
        return jQuery.extend(true, {}, coords);
    }

    this.getName = function(){
        return name;
    }

    this.setX = function(x){
        coords.setX(x);
    }

    this.setY = function(y){
        coords.setY(y);
    }

    this.getMoney = function(){
        return money;
    }

    this.setMoney = function(money1){
        money += money1;
    }

    this.showCoords = function(){
        console.log(coords);
    }

    this.getItemByName = function(item){
        for(var i = 0; i < this.bag.length; i++){
            if(this.bag[i].name === item)
                return this.bag[i];
        }
    }

    this.getItemAmount = function(item){
        var amount = jQuery.extend(true, {}, this.getItemByName(item)).amount;
        if(amount == undefined || amount === 'undefined'){
            return 0;
        }
        return amount;
    }
}

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}