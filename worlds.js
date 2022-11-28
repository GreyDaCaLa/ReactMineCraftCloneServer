const Worlds = {
    def:{
        cubes: [],
        players:{},
        pcount: 0,
    }
};



function create_World(params) {
//   let fixedname = params.givenName.trim().toLowerCase();
}

function del_World(gName){
  console.log("---Deleting game?")

  let gone = false

  if(games[gName]){
    let plyrs = games[gName].players

    if(plyrs.length==2){

      if(plyrs[0]=='-PLG-' && plyrs[1]=='-PLG-'){
        delete games[gName]
        gone = true
      }

    }

    if(plyrs.length==4){

      if(plyrs[0]=='-PLG-' && plyrs[1]=='-PLG-' && plyrs[2]=='-PLG-' && plyrs[3]=='-PLG-'){
        delete games[gName]
        gone = true
      }
      
    }


    
  }

  if(gone){
    console.log(`game ${gName} has been deleted`)
  }else{
    console.log(`game ${gName} still lives`)
  }


}

function update_WorldCubes(type,params){
    /* from useStore
    let params ={
        worldname: null,
        pos: [x,y,z],
        key: nanoid(),
        texture: texture,
        
    }
    */
   let worldname = params.worldname?params.worldname:'def'
   console.log("Cubes - UPDATE: ",type, params.pos, worldname)

    switch(type){
        case 'add':
            Worlds[worldname].cubes =[...Worlds[worldname].cubes,{
                key: params.key,
                pos: params.pos,
                texture: params.texture,
            }] 
            break;
        case 'remove':
            let x = params.pos[0]
            let y = params.pos[1]
            let z = params.pos[2]
            Worlds[worldname].cubes=Worlds[worldname].cubes.filter(cube => {
				const [X, Y, Z] = cube.pos
				return X !== x || Y !== y || Z !== z
            })
            break;
        case 'reset':
            Worlds[worldname].cubes = []
            break;
        default:

            break;
    }


    return Worlds[worldname].cubes

}

function update_WorldPlayers(type,params){
  /* from useStore
		let params ={
			worldname: null,
			playernum,
			pos,

		}
  */
 let worldname = params.worldname?params.worldname:'def'
//  console.log("Player-UPDATE: ",type, params.pos, worldname)

  switch(type){
      case 'add':
        let pc = ++Worlds[worldname].pcount
          Worlds[worldname].players[pc]={
            pos:params.pos
          }
          break;
      case 'remove':
        delete Worlds[worldname].players[params.playernum];
          break;
      case 'move':
          Worlds[worldname].players[params.playernum]={
            pos:params.pos
          }
          break;
      default:

          break;
  }


  return Worlds[worldname].players

}

function get_WorldContent(name='def') {

  const world = Worlds[name.trim().toLowerCase()];

  if (!world) {
    return { error: "Fatal error this World does not exist" };
  }

  return { ...world };
}

function get_AllWorlds (){
  return {...Worlds}
}

export {
    get_WorldContent,
    update_WorldCubes,
    update_WorldPlayers,
    get_AllWorlds,
};
