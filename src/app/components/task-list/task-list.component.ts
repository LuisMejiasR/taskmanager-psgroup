import { Component, ViewChild } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ITask } from '../../core/models/task';
import { CommonModule } from '@angular/common';
import { AddTaskComponentComponent } from '../add-task-component/add-task-component.component';
import { TaskService } from '../../core/services/task.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    AddTaskComponentComponent,
    DragDropModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: ITask[] = [];
  inProgressTasks: ITask[] = [];
  doneTasks: ITask[] = [];
  taskToEdit!: ITask;
  isEditing: boolean = false;

  constructor(private taskService: TaskService) {
    this.taskService.tasks$.subscribe(tasks => this.tasks = tasks);
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.taskService.updateTasks(this.tasks);
  }

  onTaskUpdated(): void {
    this.isEditing = false;
    this.taskService.updateTasks(this.tasks);
  }

  removeTask(task: ITask) {
    this.taskService.removeTask(task);
  }

  fetchTask(task: ITask) {
    this.isEditing = true;
    this.taskService.fetchTask(task);
    this.taskToEdit = task;
  }
}