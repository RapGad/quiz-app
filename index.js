const startQuiz = document.getElementById("start")


startQuiz.addEventListener('click',()=>{

    try{
        const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked')
        const selectedCategory = document.querySelector("#category")
        if(selectedDifficulty.value === null || selectedCategory === null){
            alert("Please choose your preferences")
        } else{
            localStorage.setItem('category',selectedCategory.value)
            localStorage.setItem('difficulty',selectedDifficulty.value)
            location.href = "quiz.html"


            
    
        }

    } catch(error){
        alert("Please select you preferences")
    }
   
    
})