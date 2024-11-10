
 let expenses = JSON.parse(localStorage.getItem("submit")) || [];


// let expenses = [];

  function displaydata(){
      let showdata = document.getElementById("displaydata")
      showdata.innerHTML = " ";

      let Data = JSON.parse(localStorage.getItem("submit")) || [];

      let total = 0 ;

      Data.forEach(item => {
        let div = document.createElement("div");
        div.innerHTML = `Item Name: ${item.ItemName} Category: ${item.Category} Amount:${item.Amount} Date:${item.Date}`;
        showdata.appendChild(div);
        total += item.Amount;
        
        // Totalbtn.innerHTML = " ";
      });
      document.getElementById("Totalbtn").innerText = total;      //display  total amount
      
 }
 
 document.getElementById("ExpenseForm").addEventListener("submit", function(event){
   event.preventDefault();
   const ItemName = document.getElementById("ItemName").value;
   const ExpenseCategory = document.getElementById("ExpenseCategory").value;
   const ExpenseAmount = document.getElementById("ExpenseAmount").value;
   const ExpenseDate = document.getElementById("ExpenseDate").value;
   
   let expense = {
     ItemName : ItemName,
     Category : ExpenseCategory,
     Amount : ExpenseAmount,
     Date : ExpenseDate
     
    }
    expenses.push(expense)
    localStorage.setItem("submit",JSON.stringify(expenses))

    document.getElementById("ExpenseForm").reset();
    document.getElementById("Totalbtn").reset();
    displaydata();

})