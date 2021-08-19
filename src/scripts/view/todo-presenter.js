/* eslint-disable no-param-reassign */

import TodoData from '../data/todo-data';

class TodoPresenter {
  static renderTodo({
    todoItemTag,
    todoData,
    container,
    attribute,
  }) {
    const todoItem = document.createElement(todoItemTag);
    todoItem.todoData = todoData;
    todoItem.setAttribute('finished', attribute.finished);
    container.appendChild(todoItem);
  }

  static renderTodoList({
    storageKey,
    todoListContainerElm,
    TodoDataHelper,
    finished,
  }) {
    todoListContainerElm.innerHTML = '';
    const todoList = TodoDataHelper.getTodo(storageKey) || [];

    if (todoList.length > 0) {
      todoList.forEach((todoItem) => {
        this.renderTodo({
          todoItemTag: 'todo-item',
          todoData: todoItem,
          container: todoListContainerElm,
          attribute: {
            finished,
          },
        });
      });
    }

    // Rerender error message
    TodoData.errMsg();
  }
}

export default TodoPresenter;
