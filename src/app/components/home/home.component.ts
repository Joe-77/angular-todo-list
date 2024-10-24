import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  taskForm: any = FormGroup;
  show: boolean = false;

  tasks: any = JSON.parse(localStorage.getItem('allTasks') || '[]');

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
    });
  }

  handleDisplay() {
    this.show = !this.show;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskName = this.taskForm.get('taskName')?.value;
      const data = {
        title: taskName,
        completed: false,
      };

      this.tasks?.push(data);
      this.taskForm.reset();
      this.show = false;
      localStorage.setItem('allTasks', JSON.stringify(this.tasks));
    }
  }
  toggleTask(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;

    localStorage.setItem('allTasks', JSON.stringify(this.tasks));
  }

  handleDel(index: number) {
    this.tasks.splice(index, 1);
    localStorage.setItem('allTasks', JSON.stringify(this.tasks));
  }
}
