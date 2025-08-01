import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '@envs/environment.development';

import type { GiphyResponse } from '../interfaces/giphy.interface';
import type { Gif } from '../interfaces/gif.interface';

import { GifMapper } from '../mappers/gif.mapper';

const GIF_KEY = 'gifs';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  return JSON.parse(gifsFromLocalStorage);
}

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private http = inject(HttpClient);

  public trendingGifs = signal<Gif[]>([]);
  public trendingGifsLoading = signal(true);

  public searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage()); // Record me permite crear objetos dinamicos.
  public searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.getTrendingGifs();
  }

  public saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  });

  public getTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/v1/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
        }
      })
      .subscribe(response => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);

        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
      });
  }

  public getSearchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/v1/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          q: query,
        }
      })
      .pipe(
        map(({ data }) => data),
        map(giphyItem => GifMapper.mapGiphyItemsToGifArray(giphyItem)),

        // Historial
        tap(giphyItem => {
          this.searchHistory.update(history => ({
            ...history, [query.toLowerCase()]: giphyItem
          }))
        }),
      )
  }

  public getHistoryGifs(query: string): Gif[] {
    return this.searchHistory() [query] ?? [];
  }

}
