let box = document.querySelector(".box")
let Api = "https://64f80947824680fd217f0cad.mockapi.io/card/api/users";

async function get() {
    try {
        const { data } = await axios.get(Api)
        getdata(data)
    } catch (error) {
        console.log(error)
    }
}

// ------------------------------add---------------------
let dialogadd = document.querySelector(".dialogadd");
let formadd = document.querySelector(".formadd");
let btn = document.querySelector(".btn");



btn.onclick = () => {
    dialogadd.showModal()
}
async function NEWUSER(user) {
    try {
        const { data } = await axios.post(Api, user) 
        get()
    } catch (error) {
        console.log(error);
    }
}

formadd.onsubmit = (event) => {
    event.preventDefault()
    let user = {
        email: formadd["inp1"].value,
        name:formadd["inp2"].value,
    }
    NEWUSER(user)
    dialogadd.close()
    formadd.reset()
}
// ---------------------------checkbox------------------------
async function Funchek(id,user) {
    try {
        const { data } = await axios.put(`${Api}/${id}`, user)
        get()
    } catch (error) {
        console.log(error);
    }
}
// ----------------------------delete--------------------------

async function funcDel(id) {
    try {
        const { data } = await axios.delete(`${Api}/${id}`)
        get()
    } catch (error) {
        console.log(error);
    }
}

// ----------------------------------Edit------------------------


let editModal = document.querySelector(".dialogEdit");
let forrmmEdit = document.querySelector(".formEdit");

async function funcEdit(id, user) {
  try {
      const { data } = await axios.put(`${Api}/${id}`, user);
      get()
  } catch (error) {
    console.log(error);
  }
}


function editUser(e) {
  editModal.showModal();
  forrmmEdit["inp3"].value = e.email;
  forrmmEdit["inp4"].value = e.name;

  forrmmEdit.onsubmit = (event) => {
    event.preventDefault();
    let editObj = {
      email: forrmmEdit["inp3"].value,
      name: event.target["inp4"].value,
    };
    funcEdit(e.id, editObj);
    editModal.close();
  };
}
// --------------------------info---------------------


let dialogshow = document.querySelector(".dialogshow");
let h1 = document.querySelector(".h1");
let h2 = document.querySelector(".h2");
let h3 = document.querySelector(".h3");
let h4 = document.querySelector(".h4");
let btnclose = document.querySelector(".btnclose");
btnclose.onclick = () => {
    dialogshow.close()
}


function funinfo(id, e) {
    dialogshow.showModal();
    h1.innerHTML = e.email;
    h2.innerHTML = e.name;
    h3.innerHTML = e.completed
    h4.innerHTML = e.id;
}


function getdata(data) {
    box.innerHTML = ""
    data.forEach((e) => {
        let div = document.createElement("div")
        div.classList.add("div");
        let h2 = document.createElement("h3")
        h2.innerHTML = e.email;
        let h1 = document.createElement("h3")
        h1.classList.add("h1")
        h1.innerHTML = e.name
        // chek
        let chek = document.createElement("input")
        chek.classList.add("chek");
        chek.type = "checkbox"
        chek.checked = e.completed;
        chek.onclick = () => {
            e.completed = !e.completed;
            Funchek(e.id,e)
        }
        if (e.completed == true) {
            h2.classList.toggle("chekk")
        }

        // activ
        let status = document.createElement("h3")
        status.classList.add("status");
        status.innerHTML = ! e.completed ? "Activ" : "InActiv";
        status.style.color = !e.completed ? "white" : "yellow";
        status.style.background = !e.completed ? "green" : "red";

        // DELETE
        let Delete = document.createElement("img")
        Delete.classList.add("Delete");
        Delete.src = "./Без названия.png"
        Delete.onclick = () => {
            funcDel(e.id)
        }
        //edit
        let Edit = document.createElement("img");
        Edit.classList.add("Edit");
        Edit.src = "./Без названия (1).png";
        Edit.onclick = () => {
          editUser(e);
        };
        // info
        let info = document.createElement("img")
        info.classList.add("info");
        info.src = "./photo_2023-09-07_15-45-50.jpg"
        info.onclick = () => {
            // dialogshow.showModal();
            funinfo(e.id,e)
        }




        div.append(h2, h1, status);
        div.appendChild(info);
        div.appendChild(chek)
        div.appendChild(Edit);
        div.appendChild(Delete);
        box.appendChild(div)
  })  
}
get()