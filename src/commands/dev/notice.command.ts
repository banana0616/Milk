import {Command} from '../../utils/type/Command';
import {MessageEmbed} from 'discord.js';
import { Message } from 'discord.js';

const cmd : Command = {
    name: '공지',
    owner: true,
    aliases: ['notice', 'announce'],
    async run(client, msg) {
        if (!msg.args.length) return msg.react('❎')
        const notice = msg.args.join(' ')
        const embed = new MessageEmbed().setColor('RANDOM').setFooter(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 512 })).setDescription(notice).setTitle('📢ㅣ봇 공지')
        embed.setTimestamp(new Date())
        const guilds = (await msg.client.shard!.broadcastEval('this.guilds.cache.map(r => r.id)')).reduce((previousValue, currentValue) => [...previousValue, ...currentValue])
        for (const guild of guilds) {
            try {
                await msg.client.shard!.broadcastEval(`const djs = require('discord.js')
                    const channels = this.guilds.cache.get('${guild}')?.channels.cache.filter(r => r.permissionsFor(r.guild.me).has(['SEND_MESSAGES']) && r.topic === '#공지').map(r => r)
                    if (channels) { const chn = channels.find(r => r.topic?.includes('#공지')) || channels[0]; chn?.send(new djs.MessageEmbed(${JSON.stringify(embed.toJSON())})) }`)
            } catch (e) {
                console.log(e)
            }
        }
        await msg.react('✅')
    }
}

export default cmd