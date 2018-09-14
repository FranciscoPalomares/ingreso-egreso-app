import { IngresoEgreso } from './ingreso-egreso.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenIgresoEgreso'
})
export class OrdenIgresoEgresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.sort(
      (a) => {
        if (a.tipo === 'ingreso') {
          return -1;
        }

        else {
          return 1
        }
      }
    )
  }

}
