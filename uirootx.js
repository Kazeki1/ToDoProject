// 160726-0415-Todd-ToDo_uiroot_js
angular.module('myApp', ['ui.router', 'ngStorage'])

// <!--160726-0415-Todd-ToDo_tabs_html-->
// <a id="about" ui-sref="about">About</a>
//     <div id="inputbox">
//     Create Task<br>
// <input ng-model="$ctrl.nuList" placeholder="Enter New Task"/><button class="saveitembtn" ng-click="$ctrl.addList()">GO</button>
//     </div>
//
//     <span id="tabs" ng-repeat="tab in $ctrl.tabs" >
//     <button id="blubtn" ng-click="$ctrl.selectList(tab)">{{tab.name}}</button>
// <button id="redbtn" ng-click="$ctrl.removeTab(tab)" ng-click="removeTab()" ng-if="$index > 0" class="glyphicon glyphicon-remove">
//     </button>
//     </span>
//     <div>
//     <to-do1 list='$ctrl.selectedList'></to-do1>
//     </div>

// ngStorage code
// var app = angular.module('myApp', ['ngStorage']);
//// .controller('BoxController', function($scope, $localStorage, $sessionStorage) {
//     var this3 = this;
//Assigning $localstorage to $session.storage
// this3.storage = $localStorage;
// //We have counter but for ng-repeat to work
// //we need array so creating range array to store each counter value
// this3.range = [];
// for(var x = 0, len =  this3.storage.counter || 0; x < len ; x++)
// {
//     this3.range.push(x+1);
// }

// //increasing counter and pushing value in range array
// this3.addTab = function() {
//     this3.storage.counter = ( typeof this3.storage.counter !== "undefined" ) ? this3.storage.counter + 1 : 1;
//     this3.range.push(this3.storage.counter);
// };
//
// //decreasing counter and removing value from range array
// this3.removeTab = function() {
//     this3.storage.counter = ( typeof this3.storage.counter !== "undefined" && this3.storage.counter > 0) ? this3.storage.counter  - 1 : 0;
//     this3.range.pop(this3.storage.counter);
// }

// })
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

    .config(function ($stateProvider, $urlRouterProvider, $localStorage) {
        $stateProvider
            .state('tabs', {
                url: '/tabs',
                template: '<tabs></tabs>'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'about.html'
            })
            .storage = $localStorage;
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

            // this2.storage = $localStorage;
            //We have counter but for ng-repeat to work
            //we need array so creating range array to store each counter value
            this2.range = [];
            for(var x = 0, len =  this2.storage.counter || 0; x < len ; x++)
            {
                this2.range.push(x+1);
            }
            //increasing counter and pushing value in range array
            this2.addList = function() {
                this2.storage.counter = ( typeof this2.storage.counter !== "undefined" ) ? this2.storage.counter + 1 : 1;
                this2.range.push(this2.storage.counter);
                if(this2.nuList === undefined || this2.nuList === "") {
                }else{
                    servtodo.addList(this2.nuList);
                    this2.nuList = "";
                }
            };

            //decreasing counter and removing value from range array
            this2.removeTab=function(tab){
                this2.storage.counter = ( typeof this2.storage.counter !== "undefined" && this2.storage.counter > 0) ? this2.storage.counter  - 1 : 0;
                this2.range.pop(this2.storage.counter);
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

