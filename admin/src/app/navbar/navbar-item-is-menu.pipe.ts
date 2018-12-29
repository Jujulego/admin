import { Pipe, PipeTransform } from '@angular/core';
import { NavbarItem } from "./navbar-item";
import { NavbarMenu } from "./navbar-menu";

@Pipe({
  name: 'navitemismenu'
})
export class NavbarItemIsMenuPipe implements PipeTransform {
  transform(item: NavbarItem): boolean {
    return item instanceof NavbarMenu;
  }
}
