import {Command} from '../../utils/type/Command';
import {MessageEmbed} from 'discord.js';
import moment from 'moment';
import os from 'os';

const totalSeconds = process.uptime();
const realTotalSecs = Math.floor(totalSeconds % 60);
const days = Math.floor((totalSeconds % (31536 * 100)) / 86400);
const hours = Math.floor((totalSeconds / 3600) % 24);
const mins = Math.floor((totalSeconds / 60) % 60);

var cpu = (os.cpus()[0].model);

const cmd : Command = {
    name: '봇정보',
    aliases: ['botinfo', 'hellothisisverification'],
    async run(client, msg) {
        const embed = new MessageEmbed()
            .setTitle(`${client.user?.tag} 봇 정보`)
            .addField('개발자', `\`${client.users.cache.get('432160630682681347')?.tag}\`, \`${client.users.cache.get('441202161481809922')?.tag}\`, \`${client.users.cache.get('822744996632461323')?.tag}\`, \`${client.users.cache.get('774976370290851870')?.tag}\``)
            // @ts-ignore
            .setThumbnail(client.user?.displayAvatarURL({ dynamic:true }))
            .addField('봇 ID', `\`${client.user?.id}\``)
            .addField('봇 생일', `\`${moment(client.user?.createdAt).format("YYYY년 MM월 DD일 A hh시 mm분 ss초 (Z)")}\``)
            .addField('사용수', `\`유저수: ${client.users.cache.size}\n서버수: ${client.guilds.cache.size}\``)
            .addField('샤드', `\`${client.shard?.ids} / ${client.shard?.count}\``)
            .addField('업타임', `\`${days}일 ${hours}시간 ${mins}분 ${realTotalSecs}초\``)
            .addField('cpu', `\`${cpu}\``)
            .addField('os', `\`ubuntu server 20.04 64bit\``)
            .addField('초대링크', `[\`관리자 권한으로 초대하기\`](https://discord.com/api/oauth2/authorize?client_id=${client.user?.id}&permissions=8&scope=bot)\n[\`추천 권한으로 초대하기\`](https://discord.com/api/oauth2/authorize?client_id=${client.user?.id}&permissions=3224696839&scope=bot)\n[\`Milk Support\`](https://discord.gg/NGKMhBeMzz)`)
            .setTimestamp(new Date())
            .setFooter(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor('RANDOM')
        return msg.channel.send(embed)
    }
}

export default cmd