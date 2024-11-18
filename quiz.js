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
    return encodedStr.replace(/&#(\d+);/g, (dec) => String.fromCharCode(dec))
                     .replace(/&amp;/g, '&')
                     .replace(/&lt;/g, '<')
                     .replace(/&gt;/g, '>')
                     .replace(/&quot;/g, '"')
                     .replace(/&#039;/g, "'");
  }
  

let questionNumber = 0

let progress = 10;
function prompt(score,lev,cate){
    const category = cate
    const level = lev
    const divContainer = document.createElement('div')
    divContainer.setAttribute('class','container')
    const paraEl = document.createElement('p')
    const btnsContainer = document.createElement('div')
    btnsContainer.setAttribute('class','btns')
    const replayButton = document.createElement('button')
    const nextButton = document.createElement('button')

    Number(score) < 5 ? nextButton.disabled = true : null

    Number(score) >4 ? lev != 'hard' ?
    paraEl.textContent = `
    You Scored ${score} out of 10 <br>
    Do you wish to move to the next difficulty level or replay??`: `
    You Scored ${score} out of 10 <br>
    Yeeeyyyyy You beat Our last level
    `: `You Scored ${score} out of 10 <br>
    Do you wish to replay`


    if (nextButton.disabled === false) {
        switch(level){
        case 'easy':
            level = 'medium'
            break

        case 'medium':
            level = 'hard'
            break

        default:
            level = 'easy'
    }
}





    //The innner functions cannot take parameters from the outer functions
    //I have to create a variable in the outer function
    //And set that variable to to the parameters in the inner functions...
    replayButton.addEventListener('click',()=>{
        questionNumber = 0
        createQuestionTag(questionNumber,category,level)

    })

    nextButton.addEventListener('click',()=>{
        questionNumber = 0
        createQuestionTag(questionNumber,category,level)
    })



    replayButton.textContent = 'replay'
    nextButton.textContent = 'next'
    btnsContainer.append(replayButton,nextButton)
    divContainer.append(paraEl,btnsContainer)
    questionsContainer.replaceChildren(divContainer)
}


const getQuestions = async(selectedCategory,selectedDifficulty)=>{

    if(questions.length === 0 && !isLoading){
        isLoading = true
        try{
            const data = await fetch(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`)
            questions = await data.json()
            return questions
    
    
        }catch(error){
            isLoading = false
            console.error(error)
            error = true
    
        }
    }

    
}



 async function createQuestionTag(number,category,level){
    await getQuestions(category,level)
    const loadedQuestions = questions.results
    let correctAnswer = Math.floor(Math.random()*4) 
    let ansValue

    if(isLoading){
        questionsContainer.innerHTML = '<p style="text-align: center">Loading...</p>'
        return
    }

        if(loadedQuestions != undefined && loadedQuestions.length > 0){
            Object.entries(loadedQuestions[number]).map(([key,value])=>{
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
            questionsContainer.innerHTML = `<p style="text-align: center">Error Occured :(</p>`
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
                    answer.style.pointerEvents = 'none'
                    //console.log(PointerEvent)
                    if(answer.id == correctAnswer){
                        answer.style.border = "1px solid #4caf50"
                    }
                })

            }
        })})

}
createQuestionTag(questionNumber)

nextQuestionButton.addEventListener("click",(e)=>{
    
    questionNumber ++
    if(questionNumber === 10){
        e.target.disabled = true
        prompt(Number(score.innerText),selectedCategory,selectedDifficulty)

    }
    else createQuestionTag(questionNumber)
    //
    if (progress < 100) {
        progress += 10; // Increase by 10% each time
        document.getElementById("progress-bar").style.width = progress + "%";
    }
    
    
})

