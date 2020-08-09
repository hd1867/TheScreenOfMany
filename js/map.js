const { app, dialog } = require('electron').remote;

var width = document.getElementById('main').getBoundingClientRect()["width"];
var height = window.innerHeight;
var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
})

var gridLayer = new Konva.Layer();
var padding = 32;
console.log(width, padding, width / padding);
for (var i = 0; i < width / padding; i++) {
    gridLayer.add(new Konva.Line({
        points: [Math.round(i * padding) + 0.5, 0, Math.round(i * padding) + 0.5, height],
        stroke: '#ccc',
        strokeWidth: 1,
    }));
}

gridLayer.add(new Konva.Line({points: [0,0,10,10]}));
for (var j = 0; j < height / padding; j++) {
    gridLayer.add(new Konva.Line({
        points: [0, Math.round(j * padding), width, Math.round(j * padding)],
        stroke: '#ccc',
        strokeWidth: 1,
    }));
}

stage.add(gridLayer);
gridLayer.setZIndex(1);

function imgSelectDialog() {
    const readOptions = {
        filters: [
            { name: 'JPEG Image', extensions: ['jpg', 'jpeg'] },
            { name: 'PNG Image', extensions: ['png'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    }
    return (dialog.showOpenDialogSync(null, readOptions).valueOf())[0];
}

function drawBackground(){
    let layer = new Konva.Layer();
    let imageObj = new Image();
    imageObj.src = imgSelectDialog();

    let backImg = new Konva.Image({
        image: imageObj,
        x: 0,
        y: 0,
        width: width,
        height: height
    })

    layer.add(backImg);
    stage.add(layer);
    layer.setZIndex(0);

}

function drawToken(){
    let layer = new Konva.Layer();
    let imageObj = new Image();
    imageObj.src = imgSelectDialog();

    let cardImg = new Konva.Image({
        image: imageObj,
        x: 0,
        y: 0,
        width: 32,
        height: 32,
        draggable: true
    });

    cardImg.on('contextmenu', function () {
        cardImg.destroy();
        layer.destroy();
    })

    layer.add(cardImg);
    stage.add(layer);
}

function openNav() {
    document.getElementById("codexSidebar").style.width = "350px";
    document.getElementById("codexDisplay").style.width = "350px";
    document.getElementById("codexSidebar").style.height = "40vh";
    document.getElementById("codexDisplay").style.height = "40vh";
    document.getElementById("backgroundImage").style.left = "350px";
    //document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("codexSidebar").style.width = "0";
    document.getElementById("codexDisplay").style.width = "0";
    document.getElementById("codexSidebar").style.height = "0";
    document.getElementById("codexDisplay").style.height = "0";
    document.getElementById("backgroundImage").style.left = "0";
    //document.getElementById("main").style.marginLeft = "0";
}

function toggleNav() {

    if(document.getElementById("codexSidebar").style.width === "350px")
    {
        closeNav();
    }
    else
    {
        openNav();
        closeRoller();
    }

}

function openRoller() {
    document.getElementById("rollerSidebar").style.width = "350px";
    document.getElementById("rollerSidebar").style.height = "20vh";
    document.getElementById("backgroundImage").style.left = "350px";
}

function closeRoller() {
    document.getElementById("rollerSidebar").style.width = "0";
    document.getElementById("rollerSidebar").style.height = "0";
    document.getElementById("backgroundImage").style.left = "0";
}

function toggleRoller() {
    if(document.getElementById("rollerSidebar").style.width === "350px")
    {
        closeRoller();
    }
    else
    {
        openRoller();
        closeNav();
    }
}

function rollDice() {
    let diceType = parseInt(document.querySelector('input[name="rollOptions"]:checked').value.toString());
    let rawNumber = document.getElementById("rollNum").value;
    let diceNumber = parseInt(rawNumber.toString());
    let rawConst = document.getElementById("rollConst").value;
    let rollConst = parseInt(rawConst.toString());

    console.log("Rolling " + diceNumber + diceType + "+" + rollConst);
    let i;
    let roll = 0;
    let displayString = "";
    for(i=0; i < diceNumber; i++)
    {
        let rollResult = Math.floor((Math.random() * diceType) + 1);
        roll += rollResult;
        if(i !== 0)
        {
            displayString += "+";
        }
        displayString += rollResult;
    }

    displayString += "+" + rollConst + " = " + roll;
    document.getElementById("rollVal").innerText = displayString;
    console.log(displayString);
    console.log(roll);

}

let combatants = []
let currentCombatant = 0;

function refreshCombatantsList()
{
    document.getElementById("initiativeTracker").innerText = "";
    for(let i = 0; i < combatants.length; i++)
    {
        let tempLi = document.createElement("li");
        tempLi.className = "list-group-item";
        tempLi.innerHTML = combatants[i].init + "  " + combatants[i].name;
        tempLi.oncontextmenu = function() { removeCombatant(i) };
        document.getElementById("initiativeTracker").append(tempLi);
    }

}

function setActiveCombatant(index)
{
    document.getElementById("initiativeTracker").childNodes[index].className += " active";
}

function setInactiveCombatant(index)
{
    document.getElementById("initiativeTracker").childNodes[index].className = "list-group-item";
}

function nextRound() {
    setInactiveCombatant(currentCombatant);
    currentCombatant++
    if(currentCombatant >= combatants.length)
    {
        currentCombatant = 0;
    }
    setActiveCombatant(currentCombatant);
}

function prevRound() {
    setInactiveCombatant(currentCombatant);
    currentCombatant--
    if(currentCombatant < 0)
    {
        currentCombatant = combatants.length - 1;
    }
    setActiveCombatant(currentCombatant);
}

function removeCombatant(index){
    combatants.splice(index, 1);
    if(currentCombatant >= combatants.length || currentCombatant < 0)
    {
        currentCombatant = combatants.length - 1;
    }
    console.log(currentCombatant);
    refreshCombatantsList();
}

function addCombatant() {
    let combatantName = document.getElementById("combatantName").value.toString();
    let initiative = parseInt(document.getElementById("initiative").value.toString());

    combatants.push({
        name: combatantName,
        init: initiative
    });

    console.log(combatants);

    combatants.sort((a, b) => parseFloat(b.init) - parseFloat(a.init));
    refreshCombatantsList();
    setActiveCombatant(currentCombatant);
}
