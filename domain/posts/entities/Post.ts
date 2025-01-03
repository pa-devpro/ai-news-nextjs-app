import { PostTitle } from "../value-objects/PostTitle";

export class Post {
  constructor(
    public _id: string,
    public author: string,
    public title: string,
    public subtitle: string,
    public url: string,
    public featured_image: string | null,
    public date: string,
    public body: { raw: string; html: string },
    public type: string,
    public topics: string[],
    public urlsegment: string,
    public original_url: string,
    public _raw: any
  ) {}
}