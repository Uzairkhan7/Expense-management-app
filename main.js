//sign up
let allUsers
let user = {}
let userID = Math.floor(Math.random()*10000)



document.getElementById("signup").onclick=()=>{
    
    let userName = document.getElementById("usr").value;
    let email = document.getElementById("email").value;
    let pasword = document.getElementById("pwd").value;
    
     user = {
        userName,
        email,
        pasword,
        userID
    }
    console.log('user: ', user);

    // console.log('getUsers: ', getUsers);
    
    if(localStorage.getItem("allUsers")){
         allUsers = JSON.parse(localStorage.getItem("allUsers")) 
        allUsers.push(user)
        localStorage.setItem('allUsers', JSON.stringify(allUsers))
        console.log("if");
        
        
    }else{
        allUsers = []
        allUsers.push(user)
        localStorage.setItem("allUsers", JSON.stringify(allUsers))
        console.log("else");  

    }
    
    console.log('allUsers: ', allUsers);
    // console.log('user: ', user);
    console.log("Signup Successful");

}
// login

function signIn(){

    let sEmail = document.getElementById("sEmail").value;
    let sPwd = document.getElementById("sPwd").value;
    console.log('sEmail: ', sEmail);
    console.log('sPwd: ', sPwd);
    
    allUsers = JSON.parse(localStorage.getItem("allUsers"))
                //Current User
   let currentUser = allUsers.filter(a => a.email == sEmail )
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
   console.log('currentUser: ', currentUser);

                 //signin authentication

   allUsers.map((val)=>{
       if(val.email === sEmail && val.pasword === sPwd){
           window.location = "./main.html"
           console.log("pasword and email matched !");
       }else{
           alert("Your password or Email is incorrect !")
       }
   })
}

//add category

function addCat(){
    let cat = document.getElementById('cat').value;
    let catArr = 
    
    
}


// let arr = []
// let d = new Date()
// let date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear()

// document.getElementById('addExp').onclick =()=>{

//     let des = document.getElementById('des').value;
//     let amount = document.getElementById('amount').value;
//     let cat = document.getElementById('cat').value;
//     arr.push(des, amount, date)
//     localStorage.setItem(cat,JSON.stringify(arr))
//     console.log('Data saved!')
// }