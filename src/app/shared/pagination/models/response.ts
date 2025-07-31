import { Exclude, Expose, Type } from 'class-transformer';

export class PaginationResponse<T> {
  @Expose({ name: 'current_page' })
  public currentPage: number;

  @Expose({ name: 'previous_page' })
  public previousPage: number;

  @Expose({ name: 'next_page' })
  public nextPage: number;

  @Expose({ name: 'last_page' })
  public lastPage: number;

  @Expose({ name: 'total' })
  public totalItems: number;

  @Type((options) => options?.newObject?.type)
  @Expose({ name: 'data' })
  public items: Array<T>;

  @Exclude()
  private type: new () => T;

  constructor(type: new () => T) {
    this.type = type;
  }
}
