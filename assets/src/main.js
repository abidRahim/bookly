// import '../stylesheets/style.scss'

var objArr = JSON.parse(localStorage.getItem('sourceObj')) || [];
var readList = [];
var searchedObj = {};

var sourceObj = {
fantasy: [{title: "The Hobit", genre: "fantasy", id:123123, flag:false},
            {title: "Game of Thrones", genre: "fantasy", id:123124, flag:false},
            {title: "The Final Empire", genre: "fantasy", id:123125, flag:false},
            {title: "Clash of Kings", genre: "fantasy", id:123126, flag:false},],

  humor: [{title: "The Hitchhiker's Guide to the Galaxy", genre: "humor", id:123542, flag:false},
          {title: "Bossypants", genre: "humor", id:123544, flag:false},
          {title: "Good Omens", genre: "humor", id:123545, flag:false},
          {title: "Is Everyone Hanging Out Without Me?", genre: "humor", id:123547, flag:false},],

  sci_fi: [],

  suspense: [],

  biography: [{title: "Malcolm X", genre: "biography", id:129823, flag:false},
              {title: "Aganpankh", genre: "biography", id:129824, flag:false},
              {title: "Becoming", genre: "biography", id:129825, flag:false},
              {title: "The Diary of a Young Girl", genre: "biography", id:129826, flag:false},],

  philosophy: []
}

var input = document.getElementById('user-input');
var searchText = document.getElementById('search-text');
var select = document.querySelector('.user-select');
var displayLists = document.querySelector('.book-lists');
var genreName = document.querySelector('.genre-name');
var inputGenreOption = document.getElementById('genre-option');
var addGenre = document.querySelector('.add-genre');
var createInput = document.querySelector('.create-input');
var deleteButton = document.querySelector('.delete');

function addBookList(e) {

  if(e.keyCode == 13) {

    if( /^ *$/.test(input.value)) return;
    
    var bookTitle = input.value;
    var randomId = Date.now();
    var categorySelected =  select.options[select.selectedIndex].value;
    
    objArr = {title: bookTitle, genre: categorySelected, id: randomId, flag: false};

    sourceObj[categorySelected].push(objArr);

    localStorage.setItem('sourceObj', JSON.stringify(sourceObj));

    input.value = "";

    displayBooks(sourceObj);
  }
}

function addNewOption() {
  let category = inputGenreOption.value;

  if (sourceObj.hasOwnProperty(category)) {

    createInput.nextElementSibling.classList.add("check-genre-visible");
    window.setTimeout( () => {
      createInput.nextElementSibling.classList.remove("check-genre-visible");
    } , 5000);
    
    return;

  } else {

    const addOption = document.createElement("option");
    select.appendChild(addOption);
    addOption.setAttribute("value", category);
    addOption.textContent = category;
    sourceObj[category] = [];

  }

  inputGenreOption.value = ""
}

function searchBooks(e) {
  // if( /^ *$/.test(searchText.value)) return;

  var searchedArr = [];

  var article = document.createElement("article");
  displayLists.appendChild(article);
  article.classList.add("card");

    if (searchText.value == '') {
      displayBooks(sourceObj); 
    } else {
      displayLists.innerHTML = "";
      for(item in sourceObj) {
        if (sourceObj[item].length != 0 ) {
        searchedArr = sourceObj[item].filter( val => val.title.toLowerCase().includes(searchText.value) );
        
        searchedObj[item] = searchedArr;
        }
      }
      displayBooks(searchedObj);
    }
}



function displayBooks(thisObj) {
  console.log(thisObj);
  
  displayLists.innerHTML = "";  

  for(item in thisObj) {

    if (thisObj[item].length != 0 ) {
      
      let article = document.createElement("article");
      displayLists.appendChild(article);
      article.classList.add("card");

      article.innerHTML += `<h3>${item}</h3>`;

      thisObj[item].forEach( (elem) => {
        article.innerHTML += `<li class="list-node"><input data-id="${elem.id}" type= "checkbox" ${elem.flag ? "checked" : ""}><p data-id="${elem.id}">${elem.title}</p><span data-id="${elem.id}" class="delete fas fa-times fa-lg"></span></li>`;
      });
      
    }
  }
}


function handleList(e) {
  if(e.target.localName !== 'input') return;
  
  const	id = e.target.dataset.id;
  
  toggleTodo(id);
  moveToReadList();
}

function toggleTodo(id) {

  for (item in sourceObj) {
    sourceObj[item].forEach( (elem) => {
            
      if (id == elem.id) {
        elem.flag = !elem.flag;
        // console.log(elem);        
      }
      
    });
  }  
}


function moveToReadList() {
  sourceObj["readList"] = [];
  for (item in sourceObj) {
    for(i = 0; i < sourceObj[item].length; i++){
      if(sourceObj[item][i].flag == true) {
        sourceObj["readList"].push(sourceObj[item][i]);
      }
    }
  }
}

function removeBookList(e) {
  if(e.target.localName !== 'span') return;

  let id = e.target.dataset.id;
  
  for (item in sourceObj) {


    for(let i = 0; i < sourceObj[item].length; i++) {
     
      if (id == sourceObj[item][i].id) {
       sourceObj[item].splice(i,1);
      }
    }
    
  }

  displayBooks(sourceObj);
}

displayBooks(sourceObj);
// Event Listeners

input.addEventListener("keyup", addBookList);
searchText.addEventListener("keyup", searchBooks);
displayLists.addEventListener("click", handleList);
displayLists.addEventListener("click", removeBookList);
addGenre.addEventListener("click", addNewOption);