import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comments";
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = [];

  async findById(id: string) {
    const questionComment = this.items.find(
      (item) => item.id.toString() === id
    );

    if (!questionComment) {
      return null;
    }

    return questionComment;
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment);

    return questionComment;
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComment.id
    );

    if (itemIndex === -1) {
      throw new Error("Question comment not found.");
    }

    this.items.splice(itemIndex, 1);
  }
}
