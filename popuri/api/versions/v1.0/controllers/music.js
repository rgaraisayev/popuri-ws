const GenResponse = require('../../../general/models/genresponse');
const Error = require('../../../general/models/error');
const Music = require('../../../general/models/music');
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


    downloadMusic: async (req, res, next) => {
        var resource = Fs.readFileSync('api/siteInterfaces/' + name + "/" + name + ".html");
        // console.log(resource)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(resource, 'binary');
    },

    dolmafm: async (req, res, next) => {
        const { mus } = req.query;
        var dir = process.env.PROJECT_DIR;
        if (!dir)
            dir = 'C:/Users/rgara/Projects/InstaMusic/mustagram-nodews'
        var resource = Fs.readFileSync(dir + "/apps/mustagram/res/dolmafm/" + mus);
        // // console.log(resource)
        res.writeHead(200, { 'Content-Type': '*/*' });
        res.end(resource, 'binary');
    },
    randomMusic: async (req, res, next) => {
        const { millis, skip } = req.params;
        var { langFilter } = req.query;
        console.log(langFilter);
        var query = {};

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
        query['duration'] = { '$gte': parseInt(millis), '$lte': parseInt(millis) + 5000 }
        query['status'] = 'active'
        console.log(query);
        var music = await Music.findOne(query).skip(parseInt(skip));

        if (music) {
            console.log(music);
            // res.send(count + "<br\>" + random + "<br\>" + music)
            var dir = process.env.PROJECT_DIR;
            if (!dir)
                dir = 'C:/Users/rgara/Projects/InstaMusic/mustagram-nodews'
            var resource = Fs.readFileSync(dir + "/apps/mustagram/res/music/" + music.name + "." + music.format);
            // // console.log(resource)
            res.writeHead(200, { 'Content-Type': '*/*' });
            res.end(resource, 'binary');
        } else res.status(400).send(null)
    },

    nextMusic: async (req, res, next) => {
        const { skip } = req.params;
        var { langFilter } = req.query;
        var query = {};

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
        console.log(query);
        var music = await Music.findOne(query).skip(parseInt(skip));
        if (music) {
            var dir = process.env.MC_DIR;
            if (!dir)
                dir = ''
            var resource = Fs.readFileSync(dir + "/" + music.name + "." + music.format);
            res.writeHead(200, { 'Content-Type': '*/*' });
            res.end(resource, 'binary');
        } else res.status(400).send(null)
    },

    streamMusic: async (req, res, next) => {
        const { name } = req.params;

        var music = await Music.findOne({ name });
        if (music) {
            var dir = process.env.MC_DIR;
            if (!dir)
                dir = ''
            var resource = Fs.readFileSync(dir + "/" + music.name + "." + music.format);
            res.writeHead(200, { 'Content-Type': '*/*' });
            res.end(resource, 'binary');
        } else res.status(400).send(null)
    },
    insertMusicsToDb: async (req, res, next) => {
        // var filesInfo = Fs.readJSONSync("C:\\Users\\rgara\\Projects\\PopuriApp\\Final\\ClearedMusic1\\clearmusiclist.json");

        // for (let mf of filesInfo) {
        //     console.log("SAVING: " + mf.fileName)
        //     await mp3Duration("C:\\Users\\rgara\\Projects\\PopuriApp\\Final\\ClearedMusic1\\" + mf.fileName, async function (err, duration) {
        //         if (err) return console.log("MP#: " + err.message);
        //         if (!await Music.findOne({ name: mf.fileName.split(".")[0] })) {
        //             await new Music({
        //                 duration: duration * 1000,
        //                 lang: 'tr',
        //                 name: mf.fileName.split(".")[0],
        //                 format: mf.fileName.split(".")[1],
        //                 dateWritten: Date.now(),

        //                 song: { author: mf.author, name: mf.musicName }
        //             }).save();
        //             console.log("SAVED: " + mf.fileName)
        //         }
        //         else
        //             console.log("ALTEADY HAVE: " + mf.fileName)
        //     });
        // }


        // for (let file of files) {
        //     // Fs.moveSync("apps/mustagram/res/music/" + res + '/' + file, "apps/mustagram/res/music/" + file)
        //     mp3Duration("C:\\Users\\rgara\\Projects\\PopuriApp\\Musics" + file, async function (err, duration) {
        //         if (err) return console.log("MP#: " + err.message);
        //         if (!await Music.findOne({ name: file.split(".")[0] })) {
        //             await new Music({
        //                 duration: duration * 1000,
        //                 name: file.split(".")[0],
        //                 format: file.split(".")[1],
        //                 dateWritten: Date.now(),
        //                 dateWritten: Date.now()
        //             }).save();
        //             console.log("SAVED: " + file)
        //         }
        //         else
        //             console.log("ALTEADY HAVE: " + file)
        //     });
        //     // console.log(files);
        // }
        // // console.log(resource)
        // res.writeHead(200, { 'Content-Type': 'text/html' });
        // res.end(resource, 'binary');
        // res.send("OK")
    }


};