const GenResponse = require('../../../general/models/genresponse');
const Error = require('../../../general/models/error');
const Music = require('../../../general/models/music');
const User = require('../../../general/models/user');
const MusicForcedChange = require('../../../general/models/music_forced_change');
const http = require('https');
const jwt = require('jsonwebtoken');
const Fs = require('fs-extra');
var mp3Duration = require('mp3-duration');

module.exports = {

    filteredMusics: async (req, res, next) => {
        const { durationFrom, durationTo } = req.query;
        var musics = await Music.find({ duration: { $gte: durationFrom }, duration: { $lte: durationTo } });
        res.send(new GenResponse(null, musics))
    },


    userInfo: async (req, res, next) => {
        const { uniqueKey, versionCode } = req.query;

        var user = await User.findOne({ uniqueKey });
        if (user)
            await User.findOneAndUpdate({ uniqueKey }, { versionCode, dateUpdated: Date.now() });
        else {
            await new User({
                uniqueKey,
                versionCode,
                dateWritten: Date.now()
            }).save();

        }
        res.send(new GenResponse(null, 'ok'))
    },

    nextMusicForced: async (req, res, next) => {
        const { uniqueKey, id } = req.query;
        await MusicForcedChange.create({ user: await User.findOne({ uniqueKey }), music: id });
        res.send(new GenResponse(null, 'ok'))
    },


    nextMusic: async (req, res, next) => {
        // const { skip } = req.params;
        var { langFilter } = req.query;
        var query = {};
        var skip;

        if (langFilter) {
            langFilter = langFilter.replace('[', '').replace(']', '')
            console.log(langFilter);
            if (langFilter) {
                query = { $or: [] };
                var langs = langFilter.split(",");
                for (var i = 0; i < langs.length; i++) {
                    query.$or.push({ lang: langs[i].trim() })
                }
            }
        }
        query['status'] = 1
        var count = await Music.count(query);
        var musicList = [];

        skip = Math.random() * count;
        var music = await Music.findOne(query).skip(parseInt(skip));
        musicList.push(music);

        skip = Math.random() * count;
        music = await Music.findOne(query).skip(parseInt(skip));
        musicList.push(music);

        skip = Math.random() * count;
        music = await Music.findOne(query).skip(parseInt(skip));
        musicList.push(music);

        skip = Math.random() * count;
        music = await Music.findOne(query).skip(parseInt(skip));
        musicList.push(music);

        res.send(new GenResponse(null, musicList))
    },

    insertMusicsToDb: async (req, res, next) => {
        var filesInfo = Fs.readJSONSync("C:\\Users\\rgara\\Projects\\PopuriApp\\Final\\ClearedMusic3\\clearmusiclist.json");

        for (let mf of filesInfo) {
            console.log("SAVING: " + mf.fileName)
            await mp3Duration("C:\\Users\\rgara\\Projects\\PopuriApp\\Final\\ClearedMusic3\\" + mf.fileName, async function (err, duration) {
                if (err) return console.log("MP#: " + err.message);
                if (!await Music.findOne({ name: mf.fileName.split(".")[0] })) {
                    await new Music({
                        duration: duration * 1000,
                        lang: 'az',
                        name: mf.fileName.split(".")[0],
                        format: mf.fileName.split(".")[1],
                        dateWritten: Date.now(),

                        song: { author: mf.author.trim(), name: mf.musicName.trim() }
                    }).save();
                    console.log("SAVED: " + mf.fileName)
                }
                else
                    console.log("ALTEADY HAVE: " + mf.fileName)
            });
        }
    }


};