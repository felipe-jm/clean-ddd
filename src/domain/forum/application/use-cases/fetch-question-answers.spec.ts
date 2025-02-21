import { FetchQuestionAnswersUseCase } from "./fetch-question-answers";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersUseCase;

describe("Fetch Question Answers Use Case", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
  });

  it("should be able to fetch question answers", async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId("question-1"),
        createdAt: new Date(2022, 0, 20),
      })
    );

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId("question-1"),
        createdAt: new Date(2022, 0, 18),
      })
    );

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId("question-1"),
        createdAt: new Date(2022, 0, 23),
      })
    );

    const { answers } = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(answers).toHaveLength(3);
  });

  it("should be able to fetch paginated question answers", async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId("question-1"),
        })
      );
    }

    const { answers } = await sut.execute({
      questionId: "question-1",
      page: 2,
    });

    expect(answers.length).toEqual(2);
  });
});
