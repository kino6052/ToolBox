/*
*	Main entry point
*/
function main(arguments){
	var searchbox = new searchbox("#searchbox");
	var favoriteArtist = searchbox.getContent();
	var artists = new artists(favoriteArtist);
	var playlist = new playlist();
	var player = new player();
	
	artists.displayChecklist();
	$(artists.buttonId).on('click', function(){ // the button have to be created to assign the event to it
		artist.processChecklist();
		playlist.createPlaylist(artists.artistList);
	});
	player.init(); // load the first video
}

/*
*	Unit Tests
*/
function tests(){
	// Convenience Function Tests
	testCase('removeElementByName', removeElementByName(['01', '02', '03'], '01'), "['01', '02', '03'], '01'", ['02', '03']);
	testCase('removeElementByName', removeElementByName(['01', '02', '03'], '02'), "['01', '02', '03'], '02'", ['01', '03']);
}

/* 
*	Object responsibe for interaction with player
*/
var player = function(){
	return {
		currentUrl: 'https://www.googleapis.com/youtube/v3/search?part=snippet&alt=json',
		key: 'AIzaSyDYhXuJLy-9JbQrnGL3Wm8IeqB7_2a3rUM',
		maxResults: 50,
		order: 'relevance',
		playlist: {},
		query: 'chvrches official music video',
		init: function(playerId) {
			// Loads first video and creates listeners that check whether video ended
			$(playerId).on('ended', function(){
				getNext();
			});
		},
		getNext: function(){
			//TODO: implement
		},
		getPrev: function(){
			//TODO: implement
		},
		pause: function(){
			//TODO: implement
		},
		play: function(){
			//TODO: implement
		}
	};
}

/* 
*	Object responsibe for playlist creation and interaction
*/
var playlist = function(){
	return {
		songlist: [],
		addSong: function(){
			//TODO: implement
		},
		createPlaylist: function(){
			//TODO: implement
		},
		removeSong: function(){
			//TODO: implement
		}
	};
}

/* 
*	Object responsibe for displaying artist select menu
*/
var artists = function(){
	return {
		artistList: [],
		buttonId: '#button',
		displayChecklist: function(){
			// void; displays content of the artistList and adds even listener to the button
		},
		addArtist: function(){
			//TODO: implement
		},
		removeArtist: function(){
			//TODO: implement
		}
	};
}

/* 
*	Object responsibe for the search box
*/
var searchbox = function(id){
	return {
		content: 'YourFavoriteBand', // text entered in the search box
		id: id,
		setId: function(id){
			this.id = id;
		},
		getId: function(){
			return this.id;
		},
		setContent: function(){
			this.content =  $(this.id).val();
		},
		getContent: function(){
			return this.content;
		}
	}
};

/*
*	Convenience functions
*/
function testCase(funcName, func, input, output){
	if(String(func)===String(output)){
		console.log("TEST PASSED: " + funcName + ", input: " + input + ", output: " + output);
	}
	else {
		alert("TEST FAILED: " + funcName + " failed on input " + input);
	}
}

function removeElementByName(array, name){
	var index = array.indexOf(name);
	if (index > -1){
		array.splice(index, 1);
	}
	return array
}

tests();