import {Command} from '../../utils/type/Command';
import {MessageEmbed} from 'discord.js';
import moment from 'moment';

const cmd : Command = {
    name: '업타임',
    aliases: ['uptime'],
    async run(client, msg) {
        const totalSeconds = process.uptime();
        const realTotalSecs = Math.floor(totalSeconds % 60);
        const days = Math.floor((totalSeconds % (31536 * 100)) / 86400);
        const hours = Math.floor((totalSeconds / 3600) % 24);
        const mins = Math.floor((totalSeconds / 60) % 60);
        const embed = new MessageEmbed()
        embed.setTitle(`⏰ | 업타임: ${days}일 ${hours}시간 ${mins}분 ${realTotalSecs}초`)
        embed.setColor('GREEN')
        return msg.channel.send(embed)
    }
}

export default cmd