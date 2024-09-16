import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<ITask[]>(this.getTasksFromLocalStorage());
  tasks$ = this.tasksSubject.asObservable();

  private getTasksFromLocalStorage(): ITask[] {
	return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') || '[]') : [];
  }

  private updateTasksInLocalStorage(tasks: ITask[]): void {
	localStorage.setItem('tasks', JSON.stringify(tasks));
	this.tasksSubject.next(tasks);
  }

  addTask(task: ITask): void {
	const currentTasks = this.tasksSubject.value;
	const updatedTasks = [...currentTasks, task];
	this.updateTasksInLocalStorage(updatedTasks);
  }

  removeTask(task: ITask): void {
	const currentTasks = this.tasksSubject.value;
	const updatedTasks = currentTasks.filter(t => t !== task);
	this.updateTasksInLocalStorage(updatedTasks);
  }

  updateTasks(tasks: ITask[]): void {
	this.updateTasksInLocalStorage(tasks);
  }

  fetchTask(task: ITask): void {
  const input = document.getElementById("inputId") as HTMLInputElement;
  input.value = task.description;
  localStorage.setItem('isEditing', JSON.stringify(true));
  }

  updateTask(task: ITask): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map((t, i) => {
      if (i === task.index) {
        return task;
      }
      return t;
    });
    this.updateTasksInLocalStorage(updatedTasks);
    localStorage.setItem('isEditing', JSON.stringify(false));
  }
}