import React from "react";

const questionList = [
  "ទីតាំងឃ្លាំងនៅទីណាខ្លះ ?",
  "តើក្រុមហ៊ុនមាន មធ្យោបាយដឹកជញ្ជូន តាមណាខ្លះ?",
];
function EmptyState({ selectedQuestion }) {
  return (
    <div>
      <h2 className="font-bold text-xl text-center">
        Ask anything to AI career Agnet
      </h2>
      <div>
        {questionList.map((question, index) => (
          <h2
            className="p-4 text-center border rounded-l my-3 hover:border-blue-300 cursor-pointer"
            key={index}
            onClick={() => selectedQuestion(question)}
          >
            {question}
          </h2>
        ))}
      </div>
    </div>
  );
}

export default EmptyState;
