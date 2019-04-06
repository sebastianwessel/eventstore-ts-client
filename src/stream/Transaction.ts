import {Stream} from './Stream'

export class Transaction {
  protected transactionId: string
  protected stream: Stream

  protected commited: boolean = false
  protected roledBack: boolean = false

  public constructor(stream: Stream, transactionId: string) {
    this.stream = stream
    this.transactionId = transactionId
  }

  public get isCommited(): boolean {
    return this.commited
  }

  public get isRoledBack(): boolean {
    return this.roledBack
  }

  public async append(): Promise<void> {}

  public commit(): Promise<void> {
    this.commited = true
    return this.commitTransaction()
  }

  public async commitTransaction(): Promise<void> {}
}
