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
    },
    {
        question: "What is my name?",
        correctAnswer: "Jeffrey",
        incorrectAnswers: ["Akuako","Master","KillerBean"]
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

    let ans
    
    let eachQuestion = Object.entries(loadedQuestions[number]).map(([key,value])=>{
    //Use the splice method in this manner splice(index,items to remove, item to replace with)

        //ans = item.incorrectAnswers.splice(correctAnswer,0,item.correctAnswer)

        return `
        <p class="question">
            ${questionNumber + 1}. ${key}
        </p>
         <ul class="answers">

    ${item.incorrectAnswers.map((answer,index)=>{
        //console.log(ans)
        //Wrong logic, Replaces the element at that particular index
        return index === correctAnswer ? `<li class=answer id=${index}>${item.incorrectAnswers[index]}</li>`:`
        <li class=answer id=${index}>${answer}</li>`
  
    }).join("")}
          </ul>
        `
    }).join("")

    questionsContainer.innerHTML = eachQuestion


    const answers = document.querySelectorAll(".answer")

    answers.forEach(answer=>{
        answer.addEventListener('click',(e)=>{
            if(e.target.id == correctAnswer){
                answer.style.border = "1px solid #4caf50"
                score.textContent = `${Number(score.innerText)+ 10}/100`
            }
            else{
                answer.style.border = "1px solid red"
                answers.forEach(answer=> {
                    if(answer.id == correctAnswer){
                        answer.style.border = "1px solid #4caf50"
                    }
                    //else answer.style.border = "1px solid red"
                })

            }
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


const arr = [
    {
        country: "Ghana",
        city: "sunyani"
    },
    {
        country: "Sudan",
        city: "Aman"
    },
]


console.log(arr[0])