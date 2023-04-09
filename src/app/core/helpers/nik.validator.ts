import { AbstractControl, ValidatorFn } from '@angular/forms';

export function nikValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const isValidNIK = /^[0-9]{16}$/.test(value);

    return !isValidNIK ? { invalidNIK: { value } } : null;
  };
}
