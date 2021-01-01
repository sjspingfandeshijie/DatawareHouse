<template>
    <div id="movie-querier">
        <div class="rule">
            <h1>Please Set Searching Rules</h1>
            <hr />
            <div class="content">
                <div class="myform">
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="产品ID">
                            <el-input v-model="form.productId" placeholder="产品ID">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submit">Search</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div>
                    <div class="time">
                        <h2>每个请求占一秒的百分比</h2>
                        <el-progress style="margin-top:15px;" :text-inside="true" :stroke-width="20" :percentage="usedtime.redis"></el-progress>
                        <el-progress :text-inside="true" :stroke-width="20" :percentage="usedtime.neo4j" color="rgba(142, 113, 199, 0.7)"></el-progress>
                        <el-progress :text-inside="true" :stroke-width="20" :percentage="usedtime.influxdb" status="success"></el-progress>
                        <el-progress :text-inside="true" :stroke-width="20" :percentage="usedtime.zonghedb" status="exception"></el-progress>
                    </div>
                    <div class="label">
                        <p>Redis</p>
                        <p>Neo4j</p>
                        <p>Influxdb</p>
                        <p>综合DB</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {

    name: "Actor",
    data() {
        return {

            usedtime:{
                redis: 40,
                neo4j: 30,
                influxdb: 20,
                zonghedb: 10,
            },

            form: {
                productID: '',
                title: '',
                director: '',
                actor: '',
                supportingActors: '',
                genre: '',
                star: '',
                releaseDate: '',
                runTime: '',
            },
            movieData: []
        }
    },
    methods: {
        submit(){
            let result = axios.post(
                this.$api.SearchActorUrl,
                JSON.stringify({
                    name: "Kevin Pollack",
                })
            );
            console.log(result)
        }
    },
}
</script>

<style scoped>

.time{
    width: 40%;
    float: right;
}

#result{
    display: block;
    margin-top: 20px;
}
h1{
    margin: 0;
    padding: 0;
    font-size: 1.2em;
    font-weight: 600;
    position: relative;
    right: 35%;
    display: block;
}
hr{
    display: block;
    margin-top: 2%;
    margin-bottom: 2%;
}
.myform{
    float: left;
}

.label{
    float: right;
    width: 8%;
    margin-top: 5.5%;
}
.label p{
    height: 35px;
}
.el-progress{
    margin-top: 30px;
    margin-bottom: 20px;
}
h2{
    font-size: 1.2em;
    margin-bottom: 8%;
}
</style>