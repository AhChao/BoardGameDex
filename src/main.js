import { games } from "../data/gameIndex.js";
const app = Vue.createApp({
    created() { },
    data() {
        return {
            games: [],
        };
    },
    mounted() {
        this.games = games
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