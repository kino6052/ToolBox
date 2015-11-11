$(document).ready(function(){
    
    $("#artist").on('keydown', function(evt) { // Seach Artists when Press Enter
        if (evt.keyCode == 13) {
            var queryArtist = $("#artist").val(); // Get the artist's name that is inside the search box
			artists = showArtistChecklist(queryArtist);
			playlist = createPlaylist(artists);
			startBroadcasting(playlist);
        }
    });
    
	function showArtistChecklist(queryArtist){
		//TODO: display a div witch artist checkboxes for user to select from
		similarArtists = getSimilarArtists(queryArtist);
		artists = createPlaylist;
		return artists;
	}
	
	function getSimilarArtists(queryArtist){
		
		return similarArtists
	}
	
    function updateShmetterling(queryArtist){
    // Generate a Playlist Based on the Favorite Artist
        var playlist = getPlaylist(queryArtist);
        var shuffledList = shuffle(playlist);
        var favList = getFavList(queryArtist);
        favList = shuffle(favList);
        var zipList = zip(favList, shuffledList);
        console.log(zipList);
        var globalCounter = 0;
        $('#shmetterling').remove();
        $('#frameHolder').append("<iframe id='shmetterling' width='560' height='315' src='https://www.youtube.com/embed/" + zipList[globalCounter] +  "?autoplay=1' frameborder='0' allowfullscreen></iframe>");
        globalCounter++;
        $("#next").on("click", function() {
            $('#shmetterling').remove();
            $('#frameHolder').append("<iframe id='shmetterling' width='560' height='315' src='https://www.youtube.com/embed/" + zipList[globalCounter] +  "?autoplay=1' frameborder='0' allowfullscreen></iframe>");
            globalCounter++;
        });    
    };
    function getFavList(favoriteArtist){
      var artistID; // variable storing the Spotify id of an artist that user is searching for
      var artistName;
      var similarArtists = []; // list with the names of the artists similar to the one the user searches for
      var songList = []; // list of video ids returned from YouTube when you search for an artist
      var favList = []; // list of the searched artist
      var query;
      
      // Find the artist user searches for
          $.ajax({  
             type: "GET",  
             url: "http://ws.spotify.com/search/1/artist.json?q=" + favoriteArtist.toString(),   
             dataType: "json",  
             async: false,
             success: 
                 function(data){
                     var hrefLink = data.artists[0].href;
                     artistID = hrefLink.substring(15,hrefLink.length);
                     artistName = data.artists[0].name;
                     //console.log(artistID);
                     query = "https://api.spotify.com/v1/artists/" + artistID + "/related-artists";
                     //console.log(query);
                  },  
              failure: function () {
                  query = null; // Or however you want to flag failure
              }
          });
  
          $.ajax({  
             type: "GET",  
             url: query,   
             dataType: "json",  
             async: false,
             success: 
                 function(data){
                     //similarArtists.push(artistName);
                     for (i=0; i<data.artists.length; i++) {
                        similarArtists.push(data.artists[i].name)
                    }
                    console.log(similarArtists);
                  },  
              failure: function () {
                  similarArtists = null; // Or however you want to flag failure
              }
          });
          
          $.ajax({  
                 type: "GET",  
                 url: "https://www.googleapis.com/youtube/v3/search?part=snippet,id&q="+ artistName +" official music video&order=relevance&key=AIzaSyDYhXuJLy-9JbQrnGL3Wm8IeqB7_2a3rUM&maxResults=50&alt=json",   
                 dataType: "json",  
                 async: false,
                 success: 
                     function(data){
                         for (item=0; item<7; item++){ // we are only choosing first 7 most popular videos on youtube 
                             
                             if (data.items[item].id.kind == "youtube#video"){
                                 var songId = data.items[item].id.videoId;
                                 favList.push(songId);
                             }
                         }
  
                      },  
                  failure: function () {
                      songList = null; // Or however you want to flag failure
                  }
              });
          return favList;
    }
    
	
	function getPlaylist(favoriteArtist){
    var artistID; // variable storing the Spotify id of an artist that user is searching for
    var artistName;
    var similarArtists = []; // list with the names of the artists similar to the one the user searches for
    var songList = []; // list of video ids returned from YouTube when you search for an artist
    var favList = []; // list of the searched artist
    var query;
    
    // Find the artist user searches for
        $.ajax({  
           type: "GET",  
           url: "http://ws.spotify.com/search/1/artist.json?q=" + favoriteArtist.toString(),   
           dataType: "json",  
           async: false,
           success: 
               function(data){
                   var hrefLink = data.artists[0].href;
                   artistID = hrefLink.substring(15,hrefLink.length);
                   artistName = data.artists[0].name;
                   //console.log(artistID);
                   query = "https://api.spotify.com/v1/artists/" + artistID + "/related-artists";
                   //console.log(query);
                },  
            failure: function () {
                query = null; // Or however you want to flag failure
            }
        });

        $.ajax({  
           type: "GET",  
           url: query,   
           dataType: "json",  
           async: false,
           success: 
               function(data){
                   //similarArtists.push(artistName);
                   for (i=0; i<data.artists.length; i++) {
                      similarArtists.push(data.artists[i].name)
                  }
                  console.log(similarArtists);
                },  
            failure: function () {
                similarArtists = null; // Or however you want to flag failure
            }
        });
        
        $.ajax({  
               type: "GET",  
               url: "https://www.googleapis.com/youtube/v3/search?part=snippet,id&q="+ artistName +" official music video&order=relevance&key=AIzaSyDYhXuJLy-9JbQrnGL3Wm8IeqB7_2a3rUM&maxResults=50&alt=json",   
               dataType: "json",  
               async: false,
               success: 
                   function(data){
                       for (item=0; item<7; item++){ // we are only choosing first 7 most popular videos on youtube 
                           
                           if (data.items[item].id.kind == "youtube#video"){
                               var songId = data.items[item].id.videoId;
                               favList.push(songId);
                           }
                       }

                    },  
                failure: function () {
                    songList = null; // Or however you want to flag failure
                }
            });
        
        for (artist=0; artist<similarArtists.length; artist++){

            $.ajax({  
               type: "GET",  
               url: "https://www.googleapis.com/youtube/v3/search?part=snippet,id&q="+similarArtists[artist]+" official music video&order=relevance&key=AIzaSyDYhXuJLy-9JbQrnGL3Wm8IeqB7_2a3rUM&maxResults=50&alt=json",   
               dataType: "json",  
               async: false,
               success: 
                   function(data){
                       for (item=0; item<7; item++){ // we are only choosing first 7 most popular videos on youtube 
                           
                           if (data.items[item].id.kind == "youtube#video"){
                               var songId = data.items[item].id.videoId;
                               songList.push(songId);
                           }
                       }

                    },  
                failure: function () {
                    songList = null; // Or however you want to flag failure
                }
            });
        }
        return songList;
    };
    
    function randomizeList(inputList){
return;        
    };
    
    
    /* Array Shuffler */
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex ;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
    
    /* Array Zipper */
    function zip(favArray, relArray){
      var resultArray = [];
      var counter = 0;
      for (i=0;i<favArray.length;i++){
        resultArray.push(favArray[i]);
        for (j=0;j<3;j++){
          resultArray.push(relArray[counter]);
          counter++;
        }
      }
      for (i=counter;i<relArray.length;i++){
        resultArray.push(relArray[i]);
      }
      return resultArray;
    }
    
});
/* PSEUDO CODE */
/*
1. Fetch the Information about the Artist Selected (ID)
2. Find Related Artist
3. Create a List with the Artists
4. Search YouTube for the Artists (First 7 songs)
5. Intermingle the Results
6. Load videos through iFrame
7. Create a List that Keeps track of the songs already played

*/
/*
//Find an Artist
http://ws.spotify.com/search/1/artist.json?q=foo

//Find Related Artist
https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/related-artists

//Find Top Tracks of the Artist
https://api.spotify.com/v1/artists/3CjlHNtplJyTf9npxaPl5w/top-tracks?country=SE

//Find an Artist
https://www.googleapis.com/youtube/v3/search?part=id&q=chvrches&key=AIzaSyDYhXuJLy-9JbQrnGL3Wm8IeqB7_2a3rUM&alt=json

//Find a Channel
https://www.googleapis.com/youtube/v3/search?part=id&channelId=UCDgEglMcFTNpDbGEeQcummw&key=AIzaSyDYhXuJLy-9JbQrnGL3Wm8IeqB7_2a3rUM&limit=50&alt=json

//Find a Playlist for a Band
https://www.googleapis.com/youtube/v3/playlists?part=id&channelId=UCDgEglMcFTNpDbGEeQcummw&key=AIzaSyDYhXuJLy-9JbQrnGL3Wm8IeqB7_2a3rUM&alt=json

//Find the List of the Videos on a Channel
https://www.googleapis.com/youtube/v3/search?part=id&channelId=UClVrJwcIy7saPcGc1nct80A&key=AIzaSyDYhXuJLy-9JbQrnGL3Wm8IeqB7_2a3rUM&maxResults=50&alt=json

//Find videos by Artist and Sort if from Most Popular to Least Popular
https://www.googleapis.com/youtube/v3/search?part=snippet,id&q=chvrches&order=viewCount&key=AIzaSyDYhXuJLy-9JbQrnGL3Wm8IeqB7_2a3rUM&maxResults=50&alt=json
*/