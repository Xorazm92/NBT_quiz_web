// Questions array
let questions = [];

// Getting all required elements
const category_box = document.querySelector(".category_box");
const info_box = document.querySelector(".info_box");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const next_btn = document.querySelector(".next_btn");
const bottom_ques_counter = document.querySelector(".total_que");

// Initialize variables
let timeValue = 25;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

// Show category box on load
window.onload = () => {
    resetQuiz();
    category_box.classList.add("active");
};

// Handle category selection
const categoryButtons = document.querySelectorAll('.category_btn');
categoryButtons.forEach(button => {
    button.onclick = async () => {
        try {
            const filename = button.getAttribute('data-file');
            const response = await fetch(`js/${filename}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            // Get all questions and shuffle them
            const allQuestions = data.questions.map((q, index) => ({
                numb: index + 1,
                question: q.question,
                answer: q.options[0],
                options: shuffleArray([...q.options])
            }));
            
            // Select 10 random questions
            questions = shuffleArray(allQuestions).slice(0, 10).map((q, index) => ({
                ...q,
                numb: index + 1
            }));
            
            if (questions.length > 0) {
                category_box.classList.remove("active");
                info_box.classList.add("activeInfo");
            } else {
                throw new Error('No questions loaded');
            }
        } catch (error) {
            console.error('Error loading questions:', error);
            alert("Savollarni yuklashda xatolik yuz berdi! Iltimos qayta urinib ko'ring.");
        }
    };
});

// If exitQuiz button clicked
info_box.querySelector(".buttons .quit").onclick = () => {
    resetQuiz();
    info_box.classList.remove("activeInfo");
    category_box.classList.add("active");
}

// If continueQuiz button clicked
info_box.querySelector(".buttons .restart").onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuetions(0);
    queCounter(1);
    startTimer(timeValue);
    startTimerLine(0);
}

// Reset quiz state
function resetQuiz() {
    timeValue = 25;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    questions = [];
    clearInterval(counter);
    clearInterval(counterLine);
    timeText.textContent = "Qolgan vaqt";
    next_btn.classList.remove("show");
}

// Show questions and options
function showQuetions(index) {
    const que_text = document.querySelector(".que_text");
    const question = questions[index];
    
    let que_tag = '<span>'+ question.numb + ". " + question.question +'</span>';
    let option_tag = '';
    question.options.forEach(option => {
        option_tag += '<div class="option"><span>'+ option +'</span></div>';
    });
    
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    
    option_list.querySelectorAll(".option").forEach(option => {
        option.onclick = () => optionSelected(option);
    });
}

// If Next Que button clicked
next_btn.onclick = () => {
    if(que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuetions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(0);
        timeText.textContent = "Qolgan vaqt";
        next_btn.classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}

// If user clicked on option
function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    
    let userAns = answer.textContent;
    let correcAns = questions[que_count].answer;
    const allOptions = option_list.children.length;
    
    if(userAns === correcAns) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", '<div class="icon tick"><i class="fas fa-check"></i></div>');
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", '<div class="icon cross"><i class="fas fa-times"></i></div>');

        // Show correct answer
        [...option_list.children].forEach(option => {
            if(option.textContent === correcAns) {
                option.setAttribute("class", "option correct");
                option.insertAdjacentHTML("beforeend", '<div class="icon tick"><i class="fas fa-check"></i></div>');
            }
        });
    }
    
    // Disable all options
    [...option_list.children].forEach(option => {
        option.classList.add("disabled");
    });
    
    next_btn.classList.add("show");
}

function showResult() {
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    
    let scoreTag = '';
    if (userScore > 7) {
        scoreTag = '<span>Tabriklaymiz! 🎉, Siz <p>'+ userScore +'</p> ta savoldan <p>'+ questions.length +'</p> ta to\'g\'ri javob topdingiz</span>';
    } else if(userScore > 5) {
        scoreTag = '<span>Yaxshi 😎, Siz <p>'+ userScore +'</p> ta savoldan <p>'+ questions.length +'</p> ta to\'g\'ri javob topdingiz</span>';
    } else {
        scoreTag = '<span>Afsuski 😐, Siz <p>'+ userScore +'</p> ta savoldan <p>'+ questions.length +'</p> ta to\'g\'ri javob topdingiz</span>';
    }
    scoreText.innerHTML = scoreTag;
}

// Restart quiz
result_box.querySelector(".buttons .restart").onclick = () => {
    result_box.classList.remove("activeResult");
    category_box.classList.add("active");
    resetQuiz();
}

// Quit quiz
result_box.querySelector(".buttons .quit").onclick = () => {
    window.location.reload();
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if(time < 9) {
            timeCount.textContent = "0" + time;
        }
        if(time < 0) {
            clearInterval(counter);
            timeText.textContent = "Vaqt tugadi";
            
            const correcAns = questions[que_count].answer;
            [...option_list.children].forEach(option => {
                if(option.textContent === correcAns) {
                    option.setAttribute("class", "option correct");
                    option.insertAdjacentHTML("beforeend", '<div class="icon tick"><i class="fas fa-check"></i></div>');
                }
                option.classList.add("disabled");
            });
            
            next_btn.classList.add("show");
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        time_line.style.width = time + "px";
        if(time > 799) { 
            clearInterval(counterLine);
        }
    }
}

function queCounter(index) {
    bottom_ques_counter.innerHTML = '<span><p>'+ index +'</p> / <p>'+ questions.length +'</p> Savol</span>';
}

// Function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
