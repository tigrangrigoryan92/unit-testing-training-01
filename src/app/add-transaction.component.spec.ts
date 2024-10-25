import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddExpenseComponent } from './add-transaction.component';

describe('AddExpenseComponent', () => {
  let component: AddExpenseComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
    });
    component = TestBed.createComponent(AddExpenseComponent).componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with expense type by default', () => {
    expect(component.type()).toBe('expense');
  });

  it('should set income type when income radio button is selected', () => {
    component.type.set('income');
    expect(component.type()).toBe('income');
  });

  it('should reset form and close dialog on cancel', () => {
    component.open.set(true);
    component.form.setValue({ title: 'Sample', amount: 50 });
    component.cancel();
    expect(component.open()).toBeFalse();
    expect(component.form.value.title).toBe('');
    expect(component.form.value.amount).toBe(0);
    expect(component.type()).toBe('expense');
  });

  it('should emit transactionAdded output with correct data when form is valid and addTransaction is called', () => {
    spyOn(component.transactionAdded, 'emit');
    component.form.setValue({ title: 'New Item', amount: 100 });
    component.type.set('income');
    component.addTransaction();
    expect(component.transactionAdded.emit).toHaveBeenCalledWith({ title: 'New Item', amount: 100 });
  });

  it('should not emit transactionAdded if form is invalid', () => {
    spyOn(component.transactionAdded, 'emit');
    component.form.controls.title.setValue('');
    component.form.controls.amount.setValue(0);
    component.addTransaction();
    expect(component.transactionAdded.emit).not.toHaveBeenCalled();
  });
});
