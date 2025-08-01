import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html'
})
export default class SearchPageComponent {

  public gifService = inject(GifService);

  public gifs = signal<Gif[]>([]);

  public onSearch(query: string) {
    this.gifService.getSearchGifs(query)
      .subscribe((response) => {
        this.gifs.set(response);
      });
  }

}
