
const route=require('express').Router();
import {firebase}from './firebasekey';
import 'babel-polyfill';
const randomstring =require("randomstring");
import {generateAsaaseCode,encryptData,decryptdata,generateSecurityKey,generateLandCode} from './helper';




var generateString=function(data){
    var theString=randomstring.generate({
        length:3,
        charset:data
    });
    return theString;
    
}
var generateID=function(data){
    var theString=randomstring.generate({
        length:5,
        charset:'numeric'
    });
    return theString;
    
}



//SingleOwner Class
var SingleOwnerDetails= /** @class */ (function () {
    function SingleOwnerDetails(firstname,lastname,othername,contact,email,NationalIdNo,address,nextOfKin,kin_number,witness,witness_number) {
        this.firstname=firstname;
        this.lastname=lastname;
        this.othername=othername;
        this.contact=contact,
        this.email=email,
        this.NationalIdNo=NationalIdNo,
        this.address=address,
        this.nextOfKin=nextOfKin,
        this.kin_number=kin_number,
        this.witness=witness,
        this.witness_number=witness_number
        
    }
    return SingleOwnerDetails;
}());

//GroupOwner Class
var GroupOwnerDetails= /** @class */ (function () {
    function GroupOwnerDetails(companyName,CompanyType,email,PhoneNumber) {
        this.companyName=companyName,
        this.CompanyType=CompanyType,
        this.email=email,
        this.PhoneNumber=PhoneNumber
    }
    return GroupOwnerDetails;
}());

//Land Details class
var LandDetails= /** @class */ (function () {
    function LandDetails(landsize,Landarea,landregion) {
        this.landsize=landsize
        this.landarea=Landarea;
        this.landregion=landregion;
    }
    return LandDetails;
}());

//Land Details class
var LandOwnershipStatus= /** @class */ (function () {
    function LandOwnershipStatus(landownershiptype,supportingDocuments,date) {
        this.landownershiptype=landownershiptype;
        this.supportingDocuments=supportingDocuments;
        this.DateTended=date
    }
    return LandOwnershipStatus;
}());

var addLandOwnerShipStatus=function(LandOwnershipStatus,index){
        var id=index;
        var LandOwnershiptype=LandOwnershipStatus.landownershiptype;
        var DocumentOfApproval=LandOwnershipStatus.supportingDocuments;
        var DateTended=LandOwnershipStatus.DateTended;

        var landownershipstatusReference=firebase.database().ref("LandownershipStatus");
        landownershipstatusReference.child(id).set({
            LandOwnershiptype:LandOwnershiptype,
            SupportingDocument:DocumentOfApproval,
            DateTended:DateTended
        },function(error){
            if(error){
                console.log("Data was unable to save"+error);
                return false

            }
        })
        return true;
    }




//function to add Group Owners to the table
var addGroupOwner=function(OwnerDetails,index){
        var id=index;
        var companyName=OwnerDetails.companyName;
        var CompanyType=OwnerDetails.CompanyType;
        var email=OwnerDetails.email;
        var contact=OwnerDetails.PhoneNumber;
        
        var ownerReference=firebase.database().ref("owner");
        ownerReference.child(id).set({
            companyName:companyName,
            CompanyType:CompanyType,
            lastname:lastname,
            contact:contact,
            email:email
            
        },function(error){
            if(error){
                console.log("Data was unable to save"+error);
                return false

            }
        })
        return true;
      }



//adding owner to dadabase

var addSingleOwner=function(OwnerDetails,index){
    
        
        var id=index;
        var firstname=OwnerDetails.firstname;
        var lastname=OwnerDetails.lastname;
        var othername=OwnerDetails.othername;
        var contact=OwnerDetails.contact;
        var email=OwnerDetails.email;
        var NationalIdNo=OwnerDetails.NationalIdNo;
        var address=OwnerDetails.address;
        var nextOfKin=OwnerDetails.nextOfKin;
        var kin_number=OwnerDetails.kin_number;
        var witness=OwnerDetails.witness;
        var witness_number=OwnerDetails.witness_number;


        
        
        var ownerReference=firebase.database().ref("owner");
        ownerReference.child(id).set({
            firstname:firstname,
            lastname:lastname,
            contact:contact,
            email:email,
            othername:othername,
            NationalIdNo:NationalIdNo,
            address:address,
            nextOfKin:nextOfKin,
            kin_number:kin_number,
            witness:witness,
            witness_number:witness_number

            
        },function(error){
            if(error){
                console.log("Data was unable to save"+error);
                return false

            }
        })
        return true;
    }

    


  

 //adding a land
 var addland=function(landDetails,index){

        var id=index;
        var landregion=landDetails.landregion;
        var landsize=landDetails.landsize;
        var landarea=landDetails.landarea;
    
        
        
        var landReference=firebase.database().ref("Lands");
        landReference.child(id).set({
            landregion:landregion,
            landsize:landsize,
            landarea:landarea
            
            
        },function(error){
            if(error){
                console.log("Data was unable to save"+error);
                return false

            }
        })
        return true;
    }



    
    

var  landownership=function(CompoundDetails){
    
    
    var msg;
    var index;
    //data of owner
    
    var firstname=CompoundDetails.firstname;
    var lastname=CompoundDetails.lastname;
    var othername=CompoundDetails.othername;
    var contact=CompoundDetails.contact;
    var email=CompoundDetails.email;
    var NationalIdNo=CompoundDetails.NationalIdNo;
    var address=CompoundDetails.address;
    var nextOfKin=CompoundDetails.nextOfKin;
    var kin_number=CompoundDetails.kin_number;
    var witness=CompoundDetails.witness;
    var witness_number=CompoundDetails.witness_number;
    
    
    //data of land
    var landregion=CompoundDetails.region;
    var landsize=CompoundDetails.landsize;
    var landarea=CompoundDetails.landarea;
    //var landimage=CompoundDetails.landimage

    //data of landownershipStatus
    var landownershiptype=CompoundDetails.landownershiptype;
    var DocumentOfApproval=CompoundDetails.supportingDocuments;
    var DateTended=CompoundDetails.DateTended

    var id=generateLandCode(landregion);
    var OwnerType=CompoundDetails.OwnerType; 

    var newLand=new LandDetails(landsize,landarea,landregion)
    
    
    var newLandOwnershipStatus=new LandOwnershipStatus(landownershiptype,DocumentOfApproval,DateTended);
    
    

    if(OwnerType==="SingleOwner"){
        var newSingleOwner=new SingleOwnerDetails(firstname,lastname,othername,contact,email,NationalIdNo,address,nextOfKin,kin_number,witness,witness_number);
        if(addSingleOwner(newSingleOwner,id) && addLandOwnerShipStatus(newLandOwnershipStatus,id) && addland(newLand,id)){

            msg="Data was added successfully";
            index=id;
        }
        
        
}else if(OwnerType==="GroupOwner"){
    var companyName=CompoundDetails.companyName;
    var CompanyType=CompoundDetails.CompanyType;
    var email=CompoundDetails.email;
    var contact=CompoundDetails.contact;
    var newGroupowner=new GroupOwnerDetails(companyName,CompanyType,email,contact);
    if(addGroupOwner(newGroupowner,id) &&  addland(newLand,id) &&  addLandOwnerShipStatus(newLandOwnershipStatus,id)){
       
            msg ="Data was saved successfully";
            index=id;

    }else{
            msg="Error occured and data wasnt able to save successfully"
    }
    
    
    
}
    return {
        msg:msg,
        index:index
    }

}



var saveAsaasecode=function(data,callback){
    var asaasecode=generateAsaaseCode();
    var characters=generateString(data.landarea)+generateString(data.NationalIdNo)+generateString("ZJXMWOPQLHJ");
    var securitynumber=generateSecurityKey(characters);

   var body={
        data:data,
        securitynumber:securitynumber
    }
    var dataToencrypt=encryptData(body);
    var msg;

    var asaasecodeReference=firebase.database().ref("AsaasecodeData");
    asaasecodeReference.child(asaasecode).set({
        record:dataToencrypt
    },function(error){
        if(error){
                msg = "Error occured and data wasnt able to save successfully"
         
        }
         else{
            
                msg= "Data has been saved successfully"
            
         }
         return callback({
            msg:msg,
            asaasecode:asaasecode,
            securitynumber:securitynumber
         })
         
        
  
        
    })
}

//function to update the asaasedetails
const updateAsaaseCode=function(data,asaasecode,callback){
    var asaasecode=asaasecode;
    var dataToencrypt=encryptData(data);
    
    const  asaasecodeReference=firebase.database().ref("AsaasecodeData");
    asaasecodeReference.child(asaasecode).set({
        record:dataToencrypt
    },function(error){
        //var msg;
        if(error){
              var  msg = "Error occured and data wasnt able to save successfully"
         
        }
         else{
            msg= "Data has been saved successfully"

         }
         return callback({
             details:msg
         })
        
    })
}
const  getAsaaseDetails=function(asaasecode,callback){
        
    const  asaasedetails=firebase.database().ref("AsaasecodeData").orderByKey().equalTo(asaasecode);
      
    asaasedetails.once("child_added",function(snapshot){
        
        const  Data={
            iv:snapshot.val().record.iv,
            encryptedData:snapshot.val().record.encryptedData
        }
        const  decryptedData=decryptdata(Data);
        const mydetail =decryptedData
        return callback({
            detail:mydetail
        })
       
      })
       
}


const asaasecodeExist= function (data,callback){
    
        const mydata=firebase.database().ref("AsaasecodeData").orderByKey().equalTo(data);
        mydata.once("value",function(snapshot){
            if(snapshot.exists()){
                 var status=true
            }else{
                 var status=false
            }
            return callback({
                response:status
            })
})
}



const addLandToAccount=function(data,callback){
    
    var asaasecode=data.asaasecode;
    var securitynumber=data.securitynumber;
     asaasecodeExist(asaasecode,function(detail){
         
        var response=detail.response
        var err=null;
        var data=null;
         if(response){
             getAsaaseDetails(asaasecode,function(response){     
                 var secCode=response.detail.securitynumber;
                 if(secCode!=securitynumber){
                      err=new Error("The security code you provided is incorrect")            
                 }
                 else{
                     data={
                         landcode:response.detail.data.landid,
                         landregion:response.detail.data.others.region,
                         landarea:response.detail.data.others.landarea,
                         sizeofLand:response.detail.data.others.landsize,
                         asaasecode:asaasecode
                     }
                    
                 }
                 return callback(err,data)
             });
         }else{
              err=new Error("You did not pass the security hurdles.Check your inputs")
              return callback(err,data)
         }
         
     })
      
    
    
}
const removeFromSale=function(data,callback){
    var landid=data.landid;
    var landref=firebase.database().ref("LandsForSale/"+landid+"/record")
    landref.remove(function(msg,err){
        if(err){
            var error="Operation unsuccessful"
        }else{
            var success="Land was removed sucessfully"
        }
        return callback(error,success)
    })
}


const setLandForSale=function(data,callback){
    
    var data={
        landid:data.landid,
        date:data.date,
        time:data.time
       }   
    const  LandsForSaleReference=firebase.database().ref("LandsForSale");
    LandsForSaleReference.child(data.landid).set({
     
    },function(error){
        if(error){
              var  err = "Error occured and data wasnt able to save successfully"
         
        }
         else{
           var success = "Data has been saved successfully"

         }
         return callback(err,success)
        
    })



}
const getallLandsForSale=function(callback){
    var landforSaleReference=firebase.database().ref("LandsForSale");
       landforSaleReference.on("value",function(snapshot){
        var lands=snapshot.val();
        return callback(null,lands) 
         },function(error){
             if(error){
                var error="An error occured"+errorObject
                return callback(error,null)
             }
            
          
        })
          
}

const getallTransactions=function(callback){
    var transactionref=firebase.database().ref().child("Transactions");
    transactionref.on("value",function(snapshot){
        var Transactions=snapshot.val();
        return callback(null,Transactions) 
         },function(error){
             if(error){
                var error="An error occured"+errorObject
                return callback(error,null)
             }
    })
}



const addTransaction=function(data,callback){
    var d = Date(Date.now());
    var date=d.toString()
    var formatedDate=date.substring(0,25)
    
    var id=generateID();
    var  signature=data.signature;
    var  senderkey=data.senderkey;
    var  reciepientkey=data.reciepientkey;
    var  date2=formatedDate

    const  TransactionReference=firebase.database().ref("Transactions");
    TransactionReference.child(id).set({
        signature:signature,
        senderkey:senderkey,
        TransId:id,
        reciepientkey:reciepientkey,
        date:date2
    },function(error){
        if(error){
              var  err = "Error occured and data wasnt able to save successfully"
         
        }
         else{
           var success = "Data has been saved successfully"

         }
         return callback(err,success)
        
    })



}


export {addland,getallLandsForSale,landownership,saveAsaasecode,getAsaaseDetails,getallTransactions,asaasecodeExist,updateAsaaseCode,addLandToAccount,setLandForSale,removeFromSale,addTransaction};



















