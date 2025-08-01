import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';

// import { GifListComponent } from '../../components/gif-list/gif-list.component';

import { GifService } from '../../services/gif.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  // imports: [GifListComponent],
  templateUrl: './trending-page.component.html'
})
export default class TrendingPageComponent implements AfterViewInit {

  public gifService = inject(GifService);
  public scrollStateService = inject(ScrollStateService);
  public scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('scrollDiv');

  public ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  public onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    // 300 px de gracias, antes de llegar al final de la pantalla
    const isAtBottom = (scrollTop + clientHeight + 300) >=  scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) this.gifService.getTrendingGifs();
  }

}
