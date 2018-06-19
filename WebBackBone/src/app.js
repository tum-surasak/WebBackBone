angular.module('holistic.version2', [
    'ui.router',
    'idev.components',
    'site.provider',
])
    .config(appConfig)
    .run(['$rootScope', 'authen', '$state', function ($rootScope, authen, $state) {
        $rootScope.Credential = authen;
        $rootScope.RouteState = function (state_name, params) {
            $state.transitionTo(state_name, params);
        }
    }])
    .controller('homeController', [function () {
        var ctrl = this;
        var styles = {
            container: {
                width: 250,
            }
        };
        this.layout = {
            styles: {
                leftSide: {
                    'min-width': styles.container.width + 'px',
                    'display': 'inline-block',
                    'padding-right': '15px',
                },
                rightSide: {
                    'width': 'calc(100% - ' + (styles.container.width + 5 + 'px') + ')',
                    'display': 'inline-block',
                    //'vertical-align': 'middle',
                }
            }
        };
        this.Menus = [
            { label: 'menu 01' },
            { label: 'menu 02' },
            { label: 'menu 03' },
        ];
    }])
    .controller('panelController', [function () {
        var ctrl = this;
        var d = Date.now();
        this.items = [
            { label: 'Documents 1', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 2', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 3', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 4', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 5', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 6', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 7', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 8', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 9', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 10', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 1', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 2', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 3', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 4', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 5', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 6', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 7', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 8', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 9', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
            { label: 'Documents 10', owner: { name: 'มหาวิทยาลัย' }, modified_date: d },
        ];
    }]);