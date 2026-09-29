window.MapManager = {
  render(){
    const layer=document.getElementById("territories");
    layer.innerHTML="";
    const flagsLayer=document.createElementNS("http://www.w3.org/2000/svg","g");
    flagsLayer.setAttribute("class","map-flags");
    WORLD_COUNTRIES.forEach((c)=>{
      const p=document.createElementNS("http://www.w3.org/2000/svg","path");
      p.setAttribute("d",c.path);
      p.setAttribute("class","territory"+(GameState.country && GameState.country.id===c.id?" owned":""));
      if(GameState.war && GameState.country && GameState.country.id!==c.id) p.classList.add("war");
      p.dataset.country=c.id;
      p.setAttribute("fill-rule","evenodd");
      const title=document.createElementNS("http://www.w3.org/2000/svg","title");
      title.textContent=`${c.flag} ${c.name}`; p.appendChild(title);
      p.addEventListener("click",()=>this.select(c.id));
      layer.appendChild(p);

      // Флаг каждой территории: вместо ISO-кода показываем эмодзи-флаг прямо на карте.
      const nums=(c.path.match(/-?\d+(?:\.\d+)?/g)||[]).map(Number);
      if(nums.length >= 4){
        let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
        for(let i=0;i+1<nums.length;i+=2){
          minX=Math.min(minX,nums[i]); maxX=Math.max(maxX,nums[i]);
          minY=Math.min(minY,nums[i+1]); maxY=Math.max(maxY,nums[i+1]);
        }
        const x=(minX+maxX)/2, y=(minY+maxY)/2;

        // Небольшая подложка делает флаг читаемым даже на сложном фоне.
        const group=document.createElementNS("http://www.w3.org/2000/svg","g");
        group.setAttribute("class","map-flag-badge");
        group.setAttribute("transform",`translate(${x.toFixed(1)} ${y.toFixed(1)})`);

        const bg=document.createElementNS("http://www.w3.org/2000/svg","rect");
        bg.setAttribute("x","-12"); bg.setAttribute("y","-9");
        bg.setAttribute("width","24"); bg.setAttribute("height","18");
        bg.setAttribute("rx","5");
        group.appendChild(bg);

        const label=document.createElementNS("http://www.w3.org/2000/svg","text");
        label.setAttribute("x","0"); label.setAttribute("y","1");
        label.setAttribute("class","map-flag");
        label.textContent=c.flag;
        label.setAttribute("aria-label",c.name);
        group.appendChild(label);
        flagsLayer.appendChild(group);
      }
    });
    layer.appendChild(flagsLayer);
  },
  select(id){
    const target=GAME_CONFIG.countries.find(c=>c.id===id);
    if(!target)return;
    if(GameState.country && id===GameState.country.id){UI.log("Это ваша территория.");return;}
    if(GameState.war){
      const cost=150;
      if(GameState.money<cost){UI.log("Недостаточно денег для военной операции.");return;}
      GameState.money-=cost; GameState.army+=1; GameState.turn++;
      UI.log(`Военная операция против ${target.name}: армия получила +1.`); UI.update();
    }else{
      UI.log(`${target.name}: дипломатический контакт. Для военной операции включите режим войны.`);
    }
  }
};
