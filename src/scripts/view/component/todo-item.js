/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-return */
import TodoData from '../../data/todo-data';
import CONFIG from '../../global/config';
import TodoPresenter from '../todo-presenter';

class TodoItem extends HTMLElement {
  connectedCallback() {
    this.finished = this.getAttribute('finished') || 'false';

    if (this.finished === 'true') {
      this.renderFinished();
      return;
    }

    this.render();
    this._checkButtonHandler();
  }

  set todoData(todo) {
    this.todo = todo;
  }

  render() {
    this.innerHTML = `
      <section class="todo-item">
        <h2>${this.todo.title}</h2>
        <span class="line"></span>
        <p class="description">
          ${this._description()}
        </p>
        <p class="created-date">${this.todo.date}</p>
        <button class="check-btn">
          ✓
        </button>
      </section>
    `;
  }

  renderFinished() {
    this.innerHTML = `
      <section class="finished-item">
        <h2>${this.todo.title}</h2>
        <span class="line"></span>
        <p class="description">
          ${this._description()}
        </p>
        <p class="created-date">${this.todo.date}</p>
      </section>
    `;
  }

  _checkButtonHandler() {
    const checkBtn = this.querySelector('.check-btn');

    checkBtn.addEventListener('click', () => {
      const currentTime = TodoData.getCurrentTime();
      this.todo.date += ` | Finished ${currentTime.month} ${currentTime.date}, ${currentTime.year} at ${currentTime.hours}:${currentTime.minutes}`;

      // Store finished data
      TodoData.storeTodo(CONFIG.FINISHED_STORAGE_KEY, this.todo);
      TodoData.deleteTodo(CONFIG.TODO_STORAGE_KEY, this.todo.title);

      // Rerender todo and finished list
      const finishedListContainer = document.querySelector('.finished-list');
      const todoListContainer = document.querySelector('.todo-list');

      TodoPresenter.renderTodoList({
        storageKey: CONFIG.TODO_STORAGE_KEY,
        todoListContainerElm: todoListContainer,
        TodoDataHelper: TodoData,
        finished: false,
      });

      TodoPresenter.renderTodoList({
        storageKey: CONFIG.FINISHED_STORAGE_KEY,
        todoListContainerElm: finishedListContainer,
        TodoDataHelper: TodoData,
        finished: true,
      });
    });

    // Rerender error message
    TodoData.errMsg();
  }

  _description() {
    return this.todo.description.split('\n').join('<br>');
  }
}

customElements.define('todo-item', TodoItem);
