chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'changeColor') {
      console.log("clicked");
      // Change the color of the first paragraph on the page to red
      var statsList = getStatsList();
      if(statsList) {
        var hueList = getNewHueList(statsList);
        var graphColEl = document.querySelector("#room-teambuilder > div > div.teambuilder-results > div.statform > div.col.graphcol");
        if (graphColEl) {
          for(var i = 2; i < 8; i++) {
            var hue = hueList[i-2];
            var graphSpan = graphColEl.querySelector(`div:nth-child(${i}) > em > span`);
            if(graphSpan) {
              graphSpan.style.background = `hsl(${hue}, 85%, 45%`;
            } else {
              console.log("cant get individual graph");
            }
          }
        }
      } else {
        console.log("cant get graphCol");
      }
    }
  }
);

function getStatsList() {
  var statsList = [];
  var statsColEl = document.querySelector("#room-teambuilder > div > div.teambuilder-results > div.statform > div.col.statscol")
  if(statsColEl) {
    for(var i = 2; i < 8; i++) {
      var statText = statsColEl.querySelector(`div:nth-child(${i}) > b`).innerText;
      if(statText) {
        statsList.push(statText);
      } else {
        console.log("cant get individual stat");
      }
    }
    console.log("stats: " + statsList);
    return statsList;
  } else {
    console.log("cant get statscol");
  }
}

function getNewHueList(statsList) {
  var hueList = [];
  for(var i = 0; i < statsList.length; i++) {
    hueList.push(statToHue(statsList[i]));
  }
  console.log("hues: " + hueList);
  return hueList;
}

function statToHue(stat) {
    return (stat*0.498263) - 0.673852;
}