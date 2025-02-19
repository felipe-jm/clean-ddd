import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Create Question Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to create a question", async () => {
    const { question } = await sut.execute({
      authorId: "1",
      title: "Question title",
      content: "Question content",
    });

    expect(question).toBeDefined();
    expect(question.id).toBeDefined();
    expect(question.content).toBe("Question content");
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id);
  });
});
