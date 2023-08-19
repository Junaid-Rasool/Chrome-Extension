let myData = [];
let inputElement = document.getElementById('input-element');
let inputBtn = document.getElementById('input-btn');
let ulItems = document.getElementById('ul-items');
let tabBtn = document.getElementById('tab-btn');
let dltBtn = document.getElementById('dlt-btn');

let dataFromLocalStorage = JSON.parse(localStorage.getItem("myData"));
if(dataFromLocalStorage) {
    myData = dataFromLocalStorage;
    renderData();
}

function renderData() {
    listItems = "";
    for(i = 0; i < myData.length; i++) {
        listItems += `<li>
        <a target = '_blank' 
        href = '${myData[i]}'>
        ${myData[i]}</a>
        </li>`
    }
    ulItems.innerHTML = listItems;
}

inputBtn.addEventListener("click", function() {
    myData.push(inputElement.value);
    inputElement.value = "";
    localStorage.setItem("myData", JSON.stringify(myData));
    renderData();
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myData.push(tabs[0].url);
        localStorage.setItem("myData", JSON.stringify(myData));
        renderData();
    })
})

dltBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myData = [];
    renderData();
})

