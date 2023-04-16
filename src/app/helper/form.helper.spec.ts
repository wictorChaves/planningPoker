import { FormControl, FormGroup } from "@angular/forms";
import { FormHelper }             from "./form.helper";

describe('FormHelper', () => {

  describe('should check if the field is not valid', () => {

    [
      {
        it   : 'false',
        field: Object.assign({
          invalid: false,
          dirty  : false,
          touched: true
        }),
        result: false
      },
      {
        it   : 'true',
        field: Object.assign({
          invalid: true,
          dirty  : true,
          touched: false
        }),
        result: true
      },
      {
        it   : 'false',
        field: Object.assign({
          invalid: true,
          dirty  : false,
          touched: false
        }),
        result: false
      }
    ].forEach(item => {

      it(item.it, () => {

        // Arrange
        var field = item.field;

        // Act
        var result = FormHelper.FieldInvalid(field);

        // Assert
        expect(result).toEqual(item.result);

      });

    });

  });

  it('should mark form group touched', () => {

    // Arrange
    var formGroup: FormGroup = new FormGroup({
      teste : new FormControl(''),
      testes: new FormGroup({
        teste: new FormControl('')
      })
    })

    // Act
    FormHelper.MarkFormGroupTouched(formGroup);

    // Assert
    expect(formGroup.get('teste')?.touched).toBeTruthy();
    expect(formGroup.get('testes')?.get('teste')?.touched).toBeTruthy();

  });

});