import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { GifService } from '../../services/gif.service';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-history-page',
  imports: [GifListComponent],
  templateUrl: './history-page.component.html'
})
export default class HistoryPageComponent {

  public gifService = inject(GifService);

  public query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['query'])
    )
  );

  public gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));

}
