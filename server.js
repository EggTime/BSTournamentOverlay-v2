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

  TAsock.taClient.on("userAdded", function (p) {
    if (p.data.client_type === Models.User.ClientTypes.Player) {
        console.log("a player has joined!")
    }
})    
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