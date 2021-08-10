console.log("This is College Library Website");

// ToDos
// Store all the data to local storage
// Give another Column to Delete a particular book
// Add a scroll bar to book table

// Show the items if it exist in the local storage
let bookList = JSON.parse(localStorage.getItem("books"));
let key = 1;

if(bookList){
    bookList.forEach((item)=>{
        let tableBody = document.getElementById("tableBody");
        let uiAddString = `<tr>
                        <td>${item.name}</td>
                        <td>${item.author}</td>
                        <td>${item.type}</td>
                        
                    </tr>`
        tableBody.innerHTML += uiAddString;

})
}

function Add(newBookList) {
    let key = 1;
    let tableBody = document.getElementById("tableBody");
    // let tableNewBody = document.getElementById("tableNewBody")
    // tableBody.remove();
    // let newTable = document.createElement("div");
    // newTable.id="tableBody";
    // tableNewBody.appendChild(newTable)
//    tableBody.style.display = "none";

    newBookList.forEach((item)=>{
        // tableBody.style.display = "block";
        let tableBody = document.getElementById("tableBody");
        let uiAddString = `<tr >
                        <td>${item.name}</td>
                        <td>${item.author}</td>
                        <td>${item.type}</td>
                       
                    </tr>`
        tableBody.innerHTML += uiAddString;
        

})


}





// Constructor

function Book(name, author, type) {
    this.name=name;
    this.author= author;
    this.type=type;

}

// Display Constructor
function Display(){
    

}


// Add methods to display prototype
// Implement the add method 
Display.prototype.add = function(book) {
    let tableBody = document.getElementById("tableBody");
   
    let uiString = `<tr  >
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                        
                    </tr>`
    tableBody.innerHTML += uiString;
}

// Implement the clear method
Display.prototype.clear = function() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}

// Implement the validate method
Display.prototype.validate = function(book) {
    if (book.name.length <3 || book.author.length <3 ) {
        return false;
    }
    else {
        return true;
    }
}

Display.prototype.show = function (type, showmsg) {
    let message = document.getElementById("message"); 
    let str = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </symbol>
    <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
    </symbol>
    <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </symbol>
  </svg>
  <div class="alert alert-${type} d-flex align-items-center" role="alert">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
  <div>
    ${showmsg}
  </div>
</div>`
message.innerHTML = str;
setTimeout(()=>{
    message.innerHTML= "";
}, 4000)

}



// Add submit event Listener to libraryForm
let bookListArr = [];

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e){
    
    
    // console.log(e.target);
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;

    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");
    let type;

    if(fiction.checked){
        type = fiction.value;
    }

    else if (programming.checked){
        type = programming.value;
    }

    else if (cooking.checked){
        type = cooking.value;
    }
    let book = new Book(name, author, type);
    console.log(book);

    
    let display = new Display();
    if(display.validate(book)){
        let prevArr = JSON.parse(localStorage.getItem("books"));
        if(prevArr){
            bookListArr.push(...prevArr)
            bookListArr.push(book);
            localStorage.setItem("books", JSON.stringify(bookListArr));
            bookListArr = [];
        }
        else {
            bookListArr.push(book);
            localStorage.setItem("books", JSON.stringify(bookListArr));
            bookListArr = [];

        }
        display.add(book);
        display.clear();
        display.show("success", "Your book has been successfully added");
    }
    else {
        // Show error to user
        display.show("danger", "Your book cannot be added as it is less than 3 characters");
    }
    
    
    e.preventDefault();

    
}

// // Delete functionality
// let deletebtn = document.getElementById("tableBody");
// deletebtn.addEventListener("click", (e)=>{
//     console.log(e.target);
//     let clickedInd = e.target.id;
   

//     let newBookList=[];
//     let display = new Display();
//     bookList.forEach((item, index)=>{
//         if((index+1) != clickedInd){
//             newBookList.push(item);
//         }
//     })
//     // let removeElement = document.querySelector(`.remove${clickedInd}`)
//     // removeElement.remove();
//     Add(newBookList);
//     localStorage.clear();
//     localStorage.setItem("books", JSON.stringify(newBookList));
//     console.log(newBookList)

// })