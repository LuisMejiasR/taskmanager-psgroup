import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { ITask } from '../../core/models/task';

@Component({
  selector: 'app-add-task-component',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-task-component.component.html',
  styleUrl: './add-task-component.component.css'
})

export class AddTaskComponentComponent {
  @Input() taskToEdit!: ITask;
  @Input() isEditing!: boolean;
  @Output() taskUpdated = new EventEmitter<void>();
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      task: ['', Validators.required]
    });
  }

  addTask() {
    // Add new task
    this.taskService.addTask({
      description: this.taskForm.value.task,
      done: false,
      index: JSON.parse(localStorage.getItem('tasks') || '[]').length ?? 0
    });
    this.taskForm.reset();
  }

  updateTask() {
    // Update existing task
    const updatedTask = { ...this.taskToEdit, description: this.taskForm.value.task};
    this.taskService.updateTask(updatedTask);
    this.taskForm.reset();
    this.isEditing = false;
    this.taskUpdated.emit();
  }
}
