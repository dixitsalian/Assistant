import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchKeyDuplicationAssistantComponent } from './batch-key-duplication-assistant.component';

describe('BatchKeyDuplicationAssistantComponent', () => {
  let component: BatchKeyDuplicationAssistantComponent;
  let fixture: ComponentFixture<BatchKeyDuplicationAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchKeyDuplicationAssistantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BatchKeyDuplicationAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
