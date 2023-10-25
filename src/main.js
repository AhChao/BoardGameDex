import { games } from "../data/gameIndex.js";
const app = Vue.createApp({
    created() { },
    data() {
        return {
            games: [],
            displayDetails: true
        };
    },
    mounted() {
        this.games = games;
        document.getElementById("markdownField").innerHTML = marked.parse('# Marked in Node.js\n\nRendered by **marked**.');
    },
    computed: {
    },
    methods: {
        init() {
            sth();
        },
    }
});
app.mount('#app');