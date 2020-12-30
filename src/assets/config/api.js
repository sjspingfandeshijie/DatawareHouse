

const APIRootUrl = 'http://101.132.33.87:8000/';

module.exports = {

    // 组合搜索
    SearchMovieUrl: APIRootUrl + 'movie/searchMovie',

    // 单独搜索
    SearchTimeUrl: APIRootUrl + 'movie/times',
    SearchActorUrl: APIRootUrl + 'movie/actors',
    SearchDirectorUrl: APIRootUrl + 'movie/directors',
    SearchGenreUrl: APIRootUrl + 'movie/genre',
}