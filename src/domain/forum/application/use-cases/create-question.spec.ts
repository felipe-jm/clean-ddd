import { test, expect } from "vitest";
import { QuestionsRepository } from "../repositories/questions-repository";
import { CreateQuestionUseCase } from "./create-question";

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question) => {
    return question;
  },
};

test("create a question", async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository);

  const { question } = await createQuestion.execute({
    authorId: "1",
    title: "Question title",
    content: "Question content",
  });

  expect(question).toBeDefined();
  expect(question.id).toBeDefined();
  expect(question.content).toBe("Question content");
});
