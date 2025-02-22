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
    const result = await sut.execute({
      instructorId: "1",
      questionId: "1",
      content: "Answer content",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toBeDefined();
    expect(inMemoryAnswersRepository.items[0].id).toEqual(
      result.value?.answer.id
    );
  });
});
