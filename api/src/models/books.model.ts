export interface Book {
  readonly id: number;
  readonly title: string;
  readonly author: string;
  readonly genres: string;
  readonly publicationDate: Date;
}