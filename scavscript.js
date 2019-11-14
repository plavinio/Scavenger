//Javascript for Scavenger app

let MasterCats = JSON.parse('"outerCats":[{"Location":["fill in"]},{"mainCats":["**"]},{"extend as necessary"}]');


//outerCatNames.push(MasterCats.outerCats[cnami]);}

console.log("outer category names: ");
for (let cnami in MasterCats.outerCats){console.log("            " + MasterCats.outerCats[cnami]);}
