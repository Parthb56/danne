const mineflayer = require('mineflayer')
const cmd = require('mineflayer-cmd').plugin
const fs = require('fs');
let rawdata = fs.readFileSync('config.json');
let data = JSON.parse(rawdata);
var lasttime = -1;
var moving = 0;
var first = false;
var connected = 0;
var actions = [ 'forward', 'back', 'left', 'right']
var lastaction;
var pi = 3.14159;
var moveinterval = 2; // 2 second movement interval
var maxrandom = 5; // 0-5 seconds added to movement interval (randomly)
var host = data["ip"];
var username = "danne69"
var nightskip = data["auto-night-skip"]
const initBot = () => {
var bot = mineflayer.createBot({
  host: host,
  port:data["port"],
  username: "danne69155"
});
function getRandomArbitrary(min, max) {
       return Math.random() * (max - min) + min;

}

bot.loadPlugin(cmd)



bot.on('login',function(){
	console.log("Trying to login")
	if(data["login-enabled"] == "true"){
		bot.chat(data["register-cmd"])
		bot.chat(data["login-cmd"])
	}
	for (let i=0; i<20; i++) { 
	   task(i); 
	} 
	console.log("Logged In")
	bot.chat("hello");
});
  
function task(i) { 
	
  setTimeout(function() { 
    if(i == 9){
        console.log(i)
	bot.chat("...")
	
	}
	else{
		bot.chat(",")
		
	}
  }, 3600000 * i); 
} 


bot.on('time', function(time) {

		
	if(nightskip == "true"){
	if(bot.time.timeOfDay >= 13000){
	bot.chat('/time set day')
	}}
    if (connected <1) {
        return;
    }
    if (lasttime<0) {
        lasttime = bot.time.age;
    } else {
        var randomadd = Math.random() * maxrandom * 20;
        var interval = moveinterval*20 + randomadd;
        if (bot.time.age - lasttime > interval) {
            if (moving == 1) {
                bot.setControlState(lastaction,false);
                moving = 0;
                lasttime = bot.time.age;
            } else {
                var yaw = Math.random()*pi - (0.5*pi);
                var pitch = Math.random()*pi - (0.5*pi);
                bot.look(yaw,pitch,false);
                lastaction = actions[Math.floor(Math.random() * actions.length)];
                bot.setControlState(lastaction,true);
                moving = 1;
                lasttime = bot.time.age;
                bot.activateItem();
            }
        }
    }
});





bot.on('playerLeft', (player) => {
    if (player.username === bot.username) return
    setTimeout(function() {
    console.log(`/pardon ${player.username}`)
    bot.chat(`/pardon ${player.username}`)
    }, 10000);
  });

bot.on('spawn',function() {
    connected=1;
});

bot.on('death',function() {
    bot.emit("respawn")
});

bot.on('end', () => {
    console.log(`Disconnected`);

    // Attempt to reconnect
    setTimeout(initBot, 20000);
});

bot.on('error', (err) => {
    if (err.code === 'ECONNREFUSED') {
        console.log(`Failed to connect to ${err.address}:${err.port}`)
    }
    else {
        console.log(`Unhandled error: ${err}`);
    }
});
}; 

const initBot1 = () => {
var bot = mineflayer.createBot({
  host: host,
  port:data["port"],
  username: "sunny69155"
});
function getRandomArbitrary(min, max) {
       return Math.random() * (max - min) + min;

}

bot.loadPlugin(cmd)



bot.on('login',function(){
	console.log("Trying to login")
	if(data["login-enabled"] == "true"){
		bot.chat(data["register-cmd"])
		bot.chat(data["login-cmd"])
	}
	for (let i=0; i<20; i++) { 
	   task(i); 
	} 
	console.log("Logged In")
	bot.chat("hello");
});
  
function task(i) { 
	
  setTimeout(function() { 
    if(i == 9){
        console.log(i)
	bot.chat("...")
	
	}
	else{
		bot.chat(",")
		
	}
  }, 3600000 * i); 
} 


bot.on('time', function(time) {

		
	if(nightskip == "true"){
	if(bot.time.timeOfDay >= 13000){
	bot.chat('/time set day')
	}}
    if (connected <1) {
        return;
    }
    if (lasttime<0) {
        lasttime = bot.time.age;
    } else {
        var randomadd = Math.random() * maxrandom * 20;
        var interval = moveinterval*20 + randomadd;
        if (bot.time.age - lasttime > interval) {
            if (moving == 1) {
                bot.setControlState(lastaction,false);
                moving = 0;
                lasttime = bot.time.age;
            } else {
                var yaw = Math.random()*pi - (0.5*pi);
                var pitch = Math.random()*pi - (0.5*pi);
                bot.look(yaw,pitch,false);
                lastaction = actions[Math.floor(Math.random() * actions.length)];
                bot.setControlState(lastaction,true);
                moving = 1;
                lasttime = bot.time.age;
                bot.activateItem();
            }
        }
    }
});





bot.on('playerLeft', (player) => {
    if (player.username === bot.username) return
    setTimeout(function() {
    console.log(`/pardon ${player.username}`)
    bot.chat(`/pardon ${player.username}`)
    }, 10000);
  });

bot.on('spawn',function() {
    connected=1;
});

bot.on('death',function() {
    bot.emit("respawn")
});

bot.on('end', () => {
    console.log(`Disconnected`);

    // Attempt to reconnect
    setTimeout(initBot1, 20000);
});

bot.on('error', (err) => {
    if (err.code === 'ECONNREFUSED') {
        console.log(`Failed to connect to ${err.address}:${err.port}`)
    }
    else {
        console.log(`Unhandled error: ${err}`);
    }
});
};


const initBot2 = () => {
var bot = mineflayer.createBot({
  host: host,
  port:data["port"],
  username: "ammy69155"
});
function getRandomArbitrary(min, max) {
       return Math.random() * (max - min) + min;

}

bot.loadPlugin(cmd)



bot.on('login',function(){
	console.log("Trying to login")
	if(data["login-enabled"] == "true"){
		bot.chat(data["register-cmd"])
		bot.chat(data["login-cmd"])
	}
	for (let i=0; i<20; i++) { 
	   task(i); 
	} 
	console.log("Logged In")
	bot.chat("hello");
});
  
function task(i) { 
	
  setTimeout(function() { 
    if(i == 9){
        console.log(i)
	bot.chat("...")
	
	}
	else{
		bot.chat(",")
		
	}
  }, 3600000 * i); 
} 


bot.on('time', function(time) {

		
	if(nightskip == "true"){
	if(bot.time.timeOfDay >= 13000){
	bot.chat('/time set day')
	}}
    if (connected <1) {
        return;
    }
    if (lasttime<0) {
        lasttime = bot.time.age;
    } else {
        var randomadd = Math.random() * maxrandom * 20;
        var interval = moveinterval*20 + randomadd;
        if (bot.time.age - lasttime > interval) {
            if (moving == 1) {
                bot.setControlState(lastaction,false);
                moving = 0;
                lasttime = bot.time.age;
            } else {
                var yaw = Math.random()*pi - (0.5*pi);
                var pitch = Math.random()*pi - (0.5*pi);
                bot.look(yaw,pitch,false);
                lastaction = actions[Math.floor(Math.random() * actions.length)];
                bot.setControlState(lastaction,true);
                moving = 1;
                lasttime = bot.time.age;
                bot.activateItem();
            }
        }
    }
});





bot.on('playerLeft', (player) => {
    if (player.username === bot.username) return
    setTimeout(function() {
    console.log(`/pardon ${player.username}`)
    bot.chat(`/pardon ${player.username}`)
    }, 10000);
  });

bot.on('spawn',function() {
    connected=1;
});

bot.on('death',function() {
    bot.emit("respawn")
});

bot.on('end', () => {
    console.log(`Disconnected`);

    // Attempt to reconnect
    setTimeout(initBot2, 20000);
});

bot.on('error', (err) => {
    if (err.code === 'ECONNREFUSED') {
        console.log(`Failed to connect to ${err.address}:${err.port}`)
    }
    else {
        console.log(`Unhandled error: ${err}`);
    }
});
};



initBot();
initBot1();
initBot2();



















