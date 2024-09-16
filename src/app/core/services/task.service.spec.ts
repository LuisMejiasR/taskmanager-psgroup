import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { ITask } from '../models/task';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a task', () => {
    const task: ITask = { description: 'Test Task', done: false, index: 0 };
    service.addTask(task);
    service.tasks$.subscribe(tasks => {
      expect(tasks.length).toBe(1);
      expect(tasks[0]).toEqual(task);
    });
  });

  it('should remove a task', () => {
    const task: ITask = { description: 'Test Task', done: false, index: 0 };
    service.addTask(task);
    service.removeTask(task);
    service.tasks$.subscribe(tasks => {
      expect(tasks.length).toBe(0);
    });
  });

  it('should update tasks', () => {
    const tasks: ITask[] = [
      { description: 'Task 1', done: false, index: 0 },
      { description: 'Task 2', done: false, index: 1 }
    ];
    service.updateTasks(tasks);
    service.tasks$.subscribe(updatedTasks => {
      expect(updatedTasks.length).toBe(2);
      expect(updatedTasks).toEqual(tasks);
    });
  });

  it('should fetch a task', () => {
    const task: ITask = { description: 'Test Task', done: false, index: 0 };
    document.body.innerHTML = '<input id="inputId" />';
    service.fetchTask(task);
    const input = document.getElementById("inputId") as HTMLInputElement;
    expect(input.value).toBe(task.description);
    expect(JSON.parse(localStorage.getItem('isEditing') || 'false')).toBe(true);
  });

  it('should update a task', () => {
    const tasks: ITask[] = [
      { description: 'Task 1', done: false, index: 0 },
      { description: 'Task 2', done: false, index: 1 }
    ];
    service.updateTasks(tasks);
    const updatedTask: ITask = { description: 'Updated Task 1', done: false, index: 0 };
    service.updateTask(updatedTask);
    service.tasks$.subscribe(updatedTasks => {
      expect(updatedTasks[0].description).toBe('Updated Task 1');
      expect(JSON.parse(localStorage.getItem('isEditing') || 'false')).toBe(false);
    });
  });
});