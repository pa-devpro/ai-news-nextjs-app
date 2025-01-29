export class PostTitle {
  private value: string;

  constructor(value: string) {
    if (value.length === 0) {
      throw new Error('Post title cannot be empty');
    }
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PostTitle): boolean {
    return this.value === other.value;
  }
}
