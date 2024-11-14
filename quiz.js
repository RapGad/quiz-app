const selectedCategory = localStorage.getItem('category')
const selectedDifficulty = localStorage.getItem('difficulty')
const url = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`
const questionsContainer = document.querySelector('.questionsContainer')
const nextQuestionButton = document.getElementById("nextQuestion")

let questionNumber = 0
let questions = null


let progress = 0;


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



async function createQuestionTag(number){
    const loadedQuestions = await getQuestions()
    let correctAnswer = Math.floor(Math.random()*3) 
    let ans
    
    let eachQuestion = loadedQuestions[number].map((item)=>{
        ans = item.correctAnswer

        return `
        <p class="question">
            ${questionNumber + 1}. ${item.question}
        </p>
         <ul class="answers">

    ${item.incorrectAnswers.map((answer,index)=>{
        index === correctAnswer ? ` <li id=${index}>${ans}</li>`:`
        <li class=answer id=${index}>${answer}</li>`
  
    })}
          </ul>
        `
    })

    questionsContainer.innerHTML = eachQuestion


    const answers = document.querySelectorAll(".answer")

    answers.forEach(answer=>{
        answer.addEventListener('click',(e)=>{
            if(e.target.id == correctAnswer){
                answer.classList.add = 'correct'
            }
            else{
                answer.classList.add ='wrong'
            }
            answer == correctAnswer ? answer.classList.add = 'correct': answer.classList.add = 'dim'
        })
    })

}
createQuestionTag(questionNumber)

nextQuestionButton.addEventListener("click",()=>{
    questionNumber ++
    createQuestionTag(questionNumber)
    if (progress < 100) {
        progress += 10; // Increase by 10% each time
        document.getElementById("progress-bar").style.width = progress + "%";
    }
    
})

