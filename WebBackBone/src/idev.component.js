var app = angular.module('idev.components', ['ngEventExtension', 'attrExtension', 'toast.component', 'preload.component', 'pagination.component', 'highlight.filter', 'pickadate.component', 'rightClick.menu', 'custom.component']);
var $log = console.log;

angular.module('ngEventExtension', [])
    .directive('ngRightClick', ['$parse', function ($parse) {
        return function (scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function (event) {
                scope.$apply(function () {
                    event.preventDefault();
                    fn(scope, { $event: event });
                });
            });
        };
    }])

angular.module('rightClick.menu', [])
    .provider('_contextMenu', [function () {
        return (function () {
            return {
                $get: ['$q', function ($q) {
                    var contextInst = {}

                    contextInst.open = function () {
                        var context_menu_instance = {};
                        var e = window.event;
                        var body = $('body') || $(document),
                            context_menu = $('<ul>')
                        modal = $('<div>');
                        context_menu.append(5555);
                        context_menu.css({
                            'z-index': 10000,
                            'position': 'absolute',
                            'left': e.clientX + 'px',
                            'top': e.clientY + 'px'
                        });
                        body.append(context_menu);
                        var promise = $q(function (resolve, reject) { });

                        return context_menu_instance;
                    };

                    return contextInst;
                }]
            };
        })();
    }]);

angular.module('attrExtension', [])
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

angular.module('highlight.filter', [])
    .filter('highlight', ['$sce', function ($sce) {
        return function (input, pattern) {
            input = input || '';
            if ((pattern || '') == '')
                return input;
            var regex = new RegExp(pattern, 'g');

            return $sce.trustAsHtml(input.replace(regex, '<span style="background-color:yellow;">' + pattern + '</span>'));
        };
    }]);

angular.module('toast.component', [])
    .service('toast', ['$timeout', '$document', function (tim, doc) {
        return function (options) {
            var _self = this;
            var $ = angular.element;
            var _container = $('<div></div>');
            var _counter = 0;
            var _config = (function (opts) {
                return angular.extend({}, opts, options);
            })({
                type: 'default',
                message: 'There is no content yet.',
                delay: 5000,
                position: 'topRight',
                size: 'medium',
                autoClose: true
            });

            var _cssPosition = function (param) {
                var convert = {
                    toPixel: function (numb) {
                        return numb + 'px';
                    }
                };

                switch (param) {
                    case "topRight":
                        return {
                            position: 'fixed',
                            top: convert.toPixel(55),
                            right: convert.toPixel(5)
                        };
                    default:
                        return {
                            position: 'fixed',
                            top: convert.toPixel(15),
                            right: convert.toPixel(5),
                        };
                }
            };
            var _cssSize = function (param) {
                switch (param) {
                    case 'small': return {
                        'font-size': '14px'
                    };
                    case 'medium': return {
                        'font-size': '18px'
                    };
                    case 'large': return {
                        'font-size': '24px'
                    };
                    case 'extra': return {
                        'font-size': '36px'
                    };
                    default: return {
                        'font-size': '18px'
                    };
                }
            }
            var _style = function (param) {
                switch (param) {
                    case 'default': return 'alert alert-info';
                    case 'success': return 'alert alert-success';
                    case 'info': return 'alert alert-info';
                    case 'warning': return 'alert alert-warning';
                    case 'danger': return 'alert alert-danger';
                };
            };

            this.type = _config.type;
            this.position = _config.position;
            this.message = _config.message;
            this.size = _config.size;
            this.Pop = function (_callback) {
                _counter++;
                _container
                    .html(_self.message)
                    .css(angular.extend({ 'z-index': 99999 }, _cssPosition(_self.position), _cssSize(_self.size)))
                    .addClass(_style(_self.type));
                doc.find('body').append(_container);

                if (_config.autoClose) {
                    tim(function () {
                        _container.remove();
                        _counter--;
                        if (angular.isFunction(_callback))
                            _callback();
                    }, _config.delay);
                }
            }
        }
    }]);

angular.module('preload.component', [])
    .directive('preload', ['$http', function ($http) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v) {
                    if (v)
                        angular.element(elm).css('display', '');
                    else
                        angular.element(elm).css('display', 'none');
                });
            }
        };
    }]);

angular.module('pagination.component', [])
    .service('pagination', [function () {
        var currentPage,
            pageSize,
            lastPage,
            pageRange,
            _ds;

        var pagination = function (datasource) {
            _ds = datasource || [];
            currentPage = 0;
            pageSize = 10;
            pageRange = 5;
            lastPage = Math.ceil(_ds.length / pageSize);
        }

        pagination.prototype.setPageRange = function (numb) {
            pageRange = numb;
        }

        pagination.prototype.ItemsCount = function () {
            return _ds.length;
        }

        pagination.prototype.Datasource = function () {
            return _ds;
        }

        pagination.prototype.CurrentPage = function () {
            return currentPage + 1;
        }

        pagination.prototype.LastPage = function () {
            return lastPage;
        }

        pagination.prototype.setPage = function (page) {
            if (page > -1 && page < lastPage)
                currentPage = page;
        }

        pagination.prototype.nextPage = function () {
            if (currentPage < lastPage - 1)
                currentPage++;
        }

        pagination.prototype.prevPage = function () {
            console.log(currentPage);
            if (currentPage > 0)
                currentPage--;
        }

        pagination.prototype.closeToCurrent = function (page) {
            var numbInRange = (function (p) {
                var divideBy2 = p / 2;
                var ret = [];

                if (currentPage + 1 > lastPage - divideBy2) {
                    for (var i = 0; i < pageRange; i++)
                        ret.push(lastPage - i);
                } else if (currentPage + 1 < pageRange - divideBy2) {
                    for (var i = 0; i < pageRange; i++)
                        ret.push(i + 1);
                }
                else {
                    var cp = currentPage + 1;
                    ret.push(cp);
                    for (var i = 1; i < divideBy2 + 1; i++)
                        ret.push(cp - i);
                    for (var i = 1; i < divideBy2 + 1; i++)
                        ret.push(cp + i);

                    console.log(ret);
                }
                return ret;
            })(pageRange % 2 ? pageRange - 1 : pageRange);
            var pageDistant = page - currentPage;

            return numbInRange.indexOf(page) > -1;
        }

        pagination.prototype.first = function () {
            currentPage = 0;
        }

        pagination.prototype.IsFirst = function () {
            return currentPage + 1 === 1;
        }

        pagination.prototype.last = function () {
            currentPage = lastPage - 1;
        }

        pagination.prototype.IsLast = function () {
            return currentPage + 1 == lastPage;
        }

        pagination.prototype.getPageContent = function () {
            var _start = currentPage * pageSize;

            return _ds.slice(_start, _start + pageSize);
        }

        pagination.prototype.btnPageSet = function () {
            var _ret = [];
            for (i = 1; i <= lastPage; i++)
                _ret.push(i);

            return _ret;
        }

        return pagination;
    }]);

angular.module('pickadate.component', [])
    .directive('datepicker', function () {
        return {
            require: 'ngModel',
            link: function (scope, el, attr, ngModel) {
                $(el).pickadate({
                    onSet: function (thingSet) {
                        scope.$apply(function () {
                            ngModel.$setViewValue(new Date(thingSet.select));
                        });
                    }
                });
            }
        };
    });

angular.module('custom.component', [])
    .directive('textEclipse', function () {
        return {
            restrict: 'A',
            controller: function ($scope, $element, $window) {
                var element_default_width = $element[0].offsetWidth,
                    element = angular.element($element[0]);

                element.css({
                    'width': element_default_width + 'px',
                    'text-overflow': 'eclipse',
                    'overflow': 'hidden',
                    'white-space': 'nowrap',
                });
            },
        }
    })
    .directive('fitBottomEdge', function () {
        return {
            restrict: 'EA',
            controller: function ($scope, $element, $window) {
                var cal_element_height = $window.innerHeight - $element[0].offsetTop,
                    scroll_bar_height = 7;

                angular.element($window).on('resize', function () {
                    when_window_resize();
                });

                function when_window_resize() {
                    cal_element_height = $window.innerHeight - $element[0].offsetTop;
                    $element[0].style.height = cal_element_height - (when_scrollbar_x_visible() ? scroll_bar_height : 0) + 'px';
                }
                function when_scrollbar_x_visible()
                {
                    if ($window.screenX > $window.outerWidth)
                        return true;
                    else
                        return false;
                }

                when_window_resize();
            }
        };
    })
    .directive('uiCircle', function () {
        return {
            restrict: 'EA',
            transclude: true,
            scope: {
                size: '@',
                color: '@',
                fcolor: '@',
            },
            template: '<div ng-style="ctrl.styles.circle"><ng-transclude></ng-transclude></div>',
            controller: ['$scope', function (scope) {
                var size = scope.size.replace(/px|em/g, ''),
                    unit = scope.size.replace(/\d/g, '');
                size = +size - (+size * (1 / 3));

                this.styles = {
                    circle: {
                        'border-radius': '100%',
                        'background-color': scope.color || 'rgba(38, 38, 38, 0.5)',
                        'color': scope.fcolor || 'rgba(0, 0, 0, 1)',
                        'height': scope.size,
                        'width': scope.size,
                        'display': 'inline-block',
                        'text-align': 'center',
                        'align-items': 'center',
                        'vertical-align': 'middle',
                        'line-height': scope.size,
                        'font-size': size + unit,
                    }
                };
            }],
            controllerAs: 'ctrl'
        };
    })
    .filter('runTo', function () {
        return function (numb, p1, p2) {
            if (!angular.isNumber(numb))
                throw 'error is not a number.'

            const ret = [];
            for (i = numb; i <= p1; i += p2 || 1)
                ret.push(i);

            return ret;
        }
    });