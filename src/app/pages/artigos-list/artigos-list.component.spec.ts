import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtigosListComponent } from './artigos-list.component';

describe('ArtigosListComponent', () => {
  let component: ArtigosListComponent;
  let fixture: ComponentFixture<ArtigosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArtigosListComponent]
    });
    fixture = TestBed.createComponent(ArtigosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
