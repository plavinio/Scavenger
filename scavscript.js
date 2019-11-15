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

//outerCatNames.push(MasterCats.outerCats[cnami]);}     <-- I'll get rid of this when I'm done don't worry (-Paige)
// "outerCats":[{"Location":["fill in"]},{"mainCats":["**"]},{"extend as necessary"}]

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
    $('<option value="" disabled selected>--Select--</option>').appendTo($("#Cat2"));

    for(x in cats){
        if(cats[x].main == selectedValue){
            for(y in cats[x].subs){
                $('<option value='+cats[x].subs[y]+'>'+cats[x].subs[y]+'</option>').appendTo($("#Cat2"));
            }
        }
    }
});      
