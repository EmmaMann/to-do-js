
var input = document.getElementById('newItem');
var saveBtn = document.querySelector('button');
var output = document.getElementById('output');

printStored();
saveBtn.addEventListener('click', saveToDo)

// function to print any to-do list items stored in local storage
function printStored () {
	var toDoNum = localStorage.length;
	console.log(toDoNum);

	for (i=1; i<=toDoNum; i++) {
		if (localStorage.getItem('toDo'+i) && localStorage.getItem('checked'+i)) {
			var checked = localStorage.getItem('checked'+i) === 'true' ? true : false;
			var item = localStorage.getItem('toDo'+i)
			console.log(item);
			printToDo(i, item, checked);
		}	
		
	}
}

// function to save new items to storage
function saveToDo() {
	var toDoNum = document.getElementsByTagName('div').length + 1
	var newItem = input.value;
	//print the new item to the DOM
	printToDo(toDoNum, newItem, false)

	//clear form input & give focus
	input.value = ''
	input.focus()
};

function printToDo (toDoNum, input, checked) {
	//create elements to print the to do item
	//div container
	var divContainer = document.createElement('div');
	divContainer.setAttribute('id', 'item'+toDoNum);
	
	//checkbox
	var checkbox = document.createElement('input');
	checkbox.setAttribute('type', 'checkbox');
	checkbox.setAttribute('id', 'check' + toDoNum);

	//button 
	var btn = document.createElement('button');
	btn.textContent = 'Delete!';

	//label
	var toDoItem = document.createElement('label');
	toDoItem.setAttribute('for', 'check'+toDoNum);
	toDoItem.textContent = input;

	//add to do content to the div
	divContainer.appendChild(checkbox);
	divContainer.appendChild(toDoItem);
	divContainer.appendChild(btn);
	
	//output the createed list item to the dom
	output.appendChild(divContainer);

	//delete list item if button clicked
	btn.addEventListener('click', deleteToDo);

	//cross off completed items 
	checkbox.addEventListener('change', completeToDo);

	//give stored list items appropriate styling for if they are checked off or not
	if (checked === true) {
		output.append(divContainer);
		checkbox.checked=true;
		toDoItem.classList.add('check');
	}
	else {
		checkbox.checked=false;
		output.prepend(divContainer);
		toDoItem.classList.remove('check');
	}

	//save list item & checked state to local storage
	localStorage.setItem('toDo'+toDoNum, input);
	localStorage.setItem('checked'+toDoNum, checked);

};

//change styling of printed list items as they are checked off/on
function completeToDo(event) {
	if (event.target.checked) {
		//capture which checkbox is checked
		var checked = event.target.checked;
		listNum = event.target.getAttribute('id');
		listNum = listNum.slice(listNum.length-1);
		console.log(listNum);
		//get corresponding div
		var completeItem = document.getElementById('item'+Number(listNum));
		
		//delete element
		completeItem.parentNode.removeChild(completeItem);

		//reprint to move to end of list & storage
		// var toDoNum = document.getElementsByTagName('div').length + 1
		var content = completeItem.children[1].textContent;
		console.log(content);
		printToDo(listNum, content, checked);
		saveToStorage(listNum, content, checked);
		completeItem.classList.add('check');
	}
	else if (!event.target.checked) {
		listNum = event.target.getAttribute('id');
		listNum = listNum.slice(listNum.length-1);
		var completeItem = document.getElementById('item'+Number(listNum));
		var label = completeItem.querySelector('label');
		console.log(completeItem)
		label.classList.remove('check');
		event.target.checked=false;
		output.prepend(completeItem);
		localStorage.setItem('checked'+listNum, 'false')
	}
}

function deleteToDo(event) {
	//delete item from page
	event.target.parentNode.style.backgroundColor = '#ffe6e6';
	setTimeout(function(){ event.target.parentNode.parentNode.removeChild(event.target.parentNode); }, 1000);
	
	//get to do list number
	listNum = event.target.parentNode.getAttribute('id');
	console.log(listNum);
	listNum = listNum.slice(listNum.length-1);

	//remove corresponding item from storage
	localStorage.removeItem('toDo'+listNum);
	localStorage.removeItem('checked'+listNum);
}

function saveToStorage(toDoNum, input, checked) {
	localStorage.setItem('toDo'+toDoNum, input)
	localStorage.setItem('checked'+toDoNum, checked)
}