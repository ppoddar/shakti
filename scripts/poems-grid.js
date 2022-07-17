// list of poems with their URI and details
var toc = [ 
  { 	href:  "poem1.html", 
	  	title: ["Melodies of Joy", "আনন্দ-ভৈরবী"],
	  	audio: "audio/melodies-of-joy.mp3"},
  { 	href:"poem2.html", 
	  	title: ["The key", " চাবি "]},
  { 	href:"poem3.html", 
	  	title: ["Oboni, Are you home?", " অবনী বাড়ি আছো ?"]},
  {		href:"poem4.html", 
	  	title: ["Anarchist", " স্বেছ্বাচারী"]},
  { 	href:"poem5.html", 
	  	title: ["Not a Happy Hour"," ফুটপাত বদল হয় মধ্যরাতে "]},
  { 	href:"poem6.html", 
	  	title: ["Postmen of Forest of Fall"," হেমন্তের অরণ্যে পোস্টম্যান "],
	  	audio: "audio/hemanter_aryna.mp3"},
  { 	href:"poem7.html", 
	  	title: ["Take me back"," জরাসন্ধ "], 
	  	audio: "audio/jarasandha.mp3"},
  { 	href:"poem8.html", 
	  	title: ["May Go, But Why?"," যেতে পারি, কিন্তু কেন যাবো ?"],
		audio:'audio/i-may-go.mp3'}
]

$().ready(function() {
	createTableOfContent()
	showPoem(toc[0])
})

function createTableOfContent() {
	var $toc = $('#toc-content')
	for (var i = 0; i < toc.length; i++) {
		var $poem = createPoemEntry(toc[i]);
		$toc.append($poem)
	}
}
/**
 * return a <li> element for given poem
 * @param poem
 * @returns
 */
function createPoemEntry(poem) {
	if (poem == undefined) 
		throw 'can not create entry for undefined poem'
	var $el = $('<li>')
	$el.html('<b>'+poem.title[1]+'</b>' + ' ' + poem.title[0])
	if (poem.audio) {
		var $i = $('<i>')
		$i.addClass('material-icons')
		$i.text('volume_up')
		$el.append($i)
	}
	$el.data('poem', poem)
	$el.on('click', function(e) {
		$('#toc').hide()
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
	var $title = $('#poem-title')
	console.log('show poem [' + poem.title[0] + ']')
	$title.text(poem.title[1])
	
	$('#poem-audio').empty()
	if (poem.audio) {
		var $audio = create_audio_control(poem)
		$('#poem-audio').append($audio)
	} 
	$('.poem-english').load('./content/english/' + poem.href)
	$('.poem-bangla').load('./content/bangla/' + poem.href)
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
	var $next = $('#poem-next')
	$next.empty()
	var _this = this;
	for (var i = 0; i < toc.length-1; i++) {
		if (toc[i].href == poem.href) {
			var next = toc[i+1]
			$next.text(next.title[1] + ' ' + RIGHT_ARROW_UNICODE)
			$next.data('poem', next)
			$next.on('click', function(e) {
				var poem = $(this).data('poem')
				//console.log('clicked next poem [' + poem.title[0] + ']')
				e.stopImmediatePropagation()
				e.preventDefault()
				_this.showPoem(poem)
			})
			break;
		} 
	}
}

function prevPoem(poem) {
	var $prev = $('#poem-prev')
	$prev.empty()
	var _this = this;
	for (var i = 1; i < toc.length; i++) {
		if (toc[i].href == poem.href) {
			var prev = toc[i-1]
			$prev.text(LEFT_ARROW_UNICODE + ' ' + prev.title[1])
			$prev.data('poem', prev)
			$prev.on('click', function(e) {
				var poem = $(this).data('poem')
				//console.log('clicked previous poem [' + poem.title[0] + ']')
				e.stopImmediatePropagation()
				e.preventDefault()
				_this.showPoem(poem)
			})
			break;
		}
	}
}

