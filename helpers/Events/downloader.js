/*!-======[ Module Imports ]======-!*/
const axios = "axios".import()

/*!-======[ Function Imports ]======-!*/
const { mediafireDl } = await (fol[0] + 'mediafire.js').r()

/*!-======[ Configurations ]======-!*/
let infos = cfg.menu.infos

/*!-======[ Default Export Function ]======-!*/
export default async function on({ cht, Exp, store, ev, is }) {
    let { sender, id } = cht
    
    ev.on({ 
      cmd: ['pinterestdl', 'pindl'], 
      listmenu: ['pinterestdl'], 
      tag: 'downloader',
      urls: {
        msg: "Harap berikan link!",
        formats: ["pinterest","pin"]
      },
      energy: 5
    }, async ({ urls }) => {
        await cht.reply('```Processing...```')
        let p = (await fetch(api.xterm.url + "/api/downloader/pinterest?url=" + urls[0]).then(a => a.json())).data
        let pin = Object.values(p.videos)[0].url
        Exp.sendMessage(id, { video: { url: pin }, mimetype: "video/mp4" }, { quoted: cht })
    })
    
    ev.on({ 
      cmd: ['mediafire', 'mediafiredl'], 
      listmenu: ['mediafire'], 
      tag: 'downloader',
      args: "Mana linknya?",
      urls: {
        msg: "Harap berikan link!",
        formats: ["mediafire"]
      },
      energy: 8 
    }, async ({ urls }) => {
        const _key = keys[sender]
        
        await cht.edit('```Processing...```', _key)
        try {
            let m = await mediafireDl(urls[0])
            await cht.edit("Checking media type...", _key)
            let { headers } = await axios.get(m.link)
            let type = headers["content-type"]
            await cht.edit("Sending...", _key )
            await Exp.sendMessage(id, { document: { url: m.link }, mimetype: type, fileName: m.title }, { quoted: cht })
            await cht.edit("Success", _key )
        } catch (e) {
            await cht.edit("TypeErr: " + e, _key )
        }
    })

    ev.on({ 
      cmd: ['tiktok', 'tiktokdl', 'tt'], 
      listmenu: ['tiktok', 'ttdl'], 
      tag: 'downloader',
      args: "Mana linknya?",
      urls: {
        msg: "Harap berikan link!",
        formats: ["tiktok"]
      },
      energy: 4 
    }, async ({ urls }) => {
        const _key = keys[sender]
        await cht.edit("Bntr..", _key)
        let data = (await fetch(api.xterm.url + "/api/downloader/tiktok?url=" +urls[0]).then(a => a.json())).data
        await cht.edit("Lagi dikirim...", _key)
        let type = data.type
        if (type == 'image') {
            for (let image of data.media) {
                await Exp.sendMessage(id, { image: { url: image.url } }, { quoted: cht })
            }
        } else if (type == 'video') {
            await Exp.sendMessage(id, { video: { url: data.media[1].url } }, { quoted: cht })
        }
        await cht.edit("Dah tuh", _key)
    })

    ev.on({ 
      cmd: ['ytmp3', 'ytm4a', 'play', 'ytmp4'],
      listmenu: ['ytmp3', 'ytm4a', 'play', 'ytmp4'],
      tag: 'downloader',
      args: "Harap sertakan url/judul videonya!",
      energy: 4 
    }, async ({ args, urls }) => {
        const _key = keys[sender]
        let q = urls || args || null
        if (!q) return cht.reply('Harap sertakan url/judul videonya!')
        try {
            await cht.edit("Searching...", _key)
            let search = (await fetch(api.xterm.url + "/api/search/youtube?query=" + q).then(a => a.json())).data
            await cht.edit("Downloading...", _key)
            let item = search.items[0]
            let data = (await fetch(api.xterm.url + "/api/downloader/youtube?url=https://www.youtube.com/watch?v=" + item.id  + "&type=" + (cht.cmd === "ytmp4" ? "mp4" : "mp3")).then(a => a.json())).data
            
            let audio = {
                [cht.cmd === "ytmp4" ? "video" : "audio"]: { url: data.dlink },
                mimetype: cht.cmd === "ytmp4" ? "video/mp4" : "audio/mpeg",
                fileName: item.title + (cht.cmd === "ytmp4" ? ".mp4" : ".mp3"),
                ptt: cht.cmd === "play",
                contextInfo: {
                    externalAdReply: {
                        title: "Title: " + item.title,
                        body: "Channel: " + item.creator,
                        thumbnailUrl: item.thumbnail,
                        sourceUrl: item.url,
                        mediaUrl: "http://ẉa.me/6283110928302?text=Idmsg: " + Math.floor(Math.random() * 100000000000000000),
                        renderLargerThumbnail: false,
                        showAdAttribution: true,
                        mediaType: 2,
                    },
                },
            }
            await cht.edit("Sending...", _key)
            await Exp.sendMessage(id, audio, { quoted: cht })
        } catch (e) {
            console.log(e)
            cht.reply("Tidak ditemukan!")
        }
    })
    
    ev.on({ 
      cmd: ['facebookdl','fb','fbdl','facebook'], 
      listmenu: ['facebookdl'], 
      tag: 'downloader',
      args: "Mana linknya?",
      urls: {
        msg: "Harap berikan link!",
        formats: ["facebook","fb"]
      },
      energy: 5
    }, async ({ urls }) => {
        const _key = keys[sender]
        await cht.edit('```Processing...```', _key)
        let f = (await fetch(api.xterm.url + "/api/downloader/facebook?url=" + urls[0]).then(a => a.json())).data
        await cht.edit("Sending...", _key)
        Exp.sendMessage(id, { video: { url: f.urls.sd }, mimetype: "video/mp4", caption: f.title }, { quoted: cht })
    })
    
    ev.on({ 
      cmd: ['instagramdl','ig','igdl','instagram'], 
      listmenu: ['instaramdl'], 
      tag: 'downloader',
      args: "Mana linknya?",
      urls: {
        msg: "Harap berikan link!",
        formats: ["instagram"]
      },
      energy: 5
    }, async ({ urls }) => {
        const _key = keys[sender]
        await cht.edit('```Processing...```', _key)
        let f = (await fetch(api.xterm.url + "/api/downloader/instagram?url=" + urls[0]).then(a => a.json())).data
        let text = "*!-======[ Instagram ]======-!*\n"
            text += `\nTitle: ${f.title}`
            text += `\nAccount: ${f.accountName}`
            text += `\nLikes: ${f.likes}`
            text += `\nComments: ${f.comments}`
            text += `\nPostTime: ${f.postingTime}`
            text += `\nPostUrl: ${f.postUrl}`
        const info = {
            text,
            contextInfo: { 
                externalAdReply: {
                    title: cht.pushName,
                    body: "Instagram Downloader",
                    thumbnailUrl: f.imageUrl,
                    sourceUrl: "https://github.com/Rifza123",
                    mediaUrl: "http://ẉa.me/6283110928302/"+Math.floor(Math.random() * 100000000000000000),
                    renderLargerThumbnail: true,
                    showAdAttribution: true,
                    mediaType: 1,
                },
                forwardingScore: 19,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: "Termai",
                    newsletterJid: "120363301254798220@newsletter",
                }
            }
        }
        await Exp.sendMessage(id, info, { quoted: cht })
        let { content } = f
        for(let i of content){
            await Exp.sendMessage(id, { [i.type]: { url: i.url } }, { quoted: cht })
        }
    })
}