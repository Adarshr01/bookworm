// this is for the ruler working as a rubberband

let path = "M 10 80 Q 95 80 1500 80";
let finalpath = "M 10 80 Q 95 80 1500 80";
let ruler = document.querySelector(".ruler2");

ruler.addEventListener("mousemove", (evt) => {
  path = `M 10 80 Q ${evt.x - 100} ${evt.y - 400} 1500 80`;
  gsap.to("svg path", {
    attr: {
      d: path,

    },
    duration: 0.55,
  });
  console.log(evt.x)
});
ruler.addEventListener("mouseleave", () => {
  gsap.to("svg path", {
    attr: {
      d: finalpath,
    },
    duration: 0.55,
    ease: "elastic.out(1,0.3)",
  });
});

// for "search your favourite"

gsap.from("#nochange", {
  duration: 0.4,
  opacity: 0,
  scale: 0,
  scrollTrigger: "#nochange",
  y: -500,
});

//about section

gsap.from(" .write", {
  opacity: 0,
  x: -1500,
  scrollTrigger: {
    trigger: ".write",
    scroller: "body",
    start: "top 70%",
  },
});

gsap.from(" .written_container", {
  duration: 0.5,
  opacity: 0,
  x: 1500,
  scrollTrigger: {
    trigger: ".written_container",
    scroller: "body",
    start: "top 80%",
  },
});

// search result

gsap.from(".container4_written pre", {
  duration: 0.5,
  opacity: 0,
  y: 100,
  backgroundColor: "transparent",
  scrollTrigger: {
    trigger: ".container4_written",
    scroller: "body",
    start: "top 50%",
  },
});

// footer section

gsap.from(".btn2", {
  duration: 1,
  opacity: 0,
  scrollTrigger: {
    trigger: ".btn2",
    scroller: "body",
    start: "top 80%",
    y: 100,
  },
});

// submit button

gsap.from("#btn", {
  duration: 1,
  opacity: 0,
  scrollTrigger: {
    trigger: "#btn",
    scroller: "body",
    start: "top 80%",
  },
});

// navbar functionality

let lastY = 0;
document.addEventListener("scroll", (event) => {
  let navbar = document.querySelector(".navbar");
  if (lastY < window.scrollY) {
    lastY = window.scrollY;
    navbar.style.visibility = "hidden";
    if (window.scrollY < 100) {
      navbar.style.visibility = "visible";
    }
  } else if (lastY > window.scrollY) {
    lastY = window.scrollY;
    navbar.style.visibility = "visible";
  }
});

// details part

// changing inner text of fetch data :

let fetchdata = document.querySelector("#fetchdata");
let selectedoption = document.querySelector(".searchby");
selectedoption.addEventListener("click", () => {
  if (
    selectedoption.options[selectedoption.selectedIndex].value === "authorname"
  ) {
    fetchdata.innerText = "Enter the author name ";
  } else if (
    selectedoption.options[selectedoption.selectedIndex].value === "bookname"
  ) {
    fetchdata.innerText = "Enter the Book name ";
  } else if (
    selectedoption.options[selectedoption.selectedIndex].value === "topic"
  ) {
    fetchdata.innerText = "Enter the topic ";
  }
});

// finding the type of detail by function findtype
function findtype() {
  let selectedoption = document.querySelector(".searchby");
  let abc = selectedoption.options[selectedoption.selectedIndex].value;
  return abc;
}

let fetchingdata = document.getElementById("fetchingdata");
let buttonn = document.createElement("div");
// working of submit button

let submit = document.getElementById("btn");

submit.addEventListener("click", () => {
  let input = document.querySelector("#input").value;
  buttonn.innerHTML = `<div>  fetching data for ${input} ... </div>`;
  fetchingdata.append(buttonn);
  // submit.disabled = true;
  console.log(input);
  if (input == "") {
    buttonn.innerHTML = `<div>  Invalid Input ! ... Please Enter The Value.</div>`;
  } else {
    let foundtype = findtype();
    switch (foundtype) {
      case "authorname":
        authorname();

        break;

      case "bookname":
        findmybook();

        break;

      case "topic":
        topic();

        break;
    }
  }
});

// trims the space from book name
function trimit(name) {
  let final_replaced = document.querySelector("#input").value.trim();
  let getdata = final_replaced.replaceAll(" ", "+");
  return getdata;
}

// trims the space from author name
function trimauname(input) {
  let final_replaced = document.querySelector("#input").value.trim();
  let getdata = final_replaced.replaceAll(" ", "%20");
  return getdata;
}

// calling api for author
// data showing for author name
const authorname = async () => {
  let autname = trimauname(input);
  let URL = `https://openlibrary.org/search/authors.json?q=${autname}?`;
  console.log(URL);
  let geturl = await fetch(URL);
  let response = await geturl.json();
  buttonn.remove();
  console.log(response);
  let j = 0;
  for (j == 0; j != 1; j++) {
    if (response.docs.length != 0) {
      if (response.docs[0].birth_date == undefined) {
        let container6 = document.querySelector(".container6");
        let author_detail = document.createElement("div");
        author_detail.innerHTML = `<div class="authorname"> <h4> Sorry ! We dont have enough information in our Database.<br>Try searching by Another name or other type </h4></div>`;
        container6.prepend(author_detail);
      } else {
        printauthor(j, response);
      }
    } else if (response.docs.length == 0) {
      let container6 = document.querySelector(".container6");
      container6.innerText = "No details found ! ";
    }
  }
};

function printauthor(index, response) {
  let container6 = document.querySelector(".container6");
  if (container6.innerText == "No Details Found !") {
    container6.innerText = "";
  }
  let author_detail = document.createElement("div");
  author_detail.innerHTML = `<div class="authorname"> <h1>name :${response.docs[index].name}</h1><hr style="width:90%"></div>`;
  container6.prepend(author_detail);
  if (response.docs[0].authornames) {
    let authorname = document.querySelector(".authorname");
    let authorpi = document.createElement("div");
    authorpi.innerHTML = `<div>
    <br><br><h2>Birth :</h2> ${response.docs[index].birth_date}<br><br>
    <h2>Death :</h2> ${response.docs[index].death_date}<br><br>
    <h2>Alternate name :</h2> ${response.docs[index].alternate_names[index]}<br><br>
    <h2>Top subjects :</h2>${response.docs[index].top_subjects}<br><br>
    <h2>Top work :</h2>${response.docs[index].top_work}<br><br>
    <h2> Work type :</h2>${response.docs[index].type}<br><br>
    <h2>work_count:</h2>${response.docs[index].work_count}<br><br>
    <h2>Author id :</h2> ${response.docs[index].key}<br><br>
    </div>`;
    authorname.append(authorpi);
  } else {
    let authorname = document.querySelector(".authorname");
    let authorpi = document.createElement("div");
    authorpi.innerHTML = `<div>
    <br><br><h2>Birth :</h2> ${response.docs[index].birth_date}<br><br>
    <h2>Death :</h2> ${response.docs[index].death_date}<br><br>
    <h2>Top subjects :</h2>${response.docs[index].top_subjects}<br><br>
    <h2>Top work :</h2>${response.docs[index].top_work}<br><br>
    <h2> Work type :</h2>${response.docs[index].type}<br><br>
    <h2>work_count:</h2>${response.docs[index].work_count}<br><br>
    <h2>Author id :</h2> ${response.docs[index].key}<br><br>
    </div>`;
    authorname.append(authorpi);
  }
}
// calling api for the book name

const findmybook = async () => {
  let input = document.querySelector("#input").value;
  let boname = trimit(input);

  let URL = `https://www.googleapis.com/books/v1/volumes?q=${boname}?`;
  console.log(URL);
  let geturl = await fetch(URL);
  let response = await geturl.json();
  let x = response.items.length;
  let j = 0;
  for (j == 0; j < response.items.length + 1; j++) {
    books(j, response);
  }
};

const books = async (index, response) => {
  buttonn.remove();
  let container6 = document.querySelector(".container6");
  let bookname = document.createElement("h3");
  // if(){
  //   let boname = document.querySelector("#input").value;
  //   bookname.innerHTML=`<h1>${boname}<h1>`;
  //   container6.append(bookname);
  //   val=true;

  // }
  let bookdet = document.createElement("div");
  bookdet.innerHTML = `
<div class="mainbook">
  <div class="bookdetails">
  <h2>${index + 1}} Book Name   :   ${response.items[index].volumeInfo.title
    }</h2><hr style="width:60%" > 
  <br>
  <h3>Author: ${response.items[index].volumeInfo.authors}</h3><br>
  <h3>categories: ${response.items[index].volumeInfo.categories}</h3><br>
  <h3>published date :${response.items[index].volumeInfo.publishedDate}</h3><br>
  <h3>average rating :${response.items[index].volumeInfo.averageRating}</h3><br>

  </div>
  <div>
  <h2> description : </h2><h3 class="description">${response.items[index].volumeInfo.description
    }.....<a href="${response.items[index].volumeInfo.previewLink
    }" target="main">Read book </a><br></h3>
  </div>
  </div>
  <hr style="width:50vw ; margin:auto">
`;
  container6.append(bookdet);
};

async function topic() {
  let input = document.querySelector("#input").value;
  buttonn.innerText = `Books Related To ${input}`;
  let data = trimauname(input);
  let URL = `https://openlibrary.org/subjects/${data}.json`;
  let fetchdurl = await fetch(URL);
  let response = await fetchdurl.json();
  for (let i = 0; i <= response.works[0].subject.length; i++) {
    printb(i, response);
  }
}
function printb(i, response) {
  let input = document.querySelector("#input").value;
  let container6 = document.querySelector(".container6");
  let newbook = document.createElement("div");
  newbook.innerHTML = `<div class ="topicbook">
  <br>
  <br> ${response.works[0].subject[i]} </div>`;
  container6.append(newbook);
}
