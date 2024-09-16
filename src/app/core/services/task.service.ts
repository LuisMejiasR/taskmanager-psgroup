import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // BehaviorSubject para manejar la lista de tareas y emitir cambios
  private tasksSubject = new BehaviorSubject<ITask[]>(this.getTasksFromLocalStorage());
  tasks$ = this.tasksSubject.asObservable();

  // Obtiene las tareas almacenadas en localStorage
  private getTasksFromLocalStorage(): ITask[] {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') || '[]') : [];
  }

  // Actualiza las tareas en localStorage y emite los cambios a través del BehaviorSubject
  private updateTasksInLocalStorage(tasks: ITask[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }

  // Añade una nueva tarea a la lista y actualiza el almacenamiento
  addTask(task: ITask): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = [...currentTasks, task];
    this.updateTasksInLocalStorage(updatedTasks);
  }

  // Elimina una tarea de la lista y actualiza el almacenamiento
  removeTask(task: ITask): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.filter(t => t !== task);
    this.updateTasksInLocalStorage(updatedTasks);
  }

  // Actualiza la lista completa de tareas en el almacenamiento
  updateTasks(tasks: ITask[]): void {
    this.updateTasksInLocalStorage(tasks);
  }

  // Carga la descripción de una tarea en un input
  fetchTask(task: ITask): void {
    const input = document.getElementById("inputId") as HTMLInputElement;
    input.value = task.description;
  }

  // Actualiza una tarea específica en la lista y en el almacenamiento
  updateTask(task: ITask): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.map((t, i) => {
      if (i === task.index) {
        return { done: false, description: task.description, index: task.index };
      }
      return t;
    });
    this.updateTasksInLocalStorage(updatedTasks);
  }
}