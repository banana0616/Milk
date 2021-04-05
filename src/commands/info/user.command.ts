import {Command} from '../../utils/type/Command';
import {MessageEmbed} from 'discord.js';
import moment from 'moment-timezone';

const s = {
    "online": "온라인 [🟢]",
    "dnd": "다른 용무 중 [⛔]",
    "idle": "자리 비움 [🌙]",
    "offline": "오프라인 [🔘]"
}

const s2 = {
    "mobile": "`모바일` <:mobile:817673574658998332>",
    "web": "`웹` 🌏",
    "desktop": "`컴퓨터` 🖥️"
}

const cmd : Command = {
    name: '유저정보',
    aliases: ['userinfo'],
    async run(client, msg) {
        const embed = new MessageEmbed()
        let user = msg.mentions.users.first()
        if (!user) {
            embed.setTitle(`${msg.author.tag} 님의 정보`)
            embed.setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
            embed.addField('ID', `\`${msg.author.id}\``)
            embed.addField('태그', `\`${msg.author.tag}\``)
            // @ts-ignore
            embed.addField('상태', `\`${s[msg.author.presence.status]}\``)
            if(msg.author.presence.status === 'offline') {
                embed.addField('접속 클라이언트', `\`없음\``)
            } else {
                // @ts-ignore
                embed.addField('접속 클라이언트', `${Object.keys(msg.author?.presence.clientStatus).map(e => s2[e]).join(", ")}`)
            }
            embed.addField('계정 생성일', `\`${moment(msg.author.createdAt).format("YYYY년 MM월 DD일 A hh시 mm분 ss초 (Z)")}\``)
            embed.setTimestamp(new Date())
            embed.setFooter(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 512 }))
        } 
        if (user) {
            embed.setTitle(`${user.tag} 님의 정보`)
            embed.setThumbnail(user.displayAvatarURL({ dynamic: true }))
            embed.addField('ID', `\`${user.id}\``)
            embed.addField('태그', `\`${user.tag}\``)
            // @ts-ignore
            embed.addField('상태', `\`${s[user.presence.status]}\``)
            // @ts-ignore
            if(user.presence.status === 'offline') {
                embed.addField('접속 클라이언트', `\`없음\``)
            } else {
                // @ts-ignore
                embed.addField('접속 클라이언트', `${Object.keys(user?.presence.clientStatus).map(e => s2[e]).join(", ")}`)
            }
            embed.addField('계정 생성일', `\`${moment(user.createdAt).format("YYYY/MM/DD A hh : mm : ss (Z)")}\``)
            embed.setTimestamp(new Date())
            embed.setFooter(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 512 }))
        }
        return msg.channel.send(embed)
    }
}

export default cmd