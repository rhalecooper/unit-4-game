var gameState = "none";

var roleTemplate = {
    roleName: " ",
    Name: " ",
    imageFile: " ",
    HealthPoints: 0,
    AttackPower: 0,
    CounterAttackPower: 0,
    isWaitingToFight: true
};

var luke = {};
Object.assign(luke, roleTemplate);
luke.Name = "Luke Skywalker";
luke.imageFile = "assets/images/luke.jpg";
luke.HealthPoints = 100;
luke.AttackPower = 5;
luke.CounterAttackPower = 20;
luke.roleName = "luke"

var maul = {};
Object.assign(maul, roleTemplate);
maul.Name = "Darth Maul";
maul.imageFile = "assets/images/maul.jpg";
maul.HealthPoints = 140;
maul.AttackPower = 7;
maul.CounterAttackPower = 26;
maul.roleName = "maul"

var rey = {};
Object.assign(rey, roleTemplate);
rey.Name = "Just Rey";
rey.imageFile = "assets/images/rey.jpg";
rey.HealthPoints = 120;
rey.AttackPower = 6;
rey.CounterAttackPower = 22;
rey.roleName = "rey"

var yoda = {};
Object.assign(yoda, roleTemplate);
yoda.Name = "Yoda, Just";
yoda.imageFile = "assets/images/yoda.jpg";
yoda.HealthPoints = 160;
yoda.AttackPower = 8;
yoda.CounterAttackPower = 24;
yoda.roleName = "yoda";


var selectedRole = {};
Object.assign(selectedRole, roleTemplate);

var enemyArray = [];
enemyArray[0] = roleTemplate;
enemyArray[1] = roleTemplate;
enemyArray[2] = roleTemplate;

var currentEnemy = {};
Object.assign(currentEnemy, roleTemplate);

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

    $("#message-area").html("Choose your character by clicking on a picture")
    gameState = "select-role"

}

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
        }
    }
    textHTML += "<div class=\"end-float\"></div>"
    $("#enemies-available-div").html(textHTML);
    $('#enemies-available-div').show();
}

function selectRole(roleName) {
    //              _           _   ____       _        
    //     ___  ___| | ___  ___| |_|  _ \ ___ | | ___   
    //    / __|/ _ \ |/ _ \/ __| __| |_) / _ \| |/ _ \  
    //    \__ \  __/ |  __/ (__| |_|  _ < (_) | |  __/  
    //    |___/\___|_|\___|\___|\__|_| \_\___/|_|\___|  
    //
    console.log("roleName in selectRole is", roleName)

    if (roleName == "luke") {
        selectedRole = luke;
        enemyArray[0] = maul;
        enemyArray[1] = rey;
        enemyArray[2] = yoda;
    } else if (roleName == "maul") {
        enemyArray[0] = luke;
        selectedRole = maul;
        enemyArray[1] = rey;
        enemyArray[2] = yoda;

    } else if (roleName == "rey") {
        enemyArray[0] = luke;
        enemyArray[1] = maul;
        selectedRole = rey;
        enemyArray[2] = yoda;

    } else if (roleName == "yoda") {
        enemyArray[0] = luke;
        enemyArray[1] = maul;
        enemyArray[2] = rey;
        selectedRole = yoda;
    }

    // console.log("selectedRole", selectedRole)
    // console.log("enemyArray", enemyArray)

    showEnemies()

    $("#your-character-div").html(
        "<div id=\"your-character\">" +
        selectedRole.Name + "<br>" +
        "<img class=\"role-image\" src=\"" + selectedRole.imageFile + "\" alt=\"Image of " + roleName + "\">" + "<br>" +
        selectedRole.HealthPoints.toString() +
        "</div>"
    );

    $("#your-character-choices").empty();
    $("#message-area").html("Choose an enemy by clicking on a picture")
    gameState = "choose-enemy";

}

function showCurrentEnemy() {
    $("#defender-div").html(
        "<div id=\"your-enemy\">" +
        currentEnemy.Name + "<br>" +
        "<img class=\"role-image\" src=\"" + currentEnemy.imageFile + "\" alt=\"Image of " + currentEnemy.roleName + "\">" + "<br>" +
        currentEnemy.HealthPoints.toString() +
        "</div>"
    );
}

function selectEnemy(enemyRolename) {

    for (i=0; i<3; i++) {
        if (enemyArray[i].roleName == enemyRolename) {
            Object.assign(currentEnemy, enemyArray[i]);
            enemyArray[i].isWaitingToFight = false;
        }
    }
    showCurrentEnemy();
    showEnemies();
    $("#message-area").html("Attack your enemy by clicking the Attack button")
    gameState = "attack-enemy";

}

//   __  __       _        
//  |  \/  | __ _(_)_ __   
//  | |\/| |/ _` | | '_ \  
//  | |  | | (_| | | | | | 
//  |_|  |_|\__,_|_|_| |_| 
//                         

$(document).ready(function () {

    initailizeGame()

    $("#luke-div, #maul-div, #rey-div, #yoda-div").on("click", "img", function (event) {

        if (gameState == 'select-role') {
            var currentTarget = event.currentTarget;
            var chosenRole = currentTarget.getAttribute("rolename");
            console.log("chosenRole in Main is", chosenRole);
            selectRole(chosenRole);
        } else {
            alert("Role already Selected")
        }
    });

    console.log("", $("#enemy-0"));

    
    $("#enemies-available-div").on("click", "img", function(event) {
        console.log ("gameState in Main is", gameState)
        if (gameState == "choose-enemy") {
            var currentTarget = event.currentTarget;
            var chosenEnemy = currentTarget.getAttribute("rolename");
            console.log("chosenEnemy in Main is", chosenEnemy);
            selectEnemy(chosenEnemy)
        } else {
            alert("Enemy already Selected")
        }
    });


});