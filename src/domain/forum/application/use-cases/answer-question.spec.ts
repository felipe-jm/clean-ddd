import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Answer Question Use Case", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should be able to create a question", async () => {
    const { answer } = await sut.execute({
      instructorId: "1",
      questionId: "1",
      content: "Answer content",
    });

    expect(answer).toBeDefined();
    expect(answer.id).toBeDefined();
    expect(answer.content).toBe("Answer content");
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id);
  });
});
