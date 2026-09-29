window.UI = {
  show(id){document.querySelectorAll(".screen").forEach(s=>s.classList.add("hidden"));document.getElementById(id).classList.remove("hidden");},
  update(){
    const c=GameState.country;
    if(!c)return;
    document.getElementById("nationName").textContent=c.name;
    document.getElementById("epochName").textContent=GameState.epoch.name;
    document.getElementById("flag").textContent=c.flag;
    document.getElementById("moneyValue").textContent=GameState.money;
    document.getElementById("industryValue").textContent=GameState.industry;
    document.getElementById("techValue").textContent=GameState.tech;
    document.getElementById("armyValue").textContent=GameState.army;
    document.getElementById("fleetValue").textContent=GameState.fleet;
    document.getElementById("industryStat").textContent=GameState.industry;
    document.getElementById("techStat").textContent=GameState.tech;
    document.getElementById("armyStat").textContent=GameState.army;
    document.getElementById("fleetStat").textContent=GameState.fleet;
    document.getElementById("statusChip").textContent=GameState.war?"ВОЙНА":GameState.alliance?"АЛЬЯНС":"МИР";
    document.getElementById("statusChip").style.background=GameState.war?"#35171b":GameState.alliance?"#18233d":"#18231d";
    document.getElementById("statusChip").style.color=GameState.war?"#e99ca5":GameState.alliance?"#a8c6ff":"#9de0b0";
    document.getElementById("mapTitle").textContent=`${c.name} — мировая карта`;
    MapManager.render();
  },
  log(msg){
    const box=document.getElementById("eventLog"), line=document.createElement("div");
    line.className="log-line";line.innerHTML=`<span>Ход ${GameState.turn} ·</span> ${msg}`;
    box.prepend(line); while(box.children.length>6)box.lastChild.remove();
  }
};
