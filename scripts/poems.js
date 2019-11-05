var toc = [ 
  { href:  "poem1.html", title: "Melodies of Joy", 
	audio: "https://www.youtube.com/v/a5ZOKGw3IvE?&autoplay=1"},
  { href:"poem2.html", title: "Key"},
  { href:"poem3.html", title: "Oboni, Are you home?"},
  {	href:"poem4.html", title: "Anarchist"},
  { href:"poem5.html", title: "Not a Happy Hour"},
  { href:"poem6.html", title: "Postmen of Forest of Fall"},
  { href:"poem7.html", title: "Take me back", "audio":"audio/jarasandha.mp3"},
  { href:"poem8.html", title: "May Go, But Why?"}
]

$().ready(function() {
	createTableOfContent()
	showPoem(toc[0])
})
function open_sidebar() {
	  $("#main").css('marginLeft', '25%');
	  $("#sidebar").css('width', "25%");
	  $("#sidebar").css('display', "block");
	  $("#openNav").css('display', 'none');
}

function close_sidebar() {
	  $("#main").css('marginLeft', "0%");
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

function createPoemEntry(poem) {
	var $el = $('<div>')
	$el.text(poem.title)
	$el.data('poem', poem)
	$el.on('click', function(e) {
		close_sidebar()
		showPoem($(this).data('poem'))
	})
	return $el
}

function showPoem(poem) {
	$('#poem-title').text(poem.title)
	$('#poem-title').css('font-weight', 'bold')
	$('#english').load('./content/english/' + poem.href)
	$('#bangla').load('./content/bangla/' + poem.href)
	updateNavigation(poem)
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
	$next.text(RIGHT_ARROW_UNICODE)
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
	$prev.text(LEFT_ARROW_UNICODE)
	for (var i = 1; i < toc.length; i++) {
		if (toc[i].href == poem.href) {
			var prev = toc[i-1]
			$prev.text(LEFT_ARROW_UNICODE + ' ' + prev.title)
			$prev.data('poem', prev)
			break;
		}
	}
}