import {AbstractControl, ValidatorFn} from '@angular/forms';

export function passwordValidator(nameRe: RegExp, p: { hasCapitalCase: boolean }): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
