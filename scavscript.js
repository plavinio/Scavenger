//Javascript for Scavenger app

//let MasterCats = JSON.parse('"outerCats":{["A":"one", "B":"two", "C":"three"]}');
let cats = [
    {
        "main": "urgent",
        "subs": ["purse/personal bag", "wallet", "keys", "glasses", "perscription", "personal documents", "suitcase", "money", "medical device", "other"]
    },
    {
        "main": "accessories",
        "subs": ["earring", "bracelet", "necklace", "watch (not smart)", "ring", "pin", "cufflinks", "tie clip", "sunglasses", "other"]
    },
    {
        "main": "tech",
        "subs": ["phone", "laptop", "smartwatch", "speaker", "tablet", "headphones", "headset", "charger", "powerbank", "adapters/dongles", "mp3", "game console", "stylus", "other"]
    },
    {
        "main": "clothing",
        "subs": ["shirt", "sweatshirt", "coat/jacket", "scarf", "hat", "gloves/mittens"/*lobster claws*/, "shoes", "headscarf", "balaclava", "workout gear", "other"]
    },
    {
        "main": "academic",
        "subs": ["textbook", "iClicker", "notebook/binder", "backpack", "project/homework", "library book", "pencil case", "art supplies", "UCard", "other"]
    }
];


let lostObs = [];

let foundObs = [];

let formErrs = false;

$(document).ready(function() { //When DOM ready
    console.log("outer category names: ");
    for(x in cats){
        $('<option value='+cats[x].main+'>'+cats[x].main+'</option>').appendTo($("#Cat1"));
    }
});
$("select#Cat1").change(function(){
    let ddl = document.getElementById("Cat1");
    let selectedValue = ddl.options[ddl.selectedIndex].value;

    $("#Cat2").empty();
    $('<option value="none" disabled selected>--Select--</option>').appendTo($("#Cat2"));

    for(x in cats){
        if(cats[x].main == selectedValue){
            for(y in cats[x].subs){
                $('<option value='+cats[x].subs[y]+'>'+cats[x].subs[y]+'</option>').appendTo($("#Cat2"));
            }
        }
    }
});

function checkForm(){
    let c1 = document.getElementById("Cat1");
    let cat1val = c1.options[c1.selectedIndex].value;
    let c2 = document.getElementById("Cat2");
    let cat2val = c2.options[c2.selectedIndex].value;

    if(cat1val == "none" || cat2val == "none"){
        formErrs = true;
    }
    else{
        formErrs = false;
        $("ul").empty();
    }

    if(formErrs){
        $("ul").empty();
        if(cat1val == "none"){
            $('<li>Please select a first category</li>').appendTo("ul");
        }
        if(cat2val == "none"){
            $('<li>Please select a second category</li>').appendTo("ul");
        }
    }
}

function lostSub(){
    let c1 = document.getElementById("Cat1");
    let cat1val = c1.options[c1.selectedIndex].value;

    let c2 = document.getElementById("Cat2");
    let cat2val = c2.options[c2.selectedIndex].value;

    let contact = document.getElementById("contact").value;

    //unsure if this is right but we gonna see
    let img = document.getElementById("pic").value;

    let valStr = '{"main":"'+cat1val+'","sub":"'+cat2val+'", "contact":"'+contact+'", "img":"'+img+'"}';

    let parsedVal = JSON.parse(valStr);

    lostObs.push(parsedVal);
}

function foundSub(){
    let c1 = document.getElementById("Cat1");
    let cat1val = c1.options[c1.selectedIndex].value;

    let c2 = document.getElementById("Cat2");
    let cat2val = c2.options[c2.selectedIndex].value;

    let contact = document.getElementById("contact").value;

    //unsure if this is right but we gonna see
    let img = document.getElementById("pic").value;

    let valStr = '{"main":"'+cat1val+'","sub":"'+cat2val+'", "contact":"'+contact+'", "img":"'+img+'"}';

    let parsedVal = JSON.parse(valStr);

    foundObs.push(parsedVal);
}

$("form#searchForm").submit(function(event){
    checkForm();
    if(formErrs){
        event.preventDefault();
    }
});

$("form#foundForm").submit(function(event){
    checkForm();
    if(formErrs){
        event.preventDefault();
    }
    foundSub();
});

$("form#lostForm").submit(function(event){
    if(window.confirm("WAIT! Only press ok if you've checked the found items list. Otherwise, press cancel.")){
        checkForm();
        if(formErrs){
            event.preventDefault();
        }
        lostSub();
    }
    else{
        event.preventDefault();
    }
});
