(function(){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service("MenuSearchService",MenuSearchService)
.directive("foundItems",FoundItemsDirective)
})();
