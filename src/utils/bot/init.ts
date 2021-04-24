import {Client, MessageEmbed, Message, Collection, Guild, User} from 'discord.js';
import fs from 'fs';
import path from 'path';
import config from '../../config';
import {Command} from '../type/Command';
import Dokdo from 'dokdo';
import { Manager } from 'erela.js';

declare module 'discord.js' {
    interface Client {
        music: Manager
        controllerMap: Collection<string, Message>
    }
}

const { KoreanbotsClient } = require("koreanbots")
const koreanbots = new KoreanbotsClient({
    koreanbotsToken: config.bot.koreantoken,
    koreanbotsOptions: {
        interval: 600000
    }
})

export default class MilkClient extends Client {
    constructor() {
        super()
        this.commands = new Collection()
        this.aliases = new Collection()
        const activity = () => this.user?.setActivity(`${this.guilds.cache.size} 개의 서버를 보는중 | "우유야 도움말"`, {type: "WATCHING"})
        this.on('ready', () => {
            if(!this.shard) {
                console.log('shard only!')
                return process.exit(0)
            }
        })
        this.on('ready', () => {
            setInterval(activity, 1000)
        })
        this.on('warn', (e) => console.warn(e))
        this.on('error', (e) => console.error(e.message))
        this.on('message', (msg) => {
            if(msg.author.bot || msg.system) return
            if(!msg.content.startsWith(config.bot.prefix)) return
            const args = msg.content.slice(config.bot.prefix.length).split(/ +/g),
                command = args.shift()!,
                cmd = this.commands.get(command) || this.commands.get(this.aliases.get(command)!)
            if(!cmd) return
            msg.args = args
            if (!msg.member!.hasPermission(cmd.perms)) return msg.react('❎')
            if (!config.bot.owners.includes(msg.author.id) && cmd.owner) return msg.react('❎')
            cmd.run(this, msg)
        })
        this.music = new Manager({
            send: (id, payload) => {
                const guild = this.guilds.cache.get(id)
                if (guild) guild.shard.send(payload)
            },
            nodes: [
                {
                    "host": "localhost",
                    "port": 2333,
                    "password": ""
                }
            ]
        })
        this.music.on('nodeConnect', (node) => console.log(`Node ${node.options.host}:${node.options.port} connected.`))
        this.music.on('nodeError', (node, error) => console.log(`Node ${node.options.host}:${node.options.port} encounted an error: ${error.message}`))
        this.music.on('queueEnd', (player) => player.destroy())
        this.music.on('trackStart', (player, track) => {
            // @ts-ignore
            this.channels.cache.get(player.textChannel).send(`현재 재생중 : ${track.title}`)
        })
        this.on('ready', () => this.music.init(this.user!.id))
        this.on('raw', (payload) => this.music.updateVoiceState(payload))
    }
    async reloadCommands() {
        this.commands.clear()
        this.aliases.clear()
        Object.keys(require.cache).filter(r => !r.includes('node_modules')).forEach(r => delete require.cache[r])
        fs.readdirSync(path.join(__dirname, '../../commands')).forEach(dir => {
            const filter = fs.readdirSync(path.join(__dirname, '../../commands', dir)).filter(r => r.endsWith('.command.ts') || r.endsWith('.command.js'))
            filter.forEach(f => {
                const cmd: Command = require(path.join(__dirname, '../../commands', dir, f)).default
                if (!cmd.perms) cmd.perms = []
                if (!cmd.owner) cmd.owner = false
                this.commands.set(cmd.name, {
                    name: cmd.name,
                    aliases: cmd.aliases,
                    category: dir,
                    owner: cmd.owner,
                    perms: cmd.perms,
                    run: cmd.run
                })
                console.log(`Load Command: ${cmd.name}`)
                cmd.aliases.forEach(alias => this.aliases.set(alias, cmd.name))
            })
        })
    }
    async login() {
        await super.login(config.bot.token)
        this.reloadCommands()
        const dokdo = new Dokdo(this, {
            noPerm(msg) {
                msg.react('❎')
            },
            owners: config.bot.owners,
            prefix: config.bot.prefix
        })
        this.on('message', dokdo.run.bind(dokdo))
        // @ts-ignore
        this.on('ready', () => this.channels.cache.get('818103753634611210').send(`\`${new Date()} 에 봇이 켜졌습니다.\``))
        koreanbots.login(config.bot.token)
        return config.bot.token
    }
    
}
