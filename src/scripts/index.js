/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-return */
import '../styles/style.css';
import '../styles/responsive.css';

import CONFIG from './global/config';
import AddButtonHelper from './utils/add-button-helper';
import TodoData from './data/todo-data';
import TodoPresenter from './view/todo-presenter';
import './view/component/todo-item';

// Form Element
const titleInputBar = document.querySelector('input[name="title"]');
const descriptionInputBar = document.querySelector('textarea[name="description"]');

// Container
const todoListContainer = document.querySelector('.todo-list');
const finishedListContainer = document.querySelector('.finished-list');

// on input handler for a list of input bar
function onInputHandler(inputArr, callback) {
  inputArr.forEach((inputBar) => {
    inputBar.addEventListener('input', () => {
      callback();
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
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

  const addBtnElm = new AddButtonHelper({
    addBtnElm: document.querySelector('#addBtn'),
    inputBar: [
      titleInputBar,
      descriptionInputBar,
    ],
    todoContainer: todoListContainer,
  });

  addBtnElm.init(onInputHandler); // -> input handler needed to watch input changes on the form

  // Render error message
  TodoData.errMsg();
});
