export interface Book {
  id: string;
  titleKey: string;
  descriptionKey: string;
  cover: string;
  amazonUrl: string;
  price: number;
}

export const books: Book[] = [
  {
    id: "epic-dragons",
    titleKey: "books.epicDragonsTitle",
    descriptionKey: "books.epicDragonsDesc",
    cover: "/books/epic-dragons-coloring-book.jpg",
    amazonUrl: "https://a.co/d/0bsUhEBS",
    price: 10,
  },
  {
    id: "fairy-realms",
    titleKey: "books.fairyRealmsTitle",
    descriptionKey: "books.fairyRealmsDesc",
    cover: "/books/fairy-realms-coloring-book.jpg",
    amazonUrl: "https://a.co/d/08NswUAE",
    price: 10,
  },
];
