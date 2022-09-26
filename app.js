const express = require('express')
const app =  express() ;
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const Product =  require('./models/productadd')
const User =  require('./models/user')
const Order =  require('./models/order')
const Orderitems = require('./models/orderitems')
const sequelize =  require('./util/database')
const jwt = require('jsonwebtoken')




app.post('/admin/addproduct' , async function(req, res) {
    
   // let pdId =  req.body.Id;
    let pdId =  req.body.productid; 
    let pdname =  req.body.name ;
    let pdprice =  req.body.price ;
    let pdquantity =  req.body.quantity
    console.log(pdquantity)

    let existingProduct = await Product.findAll({where:{productId : pdId}}) ;

    if(existingProduct.length === 0)
    {
        
        let newProduct= await Product.create({
            name : pdname ,
            price : pdprice ,
            productId: pdId ,
            Quantity : pdquantity 
            
        })
        res.json({flag:true , msg : "Product added"})

        
    }
    else
    {
        console.log(existingProduct[0].id)
        await Product.update({
            Quantity : existingProduct[0].Quantity + pdquantity ,
        },{where: {id : existingProduct[0].id} } )

        res.json({flag:true , msg : "Product added"})
    }

    

})

 app.post('/user/signup' , async function(req,res) {
     
    let userDetail = req.body   

    let existingUser = await User.findAll({where:{email:userDetail.email}}) ;

    if(existingUser.length === 0)
    {
        
        let newUSer= await User.create({
            name : userDetail.name ,
            email : userDetail.email ,
            phoneNumber : userDetail.phonenumber ,
            password :  userDetail.password,
            
        })
        res.json({flag:true , msg : "User Created"})

        
    }
    else
    {
        res.json({flag:false ,  msg :"User already exist"});
    } 

   


})

app.post('/user/login' , async function(req,res) {
    
    const email = req.body.email;
    // console.log(req)
    const password = req.body.password;
    

    let users = await User.findAll({where:{email : email}})
    console.log(users);

    if(users.length>0)
    {
      const dbid = users[0].id
      const dbpass = users[0].password 
      const dbname = users[0].name 
      const dbemail = users[0].email


    //   const match = await bcrypt.compare(password,dbpass)
    //   console.log(match);
      if(password == users[0].password )
      {
         const token = jwt.sign(dbid,'Priyanshsharma')
         res.status(200).json({msg:'Login Successfull' , token : token })
      }
      else
      {
        res.status(401).json({msg : 'User not authorised'})
      
    }
    
   
    }
    else{
        res.status(404).json({msg:'user not found'})


    }

})


app.post('/user/createorder' ,  function(req,res) {


    let token=req.headers.authorization;
    token=token.slice(7,token.length);

         const Id =  jwt.verify(token , "Priyanshsharma");

          console.log(Id);
         User.findByPk(Id)

         .then((user)=>{
            console.log(user)
            req.user = user;
            user.createOrder();
         })
         

     
})

User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Product, { through: Orderitems });
Product.belongsToMany(Order, { through: Orderitems});




sequelize.sync().then((res) =>{
    app.listen(3000);

}).catch((err) =>{
    console.log(err, "jja'j'fj'ajf'");
})