const firebase=require('../firebase/firebasekey')
const express=require('express')
const jwt=require("jsonwebtoken")
const bcrypt=require('bcryptjs');
const hiddendata=require('../secret')
const secret=hiddendata.secret;
const dept=require('../firebase/department')
const randomstring=require("randomstring")




    
    var dbRef = firebase.firebase.database()
    var usersRef = dbRef.ref('users')
   

    var generateString=function(){
        var theString=randomstring.generate({
            length:8,
            charset:'numeric'
        })
        return theString;
    }

    const checkifuserexist=function(email,callback){
        
        const user=usersRef.orderByChild('email').equalTo(email)
        user.once("value",function(snapshot){
            if(snapshot.exists()){
                var userExist=true
            }
            else{
                var userExist=false
            }
            return callback({
                userExist:userExist
            })
        })
    }

    const User = {
        /**
         * Create A User
         * @param {object} req 
         * @param {object} res
      
         */
        async create(req, res) {
            var role=req.user.role
            if(role!=='admin'){
                res.status(400).send("You need admin privileges to perform this task")
            }
            else{
             
                var email=req.body.email;
            checkifuserexist(email,function(detail){
            var userExist=detail.userExist
            if(!userExist){
            var id=generateString()
           var depart=req.body.dept
           var role="";
           if(depart=='Admin'){
            role=new dept.admin()
           }else if(depart=="Sales"){
            role=new dept.sales()
           }
           else if(depart=="Human Resource"){
            role=new dept.humanResource()
           }

           var user={
               id:id,
               email:email,
               department:role
           }
           usersRef.child(id).set({
               id:id,
               date:Date().toString().slice(0,24),
               email:email,
               department:role
           },function(err){
               if(err){
                   console.log(err)
               }
               else{
                   var token=jwt.sign({user:user},secret,{
                       expiresIn:60*24
                   })
                   return res.status(200).send({token:token});
          
               }
           })
            

                    
                }else{
                    res.status(404).send("User with credentials already exist")
                }

            })

            }
            
           
          
        },
        /**
         * Login
         * @param {object} req 
         * @param {object} res
         * @returns {object} user object 
         */
        async login(req, res) {
           
            checkifuserexist(req.body.email,function(detail){
                var userExist=detail.userExist
                if(!userExist){
                    res.status(404).send("The password or email is incorrect")
                }
                else{
                   const user=usersRef.orderByChild('email').equalTo(req.body.email)
                   user.on("child_added",function(snapshot){
                     var password=snapshot.val().department.password 
                    // console.log(snapshot.val().department.password)     
                     if(password!==req.body.password){
                         
                         res.status(404).send("Wrong email or password")
                     }
                     else{
                        
                         var user={
                             id:snapshot.key,
                             email:snapshot.val().email,
                             role:snapshot.val().department.role
                         }
                         
                         var token=jwt.sign({user:user},secret,{
                        expiresIn:86400
                         })
                        
                         res.status(200).send({
                             token:token,
                             expiresIn:60*24,
                             role:user.role

                            })
                     }
                   })     
                }
            })

        },

        async editProfile(req,res){
            var email=req.user.email
            var id=req.user.id
            checkifuserexist(email,function(detail){
                var userExist=detail.userExist
                if(!userExist){
                    res.status(404).send("You are not authorised to take this task")
                }
                else{
                    var password=req.body.password
                    let details=req.body
                    usersRef.child(id).update({
                        'department/password':password,
                        personaldetails:details
                    },(err,data)=>{
                        if(err){
                            console.log(err)
                            res.status(404).send("Error updating user Profile")
                        }else{
                            res.status(200).send("Profile updated successful")
                        }
                    })
                }
            })

        }

    }

    module.exports={
        User:User
    }