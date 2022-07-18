var language
var cursor

const ROOT_DIR = {bangla:'./content/bangla', english:'./content/english'}
const AUDIO_ROOT_DIR = {bangla:'./audio/bangla', english:'./audio/english'}
const POEMS_BANGLA = [
    {source:'anando-voirobi.html',            title:'আনন্দ ভৈরবী', audio: 'anando-voirobi.mp3'}, 
    {source:'chabi.html',                     title:'চাবি'}, 
    {source:'se-boro-sukher-somoy-noy.html',  title:'সে বড় সুখের সময় নয়', audio:'se-boro-sukher-somoy-noy.mp3'},
    {source:'jete-pari-kintu-keno-jabo.html', title:'যেতে পারি কিন্তু কেন যাবো ', audio:'jete-pari-kintu-keno-jabo.mp3'},
    {source:'jarasandha.html',                title:'জরাসন্ধ', audio:'jarasandha.mp3'},
    {source:'oboni.html',                     title:'অবনী বাড়ি আছো ?'},
    {source:'post-poetry.html',               title:'এখানে কবিতা পেলে গাছে গাছে কবিতা টাঙাবো'},
    {source:'hemanter-aranye-ami-postman.html',  title:'হেমন্তের অরণ্যে আমি পোস্টম্যান', audio:'hemanter-aranye-ami-postman.mp3'},
    {source:'sechchachari.html',              title:'আমি স্বেচ্ছাচারী'}
]
POEMS_ENGLSH=[
    {source:'melodies-of-joy.html', title:'Melodies of Joy', audio: 'melodies-of-joy.mp3'},
    {source:'key.html',             title:'The Key'},
    {source:'not-happy-hour.html',  title:'Not the Happy Hour'},
    {source:'may-go.html',          title:'May Go, But Why?'},
    {source:'take-me-back.html',    title:'Take Me Back'},
    {source:'oboni.html',           title:'Oboni, Are You Home?'},
    {source:'post-poetry.html',     title:'Post poetry on the Trees'},
    {source:'postmen-of-fall.html', title:'The postman of Fall'},
    {source:'anarchist.html',       title:'The Anarchist'}
]

/**
 * creates link for each poem in English and Bangla.
 * clicking on the link a) closes the enclosing diaglog
 * and b) display the poem 
 */
function populate_poem_list($list) {
    var N = POEMS_BANGLA.length
    for (var i = 0; i < N; i++) {
        var $entry1 = create_poem_entry(i, 'english', $list)
        var $entry2 = create_poem_entry(i, 'bangla', $list)
    }

}
/**
 * return a <tr> element for given poem.
 * When the item is clicked, the poem is displayed on
 * the poem content area.
 * @param index
 * @param lang
 * @param $list
 */
function create_poem_entry(index, lang, $parent) {
    var poem = find_poem(index, lang)
    var $entry = $('<div>')
    $entry.text(poem.title)
    $entry.addClass(lang)
    $parent.append($entry)

    $entry.on('click', function() {
        show_poem(index, lang)
        $parent.dialog('close')
    })

}

function set_style_class($div, lang) {
    $div.removeClass(lang == 'english' ? 'bangla':'english')
    $div.addClass(lang == 'english'    ? 'english': 'bangla')
}
/**
 * shows  poem at given index in the given language. 
 * @param index 0-based poem index
 * @param lang language 'english' or 'bangla'
 * @returns
 */
function show_poem(index, lang) {
    language = lang 
    cursor   = index
    var poem = find_poem(index, lang)
    var root = lang == 'english' ? ROOT_DIR.english : ROOT_DIR.bangla
    var source = `${root}/${poem.source}` 
    var audio = find_audio(index, lang)

    console.log(`${lang} ${index} ${poem.title} ${source} ${audio}`)

    $('#poem-title').text(poem.title)
    $('#poem-content').load(source)
    set_style_class($('#poem-title'), lang)
    set_style_class($('#poem-content'), lang)

    // the next and prev button wraps around poem list
    var N = POEMS_BANGLA.length
    update_navigation_button($('#poem-next'), (index+1)>N-1 ? 0 : index+1, lang)
    update_navigation_button($('#poem-prev'), (index-1)<0 ? N-1 : index-1, lang)
    var $player = $('#play-audio')
    $player[0].pause()
    $player[0].currentTime = 0
    $player.attr('src', '')
    $player[0].onplay = function() {
        console.log('..................playing...')
        autoscroll()
    }
    if (audio) {
        $player.attr('src', audio)
        $('#play-audio').on('click', function(){
            $(this)[0].play()
        })
    } 


}
function update_navigation_button($button, index, lang) {
    $button.off()
    var $tooltip = $button.find('.tooltip')
    var title = find_poem(index, lang).title
    $tooltip.text(title)
    $tooltip.hide()
    $button.hover(function(){$tooltip.show()}, function(){$tooltip.hide()})
    $button.on('click', show_poem.bind(null, index, lang))

    //$button.find('.w3-text').text()
}
/**
 * Returns poem at given index in given language
 * @param {int} index 0-baed index
 * @param {string} lang  language
 * @returns a poem
 */
function find_poem(index, lang) {
    var catalog = lang == 'english' ? POEMS_ENGLSH : POEMS_BANGLA
    var poem = catalog[index]
    if (poem == undefined)
        throw `can not find poem at index ${index} in ${lang}`
    return poem
}
function find_audio(index, lang) {
    var poem = find_poem(index, lang)
    if (poem.audio) {
        var root = lang == 'english' ? AUDIO_ROOT_DIR.english : AUDIO_ROOT_DIR.bangla
        return `${root}/${poem.audio}`
    }
}


function switch_language() {
    show_poem(cursor, language=='english' ? 'bangla': 'english')
}


function autoscroll() {
    var INITIAL_DELAY   = 1000
    var SCROLLING_SPEED = 40000
    console.log('......autoscroll.....')
    console.log(`content height  : ${$('#poem-content').height()}`)
    console.log(`container height: ${$('#poem-container').height()}`)
    if ($('#poem-content').height() > $('#poem-container').height()) {
        setTimeout(function(){
            setInterval(function () {
                down();
           }, SCROLLING_SPEED); 
        }, INITIAL_DELAY)
    } else {
        console.log('not scrolling')
        
    }
}
function animateContent(direction) {  

    var animationOffset = $('#poem-container').height() - $('#poem-content').height()-30;
    if (direction == 'up') {
        animationOffset = 0;
    }

    console.log("animationOffset:"+animationOffset);
    $('#poem-content').animate({ "marginTop": (animationOffset)+ "px" }, 5000);
}

function up(){
    animateContent("up")
}
function down(){
    console.log(`down`)
    animateContent("down")
}

function start(){
    setTimeout(function () {down();}, 50000);
}    


