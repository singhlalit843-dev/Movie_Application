import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Output() term = new EventEmitter<string>();
  private q = new Subject<string>();
  constructor() {
    this.q.pipe(debounceTime(350)).subscribe((v) => this.term.emit(v));
  }
  onInput(e: any) {
    this.q.next(e.target.value);
  }
}
