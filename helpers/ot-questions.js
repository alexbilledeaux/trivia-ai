import axios from "axios";

function shuffle(arr) {
    let currentIndex = arr.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex], arr[currentIndex]];
    }
    return arr;
  }
  
  function getCategoryID(category) {
    const categoryIDs = {
      entertainment: [
        29, // Comics
        32, // Animation
        10, // Books
        11, // Films
        12, // Music
        13, // Theater
        14, // Television
        15, // Video Games
        16, // Boardgames
        26 // Celebrities
      ],
      art: [
        25 // Art
      ],
      science: [
        17, // Science and Nature
        18, // Computers
        19, // Mathematics
        30 // Gadgets
      ],
      sports: [
        21 // Sports
      ],
      geography: [
        22 // Geography
      ],
      history: [
        23, // History
        20 // Mythology
      ]
    }
    // Get random ID from the chosen category
    let categoryID = categoryIDs[category][Math.floor(Math.random() * categoryIDs[category].length)];
    return categoryID;
  }

export async function fetchQuestions (category, difficulty, reportedQuestions, count) {
    try {
        // Generate a session token so we don't retrieve the same questions
        let response = await axios.get('https://opentdb.com/api_token.php?command=request');
        const sessionToken = response.data.token;
        let questions = [];
        // Make more than one call so that we can rotate through categories
        while (questions.length < count) {
            let categoryID = getCategoryID(category);
            let response = await axios.get('https://opentdb.com/api.php?type=multiple&encode=url3986', {params: {difficulty: difficulty, amount: parseInt(count/3), category: categoryID, token: sessionToken}});
            console.log(response);
            for (let questionObject in response.data.results) {
                let question = response.data.results[questionObject];

                let possibleAnswers = question.incorrect_answers;
                possibleAnswers.push(question.correct_answer);
                // Remove duplicates in case the Open Trivia DB entry is set up redundantly
                possibleAnswers = [...new Set(possibleAnswers)];
                for (let possibleAnswer in possibleAnswers) {
                  possibleAnswers[possibleAnswer] = decodeURIComponent(possibleAnswers[possibleAnswer]);
                }

                shuffle(possibleAnswers);
    
                let reformattedQuestion = {
                    question: decodeURIComponent(question.question),
                    correctAnswer: decodeURIComponent(question.correct_answer),
                    possibleAnswers: possibleAnswers
                };

                let isAReportedQuestion = false;
                for (const reportedQuestion in reportedQuestions) {
                  if (reformattedQuestion.question == reportedQuestions[reportedQuestion].question.question) {
                    isAReportedQuestion = true;
                    console.log(reportedQuestions[reportedQuestion]);
                  }
                }
                if (!isAReportedQuestion) {
                  questions.push(reformattedQuestion);
                }
            }

        }

        shuffle(questions);

        questions = questions.slice(0,10);
        
        await axios.get('https://opentdb.com/api_token.php?command=reset', {params: {token: sessionToken}});

        return questions;

    } catch(error) {
        console.error(error);
    }
}