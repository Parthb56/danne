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
var username = data["name"]
var nightskip = data["auto-night-skip"]
const initBot = () => {
var bot = mineflayer.createBot({
  host: host,
  port:data["port"],
  username: username
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
    if(i==9){
        console.log(i)
	bot.chat("...")
	
	}
	else{
		bot.chat(",,,")
		
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


bot.on('chat', (username, message) => {
    if (username === bot.username) return
    const result = /canSee (-?[0-9]+),(-?[0-9]+),(-?[0-9]+)/.exec(message)
    if (result) {
      canSee(new Vec3(result[1], result[2], result[3]))
      return
    }
    switch (message) {
      case 'pos':
        sayPosition(username)
        break
      case 'wearing':
        sayEquipment()
        break
      case 'nick':
        sayNick()
        break
      case 'spawn':
        saySpawnPoint()
        break
      case 'block':
        sayBlockUnder(username)
        break
      case 'quit':
        quit(username)
        break
      default:
        bot.chat("That's nice")
    }
  
    function canSee (pos) {
      const block = bot.blockAt(pos)
      const r = bot.canSeeBlock(block)
      if (r) {
        bot.chat(`I can see the block of ${block.displayName} at ${pos}`)
      } else {
        bot.chat(`I cannot see the block of ${block.displayName} at ${pos}`)
      }
    }
  
    function sayPosition (username) {
      bot.chat(`I am at ${bot.entity.position}`)
      bot.chat(`You are at ${bot.players[username].entity.position}`)
    }
  
    function sayEquipment () {
      const eq = bot.players[username].entity.equipment
      const eqText = []
      if (eq[0]) eqText.push(`holding a ${eq[0].displayName}`)
      if (eq[1]) eqText.push(`wearing a ${eq[1].displayName} on your feet`)
      if (eq[2]) eqText.push(`wearing a ${eq[2].displayName} on your legs`)
      if (eq[3]) eqText.push(`wearing a ${eq[3].displayName} on your torso`)
      if (eq[4]) eqText.push(`wearing a ${eq[4].displayName} on your head`)
      if (eqText.length) {
        bot.chat(`You are ${eqText.join(', ')}.`)
      } else {
        bot.chat('You are naked!')
      }
    }
  
    function saySpawnPoint () {
      bot.chat(`Spawn is at ${bot.spawnPoint}`)
    }
  
    function sayBlockUnder () {
      const block = bot.blockAt(bot.players[username].entity.position.offset(0, -1, 0))
      bot.chat(`Block under you is ${block.displayName} in the ${block.biome.name} biome`)
      console.log(block)
    }
  
    function quit (username) {
      bot.quit(`${username} told me to`)
    }
  
    function sayNick () {
      bot.chat(`My name is ${bot.player.displayName}`)
    }
  })


bot.on('playerLeft', (player) => {
    if (player.username === bot.username) return
    setTimeout(function() {
    console.log(`/pardon ${player.username}`)
    bot.chat(`/pardon ${player.username}`)
    }, 10000);
  })

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

initBot();



















