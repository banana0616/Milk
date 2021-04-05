import config from './config';
import path from 'path';
import {ShardingManager} from 'discord.js';

const manager = new ShardingManager(path.join(__dirname, 'bot.ts'), config.bot.shards)

manager.on('shardCreate', shard => console.log(`Create Shard #${shard.id}`))

manager.spawn()