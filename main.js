//sign up
let allUsers    

function search(value){
    let allExpenses = JSON.parse(localStorage.getItem("allExpenses"))

    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    let currentUserExp = allExpenses.filter(a=> currentUser.userID == a.userID)
    let filteredArr = currentUserExp.filter(v=> v.cat.toLowerCase().includes(value.toLowerCase()))
    let arrLength = filteredArr.length
    if (arrLength == 0) {
    document.getElementById("tableData").innerText = "";
    document.getElementById("errMsg").innerText = "Category does not exist with this keyword !";
    }else{
    document.getElementById("errMsg").innerText = "";
    document.getElementById("tableData").innerText = "";
    renderTable(filteredArr)
}
}

function signup(){
    
    let userName = document.getElementById("usr").value;
    let email = document.getElementById("email").value;
    let pasword = document.getElementById("pwd").value;
    let userID = Math.floor(Math.random()*100000)

    if(userName === "" || email === "" || pasword ===""){
        return swal("Please Fill up all the required Fields !", "");

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
        return  swal("User already registered with this Email" , "", "error")
        
    }
        
    }else{
        allUsers = []
        allUsers.push(user)
        localStorage.setItem("allUsers", JSON.stringify(allUsers))
        console.log("else");  
        console.log("else");
    }
    document.getElementById("usr").value = ""
     document.getElementById("email").value = ""
     document.getElementById("pwd").value = ""
    console.log('allUsers: ', allUsers);
    // console.log('user: ', user);
    swal("Signed up Successfully !" , "", "success");    
}
// login

function signIn(){
    
    let sEmail = document.getElementById("sEmail").value;
    let sPwd = document.getElementById("sPwd").value;
    if (sEmail == "" || sPwd == "") {
        return swal("Please Fill up all the required Fields !", "")
        
    }
    
    allUsers = JSON.parse(localStorage.getItem("allUsers"))
    if(allUsers == null){
      return  swal("No User Exist ! Please Signup first." , "", "error");    
       

    }
   
   //signin authentication
   let currentUser = allUsers.find(a => a.email == sEmail )
   
   if(currentUser){
     if(currentUser.pasword === sPwd){
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
            window.location = "./main.html"
        }else{
            swal("Pasword is Incorrect !" , "", "error")
        }

    }else{
            swal("No user Exist with this email" , "", "error")
            
    }

}

//add category

function addCat(){
    let catID = Math.floor(Math.random()*100000)
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) 
    let category = document.getElementById('cat').value;
    if(category == ""){
        return swal("Please fill up the required Field !", "");
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
        return swal("Category Added", "", "success");
        
    


}

function renderOptions(){
    let currentUserObj = JSON.parse(localStorage.getItem("currentUser"))
    let allCategories = JSON.parse(localStorage.getItem("allCategories")) 
    let currentUserCat;
    if (allCategories) {
        currentUserCat = allCategories.filter(a=> currentUserObj.userID == a.userID)  
          if(currentUserCat){
    let selectCat = document.getElementById("cat");
    for(let i=0; i<currentUserCat.length; i++){
        selectCat.innerHTML += `
            <option value=${currentUserCat[i].category}>${currentUserCat[i].category}</option>
            `
    }
}
}else{
        return swal("Add Category First", "");

}
}
    
function getId(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id")
    return id
}
function addExpBtn(){
    let allCategories = JSON.parse(localStorage.getItem("allCategories"))
    console.log('allCategories: ', allCategories);
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    // if (allCategories) {
        
    // }
    let currentUserCat = allCategories.filter(i=> currentUser.userID == i.userID)
    let arrLength = currentUserCat.length
    if (arrLength == 0) {
       return  swal("Category Added", "", "success");
        
    }else{
        window.location = "./addExp.html"
    }
}
                    //add Expenses
function addExpenses(){
       
    let id = getId()
    if(id){
updateExp(id)
    }else{
        addExp()
    }

    
}
function updateExp(id){
    let des = document.getElementById('des').value;
    let amount = document.getElementById('amount').value;
    let cat = document.getElementById('cat').value;

    if(des == "" || amount == "" || cat == ""){
        return swal("Please Fill up all the required Fields !", "");

    }


    let allExpenses = JSON.parse(localStorage.getItem("allExpenses"));

    allExpenses = allExpenses.map(v => {
        if (v.expID == id) {
            v.des =des
            v.amount =amount
            v.cat =cat
            return v
        } else  {
            return v

        }
    })

    localStorage.setItem('allExpenses',JSON.stringify(allExpenses))


    swal("Expenese Updated !", "", "success");

    document.getElementById('des').value = "";
    document.getElementById('amount').value = "";
    document.getElementById('cat').value = "";
    

}
function addExp(){
    
    let d = new Date()
    let month = d.getMonth()+1
    let date = d.getDate() + "/" + month + "/" + d.getFullYear()
    let expID = Math.floor(Math.random()*100000)

    
    let des = document.getElementById('des').value;
    let amount = document.getElementById('amount').value;
    let cat = document.getElementById('cat').value;

    if(des == "" || amount == "" || cat == ""){
        return swal("Please Fill up all the required Fields !", "");


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
   

   swal("Expense Added !", "", "success");

    document.getElementById('des').value = "";
    document.getElementById('amount').value = "";
    document.getElementById('cat').value = "";
    

}
                //////   Logout ////

function logout(){
    localStorage.removeItem("currentUser")
    window.location = "./index.html"

}



function renderTable(arr){
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    let table = document.getElementById("tableData")
    let allExpenses = JSON.parse(localStorage.getItem("allExpenses"))
    let currentUserExp = allExpenses.filter(a=> currentUser.userID == a.userID)

    if (arr) {
        currentUserExp = arr        
    }
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
    let name = currentUser.userName
    document.getElementById("welcome").innerHTML = `Welcome ${name.toUpperCase()} !`
    
}

 function uptadeExpense(currentExpID){
    window.location =  `addExp.html?id=${currentExpID}`;
}
function editExpense(){
    let id = getId()
    let allExpenses = JSON.parse(localStorage.getItem("allExpenses")) 
    let currentExpObj = allExpenses.find(i=> i.expID == id)
    console.log('currentExpObj: ', currentExpObj);
    
    // let index = allExpenses.findIndex(i=> i.expID == currentExpID)
    if(id){
    
    document.getElementById('des').value = currentExpObj.des
    document.getElementById('amount').value = currentExpObj.amount
    document.getElementById('cat').value = currentExpObj.cat
    document.getElementById('add_btn').innerHTML = "Update"
    document.getElementById('exp_heading').innerHTML = "Edit Expense"
}else{
    //do nothing
}
}

function deleteExpense(currentExpID){
    currentExpID = parseInt(currentExpID)
    console.log('currentExpID: ', currentExpID);
    let allExpenses = JSON.parse(localStorage.getItem("allExpenses")) 
    let updatedExp = allExpenses.filter(v => v.expID !== currentExpID )
    localStorage.setItem("allExpenses", JSON.stringify(updatedExp) )
    location.reload()
    

    // localStorage.setItem("allExpenses", JSON.stringify(updatedExp) )
    // let index = allExpenses.findIndex(i=> i.expID == currentExpID)
    // allExpenses.splice(index, 1);

    // if(index !== -1){
    //     let updatedExpenses = JSON.stringify(allExpenses)
    //     localStorage.setItem("allExpenses", updatedExpenses)
    //     location.reload()
    // }
}
