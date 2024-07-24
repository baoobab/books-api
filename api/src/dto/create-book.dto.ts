export interface CreateBookDto {
  readonly title: string;
  readonly author: string;
  readonly genres: string;
  readonly publicationDate: Date;
}