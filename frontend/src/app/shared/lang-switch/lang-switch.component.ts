import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-switch',
  standalone: true,
  template: `
    <select (change)="set($any($event.target).value)">
      <option value="de">DE</option>
      <option value="en">EN</option>
      <option value="vi">VI</option>
    </select>
  `
})
export class LangSwitchComponent {
  constructor(private t: TranslateService){ }
  set(lang: 'de'|'en'|'vi'){ this.t.use(lang); }
}
