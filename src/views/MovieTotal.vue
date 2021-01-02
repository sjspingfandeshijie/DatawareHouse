<template>
    <div id="movie-querier">
        <div class="rule">
            <h1>Please Set Searching Rules</h1>
            <hr />
            <div class="content">
                <div class="myform">
                    <el-form ref="form" :model="form" label-position="left" label-width="100px">
                        <el-form-item label="产品ID">
                            <el-input v-model="form.productID" placeholder="产品ID">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="电影名称">
                            <el-input v-model="form.title" placeholder="电影名称">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="电影类别">
                            <el-input v-model="form.genre" placeholder="电影类别">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="导演名字">
                            <el-input v-model="form.director" placeholder="导演名字">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="演员名字">
                            <el-input v-model="form.actor" placeholder="演员名字">
                            </el-input>
                            <el-radio-group v-model="form.isStarring">
                                <el-radio-button label="true">主演</el-radio-button>
                                <el-radio-button label="false">参演</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="评分">
                            <el-input v-model="form.score" placeholder="评分">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="上映时间">
                            <el-date-picker
                                v-model="form.releaseDate"
                                type="month"
                                value-format="yyyy-MM"
                                placeholder="选择月">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="星期">
                            <el-select v-model="form.week" placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="季节">
                            <el-select v-model="form.quarter" placeholder="请选择">
                                <el-option
                                    v-for="item in options2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
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
        <div id="result">
            <el-table :data="movieData" height="550" stripe style="width: 100%">
                <el-table-column prop="productId" label="电影ID" width="100"></el-table-column>
                <el-table-column prop="title" label="电影名称" width="150"></el-table-column>
                <el-table-column prop="director" label="导演" width="150"></el-table-column>
            </el-table>
        </div>
        <!--            分页区域-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: "MovieTotal",
    data() {
        return {
            options: [
                {
                value: '0',
                label: '星期日'
            }, {
                value: '1',
                label: '星期一'
            }, {
                value: '2',
                label: '星期二'
            }, {
                value: '3',
                label: '星期三'
            }, {
                value: '4',
                label: '星期四'
            }, {
                value: '5',
                label: '星期五'
            }, {
                value: '6',
                label: '星期六'
            }],

            options2: [
                {
                value: '1',
                label: '第一季度'
            }, {
                value: '2',
                label: '第二季度'
            }, {
                value: '3',
                label: '第三季度'
            }, {
                value: '4',
                label: '第四季度'
            }],

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
                isStarring: '',
                genre: '',
                score: '',
                releaseDate: '',
                runTime: '',
                week: '',
                quarter: '',
            },

            movieData: [],

            totalCount: 0,
            pageNum: 1,
            pageSize: 5,
        }
    },
    methods: {
        async submit(){
            // console.log(this.form.releaseDate.substring(5, 7))
            // let result = await this.$http.post(
            //     this.$api.SearchMovieUrl,
            //     {
            //         pageNum: this.pageNum,
            //         pageSize: this.pageSize,
            //         title: this.form.title,
            //         director: this.form.director,
            //         actor: this.form.actor,
            //         isStarring: this.form.isStarring,
            //         genre: this.form.genre,
            //         score: this.form.score,
            //         week: this.form.week,
            //         quarter: this.form.quarter,
            //         // year: this.form.releaseDate.substring(0, 4),
            //         // month: this.form.releaseDate.substring(5, 7),
            //         // runTime: this.form.runTime,
            //     }
            // );
            let result = await this.$http.post(
                this.$api.SearchMovieUrl,
                {
                    pageNum: 1,
                    pageSize: 5,
                    // title: "",
                    director: "Charles Adelman",
                    actor: "Kevin Pollack",
                    isStarring: this.form.isStarring,
                    // genre: this.form.genre,
                    // score: this.form.score,
                    // week: this.form.week,
                    // quarter: this.form.quarter,
                    // year: this.form.releaseDate.substring(0, 4),
                    // month: this.form.releaseDate.substring(5, 7),
                    // runTime: this.form.runTime,
                }
            );
            console.log(result.data.data);
            this.movieData = result.data.data.movies;
            this.totalCount = result.data.data.total;
        },
        //监听pageSize改变的事件
        async handleSizeChange(newSize) {
            this.pageSize = newSize;
            this.pageNumber = 1;
            // console.log("pageSize:"+this.pageSize);
            await this.submit();
        },
        //监听pageNum改变的事件
        async handleCurrentChange(newPage) {
            this.pageNum = newPage;
            // console.log("pageNumber:"+this.pageNumber);
            await this.submit();
        },
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