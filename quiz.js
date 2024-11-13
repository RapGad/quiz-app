const selectedCategory = localStorage.getItem('category')
const selectedDifficulty = localStorage.getItem('difficulty')
const url = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`
const questionsContainer = document.querySelector('.questionsContainer')

let questionNumber = 0
let questions = null


let progress = 0;

function increaseProgress() {
    if (progress < 100) {
        progress += 10; // Increase by 10% each time
        document.getElementById("progress-bar").style.width = progress + "%";
    }
}


const getQuestions = async()=>{
    let err = null
    try{
        const data = await fetch(url)
        questions = await data.json()
        return questions.results


    }catch(error){
        console.log(error)

    }

    
}


async function createQuestionTag(){
    const loadedQuestions = await getQuestions()
    
    let eachQuestion = loadedQuestions[questionNumber].map((item,index)=>{
        return `
        <p class="question">
                ${questionNumber + 1}. ${item.question}
            </p>

            <ul class="answers">
                <li>Sarkodie</li>
                <li>Manifest</li>
                <li>Flowking Stone</li>
                <li>Amerado</li>
            </ul>
        `
    })

}
createQuestionTag()