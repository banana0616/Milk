import {Command} from '../../utils/type/Command';
import {MessageEmbed} from 'discord.js';

const cmd : Command = {
    name: '리로드',
    owner: true,
    aliases: ['reload', 'rl', 'ㄹㄹㄷ'],
    async run(client, msg) {
        client.reloadCommands()
        const categories = Array.from(new Set(client.commands.map(r => r.category)))
        const embed = new MessageEmbed()
            .setTitle('Reload')
            .setTimestamp(new Date())
            .setFooter(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor('RED')
            categories.filter(r => r).forEach(category => {
                embed.addField(category, '✅ | `' + client.commands.filter(r => r.category === category).map(r => r.name).join('`, `') + '`')
            })
        return msg.channel.send(embed)
    }
}

export default cmd