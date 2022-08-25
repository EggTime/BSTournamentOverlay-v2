"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});











var tournament_assistant_client_1 = require("tournament-assistant-client");


//const WebSocket = require('ws');


console.log("Connecting to TA");
var taConnection = false;
var TAsock = new tournament_assistant_client_1.TAWebsocket({
  url: "ws://tournamentassistant.net:2053",
  name: "JustinOverlay",
  userId: "JustinOverlay",
});


// if (taConnection == false) {
//   TAsock.taClient.on("packet", function (e) {
//     taConnection = true;
//     console.log("TA is connected!" + taConnection);


//   });
// }


TAsock.taClient.on("matchCreated", function (e) {
  var jsonObj = JSON.stringify(e);
  console.log(jsonObj);
  var parsed = JSON.parse(jsonObj)
  console.log(parsed);

});


TAsock.taClient.on("loadSong", (p) => {
  if (p.data.client_type === Models.User.ClientTypes.Beatmap) {
    console.log(Models.User.ClientTypes.Beatmap)
  }
})



//   TAsock.taClient.on("userAdded", (p) => {
//     console.log(Models.User.ClientTypes.Player);
//     if (p.data.client_type === Models.User.ClientTypes.Player) {
//         console.log("a player has joined!")
//     }
// })    
// console.log(match);

// protobuf.load("./proto/models.proto", (err, root) => {
//     if (err) {
//       throw err;
//     }
//     console.log("Preparing models");
//     //
//     var BeatmapDecode = root.lookupType("proto.models.PlayerSpecificSettings");
//     console.log("Attempting to decode");

//     var Beatmap = BeatmapDecode.decode(new Uint8Array(e));
//     JSON.stringify(Beatmap);
//     console.log(Beatmap);

//   })






//var buffer = event.data
//console.log("Got an event btw");
//
//
//// buffer = Array.from(event.data);
//console.log(buffer);
//
//
//load("./proto/models.proto", function (err, root) {
//if (err) {
//  throw err;
//}
//
//var BeatmapDecode = root.lookupType("proto.models.Beatmap");
//
//var Beatmap = BeatmapDecode.decode(buffer);
//console.log(Beatmap);
//});
//});



//General websocket server

const WebSocket = require('ws');

//const fetch = require('node-fetch');

const server = new WebSocket.Server({
  port: 1337
});

function calcMaxScore(noteCount) {
  var num = 0;
  var i = 1;
  while (i < 8) {
    if (noteCount < i * 2) {
      num += i * noteCount;
      noteCount = 0;
      break;
    }
    num += i * i * 2 + i;
    noteCount -= i * 2;
    i *= 2;
  }
  num += noteCount * i;
  return num * 115;
}
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
   //   P1 = data.Data.P1;
   //   P2 = data.Data.P2;
   //   P3 = data.Data.P3;
   //   P4 = data.Data.P4;
   //   MapPool = data.Data.MapPool + '';
   //   Team1 = data.Data.Team1;
   //   console.log(Team1);
   //   Team2 = data.Data.Team2;

      P1ScoreSaber = '';
      P2ScoreSaber = '';
      P3ScoreSaber = '';
      P4ScoreSaber = '';

    //  if (P1 != "") {
    //    P1ScoreSaber = teamInfo[Team1][P1].SSID;
    //  }
//
    //  if (P2 != "") {
    //    P2ScoreSaber = teamInfo[Team2][P2].SSID;
    //  }
    //  if (P3 != "") {
    //    P3ScoreSaber = teamInfo[Team1][P3].SSID;
    //  }
    //  if (P4 != "") {
    //    P4ScoreSaber = teamInfo[Team2][P4].SSID;
    //  }


    //  sourceUpdate();
      var messageData = {
        "Event": "MatchData",
        "Data": {
    //      "P1": P1ScoreSaber,
    //      "P2": P2ScoreSaber,
    //      "P3": P3ScoreSaber,
    //      "P4": P4ScoreSaber,
    //      "Team1": data.Data.Team1,
    //      "Team2": data.Data.Team2,
    //      "Caster1": data.Data.Caster1,
    //      "Caster2": data.Data.Caster2,
    //      "BestOf": data.Data.BestOf,
    //      "Team1Score": data.Data.Team1Score,
    //      "Team2Score": data.Data.Team2Score,
    //      "RoundInfo": data.Data.RoundInfo,
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
   //     "DisplayedMaps": data.Data.DisplayedMaps,
   //     "StatsUpdate": data.Data.StatsUpdate,
   //     "NameOverride": data.Data.NameOverride,
   //     "P1Name": data.Data.P1Name,
   //     "P2Name": data.Data.P2Name,
   //     "P3Name": data.Data.P3Name,
   //     "P4Name": data.Data.P4Name,
        }


      }

      var messageString = JSON.stringify(messageData);

      console.log("Sending MatchData");
      console.log(messageString);
      sockets.forEach(s => s.send(messageString));




    }

  //  if (data.Event == "ControllerTeamData") {
  //    console.log("Recieved ControllerTeamData")
  //    console.log(data);
//
  //    Team1 = data.Data.Team1;
  //    Team2 = data.Data.Team2;
//
//
  //    const team1Players = Object.keys(teamInfo[Team1]);
  //    console.log(team1Players);
  //    const team2Players = Object.keys(teamInfo[Team2]);
  //    console.log(team2Players);
//
  //    var messageData = {
  //      "Event": "TeamPlayers",
  //      "Data": {
  //        "Team1": team1Players,
  //        "Team2": team2Players,
  //      }
  //    }
  //    var messageString = JSON.stringify(messageData);
//
  //    console.log("Sending TeamPlayers");
  //    console.log(messageString);
  //    sockets.forEach(s => s.send(messageString));
  //  }



  });

  socket.on('close', function () {
    sockets = sockets.filter(s => s !== socket);
  });
});

function mapPoolUpdate() {
  fetch(`https://beatkhana.com/api/tournament/2147484261/map-pools`)
      .then(response => {
          return response.json()
      })
      .then(data => {
          //console.log(data);
          // Do stuff here

          SongNoteCount = [];
          SongLeaderboardID = [];
          SongMaxScore = [];

          //console.log(MapPool);
          for (var i = 0; i < data[MapPool].songs.length; i++) {

              SongNoteCount.push(data[MapPool].songs[i].numNotes);
              SongLeaderboardID.push((data[MapPool].songs[i].ssLink).replace("https://scoresaber.com/leaderboard/", ""));
              SongMaxScore.push(calcMaxScore(SongNoteCount[i]));


          }
          console.log(SongNoteCount);
          console.log(SongLeaderboardID);
          console.log(SongMaxScore);


          mapCount = data[MapPool].songs.length;
          console.log(mapCount);

      })

      .catch(err => {
          console.log(err)
      })
}