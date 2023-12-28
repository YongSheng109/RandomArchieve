const ms = require('ms');
const readline = require('readline');
const mineflayerPathfinder = require('mineflayer-pathfinder').pathfinder;
const mineflayer = require('mineflayer');
const { Movements, goals: { GoalNear } } = require('mineflayer-pathfinder');
const config = require('./config.json');
const username = "YongSheng"


const bots = [];

// Function to create and configure a bot
function createBot(index) {
  const bot = mineflayer.createBot({
    host: config.ip,
    port: config.port,
    username: `${username}_${index}`,
    version: config.version
  });

  bot.loadPlugin(mineflayerPathfinder);

  // Function to login and set the goal
  async function login() {
    await new Promise((resolve) => {
      setTimeout(() => {
        bot.chat('/reg YongShengBot YongShengBot');
        resolve();
      }, 1500);
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        bot.chat('/login YongShengBot');
        resolve();
      }, 1500);
    });

    const p = { x: -19, y: 78, z: 0 };
    const defaultMove = new Movements(bot);

    bot.pathfinder.setMovements(defaultMove);
    bot.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, 1));
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false, // Set terminal to false to disable line editing features
  });

  rl.on('line', (input) => {
    const random = Math.floor(Math.random() * 100);
    // Send the input message to Minecraft chat for all bots
    bot.chat(input+` | ${random}`);
  });

  const maxRepeats = 200; // Maximum number of repeats

  function executeKillActions() {
    let killCount = 0;

    const random = Math.floor(Math.random() * 1000)
  
    const killInterval = setInterval(() => {
      if (killCount < maxRepeats) {
        setTimeout(() => {
          bot.chat(`/kill ${random}`);
        }, ms('0.5s'));
  
        killCount++;
      } else {
        clearInterval(killInterval);
      }
    }, ms('0.5s'));
  }

  function fix(){
    bot.entityRange = 200;
    const entity = bot.nearestEntity();
      rightClickEntity(entity);
  }

  function executeSpam() {
    let killCount = 0;

    const random = Math.floor(Math.random() * 1000)
  
    const killInterval = setInterval(() => {
      if (killCount < maxRepeats) {
        setTimeout(() => {
          bot.chat(`> https://www.youtube.com/@yongshengowo8325`);
        }, ms('2s'));
  
        killCount++;
      } else {
        clearInterval(killInterval);
      }
    }, ms('2s'));
  }

  function executeSpams() {
    let killCount = 0;

    const random = Math.floor(Math.random() * 1000)
  
    const killInterval = setInterval(() => {
      if (killCount < maxRepeats) {
        setTimeout(() => {
          bot.chat(`Yong on Crack! | ${random}`);
        }, ms('2s'));
  
        killCount++;
      } else {
        clearInterval(killInterval);
      }
    }, ms('2s'));
  }
  // Function to perform right-click action on an entity
  function rightClickEntity(entity) {
    bot.lookAt(entity.position.offset(0, entity.height, 0));
      bot.activateEntity(entity);
  }

  // Event listeners
  bot.once('spawn', async () => {
    await login();
  });

  
  bot.on('message', message => {
    console.log(message.toString())
    // Check if the message contains "$unicode"
    if (message.toString().includes('$unicode')) {
      // Generate 20 random Unicode characters within the BMP range
      let randomUnicodeLine = '';
      for (let i = 0; i < 120; i++) {
        const randomUnicode = String.fromCodePoint(
          Math.floor(Math.random() * (0xFFFF - 0x20)) + 0x20
        );
        randomUnicodeLine += randomUnicode;
      }
          bot.chat(randomUnicodeLine);
    }
  
    if (message.toString().includes('$kill')) {
      // Execute actions: repeat /pvpkit default and /kill
      executeKillActions();
    }

    if (message.toString().includes('$fix')) {
      // Execute actions: repeat /pvpkit default and /kill
      fix();
    }

    if (message.toString().includes('$spam')) {
      // Execute actions: repeat /pvpkit default and /kill
      executeSpam();
    }

    if (message.toString().includes('$L')) {
      // Execute actions: repeat /pvpkit default and /kill
      executeSpams();
    }})

  bot.once('goal_reached', () => {
    bot.entityRange = 200;
    const entity = bot.nearestEntity();
    if (entity) {
      rightClickEntity(entity);
    }
    if (entity) {
      rightClickEntity(entity);
    }
    if (entity) {
      rightClickEntity(entity);
    }
  });
}

// Function to create all 3 bots sequentially with a delay
async function createAllBots() {
  for (let i = 1; i <= 5; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        createBot(i);
        resolve();
      }, i * 3000); // 5-second delay before creating the next bot
    });
  }
}

createAllBots();