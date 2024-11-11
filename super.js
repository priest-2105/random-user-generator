const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = [    
]

// Fetch Random User and add Money

async function getRandomUser() {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const user = data.results[0]
    console.log(user);

    const newUser ={
        name : `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 10000),
    }

    addData(newUser);
}

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();



function doubleMoney(){
    data = data.map((user) => {
        return { ...user, money: user.money * 2}
    })
    updateDOM()
}

function showMillionaires(){
    data = data.filter((user) => { 
        return user.money > 1000000 
    })
    updateDOM()
}


function sortByRichest(){
    data.sort((a, b) => b.money - a.money)
    updateDOM();
}

function calculateWealth(){
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong> ${formatMoney(wealth)} </strong></h3>`;
    main.appendChild(wealthEl);
}
 

// add nore obj to data Arr
function addData(obj){
    data.push(obj);

    updateDOM();
}


// update Dom 
function updateDOM(providedData = data){

    main.innerHTML  = '<h2><strong>Person</strong> Wealth</h2>'

    providedData.forEach(item => {

        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element)
    })
}


// Format Money 

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


// Add User 
addUserBtn.addEventListener('click', () => getRandomUser());

// Double Money
doubleBtn.addEventListener('click', () => doubleMoney());

// Show millionaires
showMillionaireBtn.addEventListener('click', () => showMillionaires());

// sort by richest 
sortBtn.addEventListener('click', () => sortByRichest());

// calculate the total
calculateWealthBtn.addEventListener('click', () => calculateWealth());