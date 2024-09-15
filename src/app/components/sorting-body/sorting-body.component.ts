
import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ITask } from '../../core/models/task';
import { CommonModule } from '@angular/common';
import { AddTaskComponentComponent } from '../add-task-component/add-task-component.component';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-sorting-body',
  standalone: true,
  imports: [
    AddTaskComponentComponent,
    DragDropModule,
    CommonModule
  ],
  templateUrl: './sorting-body.component.html',
  styleUrl: './sorting-body.component.css'
})
export class SortingBodyComponent {
  tasks: ITask[] = [];
  inProgressTasks: ITask[] = [];
  doneTasks: ITask[] = [];

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

  removeTask(task: ITask) {
    this.taskService.removeTask(task);
  }
}