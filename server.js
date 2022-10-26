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

var webData = '';
var division = 'Beat Saber D2'

fetchWebData();




let sockets = [];
server.on('connection', function (socket) {
	console.log("Client connected");
	sockets.push(socket);

	socket.on('message', function (msg) {
		let data = JSON.parse(msg);
		console.log(data);
		let dataString = JSON.stringify(data);
		sockets.forEach(s => s.send(dataString));

		var mapCount = 0;



		if (data.Event == "ControllerTeamData") {
			console.log("Recieved ControllerTeamData")
			console.log(data);

			Team1 = data.Data.Team1;
			Team2 = data.Data.Team2;
			division = data.Data.Division;




			const team1Players = Object.keys(webData[division][team1]);
			console.log(team1Players);
			const team2Players = Object.keys(teamInfo[Team2][team2]);
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


		if (data.Event == "ControllerData") {
			console.log("Recieved ControllerData")
			console.log(data);
			//active players in overlay
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

			//for roster page

			//It would probably be best to process all data here and then send it out over the relay
			//Name and scoresaber sent out for every player because of team roster page
			team1Player1Name = '';
			team1Player2Name = '';
			team1Player3Name = '';
			team1Player4Name = '';
			team1Player5Name = '';

			team1Player1SSID = '';
			team1Player2SSID = '';
			team1Player3SSID = '';
			team1Player4SSID = '';
			team1Player5SSID = '';

			team2Player1Name = '';
			team2Player2Name = '';
			team2Player3Name = '';
			team2Player4Name = '';
			team2Player5Name = '';

			team2Player1SSID = '';
			team2Player2SSID = '';
			team2Player3SSID = '';
			team2Player4SSID = '';
			team2Player5SSID = '';






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





			mapPoolUpdate();


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


			const teamList = Object.keys(webData[division]);
			console.log(teamList);

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



var teamInfo = {
	//Pull from website
}



//OBS SHIT WEEEEEEEEEEEEEEEEEEEEEEEEEEEEE

// const OBSWebSocket = require('obs-websocket-js');
// const obs = new OBSWebSocket();
// OBSconnect();
// 
// function OBSconnect() {
// 	obs.connect({
// 			address: 'localhost:4455',
// 			password: 'S2oJ6FF6lSAvA7W3'
// 		})
// 		.then(() => {
// 			console.log(`Connected to OBS!`);
// 
// 			return obs.send('GetSceneList');
// 		})
// 		.then(data => {
// 			console.log(`${data.scenes.length} Available Scenes!`);
// 		})
// 		.catch(err => { // Promise convention dicates you have a catch on every chain.
// 			console.log(err);
// 			console.log("Reconnecting to OBS");
// 			setTimeout(function () {
// 				OBSconnect();
// 			}, 1000);
// 		});
// 
// }
// 
// function sourceUpdate() {
// 
// 	if (P1 != "") {
// 		if (typeof teamInfo[Team1][P1].channelName === undefined) {
// 			teamInfo[Team1][P1].channelName = "unknown";
// 		}
// 	}
// 	if (P2 != "") {
// 		if (typeof teamInfo[Team2][P2].channelName === undefined) {
// 			teamInfo[Team2][P2].channelName = "unknown";
// 		}
// 	}
// 	if (P3 != "") {
// 		if (typeof teamInfo[Team1][P3].channelName === undefined) {
// 			teamInfo[Team1][P3].channelName = "unknown";
// 		}
// 	}
// 	if (P4 != "") {
// 		if (typeof teamInfo[Team2][P4].channelName === undefined) {
// 			teamInfo[Team2][P4].channelName = "unknown";
// 		}
// 	}
// 
// 
// 	if (P1 != "") {
// 		sourceSettings = {
// 			"reroute_audio": true,
// 			"url": `https://player.twitch.tv/?channel=${teamInfo[Team1][P1].channelName}&enableExtensions=false&muted=false&parent=twitch.tv&player=popout&volume=1`,
// 		};
// 
// 		obs.send('SetSourceSettings', {
// 			"sourceName": `P1 Twitch (1v1)`,
// 			"sourceSettings": sourceSettings,
// 		}).catch(err => {
// 			console.log(err)
// 		});
// 		obs.send('SetSourceSettings', {
// 			"sourceName": `P1 Twitch (2v2)`,
// 			"sourceSettings": sourceSettings,
// 		}).catch(err => {
// 			console.log(err)
// 		});
// 	}
// 	if (P2 != "") {
// 		sourceSettings = {
// 			"reroute_audio": true,
// 			"url": `https://player.twitch.tv/?channel=${teamInfo[Team2][P2].channelName}&enableExtensions=false&muted=false&parent=twitch.tv&player=popout&volume=1`,
// 		};
// 
// 		obs.send('SetSourceSettings', {
// 			"sourceName": `P2 Twitch (1v1)`,
// 			"sourceSettings": sourceSettings,
// 		}).catch(err => {
// 			console.log(err)
// 		});
// 		obs.send('SetSourceSettings', {
// 			"sourceName": `P2 Twitch (2v2)`,
// 			"sourceSettings": sourceSettings,
// 		});
// 	}
// 	if (P3 != "") {
// 		sourceSettings = {
// 			"reroute_audio": true,
// 			"url": `https://player.twitch.tv/?channel=${teamInfo[Team1][P3].channelName}&enableExtensions=false&muted=false&parent=twitch.tv&player=popout&volume=1`,
// 		};
// 
// 		obs.send('SetSourceSettings', {
// 			"sourceName": `P3 Twitch (1v1)`,
// 			"sourceSettings": sourceSettings,
// 		}).catch(err => {
// 			console.log(err)
// 		});
// 		obs.send('SetSourceSettings', {
// 			"sourceName": `P3 Twitch (2v2)`,
// 			"sourceSettings": sourceSettings,
// 		}).catch(err => {
// 			console.log(err)
// 		});
// 	}
// 	if (P4 != "") {
// 		sourceSettings = {
// 			"reroute_audio": true,
// 			"url": `https://player.twitch.tv/?channel=${teamInfo[Team2][P4].channelName}&enableExtensions=false&muted=false&parent=twitch.tv&player=popout&volume=1`,
// 		};
// 
// 		obs.send('SetSourceSettings', {
// 			"sourceName": `P4 Twitch (1v1)`,
// 			"sourceSettings": sourceSettings,
// 		}).catch(err => {
// 			console.log(err)
// 		});
// 		obs.send('SetSourceSettings', {
// 			"sourceName": `P4 Twitch (2v2)`,
// 			"sourceSettings": sourceSettings,
// 		}).catch(err => {
// 			console.log(err)
// 		});
// 
// 	}
// }

function fetchWebData() {

	let url = "https://cvre.jansen.systems/api/stream";

	let settings = {
		method: "Get"
	};

	fetch(url, settings)
		.then(res => res.json())
		.then((json) => {
			// do something with JSON
			webData = json;
			var webDataString = JSON.stringify(webData);
			console.log(webData);
			//console.log(webDataString);

			var testing = webData[division];
			console.log(testing);

			const teamList = Object.keys(webData[division]);
			console.log(teamList);

		});
}