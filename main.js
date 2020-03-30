//sign up
let allUsers
let userID = Math.floor(Math.random()*10000)
let catID = Math.floor(Math.random()*10000)
let expID = Math.floor(Math.random()*10000)


function signup(){
    
    let userName = document.getElementById("usr").value;
    let email = document.getElementById("email").value;
    let pasword = document.getElementById("pwd").value;
    
    let user = {
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

   allUsers.filter((val)=>{
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
    let category = document.getElementById('cat').value;
    let catArr = {
        catID,
        category
    }
    if(localStorage.getItem("allCategories")){
        let allCategories = JSON.parse(localStorage.getItem("allCategories")) 
        allCategories.push(catArr)
        localStorage.setItem("allCategories", JSON.stringify(allCategories))
    }else{
        let allCategories = []
        allCategories.push(catArr)
        localStorage.setItem("allCategories", JSON.stringify(allCategories))
    }
    console.log("category added !");
    
    
}





                    //add Expenses
function addExpenses(){
    let d = new Date()
    let month = d.getMonth()+1
    let date = d.getDate() + "/" + month + "/" + d.getFullYear()
    
    let des = document.getElementById('des').value;
    let amount = document.getElementById('amount').value;
    let cat = document.getElementById('cat').value;

    

    let expense = {
        expID,
        des,
        amount,
        cat,
        date
        
    }
    
    console.log('expense: ', expense);

   if(localStorage.getItem("allExpenses")){
    let allExpenses =  JSON.parse(localStorage.getItem("allExpenses"))
     allExpenses.push(expense)
     localStorage.setItem("allExpenses", JSON.stringify(allExpenses))
   }else{
       let allExpenses = []
      allExpenses.push(expense)
      console.log('allExpenses: ', allExpenses);
      localStorage.setItem("allExpenses", JSON.stringify(allExpenses) )
   }
   

    alert("Expenses Added !!")
    location.reload()

}

                //////   Logout ////

function logout(){
    localStorage.removeItem("currentUser")
    window.location = "./index.html"

}


/* <th class="table-data"> ID</th>
<th class="table-data"> Description</th>
<th class="table-data"> Amount</th>
<th class="table-data"> Category</th>
<th class="table-data"> Created On</th>
<th class="text-center ">
    <button type="button" class="btn btn-success ">Edit</button>
    <button type="button" class="btn btn-danger ">Delete</button>    
</th> */
function renderTable(){
    let table = document.getElementById("tableData")
    let allExpenses = JSON.parse(localStorage.getItem("allExpenses"))

    for(let i=0; i<allExpenses.length; i++){
    let tr = document.createElement("tr")
    
    let id_th = document.createElement("th")
        id_th.setAttribute("class", "table-data")
        id_th.innerHTML = allExpenses[i].expID
        tr.appendChild(id_th)

    let des_th = document.createElement("th")
        des_th.setAttribute("class", "table-data")
        des_th.innerHTML = allExpenses[i].des
        tr.appendChild(des_th)

    let amount_th = document.createElement("th")
        amount_th.setAttribute("class", "table-data")
        amount_th.innerHTML = allExpenses[i].amount
        tr.appendChild(amount_th)   
        
    let cat_th = document.createElement("th")
        cat_th.setAttribute("class", "table-data")
        cat_th.innerHTML = allExpenses[i].cat
        tr.appendChild(cat_th) 
    
    let created_th = document.createElement("th")
        created_th.setAttribute("class", "table-data") 
        created_th.innerHTML = allExpenses[i].date
        tr.appendChild(created_th)

     let btn_th = document.createElement("th")
          btn_th.setAttribute("class", "text-center") 
     
     let edit_btn = document.createElement("button")
         edit_btn.setAttribute("type", "button")
         edit_btn.setAttribute("class", "btn btn-success")
         edit_btn.innerHTML = "Edit"

         delete_btn = document.createElement("button")
         delete_btn.setAttribute("type", "button")
         delete_btn.setAttribute("class", "btn btn-danger")
         delete_btn.innerHTML = "Delete"


         btn_th.appendChild(edit_btn)
         btn_th.appendChild(delete_btn)
        
        tr.appendChild(btn_th)

        table.appendChild(tr)
    }


    console.log("loop")

}

