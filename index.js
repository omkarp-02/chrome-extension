let myInput = []
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");
const inputFromLocalStorage = JSON.parse(localStorage.getItem("myInput") )

if (inputFromLocalStorage) {
    myInput = inputFromLocalStorage
    render(myInput)
}

function render(input) {
    let listItems = ""
    for (let i = 0; i < input.length; i++) {
    listItems += `
                    <li>
                        <a target='_blank' href='${input[i]}'>
                        ${input[i]}
                    </a>
                    </li>
                 `
    }
    ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function() {
    myInput.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myInput", JSON.stringify(myInput))
    render(myInput)
})


tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myInput.push(tabs[0].url)
        localStorage.setItem("myInput", JSON.stringify(myInput) )
        render(myInput)
    })
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myInput = []
    render(myInput)
})

// const li = document.createElement("li")
    // li.textContent = myInput[i]
    // ulEl.append(li)