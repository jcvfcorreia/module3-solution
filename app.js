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
  var viewList = this;

  viewList.foundItems = function () {
    if (viewList.items === undefined || viewList.items.length === 0 ){
      return true;
    }
    return false;
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var viewList = this;
  var list = [];
  var foundItems = [];

  viewList.getItems = function(searchTerm){
    viewList.items = [];
    viewList.items = MenuSearchService.getMatchedMenuItems(searchTerm);
  }

  viewList.removeItem = function(index){
      MenuSearchService.removeItem(index);
  }

}

MenuSearchService.$inject = ['$http']
function MenuSearchService($http){
  var service = this;
  var list = [];
  var foundItems = [];
  service.getMatchedMenuItems = function(searchTerm){
    foundItems = [];
    var response = $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
    }).then(function (response) {
      console.log(response);
      list = response.data.menu_items;

      for (var i = 0; i < list.length;i++){

        if (searchTerm !== undefined && searchTerm !== ''){
          console.log(list[i].description);
          if (list[i].description.indexOf(searchTerm) !== -1){
            console.log('push');
            foundItems.push(list[i]);
          }
        }
      }

    })
    .catch(function (error) {
      console.log(error);
    })
    return foundItems;
  }

  service.removeItem = function (itemIndex) {
      foundItems.splice(itemIndex,1);
  };
}
})();
