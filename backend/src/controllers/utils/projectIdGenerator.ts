const DEFAULT_DIGIT_COUNT: number = 5 as const;
interface IIdGenerator {
  prefix: string;
  digit_count?: number;
  include_year?: boolean;
}
export class IdGenerator {
  private prefix: string;
  private digit_count: number;
  private include_year: boolean;

  /**
   * Creates an instance of IdGenerator with the specified configuration.
   *
   * @param {IIdGenerator} config - Configuration options including prefix, digit count, and year inclusion.
   */
  constructor({
    digit_count = DEFAULT_DIGIT_COUNT,
    include_year = true,
    prefix,
  }: IIdGenerator) {
    this.prefix = prefix;
    this.digit_count = digit_count;
    this.include_year = include_year;
  }

  /**
   * Generates a formatted string ID based on the provided count.
   *
   * @param {number} count - The incremental number to be used in the ID.
   * @returns {string} The generated formatted ID.
   */
  execute(count: number): string {
    const next_number = count + 1;
    const padded_number = String(next_number).padStart(this.digit_count, "0");
    const year = this.include_year ? `-${new Date().getFullYear()}` : "";

    return `${this.prefix}${year}-${padded_number}`;
  }
}
