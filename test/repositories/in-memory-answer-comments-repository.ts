import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comments";
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = [];

  async findById(id: string) {
    const answerComment = this.items.find((item) => item.id.toString() === id);

    if (!answerComment) {
      return null;
    }

    return answerComment;
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment);

    return answerComment;
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComment.id
    );

    this.items.splice(itemIndex, 1);
  }
}
