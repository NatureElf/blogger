var app = angular.module("bloggerApp", ["ngRoute", "ui.router"]);
/* Config */
app.config(function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "pages/home.html",
        controller: "HomeController",
        controllerAs: "vm",
      })
      .when("/blogs", {
        templateUrl: "blog-list.html",
        controller: "ListController",
        controllerAs: "vm",
      })
      .when("/blogs/add", {
        templateUrl: "blog-add.html",
        controller: "AddController",
        controllerAs: "vm",
      })
      .when("/blogs/edit/:id", {
        templateUrl: "blog-edit.html",
        controller: "EditController",
        controllerAs: "vm",
      })
      .when("/blogs/delete/:id", {
        templateUrl: "blog-delete.html",
        controller: "DeleteController",
        controllerAs: "vm",
      })
      .otherwise({ redirectTo: "/" });
  });

app.config(function ($stateProvider) {
  $stateProvider.state("blog-list", {
    url: "/blog-list",
    templateUrl: "pages/blog-list.html",
    controller: "ListController",
  });
});

/* Controllers */
app.controller("HomeController", function HomeController() {
  var vm = this;
  vm.title = "Nick's Blog Site";
  vm.message = "Welcome to my blog site. For more information about me and what I do on a daily basis, feel free to stop by and read around. Enjoy!";
});

app.controller("ListController", function ListController(){
  var vm = this;
  vm.title = "Nick's Blog Site";
  vm.message = "Welcome to my blog site. For more information about me and what I do on a daily basis, feel free to stop by and read around. Enjoy!";
});

/* REST API Functions */

