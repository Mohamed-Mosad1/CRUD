const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productModel = document.getElementById("productModel");
const productDesc = document.getElementById("productDesc");
const searchInput = document.getElementById("searchInput");
const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const nameRules = document.getElementById("nameRule");
const priceRules = document.getElementById("priceRule");
const modelRules = document.getElementById("modelRule");

let indexUpdate = 0;
let productList = [];
if (localStorage.getItem("product") != null) {
  productList = JSON.parse(localStorage.getItem("product"));
  displayData();
}
function addProduct() {
  if (validationName() && validationPrice() && validationModel()) {
    let product = {
      name: productName.value,
      price: productPrice.value,
      model: productModel.value,
      desc: productDesc.value,
    };
    productList.push(product);
    localStorage.setItem("product", JSON.stringify(productList));
    displayData();
    clearForm();
  } else {
    alert("invalid input");
  }
}
function displayData() {
  let cartona = ``;
  for (let i = 0; i < productList.length; i++) {
    cartona += `<tr>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].model}</td>
        <td class="text-break">${productList[i].desc}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="setData(${i})">Update</button>
          <button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button>
        </td>
      </tr>`;
  }
  document.getElementById("display").innerHTML = cartona;
}
function deleteProduct(indexNum) {
  productList.splice(indexNum, 1);
  localStorage.setItem("product", JSON.stringify(productList));
  displayData();
}
function searchProduct() {
  let cartona = ``;
  for (let i = 0; i < productList.length; i++) {
    if (
      productList[i].name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      cartona += `<tr>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].model}</td>
        <td class="text-break">${productList[i].desc}</td>
        <td>
        <button onclick="setData(${i})" class="btn btn-warning btn-sm">Update</button>
        <button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button>
        </td>
      </tr>`;
    }
  }
  document.getElementById("display").innerHTML = cartona;
}
function setData(index) {
  indexUpdate = index;
  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productModel.value = productList[index].model;
  productDesc.value = productList[index].desc;
  updateBtn.classList.remove("d-none");
  addBtn.classList.add("d-none");
}
function updateData() {
  let products = {
    name: productName.value,
    price: productPrice.value,
    model: productModel.value,
    desc: productDesc.value,
  };
  productList.splice(indexUpdate, 1, products);
  localStorage.setItem("product", JSON.stringify(productList));
  displayData();
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
  clearForm();
  $("#chars").addClass("d-none");
}
function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productModel.value = "";
  productDesc.value = "";
}
function validationName() {
  let regexName = /^[A-Z][A-Za-z]{3,8}\s*([A-Za-z]{3,8})?$/gm;
  let cartona = `The first letter must be capitalized`;
  if (regexName.test(productName.value)) {
    nameRules.innerHTML = null;
    return true;
  } else {
    nameRules.innerHTML = cartona;
    return false;
  }
}

function validationPrice() {
  let cartona = `Put Price Between 1000 to 10000`;
  if (productPrice.value >= 1000 && productPrice.value <= 10000) {
    priceRules.innerHTML = "";
    return true;
  } else {
    priceRules.innerHTML = cartona;
    return false;
  }
}
function validationModel() {
  let cartona = `Choose Between (tv, mobile and laptop)`;
  let lowerCaseValue = productModel.value.toLowerCase();
  switch (lowerCaseValue) {
    case "tv":
      modelRules.innerHTML = "";
      return true;
    case "mobile":
      modelRules.innerHTML = "";
      return true;
    case "laptop":
      modelRules.innerHTML = "";
      return true;
    default:
      modelRules.innerHTML = cartona;
      break;
  }
}

$("textarea").keyup(function () {
  let regexDesc = /^[\s\S]{100,}$/gm;
  let myLength = $(this).val().length;
  let myText = $(this).val();
  $("#chars2").text(100 - myLength);
  if (regexDesc.test(myText)) {
    $("#chars").addClass("d-none");
    return true;
  } else {
    $("#chars").removeClass("d-none");
    return false;
  }
});

productName.addEventListener("input", validationName);
productPrice.addEventListener("input", validationPrice);
productModel.addEventListener("input", validationModel);
searchInput.addEventListener("input", searchProduct);
addBtn.addEventListener("click", addProduct);
updateBtn.addEventListener("click", updateData);
