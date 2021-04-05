import {Command} from '../../utils/type/Command';
import {MessageEmbed} from 'discord.js';
import moment from 'moment';

const cmd : Command = {
    name: '재생',
    aliases: ['play'],
    async run(client, msg) {
        const query = msg.args.join(' ')
        if (!msg.member?.voice.channelID) return msg.react('❎')
        const player = client.music.players.get(msg.guild!.id) ?? client.music.create({
            selfDeafen: true,
            guild: msg.guild!.id,
            textChannel: msg.channel.id,
            voiceChannel: msg.member.voice.channelID,
        })
        if (player.voiceChannel !== msg.member.voice.channelID) return msg.react('❎')
        if (!query) return msg.react('❎')
        const res = await client.music.search(query, msg.author)
        if (res.loadType === 'NO_MATCHES') {
            return msg.react('❎')
        } else if (res.loadType === 'LOAD_FAILED') {
            return msg.react('❎')
        } else if (res.loadType === 'PLAYLIST_LOADED') {
            player.queue.add(res.tracks[0])
            player.connect()
            if (!player.playing) player.play()
            return msg.reply(`**${res.tracks[0]}** 곡을 대기열에 추가했어요!`)
        } else if (res.loadType === 'SEARCH_RESULT') {
            player.queue.add(res.tracks[0])
            await msg.reply(`곡 \`${res.tracks[0].title}\`을(를) 재생합니다!`)
            player.connect()
            if (!player.playing) player.play()
        }
    }
}

export default cmd