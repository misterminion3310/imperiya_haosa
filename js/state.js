window.GameState = {
  country:null, epoch:null, money:1200, industry:20, tech:10, army:5, fleet:2,
  alliance:false, war:false, weapons:0, turn:1
};
window.resetState = function(){ Object.assign(GameState,{country:null,epoch:null,money:1200,industry:20,tech:10,army:5,fleet:2,alliance:false,war:false,weapons:0,turn:1}); };
