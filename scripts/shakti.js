var toc = [ 
		{href:"poem1.html", "title": "Melodies of Joy", 
			"audio":"https://www.youtube.com/v/a5ZOKGw3IvE?&autoplay=1"},
		{href:"poem2.html", "title": "Key"},
		{href:"poem3.html", "title": "Oboni, Are you home?"},
		{href:"poem4.html", "title": "Anarchist"},
		{href:"poem5.html", "title": "Not a Happy Hour"},
		{href:"poem6.html", "title": "Postmen of Forest of Fall"},
		{href:"poem7.html", "title": "Take me back", "audio":"audio/jarasandha.mp3"},
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
	console.log('initPoems add ' + toc.length + ' poems to  ' + $list.attr('id'))
    for (var i=0; i < toc.length;i++) {
 	   var $item = $('<li></li>')
 	   var poem = toc[i];
 	   $item.addClass('toc-item w3-small')
 	   $item.attr('id', poem.href);
 	   $item.attr('title', poem.title)
 	   $item.attr('audio', poem.audio)
 	   $item.text(poem.title);
// 	   console.log('initPoemList add ' + JSON.stringify(poem))
 	   $list.append($item)
    }
 	closeTOC();  
	$list.find('li').each(function(idx) {
  		 $(this).on('click', showPoem);
  		 if (idx == 0) $(this).trigger('click')
	})
	
}
	
function showPoem() {
	   closeTOC();

	   var href  = $(this).attr('id')
   var audio = $(this).attr('audio')
   console.log('showPoem ' + href);
   var content = './content/english/' + href;
   console.log('content ' + content)
   $('#content-english').empty();
   $('#content-english').load(content, addAudio.bind($(this), audio))
   content = './content/bangla/' + href;
   $('#content-bangla').empty();
   $('#content-bangla').load(content)
   
   activateNavigation($(this).next(), $('#next-poem'))
   activateNavigation($(this).prev(), $('#prev-poem'))
}

function activateNavigation($nav, $button) {
	if (!$nav.attr('id')) {
		$button.hide();
	} else {
		$button.off();
		$button.show();
		$button.on('click', function(e) {$nav.trigger('click')});
	} 
}

function addAudio(audioSrc) {
	if (!audioSrc) return;
		
	var $title = $('#content-english').find('.title');
    var $control = $('<i></i>')
	$title.eq(0).append($control)
    $control.text('volume_up');
    $control.addClass('material-icons w3-indigo w3-margin-left');
	if (audioSrc.startsWith('http')) {
		$control.on('click', function(e){
			var $embed = $('<embed></embed>')
			$embed.attr('src',audioSrc);
			$embed.attr('width','0px');
			$embed.attr('height','0px');
			$(this).append($embed)
		})
	} else {
	   var $audio = $('<audio></audio>')
	   var $src = $('<source></source>')
	   $src.attr('src', audioSrc)
	   $audio.append($src)
	   $control.on('click', $audio.get(0).play)
	   console.log('add audio ' + audioSrc)
 	}
		   
}

function playAudio(song) {
	var song = $(this).next('audio').get(0)
	song.play();
}
  

function openTOC() {
	  $("#toc").show();
	  $("#poems_list").show();
	}

/**
 * close TOC
 * 
 * @return
 */
function closeTOC() {
	  $("#toc").hide();

}

