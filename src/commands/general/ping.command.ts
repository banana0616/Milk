import {Command} from '../../utils/type/Command';
import {MessageEmbed} from 'discord.js';

const cmd : Command = {
    name: '핑',
    aliases: ['ping'],
    async run(client, msg) {
        const embed = new MessageEmbed()
        embed.setTitle(`🏓 | 풍! Discord Api: ${client.ws.ping}`)
        embed.setColor('YELLOW')
        return msg.channel.send(embed)
    }
}

export default cmd