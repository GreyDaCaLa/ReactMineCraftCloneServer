//in package.json under -- "main": "index.js", -- add "type": "module",
import express from 'express';
import {Server} from 'socket.io';
import http from 'http';
import cors from 'cors';
import router from './routes/routes.js';
import { get_AllWorlds, get_WorldContent, update_WorldCubes, update_WorldPlayers } from './worlds.js';
    
const PORT = process.env.PORT || 5000

const app = express();
const httpserver = http.createServer(app)
const io = new Server(httpserver)

app.use(cors());


app.use(router);

io.on('connection', socket => {
    console.log("A No Name PLayer is in the lobby: ",socket.id)

    socket.on("C_addBlock",(params)=>{
        let newworldcubestate =update_WorldCubes("add",params)
        // if(params.worldname){
        //     // io.to(params.worldname.trim().toLowerCase()).emit('S_WorldUpdate',newworldstate);
        // }else{
        //     io.emit('S_WorldUpdateCubes',newworldcubestate);
        // }
    });

    socket.on("C_removeBlock",(params)=>{
        let newworldcubestate =update_WorldCubes("remove",params)
        // if(params.worldname){
        //     // io.to(params.worldname.trim().toLowerCase()).emit('S_WorldUpdate',newworldstate);
        // }else{
        //     io.emit('S_WorldUpdateCubes',newworldcubestate);
        // }
    });
    socket.on("C_resetBlocks",(params)=>{
        let newworldcubestate =update_WorldCubes("reset",params)
        // if(params.worldname){
        //     // io.to(params.worldname.trim().toLowerCase()).emit('S_WorldUpdate',newworldstate);
        // }else{
        //     io.emit('S_WorldUpdateCubes',newworldcubestate);
        // }
    });

    socket.on("C_UpdateMove",(params)=>{
        let allplayers = update_WorldPlayers('move',params)
        // if(params.worldname){
        //     // io.to(params.worldname.trim().toLowerCase()).emit('S_WorldUpdate',newworldstate);
        // }else{
        //     io.emit('S_UpdatePlayerPos',allplayers);
        // }
    })

    socket.on('disconnect', () => {
        // console.log("lost Connection with: ",socket.id)
        console.log("removing player\n\n\n");
        // removeUser(socket.id)
        // delete players[socket.id];

        // console.log("Current remaining players",players)
        
    })

    socket.on('disconnecting',()=>{
        console.log("the rooms? =========")
        // console.log(socket.rooms)

    })

    let temp = update_WorldPlayers('add',{pos:[-10,-10,-10]})
    temp = Object.keys(temp)

    io.to(socket.id).emit('S_GiveWorld', get_WorldContent())
    io.to(socket.id).emit('S_GiveplayerNum', temp[temp.length-1])


    // setInterval(()=>{
    //     // console.log('send')
    //     let all = get_AllWorlds()
    //     let worlds = Object.keys(all)
    //     for(let world of worlds){
    //         io.emit("S_HeartBeat",all[world])
    //         //room example
    //          // io.to(params.worldname.trim().toLowerCase()).emit('S_WorldUpdate',newworldstate);
    //     }
    //     }, 100)
})





httpserver.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});