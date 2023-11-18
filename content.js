chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action === 'changeColor') {
        console.log("clicked");
        // Change the color of the first paragraph on the page to red
        var statsList = getStatsList();
        var hueList = getNewHueList(statsList);
        var statBars = document.querySelector('.graphcol');
        if (statBars) {
          for(var i = 0; i < statBars.length; i++) {
            var hue = hueList[i];
            statBars.item(i).style.background = `hsl(${hue}, 85%, 45%`;
          }
        }
      }
    }
  );

function getStatsList() {
    var statsCol = document.querySelector("#room-teambuilder > div > div.teambuilder-results > div.statform > div.col.statscol");
    if(statsCol) {
      var statsList = [];
      // for(var i = 0; i < statsCol.length; i++) {
      //     statsList.push(statsCol.item(i));
      // }
      statsList.push(document.querySelector("#room-teambuilder > div > div.teambuilder-results > div.statform > div.col.statscol > div:nth-child(2) > b"))
      console.log("stats: " + statsList);
      return statsList;
    }
    else {
      console.log("cant get statsCol");
    }
}

function getNewHueList(statsList) {
  var hueList = [];
  for(var i = 0; i < statsList.length; i++) {
    hueList.push(statToHue(statsList[i]));
  }
}

function statToHue(stat) {
    return Int((stat*0.498263) - 0.673852);
}