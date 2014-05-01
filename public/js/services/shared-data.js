angular.module('SharedDataSvc', []).factory('SharedData', function() {
    var selectedTank = null
    return {
        saveSelectedTank: function(data){
            selectedTank = data
        },
        getSelectedTank : function(){
            return selectedTank
        }
    }

})
