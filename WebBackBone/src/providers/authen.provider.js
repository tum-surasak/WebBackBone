var authenProvider = function () {
    this.cookieName = 'site.token';
    this.$get = [function () {
        return {
            display_name: 'surasak.rit',
            authorize: true,
        }
    }];
}