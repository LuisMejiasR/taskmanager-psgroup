import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskComponentComponent } from './add-task-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { ITask } from '../../core/models/task';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('AddTaskComponentComponent', () => {
  let component: AddTaskComponentComponent;
  let fixture: ComponentFixture<AddTaskComponentComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['addTask', 'updateTask']);

    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        AddTaskComponentComponent
      ],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskComponentComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.taskForm).toBeDefined();
    expect(component.taskForm.controls['task']).toBeDefined();
  });

  it('should add a task', () => {
    component.ngOnInit();
    component.taskForm.setValue({ task: 'New Task' });
    component.addTask();
    expect(taskService.addTask).toHaveBeenCalledWith({
      description: 'New Task',
      done: false,
      index: 0
    });
    expect(component.taskForm.value.task).toBe('');
  });

  it('should update a task', () => {
    const taskToEdit: ITask = { description: 'Existing Task', done: false, index: 0 };
    component.taskToEdit = taskToEdit;
    component.ngOnInit();
    component.taskForm.setValue({ task: 'Updated Task' });
    component.updateTask();
    expect(taskService.updateTask).toHaveBeenCalledWith({
      ...taskToEdit,
      description: 'Updated Task'
    });
    expect(component.taskForm.value.task).toBe('');
  });
});