import { TestBed } from '@angular/core/testing';
import TransactionsComponent from './transactions.component';
import { DatePipe } from '@angular/common';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DatePipe],
    });
    component = TestBed.createComponent(TransactionsComponent).componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the current balance correctly', () => {
    expect(component.currentBalance()).toBe(4820);
  });

  it('should add a transaction', () => {
    const transactionToAdd = {
      amount: -10,
      title: 'Coffee',
    };
    component.addTransaction(transactionToAdd);
    expect(component.transactions().some(t => t.amount === transactionToAdd.amount && t.title === transactionToAdd.title)).toBeTrue();
  });

  it('should delete a transaction correctly', () => {
    const transactionToDelete = component.transactions()[0];
    component.deleteTransaction(transactionToDelete.id);
    expect(component.transactions().some(t => t.id === transactionToDelete.id)).toBeFalse();
  });

  it('should toggle the add transaction dialog', () => {
    expect(component.addTransactionDialogOpen()).toBeFalse();
    component.openAddTransactionDialog();
    expect(component.addTransactionDialogOpen()).toBeTrue();
  });
});
