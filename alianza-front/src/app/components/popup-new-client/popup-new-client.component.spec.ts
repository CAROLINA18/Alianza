import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNewClientComponent } from './popup-new-client.component';

describe('PopupNewClientComponent', () => {
  let component: PopupNewClientComponent;
  let fixture: ComponentFixture<PopupNewClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupNewClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupNewClientComponent);
    component = fixture.componentInstance;
    fixture = TestBed.createComponent(PopupNewClientComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
