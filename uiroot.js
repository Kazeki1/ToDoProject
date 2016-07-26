// 160725-1500-Todd-ToDo_uiroot_js
angular.module('myApp', ['ui.router'])
    .directive('triggerFocusOn', function($timeout) {
        // console.log("87 triggerFocusOn: " + $timeout);
        return {
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    $timeout(function() {
                        var otherElement = document.querySelector('#' + attrs.triggerFocusOn);

                        if (otherElement) {
                            otherElement.focus();
                        }
                        else {
                            console.log("Can't find element: " + attrs.triggerFocusOn);
                        }
                    });
                });
            }
        };
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tabs', {
                url: '/tabs',
                template: '<tabs></tabs>'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'about.html'
            });
        $urlRouterProvider.otherwise('/tabs');  //otherwise means set my default route
    })
    .component('tabs', {           //parent
        bindings: {
            list: '<'
        },
        controller: function(servtodo) {
            var this2 = this;
            this2.tabs = servtodo.list;  // the main array of lists
            this2.selectList = function(list) {
                this2.selectedList = servtodo.currentList = list;
            };
            this2.selectedList = servtodo.currentList;
            this2.addList = function() {
                if(this2.nuList === undefined || this2.nuList === "") {
                }else{
                    servtodo.addList(this2.nuList);
                    this2.nuList = "";
                }
            };
            this2.removeTab=function(tab){
                var index=this2.tabs.indexOf(tab);
                if(index != -1 && index != 0) {
                    this2.tabs.splice(index, 1);
                }
            };

        },
        templateUrl:'tabs.html'
    })
    .component('toDo1', {        //child
        bindings: {
            list: '<'
        },
        controller: function(servtodo) {
            var this1 = this;
            this1.aName = '';
            this1.addTodo = function (list) {
                this1.list.todo.push({'title': this1.newTodo, 'done': false});
                this1.newTodo = ''
            };
            this1.clearCompleted = function (item) {
                this1.list.todo = this1.list.todo.filter(function (item) {
                    return !item.done
                })
            };
        },
        templateUrl: 'todo.html'
    })

    .service('servtodo', function(){
        var serv =this;
        serv.list = [];
        serv.list.push({
            name:'Task 1',
            active: true,
            todo:[{
                title:'item1',
                done:false
            }]
        });
        serv.currentList = serv.list[0];
        serv.addList = function(name) {
            serv.list.push({
                name:name,
                active: true,
                todo:[{
                    title:'Item1',
                    done:false
                }]
            });
        }
    });
