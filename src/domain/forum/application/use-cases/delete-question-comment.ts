import { QuestionComment } from "../../enterprise/entities/question-comments";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

interface DeleteQuestionCommentUseCaseResponse {
  questionComment: QuestionComment;
}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentsRepository.findById(
      questionCommentId
    );

    if (!questionComment) {
      throw new Error("Question comment not found.");
    }

    if (authorId !== questionComment.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    await this.questionCommentsRepository.delete(questionComment);

    return { questionComment };
  }
}
