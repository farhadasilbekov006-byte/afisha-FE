export type Category =
  | "concert"
  | "lecture"
  | "sport"
  | "theatre"
  | "other";

  export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location:string;
    category: Category;
    price: string;
    imageUrl?: string;
  }

  export interface EvenstResponse {
    items: Event[];
    total: number;
    page: number;
    limit: number;
  }