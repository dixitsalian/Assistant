import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { Component, Input, Type } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Mock component for testing
@Component({
  selector: 'mock-component',
  template: '<div>Mock Component</div>',
})
class MockComponent {
  @Input() inputData!: Type<unknown>;
}

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<DialogComponent>>;

  beforeEach(async () => {
    const dialogMock = jasmine.createSpyObj('MatDialogRef');
    await TestBed.configureTestingModule({
      imports: [DialogComponent, MockComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and render a dynamic component', () => {
    const data = { componentToRender: MockComponent };
    component.loadComponent(data.componentToRender);
    fixture.detectChanges();

    const dynamicComponentElement = fixture.nativeElement.querySelector('mock-component');
    expect(dynamicComponentElement).toBeTruthy();
  });

});
