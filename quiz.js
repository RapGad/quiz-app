const selectedCategory = localStorage.getItem('category')
const selectedDifficulty = localStorage.getItem('difficulty')
const url = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`
const questionsContainer = document.querySelector('.questionsContainer')
const nextQuestionButton = document.getElementById("nextQuestion")
const score = document.querySelector(".score")
let questions = []
let isLoading = false 
let error = false


function decodeHtmlEntities(encodedStr) {
    return encodedStr.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
                     .replace(/&amp;/g, '&')
                     .replace(/&lt;/g, '<')
                     .replace(/&gt;/g, '>')
                     .replace(/&quot;/g, '"')
                     .replace(/&#039;/g, "'");
  }
  

let questionNumber = 0

let progress = 0;


const getQuestions = async()=>{
    error = true

    if(questions.length === 0 && !isLoading){
        isLoading = true
        try{
            const data = await fetch(url)
            questions = await data.json()
            error = false
            return questions
    
    
        }catch(error){
            console.error(error)
            error = true
    
        }
    }

    
}



 async function createQuestionTag(number){
    await getQuestions()
    const loadedQuestions = questions.results
    let correctAnswer = Math.floor(Math.random()*4) 
    let ansValue
    console.log(error)

    if(isLoading && !error){
        questionsContainer.innerHTML = '<p style="text-align: center">Loading...</p>'
        return
    }

    if(error){
        questionsContainer.innerHTML = '<p style="text-align: center">Error Occured</p>'
    }

        if(loadedQuestions.length > 0 && !error){
            Object.entries(loadedQuestions[number]).map(([key,value])=>{
            //let ansValue
            if(key == 'question'){
                let question = document.createElement('p')
                question.setAttribute('class','question')
                question.textContent = `${number+1}.${decodeHtmlEntities(value)}`
                questionsContainer.innerHTML = ''
                questionsContainer.appendChild(question)
            }
    
            else if (key == 'correct_answer'){
                ansValue = value
            }
    
            else if(key == 'incorrect_answers'){
                value.splice(correctAnswer,0,ansValue)
                const answersContainer = document.createElement('ul')
                answersContainer.setAttribute('class','answers')
                value.map((answer,index)=>{
                    let ans = document.createElement('li')
                    ans.setAttribute('id',index)
                    ans.setAttribute('class','answer')
                    ans.textContent = decodeHtmlEntities(answer)
                    answersContainer.appendChild(ans)
                })
                questionsContainer.appendChild(answersContainer)
    
            }
    
        })}

        else{
            questionsContainer.innerHTML = `<p style="text-align: center">Error Occured</p>`
            return 
        }

    


    const answers = document.querySelectorAll(".answer")

    answers.forEach(answer=>{
        answer.addEventListener('click',(e)=>{
            if(e.target.id == correctAnswer){
                answer.style.border = "1px solid #4caf50"
                score.textContent = `${Number(score.innerText)+ 10}`
            }
            else{
                answer.style.border = "1px solid red"
                answers.forEach(answer=> {
                    if(answer.id == correctAnswer){
                        answer.style.border = "1px solid #4caf50"
                    }
                })

            }
        })})

}
createQuestionTag(questionNumber)

nextQuestionButton.addEventListener("click",()=>{
    
    questionNumber ++
    if(questionNumber === 9){
        alert("All done")
    }
    createQuestionTag(questionNumber)
    if (progress < 100) {
        progress += 10; // Increase by 10% each time
        document.getElementById("progress-bar").style.width = progress + "%";
    }
    
})

