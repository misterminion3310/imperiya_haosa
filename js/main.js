document.addEventListener("DOMContentLoaded",()=>{
  setTimeout(()=>UI.show("menuScreen"),1100);

  document.getElementById("playBtn").onclick=()=>{buildSetup();UI.show("setupScreen");};

  document.getElementById("startGameBtn").onclick=()=>{
    if(!GameState.country)return;
    GameState.epoch=GAME_CONFIG.epochs.find(e=>e.id==="current") || GAME_CONFIG.epochs[0];
    document.getElementById("tutorialCountry").textContent=GameState.country.name;
    UI.show("tutorialScreen");
  };

  document.getElementById("finishTutorialBtn").onclick=()=>{
    UI.show("gameScreen");UI.update();UI.log(`Кампания начата за ${GameState.country.name}.`);
  };

  document.getElementById("resetBtn").onclick=()=>{
    resetState();document.getElementById("eventLog").innerHTML="";UI.show("setupScreen");buildSetup();
  };

  document.querySelectorAll(".action-card").forEach(btn=>btn.onclick=()=>{
    const type=btn.dataset.action,cost={factory:100,tech:130,army:160,fleet:220}[type];
    if(GameState.money<cost){UI.log("Недостаточно средств.");return;}
    GameState.money-=cost;
    if(type==="factory")GameState.industry+=5;
    if(type==="tech")GameState.tech+=4;
    if(type==="army")GameState.army+=2;
    if(type==="fleet")GameState.fleet+=1;
    GameState.turn++;UI.update();UI.log(`Развитие: ${btn.querySelector("b").textContent}. Ресурс улучшен.`);
  });

  document.getElementById("allianceBtn").onclick=()=>{
    if(GameState.war){UI.log("Во время войны нельзя заключить альянс.");return;}
    GameState.alliance=!GameState.alliance;GameState.turn++;UI.update();
    UI.log(GameState.alliance?"Договор об альянсе подписан.":"Альянс расторгнут.");
  };

  document.getElementById("warBtn").onclick=()=>{
    GameState.war=!GameState.war;GameState.alliance=false;GameState.turn++;UI.update();
    UI.log(GameState.war?"Империя объявила военное положение.":"Военное положение отменено.");
  };

  document.querySelectorAll(".shop-item").forEach(btn=>btn.onclick=()=>{
    const type=btn.dataset.buy,cost={weapon:250,ship:500,lab:650}[type];
    if(GameState.money<cost){UI.log("Недостаточно денег.");return;}
    GameState.money-=cost;
    if(type==="weapon")GameState.weapons++;
    if(type==="ship")GameState.fleet++;
    if(type==="lab")GameState.tech+=5;
    UI.update();UI.log(`Куплено: ${btn.querySelector("b").textContent}.`);
  });

  document.getElementById("trainingBtn").onclick=()=>Training.open();
  document.getElementById("closeTraining").onclick=()=>Training.close();
  document.getElementById("startTraining").onclick=()=>Training.start();
  document.getElementById("target").onclick=()=>Training.hit();
  document.querySelectorAll(".weapon").forEach(b=>b.onclick=()=>{
    document.querySelectorAll(".weapon").forEach(x=>x.classList.remove("active"));b.classList.add("active");Training.weapon=b.dataset.weapon;
  });
});

function buildSetup(){
  renderCountries("");
  const search=document.getElementById("countrySearch");
  search.oninput=()=>renderCountries(search.value);
  checkSetup();
}
function renderCountries(query){
  const cg=document.getElementById("countryGrid");
  const q=(query||"").trim().toLowerCase();
  const list=GAME_CONFIG.countries.filter(c=>!q || c.name.toLowerCase().includes(q));
  cg.innerHTML="";
  document.getElementById("countryCount").textContent=`Стран найдено: ${list.length} из ${GAME_CONFIG.countries.length}`;
  list.forEach(c=>{
    const el=document.createElement("button");el.className="country-card"+(GameState.country&&GameState.country.id===c.id?" selected":"");
    el.innerHTML=`<div class="country-flag">${c.flag}</div><h3>${c.name}</h3>`;
    el.onclick=()=>{GameState.country=c;document.querySelectorAll(".country-card").forEach(x=>x.classList.remove("selected"));el.classList.add("selected");checkSetup();};
    cg.appendChild(el);
  });
}
function checkSetup(){
  const ok=!!GameState.country;
  document.getElementById("startGameBtn").disabled=!ok;
  document.getElementById("setupHint").textContent=ok?`Выбрана страна: ${GameState.country.name}`:"Выберите страну";
}
