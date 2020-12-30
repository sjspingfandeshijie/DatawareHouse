<template>
    <div  id="app">
        <!--        上边框-->
        <el-header>
            <div id="nav">
                <router-link to="/">MovieQuerier</router-link> |
                <router-link to="/actor">ActorQuerier</router-link> |
                <router-link to="/graph">Graph</router-link>
            </div>
        </el-header>
        <!--        主体区域-->
        <el-main style="padding-left: 15%; padding-right: 15%; padding-top: 3%">
            <!--            路由占位符-->
            <router-view style="align-items: center"></router-view>
        </el-main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isHome: false,
        };
    },
    created() {

    },
    mounted() {
        this.listenPage();
    },

    watch: {
        $route(to, from) {
            console.log(to.path);
            if (to.path === "/home") {
                this.isHome = true;
            } else {
                this.isHome = false;
            }
        },
    },
    methods: {
        listenPage() {
            if(this.$route.path ==='/home'){
                this.isHome=true;
            }
        },
    },
};
</script>

<style scoped>

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
html, body{
    margin: 0;
    padding: 0;
}

#nav{
    float: left;
    font-size: 1.2em;
    font-weight: 600;
    padding-left: 15%;
}

a{
    text-decoration: none;
    color: white;
}

.el-header{
    background-color: black;
    text-align: center;
    line-height: 60px;
}
.el-main {
    background-color: rgb(255, 255, 255);
    color: #333;
    text-align: center;
}
</style>
