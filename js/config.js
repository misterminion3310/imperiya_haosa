window.GAME_CONFIG = {
  countries: WORLD_COUNTRIES.map(c => ({id:c.id, name:c.name, flag:c.flag, color:"#d9dce2", region:"world"})),
  epochs: [
    {id:"modern", name:"Современная эпоха", year:"2000–2020", bonus:"Технологии"},
    {id:"current", name:"Современность", year:"2020–2026", bonus:"Экономика"},
    {id:"near", name:"Ближайшее будущее", year:"2026–2050", bonus:"Исследования"},
    {id:"future", name:"Будущее", year:"2050+", bonus:"Технологии"}
  ]
};
