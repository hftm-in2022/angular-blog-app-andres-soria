import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-demo',
  standalone: true,
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatChip,
  ],
})
export class DemoComponent {
  isListView = true;
  username = '';
  items = [
    {
      id: 1,
      name: 'This is an item',
      description: 'An item which is... just an item.',
    },
    { id: 2, name: 'Wow another item', description: 'Uuhhhhhhh' },
    {
      id: 3,
      name: 'Enough items',
      description: 'There are already enough items...',
    },
    { id: 4, name: 'Bla', description: 'Loret ipusum blabla...' },
  ];
  colors = ['Red', 'Green', 'Blue'];
  selectedColor = '';

  toggleView() {
    this.isListView = !this.isListView;
  }
}
