/* eslint-disable no-useless-return */
/* eslint-disable no-underscore-dangle */

import CONFIG from '../global/config';

/**
 * @class TodoData
 * - Save data in JSON format into the sessionStorage with specific key name.
 * - Get data in the sessionStorage with specific key name.
 * - Parse Object into JSON string so it can be stored in sessionStorage
 * - Parse JSON string into Object so the data can be read as Object.
 */

class TodoData {
  static storeTodo(key, todo) {
    const todoList = this.getTodo(key) || [];
    todoList.push(todo);

    sessionStorage.setItem(key, this._parseObjectIntoJSON(todoList));
  }

  static getTodo(key) {
    this._checkStorage();

    return this._parseJSONIntoObject(sessionStorage.getItem(key));
  }

  static deleteTodo(key, todoTitle) {
    let todoList = this.getTodo(key);
    todoList = todoList.filter((todo) => todo.title !== todoTitle);

    sessionStorage.setItem(key, this._parseObjectIntoJSON(todoList));
  }

  static _parseObjectIntoJSON(object) {
    return JSON.stringify(object);
  }

  static _parseJSONIntoObject(jsonString) {
    return JSON.parse(jsonString);
  }

  static _checkStorage() {
    if (typeof (Storage) === 'undefined') {
      console.log('Browser doesn\'t support sessionStorage.');
      return;
    }
  }

  static getCurrentTime() {
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const d = new Date();

    return {
      month: month[d.getMonth()],
      date: d.getDate(),
      year: d.getFullYear(),
      hours: d.getHours(),
      minutes: d.getMinutes(),
    };
  }

  static errMsg() {
    const todoErrMsg = document.querySelector('.err-msg.todo');
    const finishedErrMsg = document.querySelector('.err-msg.finished');
    const todoList = this.getTodo(CONFIG.TODO_STORAGE_KEY) || [];
    const finishedList = this.getTodo(CONFIG.FINISHED_STORAGE_KEY) || [];

    if (todoList.length > 0) {
      todoErrMsg.style.display = 'none';
    } else {
      todoErrMsg.style.display = 'block';
    }

    if (finishedList.length > 0) {
      finishedErrMsg.style.display = 'none';
    } else {
      finishedErrMsg.style.display = 'block';
    }
  }
}

export default TodoData;
