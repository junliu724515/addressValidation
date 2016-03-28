public with sharing class AddressInputController {

    private final static String DEFAULTKEY = 'AIzaSyAR5r8p60jHH0LuvmZGIqULV3adYc2Wx-c';
    
    @AuraEnabled
    public static string getAddressAutoCompelete(String input, String types, String components, String apiKey){
 
        string url =  'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+EncodingUtil.urlEncode(input, 'UTF-8')+'&types='+types+'&components='+components+'&key='+apiKey;
       
        String str=makeCall(url);
        return str;
    }
    
    @AuraEnabled
    public static Listing__c saveAddress(String address, String apiKey) {
        
        List<Listing__c> listings = [SELECT Address__c FROM Listing__c where Address__c=:address];
        
        if (listings.size()>0) {
            
            return null;
        }

        String url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+EncodingUtil.urlEncode(address, 'UTF-8')+'&key='+apiKey;
        String str = makeCall(url);
        Map<String, Object> response = (Map<String, Object>)JSON.deserializeUntyped(str);
     //   System.debug('response: ' +response);
        List<Object> results = (List<Object>)response.get('results');
    //    System.debug('results size: ' +results.size());
    //    System.debug('results: ' +results.get(0));
        Map<String, Object> root = (Map<String, Object>)results.get(0);
        Map<String, Object> geometry = (Map<String, Object>)root.get('geometry');
    //    System.debug('geometry: ' +geometry);
        Map<String, Object> location = (Map<String, Object>)geometry.get('location');
        
        Decimal latitude = (Decimal)location.get('lat');
        Decimal longitude = (Decimal)location.get('lng'); 
        
        Listing__c newListing = new Listing__c();
        newListing.Address__c = address;
        newListing.Location__Latitude__s = Double.valueOf(latitude);
        newListing.Location__Longitude__s = Double.valueOf(longitude);
        
        insert newListing;
        
        return newListing;
        
        
    }
    
    
    private static String makeCall(String url){
        
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        
        req.setendpoint(url);
        req.setmethod('GET'); 
        HttpResponse result;
        result = http.send(req);
        
        String str=result.getbody();
        return str;
    }
    
    
}