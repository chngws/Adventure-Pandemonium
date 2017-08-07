// Initialize game on start
function init() {
    var boolsDict = {
        'garage' : false,
        'hedge' : false,
        'window' : false,
        'Belphegor' : false,
        'janitor' : false,
        'Asmodeus' : false,
        'Sathanus' : false,
        'Beelzebub' : false,
        'Mammon' : false,
        'Shaitan' : false
    };
    var itemsList = [];
    localStorage.setItem("fearPoints", 0);
    localStorage.setItem("itemsList", JSON.stringify(itemsList));
    localStorage.setItem("boolsDict", JSON.stringify(boolsDict));
    localStorage.setItem("itemsTooltip", "Items collected in your adventure, some are necessary for survival while others could be red herrings or downright detrimental to your progress.");
    localStorage.setItem("fearTooltip", "The amount of Fear your character is experiencing. Fear increases when your character experiences horrific incidents, and decreases when you solve puzzles or feel safer. Manage your Fear carefully as when your Fear reaches 10 you will die by fright...");
    
    console.log("game initialized");
    loadPage();
}

// Game variables
function loadPage() {

    var fearPoints = localStorage.getItem("fearPoints");
    var itemsList = JSON.parse(localStorage.getItem("itemsList"));

    var itemsTooltip = localStorage.getItem("itemsTooltip");
    var fearTooltip = localStorage.getItem("fearTooltip");

    document.getElementById("inventory").innerHTML = "Items: " + itemsList.toString();
    document.getElementById("fearPoints").innerHTML = "Fear level: " + fearPoints + " / 10";
    document.getElementById("inventory").title = itemsTooltip;
    document.getElementById("fearPoints").title = fearTooltip;

    console.log("page loaded");
}

// Changes booleans in boolsDict
function updateDict(key){
    var boolsDict = JSON.parse(localStorage.getItem("boolsDict"));
    boolsDict[key] = !boolsDict[key];
    localStorage.setItem("boolsDict", JSON.stringify(boolsDict));
    console.log(key + " changed to " + boolsDict[key]);
}

// Checks options if they are muted or not
function checkOptions(option){
    var boolsDict = JSON.parse(localStorage.getItem("boolsDict"));
    if (boolsDict[option]) {    // If boolean is true; disable option
        document.getElementById(option).disabled = true;
    }
}

// Checks if player has certain items for certain choices
function checkItems(item){
    var itemsList = JSON.parse(localStorage.getItem("itemsList"));
    if (!itemsList.includes(item)) {
        document.getElementById(item).disabled = true;
    }
}

// Adds item to your inventory
function addItem(item, bool){
    var itemsList = JSON.parse(localStorage.getItem("itemsList"));
    if (bool){  // if item is added to inventory
        itemsList.push(item);
    } else {  // else item is removed from inventory
        itemsList.pop(item);
    }
    localStorage.setItem("itemsList", JSON.stringify(itemsList));
    loadPage();
}

// Change pages with replace so player cannot use 'back'
function changePage(url){
    location.replace(url);
}

// Add/reduce fearPoints
function changeFear(points){
    var fearPoints = localStorage.getItem("fearPoints");
    var newfearPoints = parseInt(fearPoints) + parseInt(points);
    if (newfearPoints >= 10) {
        alert("You have died by fright!");
        location.replace("main.html");
    }
    localStorage.setItem("fearPoints", newfearPoints);
    console.log("fearPoints changed to " + newfearPoints);
    loadPage();
}
