import { AbstractControl, FormGroup } from "@angular/forms";

export class FormHelper {

  public static FieldValid(field: AbstractControl): boolean {
    return field.invalid && (field.dirty || field.touched);
  }

  public static MarkFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) FormHelper.MarkFormGroupTouched(control);
    });
  }

}
