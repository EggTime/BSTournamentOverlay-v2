const WebSocket = require('ws');

const fetch = require('node-fetch');

const server = new WebSocket.Server({
    port: 1337
});






var P1Name = 'Player 1';
var P2Name = 'Player 2';
var P3Name = 'Player 3';
var P4Name = 'Player 4';

var P1ScoreSaber = '';
var P2ScoreSaber = '';
var P3ScoreSaber = '';
var P4ScoreSaber = '';
var Team1 = '';
var Team2 = '';


let sockets = [];
server.on('connection', function (socket) {
    console.log("Client connected");
    sockets.push(socket);

    socket.on('message', function (msg) {
        let data = JSON.parse(msg);
        console.log(data);
        let dataString = JSON.stringify(data);
        sockets.forEach(s => s.send(dataString));

        // Check for event called PlayerIDs




        var mapCount = 0;











        if (data.Event == "ControllerData") {
            console.log("Recieved ControllerData")
            console.log(data);
            P1 = data.Data.P1;
            P2 = data.Data.P2;
            P3 = data.Data.P3;
            P4 = data.Data.P4;
            MapPool = data.Data.MapPool + '';
            Team1 = data.Data.Team1;
            console.log(Team1);
            Team2 = data.Data.Team2;

            P1ScoreSaber = '';
            P2ScoreSaber = '';
            P3ScoreSaber = '';
            P4ScoreSaber = '';

            if (P1 != "") {
                P1ScoreSaber = teamInfo[Team1][P1].SSID;
            }

            if (P2 != "") {
                P2ScoreSaber = teamInfo[Team2][P2].SSID;
            }
            if (P3 != "") {
                P3ScoreSaber = teamInfo[Team1][P3].SSID;
            }
            if (P4 != "") {
                P4ScoreSaber = teamInfo[Team2][P4].SSID;
            }


            sourceUpdate();




            fetch(`https://new.scoresaber.com/api/player/${P1ScoreSaber}/full`)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    //console.log(data);
                    P1Name = data.playerInfo.playerName;
                    console.log(P1Name);
                })
                .catch(err => {
                    console.log(err)
                })
            fetch(`https://new.scoresaber.com/api/player/${P2ScoreSaber}/full`)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    //console.log(data);
                    // Do stuff here
                    P2Name = data.playerInfo.playerName;
                    console.log(P2Name);
                })
                .catch(err => {
                    //console.log(err)
                })

            fetch(`https://new.scoresaber.com/api/player/${P3ScoreSaber}/full`)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    // console.log(data);
                    // Do stuff here
                    P3Name = data.playerInfo.playerName;
                    console.log(P3Name);
                })
                .catch(err => {
                    console.log(err)
                })

            fetch(`https://new.scoresaber.com/api/player/${P4ScoreSaber}/full`)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    //console.log(data);
                    // Do stuff here
                    P4Name = data.playerInfo.playerName;
                    console.log(P4Name);
                })
                .catch(err => {
                    console.log(err)
                })
            mapPoolUpdate();

            if (data.Data.StatsUpdate == 0) {
                console.log("Not sending stats");
            }

    
            //
            var messageData = {
                "Event": "MatchData",
                "Data": {
                    "P1": P1ScoreSaber,
                    "P2": P2ScoreSaber,
                    "P3": P3ScoreSaber,
                    "P4": P4ScoreSaber,
                    "Team1": data.Data.Team1,
                    "Team2": data.Data.Team2,
                    "Caster1": data.Data.Caster1,
                    "Caster2": data.Data.Caster2,
                    "BestOf": data.Data.BestOf,
                    "Team1Score": data.Data.Team1Score,
                    "Team2Score": data.Data.Team2Score,
                    "RoundInfo": data.Data.RoundInfo,
                    "MapPool": data.Data.MapPool,
                    "Map0": data.Data.Map0,
                    "Map1": data.Data.Map1,
                    "Map2": data.Data.Map2,
                    "Map3": data.Data.Map3,
                    "Map4": data.Data.Map4,
                    "Map5": data.Data.Map5,
                    "Map6": data.Data.Map6,
                    "Map7": data.Data.Map7,
                    "Map8": data.Data.Map8,
                    "DisplayedMaps": data.Data.DisplayedMaps,
                    "StatsUpdate": data.Data.StatsUpdate,
                    "NameOverride": data.Data.NameOverride,
                    "P1Name": data.Data.P1Name,
                    "P2Name": data.Data.P2Name,
                    "P3Name": data.Data.P3Name,
                    "P4Name": data.Data.P4Name,
                }
            }



            var messageString = JSON.stringify(messageData);

            console.log("Sending MatchData");
            console.log(messageString);
            sockets.forEach(s => s.send(messageString));




        }


        if (data.Event == "ControllerTeamData") {
            console.log("Recieved ControllerTeamData")
            console.log(data);

            Team1 = data.Data.Team1;
            Team2 = data.Data.Team2;


            const team1Players = Object.keys(teamInfo[Team1]);
            console.log(team1Players);
            const team2Players = Object.keys(teamInfo[Team2]);
            console.log(team2Players);

            var messageData = {
                "Event": "TeamPlayers",
                "Data": {
                    "Team1": team1Players,
                    "Team2": team2Players,
                }
            }
            var messageString = JSON.stringify(messageData);

            console.log("Sending TeamPlayers");
            console.log(messageString);
            sockets.forEach(s => s.send(messageString));
        }



    });

    socket.on('close', function () {
        sockets = sockets.filter(s => s !== socket);
    });
});



// god i love men



console.log("Started.")






// Holy crap lois its the list of every single fucking player in the league

// here we go


var teamInfo = {







}



//OBS SHIT WEEEEEEEEEEEEEEEEEEEEEEEEEEEEE

const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();
OBSconnect();

function OBSconnect() {
    obs.connect({
            address: 'localhost:4444',
            password: 'ILoveMen####'
        })
        .then(() => {
            console.log(`Connected to OBS!`);

            return obs.send('GetSceneList');
        })
        .then(data => {
            console.log(`${data.scenes.length} Available Scenes!`);
        })
        .catch(err => { // Promise convention dicates you have a catch on every chain.
            console.log(err);
            console.log("Reconnecting to OBS");
            setTimeout(function () {
                OBSconnect();
            }, 1000);
        });

}

function sourceUpdate() {

    if (P1 != "") {
        if (typeof teamInfo[Team1][P1].channelName === undefined) {
            teamInfo[Team1][P1].channelName = "unknown";
        }
    }
    if (P2 != "") {
        if (typeof teamInfo[Team2][P2].channelName === undefined) {
            teamInfo[Team2][P2].channelName = "unknown";
        }
    }
    if (P3 != "") {
        if (typeof teamInfo[Team1][P3].channelName === undefined) {
            teamInfo[Team1][P3].channelName = "unknown";
        }
    }
    if (P4 != "") {
        if (typeof teamInfo[Team2][P4].channelName === undefined) {
            teamInfo[Team2][P4].channelName = "unknown";
        }
    }


    if (P1 != "") {
        sourceSettings = {
            "reroute_audio": true,
            "url": `https://player.twitch.tv/?channel=${teamInfo[Team1][P1].channelName}&enableExtensions=false&muted=false&parent=twitch.tv&player=popout&volume=1`,
        };

        obs.send('SetSourceSettings', {
            "sourceName": `P1 Twitch (1v1)`,
            "sourceSettings": sourceSettings,
        }).catch(err => {
            console.log(err)
        });
        obs.send('SetSourceSettings', {
            "sourceName": `P1 Twitch (2v2)`,
            "sourceSettings": sourceSettings,
        }).catch(err => {
            console.log(err)
        });
    }
    if (P2 != "") {
        sourceSettings = {
            "reroute_audio": true,
            "url": `https://player.twitch.tv/?channel=${teamInfo[Team2][P2].channelName}&enableExtensions=false&muted=false&parent=twitch.tv&player=popout&volume=1`,
        };

        obs.send('SetSourceSettings', {
            "sourceName": `P2 Twitch (1v1)`,
            "sourceSettings": sourceSettings,
        }).catch(err => {
            console.log(err)
        });
        obs.send('SetSourceSettings', {
            "sourceName": `P2 Twitch (2v2)`,
            "sourceSettings": sourceSettings,
        });
    }
    if (P3 != "") {
        sourceSettings = {
            "reroute_audio": true,
            "url": `https://player.twitch.tv/?channel=${teamInfo[Team1][P3].channelName}&enableExtensions=false&muted=false&parent=twitch.tv&player=popout&volume=1`,
        };

        obs.send('SetSourceSettings', {
            "sourceName": `P3 Twitch (1v1)`,
            "sourceSettings": sourceSettings,
        }).catch(err => {
            console.log(err)
        });
        obs.send('SetSourceSettings', {
            "sourceName": `P3 Twitch (2v2)`,
            "sourceSettings": sourceSettings,
        }).catch(err => {
            console.log(err)
        });
    }
    if (P4 != "") {
        sourceSettings = {
            "reroute_audio": true,
            "url": `https://player.twitch.tv/?channel=${teamInfo[Team2][P4].channelName}&enableExtensions=false&muted=false&parent=twitch.tv&player=popout&volume=1`,
        };

        obs.send('SetSourceSettings', {
            "sourceName": `P4 Twitch (1v1)`,
            "sourceSettings": sourceSettings,
        }).catch(err => {
            console.log(err)
        });
        obs.send('SetSourceSettings', {
            "sourceName": `P4 Twitch (2v2)`,
            "sourceSettings": sourceSettings,
        }).catch(err => {
            console.log(err)
        });

    }
}