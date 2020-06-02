import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root', // tag HTML <app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
  public todos: Todo[] = []
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });
    this.load();
  }

  changeMode(mode) {
    this.mode = mode;
  }

  load() {
    const data = JSON.parse(localStorage.getItem('todos'));
    data != null ? this.todos = data : this.todos = [];
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    index !== -1 ? this.todos.splice(index, 1) : null;
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  add() {
    const name = this.form.controls['name'].value;
    const id = this.todos.length + 1
    this.todos.push(new Todo(id, name, false));
    this.form.reset();
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }
}
