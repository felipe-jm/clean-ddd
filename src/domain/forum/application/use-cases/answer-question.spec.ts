import { test, expect } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { AnswersRepository } from "../repositories/answers-repository";

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer) => {
    return answer;
  },
};

test("create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const { answer } = await answerQuestion.execute({
    instructorId: "1",
    questionId: "1",
    content: "Answer content",
  });

  expect(answer).toBeDefined();
  expect(answer.id).toBeDefined();
  expect(answer.content).toBe("Answer content");
});
