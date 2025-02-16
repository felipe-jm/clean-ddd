import { test, expect } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { AnswerRepository } from "../repositories/answer-repository";

const fakeAnswerRepository: AnswerRepository = {
  create: async (answer) => {
    return answer;
  },
};

test("create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository);

  const answer = await answerQuestion.execute({
    instructorId: "1",
    questionId: "1",
    content: "Answer content",
  });

  expect(answer).toBeDefined();
  expect(answer.id).toBeDefined();
  expect(answer.content).toBe("Answer content");
});
