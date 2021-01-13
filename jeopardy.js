const board = $('.board');
const btn = $('button')


// Below holds all the API data, once it has been properly formatted 
let categoryArr = [];
// Below holds six unique ids that will be used to call the API and get six categories with their complementary clues/answers. 
let sixIds = [];



// Restart button, empties arrays and gets new categories
btn.on("click", function(evt){
    evt.preventDefault();
    board.empty(); 
    categoryArr = [];
    sixIds = [];
    startJoint();
})


// Gets six random ids, and pushes on to sixIds if unique
function getYourIds() {
    for (i=0; i <= 5; i++) {
        let categoryId = Math.floor(1 + Math.random() * 2000);
        if(sixIds.includes(categoryId)) {
            i--;
        } else {
        sixIds.push(categoryId);
        }
    }
    return sixIds;
}

// Starts the process of getting unique ids and uses them to call API. Initially there were multiple 'joints' in the code, not a reference to Spike Lee or other.
async function startJoint() { 
    await getYourIds();
    callFromTheWild(sixIds);
}


// Layout the API reponse will take, called from within callFromTheWild and runs for each axios.get
function goodForm(res) {
    let titleData = res.data.title;
    let clue = res.data.clues.splice(0,5);
    let cluesData = clue.map(clue => ({ 
        question: clue.question,
        answer: clue.answer
    }))
    let category = { title: titleData, clues: cluesData}
    categoryArr.push(category);
};


// Multiple axios.get requests (six, to be exact), each getting its own category and clues
async function callFromTheWild(arr) {
        await axios.get((`https://jservice.io/api/category?id=${arr[0]}`))
        .then((res) => {
            goodForm(res);
            console.log(categoryArr)
            return axios.get((`https://jservice.io/api/category?id=${arr[1]}`))
        })
        .then((res) => {
            goodForm(res);
            console.log(categoryArr)
            return axios.get((`https://jservice.io/api/category?id=${arr[2]}`))
        })
        .then((res) => {
            goodForm(res);
            console.log(categoryArr)
            return axios.get((`https://jservice.io/api/category?id=${arr[3]}`))
        })
        .then((res) => {
            goodForm(res);
            console.log(categoryArr)
            return axios.get((`https://jservice.io/api/category?id=${arr[4]}`))
        })
        .then((res) => {
            goodForm(res);
            console.log(categoryArr)
            return axios.get((`https://jservice.io/api/category?id=${arr[5]}`))
        })
        .then((res) => {
            goodForm(res);
            console.log(categoryArr)
            columnate(categoryArr);
        });
        

};


// Here's where we make the columns, category at top as h3, a ul that include li for clues and answers, and a p-tag for the question mark covering 
// All gets appended to the board, then loops through making 6 columns
function columnate(arr) {
    for(i = 0; i <= 5; i++) { 
    let column = document.createElement('div');  
    column.innerHTML = ( 
        `<h3 class = "category">${arr[i].title.toUpperCase()}</h3>
        <ul class = "ulle">
        <li class = "clue">${arr[i].clues[0].question}</li>  
        <li>${arr[i].clues[0].answer}</li>
        <p class ="box">?</p>
        <li class = "clue">${arr[i].clues[1].question}</li>  
        <li>${arr[i].clues[1].answer}</li>
        <p class ="box">?</p>
        <li class = "clue">${arr[i].clues[2].question}</li>  
        <li>${arr[i].clues[2].answer}</li>
        <p class ="box">?</p>
        <li class = "clue">${arr[i].clues[3].question}</li>  
        <li>${arr[i].clues[3].answer}</li>
        <p class ="box">?</p>
        <li class = "clue">${arr[i].clues[4].question}</li>  
        <li>${arr[i].clues[4].answer}</li>
        <p class ="box">?</p>
        </ul>`
    );
     board.append(column);
    $('li').on('click', handleThisClick); 
    $('p').on('click', handleThisClick)   
    };
};

// This ornery function, handles all clicks but only removes the target if it is the question mark box or the clue box, will not remove answers.
function handleThisClick(evt){
    evt.preventDefault();
    if(evt.target.className === "box"){
        evt.target.remove();
    } else if (evt.target.className === "clue") {
        evt.target.remove();
    }  
}
  