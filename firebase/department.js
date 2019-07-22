const express=require('express')




const Admin=/**@class */(function(){
    function AdminDetails(){
        this.role="admin";
        this.salary=40000;
        this.password="admin"
    }
    return AdminDetails;
}());


const Sales=/**@class */(function(){
    function SalesDetails(){
        this.role="sales";
        this.salary=30000;
        this.password="sales"
    }
    return SalesDetails;
}());


const HR=/**@class */(function(){
    function HRDetails(){
        this.role="Human Resource";
        this.salary=40000;
        this.password="Hresource"
    }
    return HRDetails;
}());





module.exports={
    admin:Admin,
    humanResource:HR,
    sales:Sales
}