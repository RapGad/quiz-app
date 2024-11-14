const selectedCategory = localStorage.getItem('category')
const selectedDifficulty = localStorage.getItem('difficulty')
const url = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`
const questionsContainer = document.querySelector('.questionsContainer')
const nextQuestionButton = document.getElementById("nextQuestion")
const score = document.querySelector(".score")

let questionNumber = 0
let questions = null

const Allquestions = [
    {
        question: "Who is the fastest rapper?",
        correctAnswer: "Sarkodie",
        incorrectAnswers: [ "Manifest","Flowking Stone","Amerado"]
    }
]


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



 function createQuestionTag(number){
    const loadedQuestions =  Allquestions//await getQuestions()
    let correctAnswer = Math.floor(Math.random()*4) 
    console.log(correctAnswer)

    let ans
    
    let eachQuestion = loadedQuestions.map((item)=>{
        ans = item.incorrectAnswers.push(item.correctAnswer)

        return `
        <p class="question">
            ${questionNumber + 1}. ${item.question}
        </p>
         <ul class="answers">

    ${item.incorrectAnswers.map((answer,index)=>{
        //console.log(ans)
        //Wrong logic, Replaces the element at that particular index
        return index === correctAnswer ? `<li id=${index}>${item.incorrectAnswers[item.incorrectAnswers.length-1]}</li>`:`
        <li class=answer id=${index}>${answer}</li>`
  
    }).join("")}
          </ul>
        `
    }).join("")

    questionsContainer.innerHTML = eachQuestion


    const answers = document.querySelectorAll(".answer")

    answers.forEach(answer=>{
        answer.addEventListener('click',(e)=>{
            console.log(e.target.id)
            if(e.target.id == correctAnswer){
                answer.classList.add = 'correct'
                score.textContent = `${Number(score.innerText)+ 10}/100`
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

