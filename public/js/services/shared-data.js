angular.module('SharedDataSvc', []).factory('SharedData', function() {

    // this will be for storing any other  data as well.
    // there will likely be some other things that need to cross controllers.
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
