import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../../../services/contact.service';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-coffee-root',
  templateUrl: './coffee-root.component.html',
  styleUrls: ['./coffee-root.component.scss']
})
export class CoffeeRootComponent implements OnInit {
  expirationYears: number[] = [];
  
  newCardForm = new FormGroup({
    nameOnCardControl: new FormControl('', [Validators.required]),
    cardNumberControl: new FormControl('', [
      Validators.required,
      (control: AbstractControl): {[key: string]: any} | null => {
        let isValid = false;
        if (control.value) {
          const cardNumber = control.value.toString().trim().replace(/\s/g, '');
          console.log('Card number', cardNumber);
          if (cardNumber) {
            // 19 because Verve cards are 19 digits
            if (15 <= cardNumber.length && cardNumber.length <= 19) {
              console.log(`${cardNumber.length} is valid :\)`);
              isValid = true;
              console.log('Returning null');
              return null;
            } else {
              console.log(`${cardNumber.length} is not valid!`);
              isValid = false;
              console.log('Returning error');
              return { notAValidCardNumber: {value: control.value}};
            }
          } else {
            console.log('Returning error');
            return { noCardNumber: {value: control.value}};
          }
        } else {
          console.log('Returning error');
          return { noControlValue: {value: control.value}};
        }
      }
    ]),
    expiryMonthControl: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
    expiryYearControl: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    securityCodeControl: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(4),
      (control: AbstractControl): {[key: string]: any} | null => {
        let isValid: boolean;
        if (control.value) {
          const securityCode = control.value.toString();
          if (securityCode) {
            // console.log(cardNumber.toString().length);
            if (3 <= securityCode.length && securityCode.length <= 4) {
              isValid = true;
            } else {
              isValid = false;
            }
            return isValid ? null : { notAValidNumber: {value: control.value}};
          } else {
            console.log('Returning error');
            return { noSecurityCode: {value: control.value}};
          }
        } else {
          console.log('Returning error');
          return { noControlValue: {value: control.value}};
        }
      }
    ]),
    rememberCardControl: new FormControl('')
  }, /* {
    // ? Overall form validation needed?
    validators: (control: FormGroup): ValidationErrors | null => {
      // control is the form group
      const isValid = true;
      return isValid ? null : { anyValue: true };
    }
  } */);

  constructor(
    private dialogService: DialogService,
    private contactService: ContactService
  ) {
    //#region Define set of expiration years
    this.expirationYears = [];
    const date = new Date();
    const currentYear = date.getFullYear();
    for (let i = 0; i <= 20; i++) {
      this.expirationYears.push(currentYear + i);
    }
    //#endregion
  }

  ngOnInit(): void {
  }

  onCompletePayment() {
    this.newCardForm.markAsTouched();
    this.newCardForm.controls.nameOnCardControl.markAsTouched();
    this.newCardForm.controls.cardNumberControl.markAsTouched();
    this.newCardForm.controls.expiryMonthControl.markAsTouched();
    this.newCardForm.controls.expiryYearControl.markAsTouched();
    this.newCardForm.controls.securityCodeControl.markAsTouched();
    if (this.newCardForm.valid) {
      const paymentDto = {
        nameOnCard: this.newCardForm.get('nameOnCardControl')?.value.toString().trim(),
        cardNumber: this.newCardForm.get('cardNumberControl')?.value.toString().trim().replace(/\s/g, ''),
        expiryMonth: this.newCardForm.get('expiryMonthControl')?.value.toString().trim(),
        expiryYear: this.newCardForm.get('expiryYearControl')?.value.toString().trim().slice(-2),
        securityCode: this.newCardForm.get('securityCodeControl')?.value.toString().trim()
      };
      this.contactService.buyCoffee(paymentDto).subscribe((response: { success: boolean; errorMessage: string }) => {
        this.newCardForm.reset();
        Object.keys(this.newCardForm.controls).forEach((key) => {
          this.newCardForm.controls[`${key}`].setErrors(null);
        });
        const message = 'Thank you for donating!';
        const options = ['Ok'];
        this.dialogService.openDialog(message, options).subscribe((result: string) => {});
      });
    } else {
      const message = 'Payment form is invalid.';
      const options = ['Ok'];
      this.dialogService.openDialog(message, options).subscribe((result: string) => {});
    }
  }

}
