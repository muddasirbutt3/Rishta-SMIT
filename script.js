import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyARgr3xiOEQ1Dznue9HTTEJR5RTLmTFQos",
  authDomain: "learning-firebase-39d50.firebaseapp.com",
  projectId: "learning-firebase-39d50",
  storageBucket: "learning-firebase-39d50.firebasestorage.app",
  messagingSenderId: "922354948167",
  appId: "1:922354948167:web:ea210e9f968e05a63eb962",
  measurementId: "G-9H2CRDES5X",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.log(user);
    window.location.href = "Login.html";
  } else {
  }
});

let addproduct = document.getElementById("addproduct");
addproduct.addEventListener("click", () => {
  window.location.href = "./AddRishta.html";
});

let logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  signOut(auth).then(() => console.log("Logged out!"));
  window.location.href = "./SignUp.html";
});
let productSec = document.getElementById("products-sec");
async function getData() {
  productSec.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "rishta"));
  console.log(querySnapshot);
  
  if(querySnapshot.size === 0){
    productSec.innerHTML = `<div class="norishta">No Rishtas Available</div>`
    return
  }
  querySnapshot.forEach((doc) => {
    
    productSec.innerHTML += `<div class="product-card">
        <img src="${
          doc.data().image
        }" onerror="this.onerror=null;this.src='https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';" alt="Image">
        <h3>
          <p>Name:</p>
          ${doc.data().name}
        </h3>
        <p class="price"><span>Price:</span>${doc.data().price} PKR</p>
        <p class="desc">${doc.data().desc}</p>
        <div class="actions">
          <button class="edit-btn" id='edit' onClick='editItem("${
            doc.id
          }")'>Edit</button>
          <button class="del-btn" id='del' onClick='delItem("${
            doc.id
          }")'>Delete</button>
        </div>
      </div>`;
  });
}
const delBtn = document.getElementById("del");
const editBtn = document.getElementById("edit");
async function delItem(id) {
  productSec.innerHTML = "";
  await deleteDoc(doc(db, "rishta", id));
  getData();
}
async function editItem(id) {
  console.log(id);

  const docRef = doc(db, "rishta", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  let name = prompt("Enter new Name.", docSnap.data().name);
  let desc = prompt("Enter new description.", docSnap.data().desc);
  let price = prompt("Enter new price.", docSnap.data().price);
  let image = prompt("Enter new url.", docSnap.data().image);
  const cityRef = doc(db, "rishta", id);
  await updateDoc(cityRef, {
    name,
    desc,
    price,
    image,
  });
  getData();
}
window.editItem = editItem;
window.delItem = delItem;
window.addEventListener("DOMContentLoaded", getData);
