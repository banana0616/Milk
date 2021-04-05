import {Command} from '../../utils/type/Command';
import {MessageEmbed} from 'discord.js';
import moment from 'moment';

const cmd : Command = {
    name: '서버정보',
    aliases: ['serverinfo'],
    async run(client, msg) {
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            // @ts-ignore
            .setThumbnail(msg.guild?.iconURL({ dynamic: true }))
            .setTitle(`${msg.guild?.name} 의 서버정보`)
            .addField('서버 소유자', `\`${msg.guild?.owner?.user.tag}\``)
            .addField('서버 ID', `\`${msg.guild?.id}\``)
            .addField('유저 수', `\`전체 : ${msg.guild?.memberCount}\n유저 : ${msg.guild?.members.cache.filter(m => !m.user.bot).size}\n봇: ${msg.guild?.members.cache.filter(m => m.user.bot).size}\``)
            .addField('서버 지역', `\`${msg.guild?.region}\``)
            .addField('서버 생일', `\`${moment(msg.guild?.createdAt).format("YYYY년 MM월 DD일 A hh시 mm분 ss초 (Z)")}\``)
            .setTimestamp(new Date())
            .setFooter(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 512 }))
        await msg.channel.send(embed)
        if(msg.guild?.splash) {
            const splashs = new MessageEmbed()
                // @ts-ignore
                .setImage(msg.guild.splashURL({ size: 4096 }))
                .setTitle(msg.guild.name + ' 의 초대 배경')
                .setColor('RANDOM')
            await msg.channel.send(splashs)
        }
        if(msg.guild?.banner) {
            const banner = new MessageEmbed()
                // @ts-ignore
                .setImage(msg.guild.bannerURL({ size: 4096 }))
                .setTitle(msg.guild.name + ' 의 배너')
                .setColor('RANDOM')
            await msg.channel.send(banner)
        }
        return
    }
}

export default cmd