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

</style>