import { Component } from '@angular/core';

import { environment } from '@envs/environment.development';

@Component({
  selector: 'app-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.component.html',
  styleUrl: './side-menu-header.component.css'
})
export class SideMenuHeaderComponent {

  public envs = environment;

}
