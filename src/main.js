import { games } from "../data/gameIndex.js";
import { tags } from "../data/tags.js";
const app = Vue.createApp({
    created() { },
    data() {
        return {
            games: [],
            tags: [],
            selectedTags: [],
            displayMD: true,
            searchQuery:'',
        };
    },
    mounted() {
        this.games = games;
        var hs = new Set();
        for (var i in tags) {
            for (var j in tags[i]) {
                hs.add(tags[i][j]);
            }
        }
        this.tags = hs;
        this.init();
        if (this.isSmallScreen) {
            this.displayMD = false;
        }
    },
    computed: {
        isSmallScreen() {
            return screen.width < 568;
        },
        filteredGame() {
            var list = [];
            for (var i in tags) {
                for (var j in tags) {
                    try {
                        if (this.selectedTags.indexOf(tags[i][j]) != -1) {
                            list.push(this.games[i]);
                            break;
                        }    
                    } catch (error) {
                        continue;
                    }
                }
            }
            return list;
        }
    },
    methods: {
        onImageError(event) {
            event.target.src = "./img/bgPlaceHolder.png";
        },
        init() {
            this.getMarkdownContentByPath("./data/markdownFiles/0_火星骰.md");
        },
        loadMD(id) {
            var filename = id + "_" + games[id];
            this.getMarkdownContentByPath("./data/markdownFiles/" + filename + ".md");
            if (!this.displayMD) {
                this.displayMD = true;
            }
        },
        addSpaces(str) {
            return str
                .replace(/([a-z])([A-Z])/g, '$1 $2')
                .replace(/([A-Z])([0-9])/g, '$1 $2')
                .replace(/([0-9])([A-Z])/g, '$1 $2')
                .replace(/([&+\/])/g, ' $1 ')
                .replace(/\s{2,}/g, ' ');
        },
        removeSpaces(str) {
            return str
              .toLowerCase()
              .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
                index === 0 ? match.toLowerCase() : match.toUpperCase()
              );
        },
        exitBtnClicked() {
        },
        getFileNameUnderThePathById(path, id) {
            var directory = path;
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open('GET', directory, false); // false for synchronous request
            xmlHttp.send(null);
            var ret = xmlHttp.responseText;
            var fileList = ret.split('\n');
            for (var i = 0; i < fileList.length; i++) {
                var fileinfo = fileList[i].split(' ');
                console.log(fileinfo);
                if (fileinfo.indexOf(id + "_") != 0) {
                    return fileinfo[i];
                }
            }
        },
        getMarkdownContentByPath(path) {
            fetch(path)
                .then(response => response.text())
                .then(data => {
                    document.getElementById("markdownField").innerHTML = marked.parse(data);
                })
                .catch(error => {
                    console.error('An error occurred:', error);
                });
        },
        tagClicked(tagName) {
            if (this.selectedTags.indexOf(tagName) == -1) {
                this.selectedTags.push(tagName);
            }
            else {
                this.selectedTags = this.selectedTags.filter(x => x != tagName);
            }
        },
        exitBtnClicked() {
            this.displayMD = false;
        }
    }
});
app.mount('#app');