//sign up
let allUsers    



function signup(){
    
    let userName = document.getElementById("usr").value;
    let email = document.getElementById("email").value;
    let pasword = document.getElementById("pwd").value;
    let userID = Math.floor(Math.random()*100000)

    if(userName === "" || email === "" || pasword ===""){
        return alert("Please fill all the required Fields Properly !")
    }
    
    let user = {
        userName,
        email,
        pasword,
        userID
    }
    console.log('user: ', user);
    
    // console.log('getUsers: ', getUsers);
    allUsers = JSON.parse(localStorage.getItem("allUsers")) 
    
    if(allUsers){
        let userObjbyEmail = allUsers.find(a=>a.email === email)
        if(!userObjbyEmail){
        allUsers.push(user)
        localStorage.setItem('allUsers', JSON.stringify(allUsers))
        
        console.log("if");
    }else{
       return alert("User already registered with this Email")
    }
        
    }else{
        allUsers = []
        allUsers.push(user)
        localStorage.setItem("allUsers", JSON.stringify(allUsers))
        console.log("else");  
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
    if(allUsers == null){
        return alert("No User Exist ! Please Signup first.")
    }
   
   //signin authentication
   let currentUser = allUsers.find(a => a.email == sEmail )
   
   if(currentUser){
     if(currentUser.pasword === sPwd){
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
            window.location = "./main.html"
        }else{
            alert("Pasword is Incorrect !")
        }

    }else{
        alert("No user Exist with this email")
    }

}

//add category

function addCat(){
    let catID = Math.floor(Math.random()*100000)
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) 
    let category = document.getElementById('cat').value;
    if(category == ""){
        return alert("Please fill up the required Field !")
    }
    let catArr = {
        catID,
        category,
        userID: currentUser.userID
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
    document.getElementById('cat').value = ""
    alert("Category Added !")
    


}

function renderOptions(){
    let currentUserObj = JSON.parse(localStorage.getItem("currentUser"))
    let allCategories = JSON.parse(localStorage.getItem("allCategories")) 
    let currentUserCat = allCategories.filter(a=> currentUserObj.userID == a.userID)
if(currentUserCat){
    // console.log('currentUserCat: ', currentUserCat[2].category);
    console.log("redering Cat");
    let selectCat = document.getElementById("cat");
    console.log('selectCat: ', selectCat);
    for(let i=0; i<currentUserCat.length; i++){
        selectCat.innerHTML += `
            <option value=${currentUserCat[i].category}>${currentUserCat[i].category}</option>
            `
    }
}else{
    alert("Add Category First !")
}
}
    

                    //add Expenses
function addExpenses(){
    let d = new Date()
    let month = d.getMonth()+1
    let date = d.getDate() + "/" + month + "/" + d.getFullYear()
    let expID = Math.floor(Math.random()*100000)

    
    let des = document.getElementById('des').value;
    let amount = document.getElementById('amount').value;
    let cat = document.getElementById('cat').value;

    if(des == "" || amount == "" || cat == ""){
        return alert("Please Fill up all the required Fields !")
    }

    let user = JSON.parse(localStorage.getItem("currentUser")) 

    let expense = {
        expID,
        userID: user.userID,
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
    document.getElementById('des').value = "";
    document.getElementById('amount').value = "";
    document.getElementById('cat').value = "";
    

}

                //////   Logout ////

function logout(){
    localStorage.removeItem("currentUser")
    window.location = "./index.html"

}



function renderTable(){
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    let table = document.getElementById("tableData")
    let allExpenses = JSON.parse(localStorage.getItem("allExpenses"))
    let currentUserExp = allExpenses.filter(a=> currentUser.userID == a.userID)

    currentUserExp.map(val=>{
        const {expID, des, amount, cat, date} = val
        table.innerHTML += `
        <tr>
         <td class="table-data">${expID}</td>
<td class="table-data"> ${des}</td>
<td class="table-data"> ${amount}</td>
<td class="table-data"> ${cat}</td>
<td class="table-data"> ${date}</td>
<td class="text-center ">
    <button type="button" class="btn btn-success " id="${expID}" onclick="uptadeExpense(this.id)">Edit</button>
    <button type="button" class="btn btn-danger " id="${expID}" onclick="deleteExpense(this.id)">Delete</button>    
</td> 
</tr>
        `
    })
    }

function renderUserName(){
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    document.getElementById("welcome").innerHTML = `Welcome ${currentUser.userName}`
}

function uptadeExpense(currentExpID){
    let allExpenses = JSON.parse(localStorage.getItem("allExpenses")) 
    let currentExpObj = allExpenses.find(i=> i.expID == currentExpID)
    console.log('currentExpObj: ', currentExpObj);
    
    let index = allExpenses.findIndex(i=> i.expID == currentExpID)
    
    // window.location = "addExp.html"

    let p = document.getElementById('des')
    console.log('p: ', p);
    // document.getElementById('des').value = currentExpObj.des
    // console.log('currentExpObj.des: ', currentExpObj.des);
    // document.getElementById('amount').value = currentExpObj.amount
    // document.getElementById('cat').value = currentExpObj.cat

}

function deleteExpense(currentExpID){
    let allExpenses = JSON.parse(localStorage.getItem("allExpenses")) 
    let index = allExpenses.findIndex(i=> i.expID == currentExpID)
    allExpenses.splice(index, 1);

    if(index !== -1){
        let updatedExpenses = JSON.stringify(allExpenses)
        localStorage.setItem("allExpenses", updatedExpenses)
        location.reload()
    }
}
