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
    let ansValue

    
    /* let eachQuestion = Object.entries(loadedQuestions[number]).map(([key,value])=>{
    //Use the splice method in this manner splice(index,items to remove, item to replace with)
        console.log(key)
        let ans

        //let ans = key == 'correctAnswer' ? value : null
        if(key == 'correctAnswer') ans = value
        console.log(ans)

        if(key == value) value.splice(correctAnswer,0, ans)
       //key == 'incorrectAnswers' ? value.splice(correctAnswer,0, ans): value

        return  `
        <p class="question">
            ${questionNumber + 1}. ${ key == 'question' ? value : null}
        </p>
         <ul class="answers">

    ${key == 'incorrectAnswers' ? value.map((answer,index)=>{
        return index === correctAnswer ? `<li class=answer id=${index}>${value[index]}</li>`:`
        <li class=answer id=${index}>${answer}</li>`
  
    }).join(""): null}
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


    }) */

    let eachQuestion = Object.entries(loadedQuestions[number]).map(([key,value])=>{
        //let ansValue
        if(key == 'question'){
            let question = document.createElement('p')
            question.setAttribute('class','question')
            question.textContent = value
            questionsContainer.appendChild(question)
            console.log(question)
        }

        else if (key == 'correctAnswer'){
            ansValue = value
        }

        else if(key == 'incorrectAnswers'){
            value.splice(correctAnswer,0,ansValue)
            const answersContainer = document.createElement('ul')
            answersContainer.setAttribute('class','answers')
            const answers = value.map((answer,index)=>{
                let ans = document.createElement('li')
                ans.setAttribute('id',index)
                ans.setAttribute('class','answer')
                ans.textContent = answer
            }).join("")
            console.log(answers)

            answersContainer.append(answers)
        }

    })

eachQuestion

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


/* const arr = [
    {
        country: "Ghana",
        city: "sunyani",
        nums: [1,2,3,4]
    },
    {
        country: "Sudan",
        city: "Aman"
    },

    {

    }
]


Object.entries(arr[0]).map(([key,value])=>{
    key == 'nums' ? console.log(value):null
}) */