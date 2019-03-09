var gameState = "none";

var roleTemplate = {
    roleName: " ",
    Name: " ",
    imageFile: " ",
    HealthPoints: 0,
    AttackPower: 0,
    AttackPowerBase: 0,
    CounterAttackPower: 0,
    isWaitingToFight: true
};

var luke = {};
Object.assign(luke, roleTemplate);
luke.Name = "Luke Skywalker";
luke.imageFile = "assets/images/luke.jpg";
luke.HealthPoints = 100;
luke.AttackPowerBase = 5;
luke.AttackPower = 5;
luke.CounterAttackPower = 20;
luke.roleName = "luke";
luke.isWaitingToFight = true;

var maul = {};
Object.assign(maul, roleTemplate);
maul.Name = "Darth Maul";
maul.imageFile = "assets/images/maul.jpg";
maul.HealthPoints = 140;
maul.AttackPowerBase = 7;
maul.AttackPower = 7;
maul.CounterAttackPower = 26;
maul.roleName = "maul"
maul.isWaitingToFight = true;

var rey = {};
Object.assign(rey, roleTemplate);
rey.Name = "Just Rey";
rey.imageFile = "assets/images/rey.jpg";
rey.HealthPoints = 120;
rey.AttackPowerBase = 6;
rey.AttackPower = 6;
rey.CounterAttackPower = 22;
rey.roleName = "rey"
rey.isWaitingToFight = true;

var yoda = {};
Object.assign(yoda, roleTemplate);
yoda.Name = "Yoda, Just";
yoda.imageFile = "assets/images/yoda.jpg";
yoda.HealthPoints = 500; //160;
yoda.AttackPowerBase = 8;
yoda.AttackPower = 8;
yoda.CounterAttackPower = 24;
yoda.roleName = "yoda";
yoda.isWaitingToFight = true;

var selectedRole = {};
var currentEnemy = {};
var enemyArray = [];



function initailizeGame() {

    //    _       _ _        _ _ _          ____                       
    //   (_)_ __ (_) |_ __ _(_) (_)_______ / ___| __ _ _ __ ___   ___  
    //   | | '_ \| | __/ _` | | | |_  / _ \ |  _ / _` | '_ ` _ \ / _ \ 
    //   | | | | | | || (_| | | | |/ /  __/ |_| | (_| | | | | | |  __/ 
    //   |_|_| |_|_|\__\__,_|_|_|_/___\___|\____|\__,_|_| |_| |_|\___| 
    //  
    $(".bg").css("background-image", "url('/css/images/background.jpg')");


    $("#luke-div").html(
        "<div id=\"luke\">" + luke.Name + "<br>" +
        "<img class=\"luke-img\" src=\"" + luke.imageFile + "\" alt=\"Image of luke skywalker\" rolename=\"luke\">" + "<br>" +
        luke.HealthPoints.toString() +
        "</div>"
    );

    $("#maul-div").html(
        "<div id=\"maul\">" + maul.Name + "<br>" +
        "<img class=\"maul-img\" src=\"" + maul.imageFile + "\" alt=\"Image of darth maul\" rolename=\"maul\">" + "<br>" +
        maul.HealthPoints.toString() +
        "</div>"
    );

    $("#rey-div").html(
        "<div id=\"rey\">" + rey.Name + "<br>" +
        "<img class=\"rey-img\" src=\"" + rey.imageFile + "\" alt=\"Image of rey skywalker\" rolename=\"rey\">" + "<br>" +
        rey.HealthPoints.toString() +
        "</div>"
    );

    $("#yoda-div").html(
        "<div id=\"yoda\">" + yoda.Name + "<br>" +
        "<img class=\"yoda-img\" src=\"" + yoda.imageFile + "\" alt=\"Image of yoda\" rolename=\"yoda\">" + "<br>" +
        yoda.HealthPoints.toString() +
        "</div>"
    );

    $("#your-character-div").empty();
    $("#enemy-0").empty();
    $("#enemy-1").empty();
    $("#enemy-2").empty();
    $("#defender-div").empty();

    Object.assign(selectedRole, roleTemplate);
    Object.assign(currentEnemy, roleTemplate);
    
    enemyArray[0] = {};
    enemyArray[1] = {};
    enemyArray[2] = {};
    
    $("#message-area").html("Choose your character by clicking on a picture")
    gameState = "select-role"
    console.log("in initailizeGame() gameState changed to", gameState)

}

function selectRole(roleName) {
    //              _           _   ____       _        
    //     ___  ___| | ___  ___| |_|  _ \ ___ | | ___   
    //    / __|/ _ \ |/ _ \/ __| __| |_) / _ \| |/ _ \  
    //    \__ \  __/ |  __/ (__| |_|  _ < (_) | |  __/  
    //    |___/\___|_|\___|\___|\__|_| \_\___/|_|\___|  
    //
    // console.log("roleName in selectRole is", roleName)

    if (roleName == "luke") {
        Object.assign(selectedRole, luke);
        enemyArray[0] = maul;
        enemyArray[1] = rey;
        enemyArray[2] = yoda;
    } else if (roleName == "maul") {
        enemyArray[0] = luke;
        Object.assign(selectedRole, maul);
        enemyArray[1] = rey;
        enemyArray[2] = yoda;

    } else if (roleName == "rey") {
        enemyArray[0] = luke;
        enemyArray[1] = maul;
        Object.assign(selectedRole, rey);
        enemyArray[2] = yoda;

    } else if (roleName == "yoda") {
        enemyArray[0] = luke;
        enemyArray[1] = maul;
        enemyArray[2] = rey;
        Object.assign(selectedRole, yoda);
    }
   
    enemyArray[0].isWaitingToFight = true;
    enemyArray[1].isWaitingToFight = true;
    enemyArray[1].isWaitingToFight = true;

    console.log("In selectRole(), selectedRole is ", selectedRole)
    // console.log("enemyArray", enemyArray)

    showEnemies();
    showSelectedRole();

    $("#luke-div").empty();
    $("#maul-div").empty();
    $("#rey-div").empty();
    $("#yoda-div").empty();
    $("#message-area").html("Choose an enemy by clicking on a picture")
    gameState = "choose-enemy";
    console.log("in selectRole() gameState changed to", gameState)
}


//         _                    ____       _           _           _ ____       _       
//     ___| |__   _____      __/ ___|  ___| | ___  ___| |_ ___  __| |  _ \ ___ | | ___  
//    / __| '_ \ / _ \ \ /\ / /\___ \ / _ \ |/ _ \/ __| __/ _ \/ _` | |_) / _ \| |/ _ \ 
//    \__ \ | | | (_) \ V  V /  ___) |  __/ |  __/ (__| ||  __/ (_| |  _ < (_) | |  __/ 
//    |___/_| |_|\___/ \_/\_/  |____/ \___|_|\___|\___|\__\___|\__,_|_| \_\___/|_|\___| 
//                                                                                      
function showSelectedRole() {

    if (gameState == 'init-game') {
        $("#your-character-div").empty();
    } else {

        $("#your-character-div").html(
            "<div id=\"your-character\">" +
            selectedRole.Name + "<br>" +
            "<img class=\"role-image\" src=\"" + selectedRole.imageFile + "\" alt=\"Image of " + selectedRole.roleName + "\">" + "<br>" +
            selectedRole.HealthPoints.toString() +
            "</div>"
        );
    }
};

function showEnemies() {
    //         _                   _____                      _            
    //     ___| |__   _____      _| ____|_ __   ___ _ __ ___ (_) ___  ___  
    //    / __| '_ \ / _ \ \ /\ / /  _| | '_ \ / _ \ '_ ` _ \| |/ _ \/ __| 
    //    \__ \ | | | (_) \ V  V /| |___| | | |  __/ | | | | | |  __/\__ \ 
    //    |___/_| |_|\___/ \_/\_/ |_____|_| |_|\___|_| |_| |_|_|\___||___/  
    //
    var textHTML = "";
    var enemyNumber = 0;
    for (i = 0; i < 3; i++) {

        if (enemyArray[i].isWaitingToFight == true) {
            textHTML += "" +
                "<div id=\"enemy-" + enemyNumber.toString() + "\" class=\"debug make-float\">" + enemyArray[i].Name + "<br>" +
                "<img class=\"role-image\" src=\"" + enemyArray[i].imageFile + "\" " +
                "alt=\"Image of " + enemyArray[i].Name + "\" " +
                "rolename=\"" + enemyArray[i].roleName + "\">" + "<br>" +
                enemyArray[i].HealthPoints.toString() +
                "</div>";
            enemyNumber += 1;
        } else {
            console.log("skipping",enemyArray[i].Name," since not waiting to fight");
        }
    }
    textHTML += "<div class=\"end-float\"></div>"
    $("#enemies-available-div").html(textHTML);
    $('#enemies-available-div').show();
}

//              _           _   _____                             
//     ___  ___| | ___  ___| |_| ____|_ __   ___ _ __ ___  _   _  
//    / __|/ _ \ |/ _ \/ __| __|  _| | '_ \ / _ \ '_ ` _ \| | | | 
//    \__ \  __/ |  __/ (__| |_| |___| | | |  __/ | | | | | |_| | 
//    |___/\___|_|\___|\___|\__|_____|_| |_|\___|_| |_| |_|\__, | 
//                                                         |___/  
function selectEnemy(enemyRolename) {

    for (i = 0; i < 3; i++) {
        if (enemyArray[i].roleName == enemyRolename) {
            Object.assign(currentEnemy, enemyArray[i]);
            // currentEnemy.AttackPower = currentEnemy.AttackPowerBase;
            enemyArray[i].isWaitingToFight = false;
        }
    }
    showCurrentEnemy();
    showEnemies();
    $("#message-area").html("Attack your enemy by clicking the Attack button")
    gameState = "attack-enemy";
    console.log("in selectEmeny() gameState changed to", gameState)
}


//         _                    ____                          _   _____                             
//     ___| |__   _____      __/ ___|   _ _ __ _ __ ___ _ __ | |_| ____|_ __   ___ _ __ ___  _   _  
//    / __| '_ \ / _ \ \ /\ / / |  | | | | '__| '__/ _ \ '_ \| __|  _| | '_ \ / _ \ '_ ` _ \| | | | 
//    \__ \ | | | (_) \ V  V /| |__| |_| | |  | | |  __/ | | | |_| |___| | | |  __/ | | | | | |_| | 
//    |___/_| |_|\___/ \_/\_/  \____\__,_|_|  |_|  \___|_| |_|\__|_____|_| |_|\___|_| |_| |_|\__, | 
//                                                                                           |___/  
function showCurrentEnemy() {
    $("#defender-div").html(
        "<div id=\"your-enemy\">" +
        currentEnemy.Name + "<br>" +
        "<img class=\"role-image\" src=\"" + currentEnemy.imageFile + "\" alt=\"Image of " + currentEnemy.roleName + "\">" + "<br>" +
        currentEnemy.HealthPoints.toString() +
        "</div>"
    );
}
//           _   _             _    _____                             
//      __ _| |_| |_ __ _  ___| | _| ____|_ __   ___ _ __ ___  _   _  
//     / _` | __| __/ _` |/ __| |/ /  _| | '_ \ / _ \ '_ ` _ \| | | | 
//    | (_| | |_| || (_| | (__|   <| |___| | | |  __/ | | | | | |_| | 
//     \__,_|\__|\__\__,_|\___|_|\_\_____|_| |_|\___|_| |_| |_|\__, | 
//                                                             |___/  
function attackEnemy() {

    // console.log("selectedRole before in attackEnemy is ", selectedRole)
    // console.log("currentEnemy in attackEnemy is", currentEnemy)

    currentEnemy.HealthPoints = currentEnemy.HealthPoints - selectedRole.AttackPower;
    selectedRole.AttackPower = selectedRole.AttackPower + selectedRole.AttackPowerBase;

    selectedRole.HealthPoints = selectedRole.HealthPoints - currentEnemy.CounterAttackPower;
    console.log("In attackEnemy() selectedRole.HealthPoints", selectedRole.HealthPoints, "selectedRole.AttackPower", selectedRole.AttackPower);
    $("#message-area").html("You attack " + currentEnemy.Name + " for " + selectedRole.AttackPower.toString() + " damage" +
        "<br>" + currentEnemy.Name + " attacked you back for " + currentEnemy.CounterAttackPower.toString() + " damage")

    checkHealthPoints()

    if (gameState == "attack-enemy") {
        showSelectedRole();
        showCurrentEnemy();
    }
}

//          _               _    _   _            _ _   _     ____       _       _       
//      ___| |__   ___  ___| | _| | | | ___  __ _| | |_| |__ |  _ \ ___ (_)_ __ | |_ ___ 
//     / __| '_ \ / _ \/ __| |/ / |_| |/ _ \/ _` | | __| '_ \| |_) / _ \| | '_ \| __/ __|
//    | (__| | | |  __/ (__|   <|  _  |  __/ (_| | | |_| | | |  __/ (_) | | | | | |_\__ \
//     \___|_| |_|\___|\___|_|\_\_| |_|\___|\__,_|_|\__|_| |_|_|   \___/|_|_| |_|\__|___/
//                                                                                       
function checkHealthPoints() {

    if (selectedRole.HealthPoints <= 0) {
        console.log("Your have lost");
        alert("You lost to " + currentEnemy.Name)
        gameState = "init-game";
        console.log("in checkHealthPoints() gameState changed to", gameState)
        initailizeGame();
    } else if (currentEnemy.HealthPoints <= 0) {
        console.log("You defeated", currentEnemy.Name);
        alert("You defeated " + currentEnemy.Name + ', choose another enemy')
        currentEnemy = {};
        Object.assign(currentEnemy, roleTemplate);
        $("#defender-div").empty(); 
        gameState = "choose-enemy";
        console.log("in checkHealthPoints() gameState changed to", gameState)
    }

    $("#message-area").html("Choose your character by clicking on a picture")

}


//   __  __       _        
//  |  \/  | __ _(_)_ __   
//  | |\/| |/ _` | | '_ \  
//  | |  | | (_| | | | | | 
//  |_|  |_|\__,_|_|_| |_| 
//                         

$(document).ready(function () {

    gameState = "init-game";
    initailizeGame()

    $("#luke-div, #maul-div, #rey-div, #yoda-div").on("click", "img", function (event) {

        if (gameState == 'select-role') {
            var currentTarget = event.currentTarget;
            var roleNameChosen = currentTarget.getAttribute("rolename");
            selectRole(roleNameChosen);
        } else {
            alert("Role already Selected")
        }
    });

    $("#enemies-available-div").on("click", "img", function (event) {
        console.log("In enemies-available on click, gameState var is", gameState)
        if (gameState == "choose-enemy") {
            var currentTarget = event.currentTarget;
            var roleName = currentTarget.getAttribute("roleName");
            console.log("In enemies-available on click, roleName is", roleName);
            selectEnemy(roleName)
        } else {
            alert("Enemy already Selected")
        }
    });

    $('#attack-button').on('click', function () {
        if (gameState == "attack-enemy") {
            attackEnemy()
        } else {
            alert("Nobody to attack?")
        }

    });


});