import {Command} from '../../utils/type/Command';
import {MessageEmbed} from 'discord.js';

const cmd : Command = {
    name: '프로필',
    aliases: ['avatar'],
    async run(client, msg) {
        const embed = new MessageEmbed()
        let user = msg.mentions.users.first()
        
        if (user) {
            embed.setTitle(`${user.tag} 님의 프로필`)
            embed.setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
            embed.setTimestamp(new Date())
            embed.setFooter(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 512 }))
            embed.setColor('RANDOM')
        }
        if (!user) {
            embed.setTitle(`${msg.author.tag} 님의 프로필`)
            embed.setImage(msg.author.displayAvatarURL({ dynamic: true, size: 2048 }))
            embed.setTimestamp(new Date())
            embed.setFooter(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 512 }))
            embed.setColor('RANDOM')
        }
        return msg.channel.send(embed)
    }
}

export default cmd