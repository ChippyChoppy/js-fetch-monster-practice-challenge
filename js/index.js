// DOM Elements
const monstUrl = 'http://localhost:3000/monsters'
const monstCont = document.querySelector("#monster-container")
const monstForm = document.querySelector("#monster-form")
let currentPg = 1

// render functions 
function renderMonster(monster) {
    const div = document.createElement("div")
    div.dataset.id = monster.id 
    const monstH2 = document.createElement("h2")
    const monstH4 = document.createElement("h4")
    const monstP = document.createElement("p")
    monstH2.textContent = monster.name
    monstH4.textContent = 'Age: ' + monster.age
    monstP.textContent = 'Bio: ' + monster.description
    div.append(monstH2, monstH4, monstP)
    monstCont.append(div)
}
// event listeners
document.addEventListener("click", function (event) {
    if (event.target.matches("#back")) {
        currentPg--
        getMonsters(currentPg)
    } else if (event.target.matches("#forward")) {
        currentPg++
        getMonsters(currentPg)
    } 
} )

monstForm.addEventListener("submit", function(event) {
    event.preventDefault()
    console.log('submit')
    addNewMonster = {
        name: event.target.name.value,
        age: event.target.age.value,
        description: event.target.description.value
    }
    fetch(monstUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(addNewMonster)
    })
        .then(r => r.json())
        .then(monster => {
            console.log('success:', monster)
        })
})

// Fetch Functions
    // Get 50 monsters
const getMonsters = (pageNum) => {
    fetch(`${monstUrl}?_limit=50&_page=${pageNum}`)
    .then(r => r.json())
    .then(monsterArray => {
        monstCont.innerHTML = ""
        monsterArray.forEach(monster => {
            renderMonster(monster)
        })        
    })  
}

// Initializers
getMonsters()
