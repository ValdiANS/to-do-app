/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import CONFIG from '../global/config';
import TodoData from '../data/todo-data';
import TodoPresenter from '../view/todo-presenter';

class AddButtonHelper {
  constructor({
    addBtnElm,
    inputBar,
    todoContainer,
  }) {
    this.btnElm = addBtnElm;
    this.inputBar = inputBar;
    this.todoContainer = todoContainer;
  }

  init(inputHandler) {
    this._addBtnValidation(this.inputBar, inputHandler);
    this._addBtnHandler({
      titleInputBar: this.inputBar[0],
      descriptionInputBar: this.inputBar[1],
      container: this.todoContainer,
    });
  }

  // addButtonValidation
  // If the form is valid, then the add button will not be disabled
  // If the form is not valid, then the add button will be disabled
  _addBtnValidation(inputArr, inputhandler) {
    let valid = false;

    inputhandler(inputArr, () => {
      if (inputArr[0].value === '' || inputArr[1].value === '') {
        valid = false;
      } else {
        valid = true;
      }

      if (valid) {
        this.btnElm.disabled = false;
      } else {
        this.btnElm.disabled = true;
      }
    });
  }

  // Adding todos
  _addBtnHandler({ titleInputBar, descriptionInputBar, container }) {
    this.btnElm.addEventListener('click', (event) => {
      event.preventDefault();

      const currentTime = TodoData.getCurrentTime();

      const todo = {
        title: titleInputBar.value,
        description: descriptionInputBar.value,
        date: `Created ${currentTime.month} ${currentTime.date}, ${currentTime.year} at ${currentTime.hours}:${currentTime.minutes}`,
      };

      // Store data
      TodoData.storeTodo(CONFIG.TODO_STORAGE_KEY, todo);

      // Rerender todo list
      TodoPresenter.renderTodoList({
        storageKey: CONFIG.TODO_STORAGE_KEY,
        todoListContainerElm: container,
        TodoDataHelper: TodoData,
        finished: false,
      });

      // clear input field
      const inputBar = [
        titleInputBar,
        descriptionInputBar,
      ];

      inputBar.forEach((input) => {
        input.value = '';
      });

      this.btnElm.disabled = true;
    });
  }
}

export default AddButtonHelper;
