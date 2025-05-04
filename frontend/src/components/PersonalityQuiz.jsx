import { useState } from 'react';
import { Button, Modal,  ProgressBar } from 'react-bootstrap';

const PersonalityQuiz = ({ pets, onComplete }) => {
  const [show, setShow] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const questions = [
    {
      question: "How active are you?",
      options: ["Very active", "Moderately active", "Not very active"],
    },
    {
      question: "Do you prefer quiet or lively environments?",
      options: ["Quiet", "A mix of both", "Lively"],
    },
    {
      question: "How much time can you spend with a pet daily?",
      options: ["Less than 1 hour", "1-3 hours", "More than 3 hours"],
    },
    {
      question: "What's your ideal pet size?",
      options: ["Small", "Medium", "Large"],
    },
  ];

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (answers) => {
    if (!pets || pets.length === 0) {
      setError("No pets available to match at the moment.");
      return;
    }

    const scores = pets.map(pet => {
      let score = 0;
      if (pet.personality.toLowerCase().includes('active') && answers[0] === "Very active") score += 2;
      if (pet.personality.toLowerCase().includes('calm') && answers[0] === "Not very active") score += 2;
      if (pet.species === "Dog" && answers[3] === "Large") score += 1;
      if (pet.species === "Cat" && answers[3] === "Small") score += 1;
      return { ...pet, score };
    });

    if (scores.length === 0) {
      setError("No suitable matches found.");
      return;
    }

    const bestMatch = scores.reduce((prev, current) =>
      (prev.score > current.score) ? prev : current
    );

    setResult(bestMatch);
    setError('');
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setError('');
  };

  return (
    <>
      <Button
        variant="info"
        onClick={() => {
          if (!pets || pets.length === 0) {
            alert("No pets available for matching at the moment.");
            return;
          }
          setShow(true);
        }}
      >
        Take Personality Quiz
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Pet Personality Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error ? (
            <div className="text-center text-danger">
              <p>{error}</p>
              <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
            </div>
          ) : !result ? (
            <>
              <ProgressBar
                now={(currentQuestion / questions.length) * 100}
                label={`${currentQuestion + 1}/${questions.length}`}
                className="mb-3"
              />
              <h5 className="mb-4">{questions[currentQuestion].question}</h5>
              <div className="d-grid gap-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline-primary"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <h4>Your perfect match is...</h4>
              <h3 className="my-4">{result.name} the {result.species}</h3>
              <p>Personality: {result.personality}</p>
              <p>Age: {result.age} years</p>
              <p>Current Mood: {result.mood}</p>
              <Button
                variant="primary"
                className="mt-3"
                onClick={() => {
                  onComplete(result);
                  setShow(false);
                }}
              >
                View {result.name}
              </Button>
              <Button
                variant="outline-secondary"
                className="mt-3 ms-2"
                onClick={resetQuiz}
              >
                Retake Quiz
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PersonalityQuiz;
