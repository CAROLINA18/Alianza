import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsMenuComponent } from './clients-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ClientsMenuComponent', () => {
  let component: ClientsMenuComponent;
  let fixture: ComponentFixture<ClientsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsMenuComponent ],
      imports: [FontAwesomeModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
