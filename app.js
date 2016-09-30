(function(){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service("MenuSearchService",MenuSearchService)
.directive("foundItems",FoundItemsDirective)

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

  /*list.cookiesInList = function () {
    for (var i = 0; i < list.items.length; i++) {
      var name = list.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return false;
  };*/
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var viewList = this;

  viewList.getItems = function(searchTerm){
      var promise = MenuSearchService.getMatchedMenuItems();

      promise.then(function (response) {
        //viewList.items = response.data;
        console.log(response);
        viewList.items = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}

MenuSearchService.$inject = ['$http']
function MenuSearchService($http){
  var service = this;

  service.getMatchedMenuItems = function(){
    var response = $http({
    method: "GET",
    url: ("http://davids-restaurant.herokuapp.com/categories.json")
  });

  return response;
  }
}
})();
