import { TransactionTypeEnum } from '@constants/enum';
import { Transactions } from '@infrastructures/io/entity';
import { IPagination } from './base.interface';

export interface ICreateTransactionService {
  type: TransactionTypeEnum;
  amount: number;
  walletUuid: string;
  userUuid: string;
  remark?: string;
}

export interface ICreateTransactionRepo extends ICreateTransactionService {}

export interface IListTransactionServiceQuery extends IPagination {
  walletUuid?: string;
  userUuid?: string;
}

export interface IListTransactionRepoQuery extends IListTransactionServiceQuery {}

export interface IListTransactionServiceResponse {
  transactions: Transactions[];
  page: number;
  size: number;
  total: number;
}

export interface IListTransactionRepoResponse extends IListTransactionServiceResponse {}
