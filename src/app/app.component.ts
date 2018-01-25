import {Component} from '@angular/core';
import {value1} from 'my-failing-lib';
import {value2} from 'my-failing-lib2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app' + value1 + value2;
}
