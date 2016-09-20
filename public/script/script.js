/*jshint esversion: 6 */
(function() {
let elEmail = document.getElementById("email");
let elName = document.getElementById("name");
let elPhone = document.getElementById("phone");
let btPost = document.getElementById('post');
let btGet = document.getElementById('get');
let btClear = document.getElementById('clear');
let divTable = document.getElementById('table_div');
let fForm = document.getElementById('form');

SetListeners();

//adding button-event listiners
function SetListeners() {
    "use strict";
    elName.addEventListener('blur', checkName);
    elPhone.addEventListener('blur', checkPhone);
    elEmail.addEventListener('blur', checkEmail);
    btPost.addEventListener('click', postData);
    btGet.addEventListener('click', getData);
    btClear.addEventListener('click', clearForms);
}

function checkName() {
    "use strict";
        let nameReg = new RegExp(/\d/g);
    
    if ((elName.value.length === 0) || (elName.value.match(nameReg) !== null)) {
        showMessage(window.event.target.name, 1);
    }
    else {
        showMessage(window.event.target.name, 0);
    }
}

function checkEmail() {
    "use strict";
    let emailReg = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/);
    if ((elEmail.value.length === 0) || emailReg.test(elEmail.value) !== true) {
            showMessage(window.event.target.name, 1);
    }
    else {
            showMessage(window.event.target.name, 0);
    }
}

function checkPhone() {
    "use strict";
    let phoneReg = new RegExp(/^\+375(25|29|33|44)\d{7}$/g);
    let phoneReg1 = new RegExp(/^\8017(2|3)\d{6}$/g);

    if ((elPhone.value.length === 0) || (phoneReg.test(elPhone.value) !== true && phoneReg1.test(elPhone.value) !== true)) {
        showMessage(window.event.target.name, 1);
    }
    else {
            showMessage(window.event.target.name, 0);
    }
}

function showMessage(element, on) {
    "use strict";
    let elementName = element + "_error";
    let errorMessage;
    if (on >= 1) {
        if (element === "name") {
            errorMessage = "Please enter valid name (length > 0 and contain only symbols";
        }
        else {
            errorMessage = "Please enter valid " + element;
        }
        document.getElementById(elementName).innerHTML = errorMessage;
        document.getElementById(elementName).style.visibility = 'visible';
        document.getElementById(element).focus();
    }
    else {
            document.getElementById(elementName).style.visibility = 'hidden';
            document.getElementById(elementName).innerHTML = null;
            return true;
    }
}

function postData() {
    "use strict";
    if ((elName.value.length > 0) && (elEmail.value.length > 0) && (elPhone.value.length > 0)) {
        let xhr = new XMLHttpRequest();
        let postDataSt = 'name=' + encodeURIComponent(elName.value) + '&email=' + encodeURIComponent(elEmail.value) + '&phone=' + encodeURIComponent(elPhone.value);
        
        xhr.open('POST', '/items');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(postDataSt);
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) {
            	return;
            }
            if (xhr.readyState === 4 && xhr.status === 200) {
                clearForms();
                getData();
            }
        };
    }
    else {
        alert("All the fields are required");
    }
}

function getData() {
    "use strict";
    let xhr = new XMLHttpRequest();
	
    xhr.open('GET', '/items', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function()	{
        if (xhr.readyState === 4 && xhr.status === 200) {
            createList(xhr.responseText);
        }
    };
    xhr.send(null);
}

function createList(data) {
    "use strict";
    let dataArray = JSON.parse(data);
    divTable.innerHTML = null;
	
    if (dataArray.length >= 1) {
        let table = document.createElement("table");
        table.id = "data_list";
        table.setAttribute('class', 'list');
        let headTr = document.createElement("tr");
        headTr.appendChild(document.createElement("th")).innerText = "#";
        headTr.appendChild(document.createElement("th")).innerText = "Name";
        headTr.appendChild(document.createElement("th")).innerText = "Email";
        headTr.appendChild(document.createElement("th")).innerText = "Phone";
        headTr.appendChild(document.createElement("th")).innerText = null;
        headTr.setAttribute('class', 'border-bottom');
        table.appendChild(headTr);
        divTable.appendChild(table);
       
        for (let i = 0; i < dataArray.length; i++) {
            table.appendChild(document.createElement("tr")).id = "tr" + i;
            document.getElementById("tr" + i).appendChild(document.createElement("td")).innerText = i + 1;
            document.getElementById("tr" + i).childNodes[0].setAttribute('class', 'bold');
            document.getElementById("tr" + i).appendChild(document.createElement("td")).innerText = dataArray[i].name;
            document.getElementById("tr" + i).appendChild(document.createElement("td")).innerText = dataArray[i].email;
            document.getElementById("tr" + i).appendChild(document.createElement("td")).innerText = dataArray[i].phone;
            document.getElementById("tr" + i).appendChild(document.createElement("td")).id = "td" + i;
            
            let recordID = dataArray[i]._id;
            let linkURL = document.createElement('a');
            linkURL.setAttribute('href', '#');
            linkURL.setAttribute('id', recordID);
            linkURL.appendChild(document.createTextNode("Remove"));
            document.getElementById("td" + i).appendChild(linkURL);
        }
        document.getElementById('data_list').addEventListener('click', getTarget);
        divTable.style.visibility = 'visible';
    }
}

function clearForms() {
    "use strict";
    elEmail.value = null;
    elName.value = null;
    elPhone.value = null;
}

function removeItem(id, target) {
    "use strict";
    let xhr = new XMLHttpRequest();
    let dataDelete = 'id=' + id;

    xhr.open('DELETE', '/items?id=' + id, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            removeTableRow(target);
        }
    };
    xhr.send();
}

function getTarget() {
    "use strict";
    let targetObj = window.event.target;

    if (window.event.target.nodeName === "A") {
        removeItem(targetObj.id, targetObj);
    }
}

function removeTableRow(target) {
    "use strict";
    let parentObj = target;
    let noData = false;

	while (parentObj) {
        parentObj = parentObj.parentElement;
    
        if (parentObj.nodeName === "TR") {
            document.getElementById('data_list').removeChild(parentObj);
        
            if (document.getElementById('data_list').childNodes.length === 1) {
                    document.getElementById('data_list').parentElement.removeChild(document.getElementById('data_list'));
                    divTable.style.visibility='hidden';
                    noData = true;
            }
            break;
        }
    }
    if (!noData) {
        let trCount = document.getElementById('data_list').getElementsByTagName("tr").length;
        
        for (let count = 0; count < trCount; count++) {
            if (count > 0) {
                document.getElementById('data_list').childNodes[count].childNodes[0].innerHTML = count;
            }
        }
    }
}
})();