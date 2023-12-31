var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
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
             graphSpan.style.border = `hsl(${hue}, 85%, 35%`;
             graphSpan.style.width = `${hue*0.909589 + 22.4953}px`
           } else {
             console.log("cant get individual graph");
           }
         }
       }
     } else {
       console.log("cant get graphCol");
     }
  });
});

var config = { childList: true, subtree: true };
observer.observe(document.body, config); // Observing changes in the entire document

function getStatsList() {
  var statsList = [];
  var statsColEl = document.querySelector("#room-teambuilder > div > div.teambuilder-results > div.statform > div.col.statscol");
  if(statsColEl) {
    for(var i = 2; i < 8; i++) {
      var statText = statsColEl.querySelector(`div:nth-child(${i}) > b`).innerText;
      if(statText) {
        statsList.push(statText);
      } else {
        console.log("cant get individual stat");
      }
    }
    return statsList;
  } else {
    console.log("cant get statscol");
  }
}

function getNewHueList(statsList) {
  var hueList = [];
  var level = document.querySelector("#room-teambuilder > div > div.teamchartbox.individual > ol > li > div.setchart > div.setcol.setcol-details > div:nth-child(1) > div > button > span.detailcell.detailcell-first");
  if(level) {
    for(var i = 0; i < statsList.length; i++) {
      hueList.push(statToHue(level.textContent, statsList[i]));
    }
    return hueList;
  } else {
    console.log("cant get level");
  }
}

function statToHue(level, stat) {
  if (level == "Level50")
    return stat*0.498263 - 0.673852;
  else if(level == "Level5")
    return stat*4.26824 - 12.0816;
  else
    return stat*0.252552 - 0.370239;
}