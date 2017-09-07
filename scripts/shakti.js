var toc = [ 
		{href:"poem1.html", "title": "Melodies of Joy", "audio":"audio/jarasandha.mp3"},
		{href:"poem2.html", "title": "Key"},
		{href:"poem3.html", "title": "Oboni, Are you home?"},
		{href:"poem4.html", "title": "Anarchist"},
		{href:"poem5.html", "title": "Not a Happy Hour"},
		{href:"poem6.html", "title": "Postmen of Forest of Fall"},
		{href:"poem7.html", "title": "Take me back"},
		{href:"poem8.html", "title": "May Go, But Why?"},
		
]

var tabs= {
		"poems":"poems.html",
		"bio"  :"biography.html",
		"note" :"notes.html",
}

$().ready(function(){
	$('.tab').on('click',function(e) {
		  $('.tab-content').hide();
		  var id = $(this).attr('content');
		  console.log('clicked on tab with content ' + id)
		  var ref = tabs[id];
		  var $tabContent = $('#'+id);
		  if (id==='poems') {
			  $tabContent.load(ref, initPoemList);
		  } else if (id=='bio') {
			  $tabContent.load(ref, initMap);
		  } else {
			  $tabContent.load(ref);
		  }
		  $tabContent.show();
	});
	
    $('.tab').eq(0).trigger('click')
})

function initPoemList() {
	var $list = $('#poems_list');
	console.log('initPoems ' + $list + ' ' + $list.attr('id'))
    for (var i=0; i < toc.length;i++) {
 	   var $item = $('<li></li>')
 	   var poem = toc[i];
 	   $item.attr('id', poem.href);
 	   $item.attr('title', poem.title)
 	   $item.attr('audio', poem.audio)
 	   $item.addClass('w3-small')
 	   $item.text(poem.title);
 	   $list.append($item)
 	   

 	   $item.on('click', function(e){
 	       var href = $(this).attr('id')
 	       var content = './content/english/' + href;
 	       console.log('content ' + content)
 	       $('#content-english').load(content, addAudio.bind($(this)))
 	       content = './content/bangla/' + href;
 	       $('#content-bangla').load(content)
 	       
 	       
 	       $list.parent().hide()
 	   });
 	 }
	$list.find('li').eq(0).trigger('click')
}

function addAudio() {
	var audioSrc = $(this).attr('audio');
	if (audioSrc) {
		   var $control = $('<i></i>')
		   $control.text('volume_up');
		   $control.addClass('material-icons w3-indigo w3-margin-left');
		   $control.on('click', playAudio)
		   console.log('add audio ' + audioSrc)
 		   var $audio = $('<audio></audio>')
 		   var $src = $('<source></source>')
 		   $src.attr('src', audioSrc)
 		   $audio.append($src)
 		   var $title = $('#content-english').find('.title');
 		   $title.eq(0).append($control)
 		   $title.eq(0).append($audio)
 	   }
}

function playAudio() {
	var song = $(this).next('audio').get(0)
	song.play();
}
  

function w3_open() {
	  $("#toc").show();
	}
	function w3_close() {
		  $("#toc").hide();

	}

