/*
 *
 */
class CommandLine {
    constructor(args) {
        this.options = {}
        this.args = []
        for (var i = 0; i < this.args.length; i++) {
            var opt = args[i]
            if (this.isOption(opt)) {
                this.options[this.extractFlag(opt)] = args[i+1]
            }
        }
        this.args = args.slice(i)
    }

    isOption(opt) {
        return opt.startsWith('-')
    }

    extractFlag(s) {
        if (s.startsWith('-')) return this.extractFlag(s.slice(1:))
        return s
    }
}

class TwoLanguagePublisher {
    constructor() {
        this.englishRoot = null
        this.bengaliRoot = null
    }
    publish(index, out) {
        for (var i = 0; i < index.length; i++) {
            var item = index[i]
            var text = getContent(item.english.id)
            this.writePoem('english', text, out)
            text = getContent(item.bengali.id)
            this.writePoem('bengali', text, out)
        }
    }

    getContent() {

    }

    writePoem(title, text, out) {

    }
}


var content = [
    {'english':{'id':'', 'title':''}, 'bengali':{'id':'', 'title':''}},
]

var publisher = new TwoLanguagePublisher()
publisher.publish(content, out)