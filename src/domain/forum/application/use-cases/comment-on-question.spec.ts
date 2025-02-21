import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { InMemoryQuestionCommentsRepository } from "test/repositories/question-comments-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe("Comment on Question Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionCommentsRepository,
      inMemoryQuestionsRepository
    );
  });

  it("should be able to comment on question", async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityId("question-1"));

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId: "1",
      questionId: "question-1",
      content: "Comment content",
    });

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      "Comment content"
    );
  });
});
