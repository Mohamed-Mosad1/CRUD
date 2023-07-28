var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productModel = document.getElementById("productModel");
var productDesc = document.getElementById("productDesc");
var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var nameRules = document.getElementById("nameRule");
var priceRules = document.getElementById("priceRule");
var modelRules = document.getElementById("modelRule");
var descRules = document.getElementById("descRule");
var indexUpdate = 0;
var productList = [];
if (localStorage.getItem("product") != null) {
  productList = JSON.parse(localStorage.getItem("product"));
  displayData();
}
function addProduct() {
  if (
    validationName() &&
    validationPrice() &&
    validationModel() &&
    validationDesc()
  ) {
    var product = {
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
  var cartona = ``;
  for (var i = 0; i < productList.length; i++) {
    cartona += `<tr>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].model}</td>
        <td><p>${productList[i].desc}</p></td>
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
  var cartona = ``;
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      cartona += `<tr>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].model}</td>
        <td>${productList[i].desc}</td>
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
  var products = {
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
}
function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productModel.value = "";
  productDesc.value = "";
}
function validationName() {
  var regexName = /^[A-Z][A-Za-z]{3,8}\s*([A-Za-z]{3,8})?$/gm;
  var cartona = `The first letter must be capitalized`;
  if (regexName.test(productName.value)) {
    nameRules.innerHTML = null;
    return true;
  } else {
    nameRules.innerHTML = cartona;
    return false;
  }
}

function validationPrice() {
  var cartona = `Put Price Between 1000 to 10000`;
  if (productPrice.value >= 1000 && productPrice.value <= 10000) {
    priceRules.innerHTML = null;
    return true;
  } else {
    priceRules.innerHTML = cartona;
    return false;
  }
}
function validationModel() {
  var cartona = `Choose Between (tv, mobile and laptop)`;
  var lowerCaseValue = productModel.value.toLowerCase();
  switch (lowerCaseValue) {
    case "tv":
      modelRules.innerHTML = null;
      return true;
    case "mobile":
      modelRules.innerHTML = null;
      return true;
    case "laptop":
      modelRules.innerHTML = null;
      return true;
    default:
      modelRules.innerHTML = cartona;
      break;
  }
}
function validationDesc() {
  var regexDesc = /^[\s\S]{10,}$/gm;
  var cartona = `at least 250 characters`;
  if (regexDesc.test(productDesc.value)) {
    descRules.innerHTML = null;
    return true;
  } else {
    descRules.innerHTML = cartona;
    return false;
  }
}
