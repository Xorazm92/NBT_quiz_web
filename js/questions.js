// Questions array
let questions = [];

// Load questions from JSON file
async function loadQuestions(filename) {
    try {
        const response = await fetch(`js/${filename}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (!data.questions || !Array.isArray(data.questions)) {
            throw new Error('Invalid questions format');
        }

        // Get all questions from JSON
        const allQuestions = data.questions.map((q, index) => {
            if (!q.question || !q.options || !Array.isArray(q.options)) {
                throw new Error('Invalid question format');
            }
            return {
                numb: index + 1,
                question: q.question,
                answer: q.options[0], // First option is correct answer
                options: shuffleArray(q.options) // Shuffle options
            };
        });
        
        // Randomly select 10 questions
        const selectedQuestions = shuffleArray(allQuestions).slice(0, 10);
        
        // Renumber questions from 1 to 10
        questions = selectedQuestions.map((q, index) => ({
            ...q,
            numb: index + 1
        }));
        
        console.log('Questions loaded successfully:', questions.length);
        return questions;
    } catch (error) {
        console.error('Error loading questions:', error);
        throw error;
    }
}

// Function to shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
