const fs = require('fs');
const prompt = require('electron-prompt');
const { app, dialog } = require('electron').remote;
let notes;
let currentCategory;

function createCategoryButton(category)
{
    let tempButton = document.createElement('button');
    tempButton.className = "list-group-item list-group-item-action";
    tempButton.id = category + 'Button';
    tempButton.innerText = category;
    tempButton.onclick = function() { loadItems(category) };

    return tempButton;
}

function createNewCategoryButton()
{
    let tempButton = document.createElement('button');
    tempButton.className = "list-group-item list-group-item-action";
    tempButton.id = "addCategoryButton";
    tempButton.innerText = "+  Add Category";
    tempButton.onclick = function () { createNewCategory() };

    return tempButton;
}

function createNewCategory() {
    prompt({
        title: 'Choose Category Title',
        label: 'Category Title:',
        value: 'New Category',
        inputAttrs: {
            type: 'text',
            required: 'true'
        },
        type: 'input'
    })
        .then((r) => {
            if(r === null) {
                console.log('user cancelled');
                return -1;
            } else {
                notes[r] = {};
                refreshCategories();
            }
        })
        .catch(console.error);
}

function refreshCategories() {
    let categories =  Object.keys(notes);

    document.getElementById("categoriesList").innerHTML = "";
    categories.forEach(category => document.getElementById("categoriesList").append(createCategoryButton(category)));
    document.getElementById("categoriesList").append(createNewCategoryButton());
}

function loadCategories(path)
{
    let rawdata = fs.readFileSync(path);
    notes = JSON.parse(rawdata);
    console.log(notes);

    let categories =  Object.keys(notes);

    document.getElementById("categoriesList").innerHTML = "";
    categories.forEach(category => document.getElementById("categoriesList").append(createCategoryButton(category)));
    document.getElementById("categoriesList").append(createNewCategoryButton());
}

function createItemButton(item)
{
    let tempButton = document.createElement('button');
    tempButton.className = "list-group-item list-group-item-action";
    tempButton.id = item + 'Button';
    tempButton.innerText = item;
    tempButton.onclick = function() { loadNotes(item) };

    return tempButton;
}

function createNewItemButton()
{
    let tempButton = document.createElement('button');
    tempButton.className = "list-group-item list-group-item-action";
    tempButton.id = "addItemButton";
    tempButton.innerText = "+  Add Item";
    tempButton.onclick = function () { createNewItem() };

    return tempButton;
}

function createNewItem() {
    prompt({
        title: 'Choose Item Name',
        label: 'Item Name:',
        value: 'New Item',
        inputAttrs: {
            type: 'text',
            required: 'true'
        },
        type: 'input'
    })
        .then((r) => {
            if(r === null) {
                console.log('user cancelled');
                return -1;
            } else {
                notes[currentCategory][r] = "";
                loadItems(currentCategory);
            }
        })
        .catch(console.error);
}

function loadItems(category)
{
    console.log(notes[category]);
    let items = Object.keys(notes[category]);
    currentCategory = category;
    document.getElementById("itemsList").innerHTML = "";
    items.forEach(item => document.getElementById("itemsList").append(createItemButton(item)));
    document.getElementById("itemsList").append(createNewItemButton());
}

function loadNotes(item)
{
    let notesArea = document.getElementById("notesArea");
    notesArea.value = notes[currentCategory][item];
    notesArea.onkeypress = function() { saveNotes(item) };
    console.log(notes[currentCategory][item]);
}

function saveNotes(item)
{
    let notesArea = document.getElementById("notesArea");
    notes[currentCategory][item] = notesArea.value;
    console.log(currentCategory);
}

function saveNotesFile()
{
    let notesData = JSON.stringify(notes);
    fs.writeFileSync('assets/notes.dnd', notesData);
}

function loadNotesFile()
{
    const readOptions = {
        filters: [
            {
                name: 'Dnd Notebook', extensions: ['dnd']
            }
        ]
    }
    let path = (dialog.showOpenDialogSync(null, readOptions).valueOf())[0];
    loadCategories(path);
}

loadCategories('assets/notes.dnd');

