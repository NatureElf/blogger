var app = angular.module("bloggerApp", ["ngRoute", "ui.router"]);
/* Config */
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "home.html",
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
    .when("/register/", {
      templateUrl: "register.html",
      controller: "RegisterController",
      controllerAs: "vm",
    })
    .when("/login/", {
      templateUrl: "login.html",
      controller: "LoginController",
      controllerAs: "vm",
    })
    .otherwise({ redirectTo: "/" });
});

/* Controllers */
app.controller("HomeController", function HomeController() {
  var vm = this;
  vm.title = "Nick's Blog Site";
  vm.message =
    "Welcome to my blog site. For more information about me and what I do on a daily basis, feel free to stop by and read around. Enjoy!";
});

app.controller("ListController", [ '$http','authentication', function ListController($http, authentication){
  var vm = this;
    vm.title = "Blog List";

    vm.isLoggedIn = function () {
      return authentication.isLoggedIn();
    };
    
    getAllBlogs($http)
      .success(function(data) {
        vm.blogs = data;
        vm.message = "Blog data found!";
      })
      .error(function (e) {
        vm.message = "Could not get list of blogs";
      });
}]);

app.controller("AddController", [ '$http', '$routeParams', '$state', 'authentication', function AddController($http, $routeParams, $state, authentication) {
  var vm = this;
  vm.blog = {};
  vm.title = 'Add Blog';
  
  vm.submit = function() {
      var data = vm.blog;
      data.blogTitle = addForm.blogTitle.value;
      data.blogText = addForm.blogText.value;
             
      addBlog($http, authentication, data)
        .success(function(data) {
          vm.message = "Blog data added!";
          $state.go('blog-list');
        })
        .error(function (e) {
          vm.message = "Could not add blog";
        });
  }
}]);

app.controller("EditController", [ '$http', '$routeParams', '$state', 'authentication', function EditController($http, $routeParams, $state, authentication) {
  var vm = this;
  vm.blog = {};
  vm.id = $routeParams.id;
  vm.title = "Edit Blog";
  
  getBlogById($http, vm.id)
    .success(function(data) {
      vm.blog = data;
      vm.message = "Blog data found!";
    })
    .error(function (e) {
      vm.message = "Could not get blog given id of " + vm.id;
    });
  
  vm.submit = function() {
      var data = vm.blog;
      data.blogTitle = editForm.blogTitle.value;
      data.blogText = editForm.blogText.value;
             
      updateBlogById($http, authentication, vm.id, data)
        .success(function (data) {
          vm.message = "Blog data updated!";
          $state.go("blog-list");
        })
        .error(function (e) {
          vm.message = "Could not update blog given id of " + vm.id;
        });
  }

  vm.cancel = function() {
    $state.go('blog-list');
  }
}]);

app.controller("DeleteController", [ '$http', '$routeParams', '$state', 'authentication', function DeleteController($http, $routeParams, $state, authentication) {
  var vm = this;
  vm.blog = {};
  vm.id = $routeParams.id;
  vm.title = "Delete Blog";
  
  getBlogById($http, vm.id)
    .success(function(data) {
      vm.blog = data;
      vm.message = "Blog data found!";
    })
    .error(function (e) {
      vm.message = "Could not get blog given id of " + vm.id;
    });
  
  vm.submit = function() {
      var data = {};      
      deleteBlogById($http, authentication, vm.id)
        .success(function (data) {
          vm.message = "Blog data deleted!";
          $state.go("blog-list");
        })
        .error(function (e) {
          vm.message = "Could not delete blog given id of " + vm.id;
        });
  }
  
  vm.cancel = function() {
      $state.go('blog-list');
  }
}]);

/* REST API Functions */
function getAllBlogs($http) {
  return $http.get('/api/blogs');
}

function getBlogById($http, id) {
  return $http.get('/api/blogs/' + id);
}

function updateBlogById($http, authentication, id, data) {
  return $http.put('/api/blogs/' + id, data, { headers: { Authorization: 'Bearer ' + authentication.getToken() }});
}

function addBlog($http, authentication, data) {
  return $http.post('/api/blogs/', data, { headers: { Authorization: 'Bearer ' + authentication.getToken() }});
}

function deleteBlogById($http, authentication, id) {
  return $http.delete('/api/blogs/' + id, { headers: { Authorization: 'Bearer ' + authentication.getToken() }});
}

//*** State provider ***
app.config(function($stateProvider) {
  $stateProvider
      .state('blog-list', {
        url: '/blogs',
        templateUrl: 'blog-list.html',
        controller : 'ListController'
      });
});
