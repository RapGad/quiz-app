const selectedCategory = localStorage.getItem('category')
const selectedDifficulty = localStorage.getItem('difficulty')
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

function prompt(currScore,cate,lev){
    const category = cate
    let level = lev

    const divContainer = document.createElement('div')
    divContainer.setAttribute('class','container')
    const paraEl = document.createElement('p')
    const btnsContainer = document.createElement('div')
    btnsContainer.setAttribute('class','btns')
    const replayButton = document.createElement('button')
    const nextButton = document.createElement('button')
    

    Number(currScore) >4 ? lev != 'hard' ?
    paraEl.textContent = `
    You Scored ${currScore} out of 10\n
    Do you wish to move to the next difficulty level or replay??`:paraEl.textContent = `
    You Scored ${currScore} out of 10 \n
    Yeeeyyyyy You beat Our last level
    `: paraEl.textContent =`You Scored ${currScore} out of 10 \n
    Do you wish to replay`

    if (currScore > 4) {
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


    replayButton.textContent = 'replay'
    nextButton.textContent = 'next'
    btnsContainer.append(replayButton,nextButton)
    divContainer.append(paraEl,btnsContainer)
    questionsContainer.replaceChildren(divContainer)

    if(currScore < 5){
        console.log(currScore)
        nextButton.disabled = true
    }




    //The innner functions cannot take parameters from the outer functions
    //I have to create a variable in the outer function
    //And set that variable to to the parameters in the inner functions...

    replayButton.addEventListener('click',async()=>{
        score.innerText = 0
        questionNumber = 0
        progress = 10
        questions = []
        document.getElementById("progress-bar").style.width = progress + "%";
        await createQuestionTag(questionNumber,category,level)
        nextQuestionButton.disabled = false

    })

    nextButton.addEventListener('click',()=>{
        score.innerText = 0
        questionNumber = 0
        progress = 10
        document.getElementById("progress-bar").style.width = progress + "%";
        questions = []
        createQuestionTag(questionNumber,category,level)
        nextQuestionButton.disabled = false

    })
}


const getQuestions = async(selectedCategory,selectedDifficulty)=>{
    const apiUrl = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`
    console.log(apiUrl)
    if(questions.length === 0 && !isLoading){
        isLoading = true
        try{
            const data = await fetch(apiUrl)
            questions = await data.json()
            isLoading = false
            return questions
    
    
        }catch(error){
            isLoading = false
            error = true
    
        }
    }

    
}



 async function createQuestionTag(number,selectedCategory,selectedDifficulty){
    if(questions.length === 0){
        nextQuestionButton.disabled = true
        questionsContainer.innerHTML = `<p style="text-align:center">Loading...</p>`
        await getQuestions(selectedCategory,selectedDifficulty)
        isLoading = false

    } 

    const loadedQuestions = questions.results
    let correctAnswer = Math.floor(Math.random()*4) 
    let ansValue
    console.log(error)

    if(!isLoading && !error){
    


        if(loadedQuestions != undefined && loadedQuestions.length > 0){
            nextQuestionButton.disabled = false
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
    }

        else{
            questionsContainer.innerHTML = `<p style="text-align: center">Error Occured :(</p>`
            return 
        }

    


    const answers = document.querySelectorAll(".answer")



    answers.forEach(answer=>{
        answer.addEventListener('click',(e)=>{
            if(e.target.id == correctAnswer){
                answer.style.border = "1px solid #4caf50"
                score.textContent = `${Number(score.innerText)+ 1}`
            }
            else{
                answer.style.border = "1px solid red"
                answers.forEach(answer=> {
                    answer.style.pointerEvents = 'none'
                    if(answer.id == correctAnswer){
                        answer.style.border = "1px solid #4caf50"
                    }
                })

            }
        })})

}
createQuestionTag(questionNumber,selectedCategory,selectedDifficulty)

nextQuestionButton.addEventListener("click",(e)=>{
    
    questionNumber ++
    if(questionNumber === 10){
        e.target.disabled = true
        prompt(Number(score.innerText),selectedCategory,selectedDifficulty)

    }
    else createQuestionTag(questionNumber,selectedCategory,selectedDifficulty)

    //progressBar(progress)
    if (progress < 100) {
        progress += 10; // Increase by 10% each time
        document.getElementById("progress-bar").style.width = progress + "%";
    }
    //
    
    
    
})
