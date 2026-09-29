window.Training = {
  active:false, hits:0, shots:0, weapon:"pistol", timer:null,
  open(){document.getElementById("trainingModal").classList.remove("hidden");this.reset();},
  close(){this.stop();document.getElementById("trainingModal").classList.add("hidden");},
  reset(){this.stop();this.hits=0;this.shots=0;document.getElementById("hits").textContent="0";document.getElementById("target").classList.add("hidden");document.getElementById("trainingMessage").textContent="Нажмите «Старт тренировки»";},
  start(){
    this.stop(); this.active=true; this.hits=0; this.shots=0; document.getElementById("hits").textContent="0";
    document.getElementById("trainingMessage").textContent="";
    this.spawn();
  },
  stop(){this.active=false;if(this.timer)clearTimeout(this.timer);},
  spawn(){
    if(!this.active)return;
    if(this.shots>=10){this.finish();return;}
    const t=document.getElementById("target"), r=document.getElementById("range");
    const x=20+Math.random()*(r.clientWidth-90), y=55+Math.random()*(r.clientHeight-95);
    t.style.left=x+"px";t.style.top=y+"px";t.classList.remove("hidden");
    this.timer=setTimeout(()=>{if(this.active){t.classList.add("hidden");this.shots++;this.spawn();}},1800);
  },
  hit(){
    if(!this.active)return;
    this.hits++;this.shots++;document.getElementById("hits").textContent=this.hits;
    document.getElementById("target").classList.add("hidden");
    this.spawn();
  },
  finish(){
    this.stop();
    const gain=Math.max(1,Math.floor(this.hits/2));
    GameState.army+=gain; GameState.tech+=Math.floor(this.hits/5);
    document.getElementById("trainingMessage").textContent=`Тренировка завершена: ${this.hits}/10. Армия +${gain}.`;
    UI.update(); UI.log(`Полигон: ${this.hits}/10 попаданий. Армия +${gain}.`);
  }
};
