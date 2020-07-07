// list of poems with their URI and details
var toc = [ 
  { 	href:  "poem1.html", 
	  	title: "Melodies of Joy", 
	  	audio: "audio/melodies_of_joy.mp3"},
  { 	href:"poem2.html", 
	  	title: "The key"},
  { 	href:"poem3.html", 
	  	title: "Oboni, Are you home?"},
  {		href:"poem4.html", 
	  	title: "Anarchist"},
  { 	href:"poem5.html", 
	  	title: "Not a Happy Hour"},
  { 	href:"poem6.html", 
	  	title: "Postmen of Forest of Fall",
	  	audio: "audio/hemanter_aryna.mp3"},
  { 	href:"poem7.html", 
	  	title: "Take me back", 
	  	audio: "audio/jarasandha.mp3"},
  { 	href:"poem8.html", 
	  	title: "May Go, But Why?",
		audio:'audio/i_may_go.mp3'}
]

$().ready(function() {
	createTableOfContent()
	showPoem(toc[0])
})

function open_sidebar() {
	  $("#nav-bar").css('marginLeft', '25%');
	  $("#poem-title-bar").css('marginLeft', '25%');
	  $("#sidebar").css('width', "25%");
	  $("#sidebar").css('display', "block");
	  $("#openNav").css('display', 'none');
}

function close_sidebar() {
	  $("#nav-bar").css('marginLeft', '0%');
	  $("#poem-title-bar").css('marginLeft', '0%');
	  $("#sidebar").css('display',"none");
	  $("#openNav").css('display', "inline-block");
}

function createTableOfContent() {
	var $sidebar = $('#sidebar')
	for (var i = 0; i < toc.length; i++) {
		var $poem = createPoemEntry(toc[i]);
		$sidebar.append($poem)
	}
}
/**
 * return a <div> element for given poem
 * @param poem
 * @returns
 */
function createPoemEntry(poem) {
	if (poem == undefined) 
		throw 'can not create entry for undefiend poem'
	var $el = $('<div>')
	$el.text(poem.title)
	$el.data('poem', poem)
	$el.on('click', function(e) {
		close_sidebar()
		showPoem($(this).data('poem'))
	})
	return $el
}
/**
 * shows given poem
 * @param poem
 * @returns
 */
function showPoem(poem) {
	if (poem == undefined) 
		throw 'can not create entry for undefiend poem'
	var $section = $('#poem-title-bar')
	var $title = $('#poem-title')
	$title.text(poem.title)
	$title.css('font-weight', 'bold')
	
	if (poem.audio) {
		$('#poem-audio').empty()
		var $audio = create_audio_control(poem)
		$('#poem-audio').append($audio)
	} else {
		$('#poem-audio').empty()
	}
	$('#english').load('./content/english/' + poem.href)
	$('#bangla').load('./content/bangla/' + poem.href)
	updateNavigation(poem)
	
}

function create_audio_control(poem) {
	var $audio = $('<audio controls>')
	var $source = $('<source>')
	$source.css('width', '200px')
	$source.attr('src', poem.audio)
	$source.attr('type', 'audio/mp3')
	$audio.append($source)
	
	return $audio
}

LEFT_ARROW_UNICODE  = '\u25C0'
RIGHT_ARROW_UNICODE = '\u25B6'

function updateNavigation(poem) {
	nextPoem(poem)
	prevPoem(poem)
}
	
function nextPoem(poem) {
	var $next = $('#next-poem')
	$next.empty()
	for (var i = 0; i < toc.length-1; i++) {
		if (toc[i].href == poem.href) {
			var next = toc[i+1]
			$next.text(next.title + ' ' + RIGHT_ARROW_UNICODE)
			$next.data('poem', next)
			break;
		} 
	}
}

function prevPoem(poem) {
	var $prev = $('#prev-poem')
	$prev.empty()
	for (var i = 1; i < toc.length; i++) {
		if (toc[i].href == poem.href) {
			var prev = toc[i-1]
			$prev.text(LEFT_ARROW_UNICODE + ' ' + prev.title)
			$prev.data('poem', prev)
			break;
		}
	}
}

