import { games } from "../data/gameIndex.js";
const app = Vue.createApp({
    created() { },
    data() {
        return {
            games: [],
            displayDetails: false,
        };
    },
    mounted() {
        this.games = games;
        this.init();
    },
    computed: {
    },
    methods: {
        init() {
            this.getMarkdownContentByPath("./data/markdownFiles/0_火星骰.md");
        },
        loadMD(id) {
            var filename = id + "_" + games[id];
            this.getMarkdownContentByPath("./data/markdownFiles/" + filename + ".md");
        },
        exitBtnClicked() {
            this.displayDetails = false;
        },
        getFileNameUnderThePathById(path, id) {
            var directory = path;
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open('GET', directory, false); // false for synchronous request
            xmlHttp.send(null);
            var ret = xmlHttp.responseText;
            var fileList = ret.split('\n');
            for (i = 0; i < fileList.length; i++) {
                var fileinfo = fileList[i].split(' ');
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
        }
    }
});
app.mount('#app');