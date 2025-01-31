export type UserType = {
  _id: string;
  name: string;
  email: string;
  age?: number;
  mobile: string;
  interests: string[];
  isDeleted?: boolean;
};
export enum Interests {
  Sports = "Sports",
  Music = "Music",
  Reading = "Reading",
  Coding = "Coding",
  Cooking = "Cooking",
  Gardening = "Gardening",
  Travelling = "Travelling",
  Dancing = "Dancing",
}
