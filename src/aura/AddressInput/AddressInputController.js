({
	jsLoaded: function(component, event, helper) {
    
            $('#look_menu').hide();
           
     },
    
  autoCompelte: function(component, event, helper) {
        
   //   debugger;
      var addresses = [];
      
      var action = component.get("c.getAddressAutoCompelete");
      
      var input = $("#lookup").val();
      var types = component.get("v.types");
      var components = component.get("v.components");
      var apiKey = component.get("v.apikey");
      
      action.setParams({
          "input": input,
          "types": types,
          "components": components,
          "apiKey": apiKey
      });
      
      action.setCallback(this, function(response) {
          var state = response.getState();
    //      debugger;
          if (state === "SUCCESS") {
              var response = JSON.parse(response.getReturnValue());
              var predictions  = response.predictions;
              if (predictions.length>0) {
                  for (var i = 0; i < predictions.length; i++) {
                      addresses.push(predictions[i].description);
                  }
                  component.set("v.addresses", addresses);
                  
                  $("#look_menu").show();
              }else{
                  $("#look_menu").hide();
              }
              
          }
      });
      $A.enqueueAction(action);
  },  
    
  selectAddress: function(component, event, helper) {
      
      var elm = event.target;
     // debugger;
      component.set("v.selectAddress", elm.addressvalue);
       $("#look_menu").hide();
     

  },
  
    saveSelectedAddress : function(component, event, helper) {
        
        var action = component.get("c.saveAddress");
        var apiKey = component.get("v.apikey");
        var addressValue = $("#lookup").val();
        
        
        action.setParams({
          "address": addressValue,
          "apiKey": apiKey
        });
        
        action.setCallback(this, function(response) {
          var state = response.getState();
    //      debugger;
          if (state === "SUCCESS") {
              var result = response.getReturnValue();
              if (result!=null) {
                  console.log(result.Location__Latitude__s);
                  var toastEvent = $A.get("e.force:showToast");
                  toastEvent.setParams({
                      "title": "Message!",
                      "message": "The address has been saved successfully."
            
                   });
                   toastEvent.fire();
                  
                   var mapEvent = $A.get("e.c:AddressInfo");
                   mapEvent.setParams({
                       "address": addressValue,
                       "lat":result.Location__Latitude__s,
                       "lng":result.Location__Longitude__s
                   });
                   mapEvent.fire();
                  
              }
              else{
                  var toastEvent = $A.get("e.force:showToast");
                  toastEvent.setParams({
                      "title": "Message!",
                      "message": "The address already exists."
            
                   });
                   toastEvent.fire();
              }
              
              
              
          }
              
          
      });
      $A.enqueueAction(action);
    }
    
    
})