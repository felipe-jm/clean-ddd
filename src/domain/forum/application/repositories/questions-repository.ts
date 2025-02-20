import { Question } from "@/domain/forum/enterprise/entities/question";

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>;
  create(question: Question): Promise<Question>;
  findBySlug(slug: string): Promise<Question | null>;
  delete(question: Question): Promise<void>;
}
