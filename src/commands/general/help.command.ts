import {Command} from '../../utils/type/Command';
import {MessageEmbed} from 'discord.js';

const cmd : Command = {
    name: '도움말',
    aliases: ['help', 'commands'],
    async run(client, msg) {
        const embed = new MessageEmbed()
        embed.setTitle('도움말')
        const categories = Array.from(new Set(client.commands.map(r => r.category)))
        categories.filter(r => r !== 'dev').forEach(category => {
            embed.addField(category, '`' + client.commands.filter(r => r.category === category).map(r => r.name).join('` `') + '`')
        })
        embed.setTimestamp(new Date())
        embed.setFooter(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 512 }))
        embed.setColor('BLUE')
        return msg.channel.send(embed)
    }
}

export default cmd