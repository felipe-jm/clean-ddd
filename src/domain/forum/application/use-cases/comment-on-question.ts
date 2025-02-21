import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionComment } from "../../enterprise/entities/question-comments";
import { QuestionsRepository } from "../repositories/questions-repository";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment;
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentsRepository,
    private questionsRepository: QuestionsRepository
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found.");
    }

    const questionComment = QuestionComment.create({
      content,
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
    });

    await this.questionCommentsRepository.create(questionComment);

    return { questionComment };
  }
}
