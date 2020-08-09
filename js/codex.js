const fs = require('fs');
const sd = require('showdown');


function refreshCodex()
{
    console.log("Refreshing Codex...")

    getSpells().then(data => fs.writeFileSync("assets/spells.dnd", JSON.stringify(data)));

    getMonsters().then(data => fs.writeFileSync("assets/monsters.dnd", JSON.stringify(data)));

    getBackgrounds().then(data => fs.writeFileSync("assets/backgrounds.dnd", JSON.stringify(data)));

    getPlanes().then(data => fs.writeFileSync("assets/planes.dnd", JSON.stringify(data)));

    getGeneral().then(data => fs.writeFileSync("assets/general.dnd", JSON.stringify(data)));

    getFeats().then(data => fs.writeFileSync("assets/feats.dnd", JSON.stringify(data)));

    getConditions().then(data => fs.writeFileSync("assets/conditions.dnd", JSON.stringify(data)));

    getRaces().then(data => fs.writeFileSync("assets/races.dnd", JSON.stringify(data)));

    getClasses().then(data => fs.writeFileSync("assets/classes.dnd", JSON.stringify(data)));

    getMagicItems().then(data => fs.writeFileSync("assets/magicitems.dnd", JSON.stringify(data)));

    getWeapons().then(data => fs.writeFileSync("assets/weapons.dnd", JSON.stringify(data)));

    console.log("Codex Refreshed!")
}

async function getSpells()
{
    let data;
    let tempData;
    let next;
    let response = await fetch('https://api.open5e.com/spells/');
    data = await response.json();
    next = data["next"];
    while(next)
    {
        response = await fetch(next);
        tempData = await response.json();
        next = tempData["next"];
        console.log(next);
        console.log(tempData["results"]);
        data["results"] = data["results"].concat(tempData["results"]);
    }
    console.log(data);
    return data;
}

function toggleSpells()
{
    if(document.getElementById('spellsDiv').childNodes.length === 0)
    {
        let spellData = fs.readFileSync("assets/spells.dnd");
        let spells = JSON.parse(spellData);
        console.log(spells);
        let i;
        document.getElementById('spellsDiv').innerHTML = "";
        for(i = 0; i < parseInt(spells["count"]); i++)
        {
            let tempButton = document.createElement("button");
            tempButton.className = "btn";
            tempButton.innerText = spells["results"][i]["name"];
            let spellData = spells["results"][i];
            tempButton.onclick = function() { displayCodexPage(spellData, "spell") };
            document.getElementById('spellsDiv').append(tempButton);
        }
    }
    else
    {
    document.getElementById('spellsDiv').innerHTML = "";
    }
}

async function getMonsters()
{
    let data;
    let tempData;
    let next;
    let response = await fetch('https://api.open5e.com/monsters/');
    data = await response.json();
    next = data["next"];
    while(next)
    {
        response = await fetch(next);
        tempData = await response.json();
        next = tempData["next"];
        console.log(next);
        console.log(tempData["results"]);
        data["results"] = data["results"].concat(tempData["results"]);
    }
    console.log(data);
    return data;
}

function toggleMonsters()
{
    if(document.getElementById('monstersDiv').childNodes.length === 0)
    {
        let spellData = fs.readFileSync("assets/monsters.dnd");
        let monsters = JSON.parse(spellData);
        console.log(monsters);
        let i;
        document.getElementById('monstersDiv').innerHTML = "";
        for(i = 0; i < parseInt(monsters["count"]); i++)
        {
            let tempButton = document.createElement("button");
            tempButton.className = "btn";
            tempButton.innerText = monsters["results"][i]["name"];
            let monsterData = monsters["results"][i];
            tempButton.onclick = function() { displayCodexPage(monsterData, "monster") };
            document.getElementById('monstersDiv').append(tempButton);
        }
    }
    else
    {
        document.getElementById('monstersDiv').innerHTML = "";
    }
}

async function getBackgrounds()
{
    let response = await fetch('https://api.open5e.com/backgrounds/');
    return await response.json();
}

function toggleBackgrounds()
{
    if(document.getElementById('backgroundsDiv').childNodes.length === 0)
    {
        let spellData = fs.readFileSync("assets/backgrounds.dnd");
        let backgrounds = JSON.parse(spellData);
        console.log(backgrounds);
        let i;
        document.getElementById('backgroundsDiv').innerHTML = "";
        for(i = 0; i < parseInt(backgrounds["count"]); i++)
        {
            let tempButton = document.createElement("button");
            tempButton.className = "btn";
            tempButton.innerText = backgrounds["results"][i]["name"];
            let backgroundData = backgrounds["results"][i];
            tempButton.onclick = function() { displayCodexPage(backgroundData, "background") };
            document.getElementById('backgroundsDiv').append(tempButton);
        }
    }
    else
    {
        document.getElementById('backgroundsDiv').innerHTML = "";
    }
}

async function getPlanes()
{
    let response = await fetch('https://api.open5e.com/planes/');
    return await response.json();
}

function togglePlanes()
{
    if(document.getElementById('planesDiv').childNodes.length === 0)
    {
        let spellData = fs.readFileSync("assets/planes.dnd");
        let planes = JSON.parse(spellData);
        console.log(planes);
        let i;
        document.getElementById('planesDiv').innerHTML = "";
        for(i = 0; i < parseInt(planes["count"]); i++)
        {
            let tempButton = document.createElement("button");
            tempButton.className = "btn";
            tempButton.innerText = planes["results"][i]["name"];
            let planeData = planes["results"][i];
            tempButton.onclick = function() { displayCodexPage(planeData["results"][i], "planes") };
            document.getElementById('planesDiv').append(tempButton);
        }
    }
    else
    {
        document.getElementById('planesDiv').innerHTML = "";
    }
}

async function getGeneral()
{
    let response = await fetch('https://api.open5e.com/sections/');
    return await response.json();
}

function toggleGeneral()
{
    if(document.getElementById('generalDiv').childNodes.length === 0)
    {
        let spellData = fs.readFileSync("assets/general.dnd");
        let general = JSON.parse(spellData);
        console.log(general);
        let i;
        document.getElementById('generalDiv').innerHTML = "";
        for(i = 0; i < parseInt(general["count"]); i++)
        {
            let tempButton = document.createElement("button");
            tempButton.className = "btn";
            tempButton.innerText = general["results"][i]["name"];
            let generalData = general["results"][i];
            tempButton.onclick = function() { displayCodexPage(generalData, "general") };
            document.getElementById('generalDiv').append(tempButton);
        }
    }
    else
    {
        document.getElementById('generalDiv').innerHTML = "";
    }
}

async function getFeats()
{
    let response = await fetch('https://api.open5e.com/feats/');
    return await response.json();
}

function toggleFeats()
{
    if(document.getElementById('featsDiv').childNodes.length === 0)
    {
        let spellData = fs.readFileSync("assets/feats.dnd");
        let feats = JSON.parse(spellData);
        console.log(feats);
        let i;
        document.getElementById('featsDiv').innerHTML = "";
        for(i = 0; i < parseInt(feats["count"]); i++)
        {
            let tempButton = document.createElement("button");
            tempButton.className = "btn";
            tempButton.innerText = feats["results"][i]["name"];
            let featData = feats["results"][i];
            tempButton.onclick = function() { displayCodexPage(featData, "feat") };
            document.getElementById('featsDiv').append(tempButton);
        }
    }
    else
    {
        document.getElementById('featsDiv').innerHTML = "";
    }
}

async function getConditions()
{
    let response = await fetch('https://api.open5e.com/conditions/');
    return await response.json();
}

function toggleConditions()
{
    if(document.getElementById('conditionsDiv').childNodes.length === 0)
    {
        let spellData = fs.readFileSync("assets/conditions.dnd");
        let conditions = JSON.parse(spellData);
        console.log(conditions);
        let i;
        document.getElementById('conditionsDiv').innerHTML = "";
        for(i = 0; i < parseInt(conditions["count"]); i++)
        {
            let tempButton = document.createElement("button");
            tempButton.className = "btn";
            tempButton.innerText = conditions["results"][i]["name"];
            let conditionData = conditions["results"][i];
            tempButton.onclick = function() { displayCodexPage(conditionData, "condition") };
            document.getElementById('conditionsDiv').append(tempButton);
        }
    }
    else
    {
        document.getElementById('conditionsDiv').innerHTML = "";
    }
}

async function getRaces()
{
    let response = await fetch('https://api.open5e.com/races/');
    return await response.json();
}

function toggleRaces()
{
    if(document.getElementById('racesDiv').childNodes.length === 0)
    {
        let spellData = fs.readFileSync("assets/races.dnd");
        let races = JSON.parse(spellData);
        console.log(races);
        let i;
        document.getElementById('racesDiv').innerHTML = "";
        for(i = 0; i < parseInt(races["count"]); i++)
        {
            let tempButton = document.createElement("button");
            tempButton.className = "btn";
            tempButton.innerText = races["results"][i]["name"];
            let raceData = races["results"][i];
            tempButton.onclick = function() { displayCodexPage(raceData, "race") };
            document.getElementById('racesDiv').append(tempButton);
        }
    }
    else
    {
        document.getElementById('racesDiv').innerHTML = "";
    }
}

async function getClasses()
{
    let response = await fetch('https://api.open5e.com/classes/');
    return await response.json();
}

function toggleClasses()
{
    if(document.getElementById('classesDiv').childNodes.length === 0)
    {
        let spellData = fs.readFileSync("assets/classes.dnd");
        let classes = JSON.parse(spellData);
        console.log(classes);
        let i;
        document.getElementById('classesDiv').innerHTML = "";
        for(i = 0; i < parseInt(classes["count"]); i++)
        {
            let tempButton = document.createElement("button");
            tempButton.className = "btn";
            tempButton.innerText = classes["results"][i]["name"];
            tempButton.onclick = function() { displayCodexPage(classes["results"][i], "class") };
            document.getElementById('classesDiv').append(tempButton);
        }
    }
    else
    {
        document.getElementById('classesDiv').innerHTML = "";
    }
}

async function getMagicItems()
{
    let response = await fetch('https://api.open5e.com/magicitems/');
    return await response.json();
}

function toggleMagicItems()
{
    if(document.getElementById('magicitemsDiv').childNodes.length === 0)
    {
        let spellData = fs.readFileSync("assets/magicitems.dnd");
        let magicitems = JSON.parse(spellData);
        console.log(magicitems);
        let i;
        document.getElementById('magicitemsDiv').innerHTML = "";
        for(i = 0; i < parseInt(magicitems["count"]); i++)
        {
            let tempButton = document.createElement("button");
            tempButton.className = "btn";
            tempButton.innerText = magicitems["results"][i]["name"];
            let magicitemData = magicitems["results"][i];
            tempButton.onclick = function() { displayCodexPage(magicitemData, "magicitem") };
            document.getElementById('magicitemsDiv').append(tempButton);
        }
    }
    else
    {
        document.getElementById('magicitemsDiv').innerHTML = "";
    }
}

async function getWeapons()
{
    let response = await fetch('https://api.open5e.com/weapons/');
    return await response.json();
}

function toggleWeapons()
{
    if(document.getElementById('weaponsDiv').childNodes.length === 0)
    {
        let spellData = fs.readFileSync("assets/weapons.dnd");
        let weapons = JSON.parse(spellData);
        console.log(weapons);
        let i;
        document.getElementById('weaponsDiv').innerHTML = "";
        for(i = 0; i < parseInt(weapons["count"]); i++)
        {
            let tempButton = document.createElement("button");
            tempButton.className = "btn";
            tempButton.innerText = weapons["results"][i]["name"];
            let weaponData = weapons["results"][i];
            tempButton.onclick = function() { displayCodexPage(weaponData, "weapon") };
            document.getElementById('weaponsDiv').append(tempButton);
        }
    }
    else
    {
        document.getElementById('weaponsDiv').innerHTML = "";
    }
}

function displayCodexPage(item, type) {
    console.log(item);
    document.getElementById("pageTitle").innerText = item["name"];
    document.getElementById("pageContent").innerText = "";

    const sdConverter = new sd.Converter({ tables: true });
    let lineBreak = document.createElement('br');
    switch(type)
    {
        case "spell":
            let subheadings = document.createElement("h6");
            subheadings.innerHTML = item["level"] + " " +  item["school"];
            document.getElementById("pageContent").append(subheadings);
            document.getElementById("pageContent").append(lineBreak);

            let classSubheading = document.createElement("h6");
            classSubheading.innerHTML = item["dnd_class"];
            document.getElementById("pageContent").append(classSubheading);
            document.getElementById("pageContent").append(lineBreak);

            let componentsTab = document.createElement("p");
            componentsTab.innerHTML = "Components: " + item["components"] + "    " + "Concentration: " + item["concentration"];
            document.getElementById("pageContent").append(componentsTab);

            let rangeTab = document.createElement("p");
            rangeTab.innerHTML = "Range: " + item["range"];
            document.getElementById("pageContent").append(rangeTab);

            let timeTab = document.createElement("p");
            timeTab.innerHTML = "Casting Time: " + item["casting_time"] + "    " + "Duration: " + item["duration"];
            document.getElementById("pageContent").append(timeTab);

            let descTab = document.createElement("p");
            descTab.innerHTML = sdConverter.makeHtml(item["desc"]);
            document.getElementById("pageContent").append(descTab);

            let higherTab = document.createElement("p");
            higherTab.innerHTML = "At Higher Levels: " + item["higher_level"];
            document.getElementById("pageContent").append(higherTab);

            break;

        case "monster":
            let monSubheading = document.createElement("h6");
            monSubheading.innerHTML = item['alignment'] + " " + item['type'] + ", CR " + item['challenge_rating'];
            document.getElementById("pageContent").append(monSubheading);

            let monAc = document.createElement("p");
            monAc.innerHTML = "AC: " + item["armor_class"];
            document.getElementById("pageContent").append(monAc);

            let monHp = document.createElement("p");
            monHp.innerHTML = "HP: " + item["hit_points"] + "(" + item["hit_dice"] + ")";
            document.getElementById("pageContent").append(monHp);

            let monSpd = document.createElement("p");
            monSpd = "Speed: " + JSON.stringify(item["speed"]);
            document.getElementById("pageContent").append(monSpd);

            let monAtts = document.createElement("p");
            monAtts.innerHTML = "Str: " + item["strength"] + " Dex: " + item["dexterity"] + " Con: " + item["constitution"] + " Int: " + item["intelligence"] + " Wis: " + item["wisdom"] + " Cha: " + item["charisma"];
            document.getElementById("pageContent").append(monAtts);

            item["actions"].forEach(function(action) {  console.log(action);
                                                            let monActsName = document.createElement("h6")
                                                            let monActsDesc = document.createElement("p")
                                                            monActsName.innerHTML = action['name'];
                                                            document.getElementById("pageContent").append(monActsName);
                                                            monActsDesc.innerHTML = sdConverter.makeHtml(action['desc']);
                                                            document.getElementById("pageContent").append(monActsDesc); });
            break;

        case "background":
            let backDescTab = document.createElement("p");
            backDescTab.innerHTML = sdConverter.makeHtml(item["desc"]);
            document.getElementById("pageContent").append(backDescTab);
            document.getElementById("pageContent").append(lineBreak);

            let equipTab = document.createElement("p");
            equipTab.innerHTML = "Equipment: " + item["equipment"];
            document.getElementById("pageContent").append(equipTab);
            document.getElementById("pageContent").append(lineBreak);

            let classFeatTitle = document.createElement("p");
            classFeatTitle.innerHTML = "Class Feature: " + item["feature"];
            document.getElementById("pageContent").append(classFeatTitle);

            let classFeat = document.createElement("p");
            classFeat.innerHTML = sdConverter.makeHtml(item["feature_desc"]);
            document.getElementById("pageContent").append(classFeat);
            document.getElementById("pageContent").append(lineBreak);

            let langTab = document.createElement("p");
            langTab.innerHTML = "Languages: " + item["languages"];
            document.getElementById("pageContent").append(langTab);

            let profTab = document.createElement("p");
            profTab.innerHTML = "Proficiencies: " + item["skill_proficiencies"] + ", " + item["tool_proficiencies"];
            document.getElementById("pageContent").append(profTab);

            break;

        case "plane":
            break;

        case "condition":

        case "general":
            let genDescTab = document.createElement("p");
            genDescTab.innerHTML = sdConverter.makeHtml(item["desc"]);
            document.getElementById("pageContent").append(genDescTab);
            break;

        case "feat":
            let prereqTab = document.createElement("p");
            prereqTab.innerHTML = "Prerequisites: " + item["prerequisite"];
            document.getElementById("pageContent").append(prereqTab);

            let featDescTab = document.createElement("p");
            featDescTab.innerHTML = sdConverter.makeHtml(item["desc"]);
            document.getElementById("pageContent").append(featDescTab);
            break;


        case "race":
            break;

        case "class":
            break;

        case "magicitem":
            let miSubHeadings = document.createElement("p");
            miSubHeadings.innerHTML = item["rarity"] + ", " + item["type"];
            document.getElementById("pageContent").append(miSubHeadings);

            let miDescTab = document.createElement("p");
            miDescTab.innerHTML = sdConverter.makeHtml(item["desc"]);
            document.getElementById("pageContent").append(miDescTab);

            break;

        case "weapon":
            break;
    }
}