LEFT_ARROW_UNICODE  = '\u25C0'
RIGHT_ARROW_UNICODE = '\u25B6'


function close_toc() {
    $('#toc-dialog').hide()
}

/**
 * creates link for each poem in English and Bangla.
 * clicking on the link a) closes the enclosing diaglog
 * and b) display the poem 
 */
function create_toc(config, $list) {
    for (var i = 0; i < config.poems.length; i++) {
        var $poem = create_poem_entry(config, i);
        $list.append($poem)
    }
}
/**
 * return a <div> element for given poem.
 * When the item is clicked, the poem is displayed on
 * the poem content area.
 * @param poem
 * @returns
 */
function create_poem_entry(config, index) {
    var poem = config.poems[index]
    var $el = $('<li>')
    var $title_english = $('<span>')
    $title_english.addClass('toc-english')
    $title_english.text(poem.english.title)
    $el.append($title_english)
    if (poem.audio) {
        console.log(`audio=${poem.audio}`)
        var $audio_icon = $('<span>')
        $audio_icon.addClass('material-icons')
        $audio_icon.text('volume_up')
        $audio_icon.css('font-size', '0.75em')
        $audio_icon.css('margin-left', '1em')
        $el.append($audio_icon)
    }
    var $title_bangla = $('<span>')
    $title_bangla.addClass('toc-bangla')
    $title_bangla.text(poem.bangla.title)
    $el.data('poem-index', index)
    $el.append('<br>', $title_bangla)
    $el.on('click', function(e) {
        close_toc()
        show_poem(config, $(this).data('poem-index'))
    })
    return $el
}

/**
 * shows  poem at given index of config. 
 * @param config 
 * @param poem index
 * @returns
 */
function show_poem(config, index) {
    $('#main').hide()
    $('#poems').show()
    var poem = config.poems[index]
    if (poem == undefined)
        throw `can not create entry for undefined poem at ${index}`
    console.log(`show_poem ${index} ${poem.english.title} (${poem.bangla.title})`)

    render_poem('english', config.location.english, poem.english) 
    render_poem('bangla',  config.location.bangla, poem.bangla) 

    var next_index = (index+1)>config.poems.length-1 ? 0 : index+1
    var prev_index = (index-1)<0 ? config.poems.length-1 : index-1
    $('#button-prev-poem').off()
    $('#button-next-poem').off()

    $('#button-prev-poem').on('click', show_poem.bind(null, config, prev_index))
    $('#button-next-poem').on('click', show_poem.bind(null, config, next_index))
    
    
    var $audio_control = $('#audio-control')
    var $audio_source  = $('#audio-source')
    $audio_control[0].pause()
    $audio_control[0].currentTime = 0
    if (poem.audio) {
        $audio_source.attr('src', config.location.audio + '/' + poem.audio)
    } else {
        $audio_source.attr('src', '')
    }
    $audio_control[0].load()
}

function clear_poem() {
    $('#poems').hide()
    $('#audio-control')[0].pause()
}

/**
 * renders content of given poem at a given div.
 * Uses jQuery.load()
 * 
 * @param {*} divId the parent div id such as 'english' or 'bangla'
 * the title and content div has id that can be derived from parant id
 * @param {*} dir directory of the poem content
 * @param {*} poem poen file name
 */
function render_poem(divId, dir, poem) {
    var $title   = $('#poem-title-' + divId)
    var $content = $('#poem-' + divId)
    var url = dir + '/' + poem.href

    $title.text(poem.title)
    $content.load(url)
}

function loadContent($div, url) {
    //console.log(`loadContent ${$div.attr('id')} -> ${url}`)
    $div.empty()
    $div.load(url)
}
/**
 * audio control must be created with every new valid source .
 * otherwise the controls are shown but disabled
 * @param {*} src 
 * @param {*} type 
 * @returns 
 */
function get_or_create_audio_control(create, src, type) {
    var $audio, $source

    if (create) {
        console.log(`create_audio_control`)
        $audio = $('<audio controls>')
        $source = $('<source>')
        $audio.attr('id', 'audio-control') // CSS style
        $source.attr('id', 'audio-source') // CSS style
        $audio.append($source)
    } else {
        $audio = $('#audio-control')
        $source = $('#audio-source')
    }
    console.log(`set audio source ${src}`)
    $source.attr('src', src)
    $source.attr('type', type)
    

    return $audio
}

LEFT_ARROW_UNICODE = '\u25C0'
RIGHT_ARROW_UNICODE = '\u25B6'

function updateNavigation(poem) {
    nextPoem(poem)
    prevPoem(poem)
}



