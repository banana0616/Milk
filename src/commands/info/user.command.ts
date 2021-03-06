import {Command} from '../../utils/type/Command';
import {MessageEmbed} from 'discord.js';
import moment from 'moment-timezone';

const s = {
    "online": "์จ๋ผ์ธ [๐ข]",
    "dnd": "๋ค๋ฅธ ์ฉ๋ฌด ์ค [โ]",
    "idle": "์๋ฆฌ ๋น์ [๐]",
    "offline": "์คํ๋ผ์ธ [๐]"
}

const s2 = {
    "mobile": "`๋ชจ๋ฐ์ผ` <:mobile:817673574658998332>",
    "web": "`์น` ๐",
    "desktop": "`์ปดํจํฐ` ๐ฅ๏ธ"
}

const cmd : Command = {
    name: '์ ์ ์ ๋ณด',
    aliases: ['userinfo'],
    async run(client, msg) {
        const embed = new MessageEmbed()
        let user = msg.mentions.users.first()
        if (!user) {
            embed.setTitle(`${msg.author.tag} ๋์ ์ ๋ณด`)
            embed.setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
            embed.addField('ID', `\`${msg.author.id}\``)
            embed.addField('ํ๊ทธ', `\`${msg.author.tag}\``)
            // @ts-ignore
            embed.addField('์ํ', `\`${s[msg.author.presence.status]}\``)
            if(msg.author.presence.status === 'offline') {
                embed.addField('์ ์ ํด๋ผ์ด์ธํธ', `\`์์\``)
            } else {
                // @ts-ignore
                embed.addField('์ ์ ํด๋ผ์ด์ธํธ', `${Object.keys(msg.author?.presence.clientStatus).map(e => s2[e]).join(", ")}`)
            }
            embed.addField('๊ณ์  ์์ฑ์ผ', `\`${moment(msg.author.createdAt).format("YYYY๋ MM์ DD์ผ A hh์ mm๋ถ ss์ด (Z)")}\``)
            embed.setTimestamp(new Date())
            embed.setFooter(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 512 }))
        } 
        if (user) {
            embed.setTitle(`${user.tag} ๋์ ์ ๋ณด`)
            embed.setThumbnail(user.displayAvatarURL({ dynamic: true }))
            embed.addField('ID', `\`${user.id}\``)
            embed.addField('ํ๊ทธ', `\`${user.tag}\``)
            // @ts-ignore
            embed.addField('์ํ', `\`${s[user.presence.status]}\``)
            // @ts-ignore
            if(user.presence.status === 'offline') {
                embed.addField('์ ์ ํด๋ผ์ด์ธํธ', `\`์์\``)
            } else {
                // @ts-ignore
                embed.addField('์ ์ ํด๋ผ์ด์ธํธ', `${Object.keys(user?.presence.clientStatus).map(e => s2[e]).join(", ")}`)
            }
            embed.addField('๊ณ์  ์์ฑ์ผ', `\`${moment(user.createdAt).format("YYYY/MM/DD A hh : mm : ss (Z)")}\``)
            embed.setTimestamp(new Date())
            embed.setFooter(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 512 }))
        }
        return msg.channel.send(embed)
    }
}

export default cmd