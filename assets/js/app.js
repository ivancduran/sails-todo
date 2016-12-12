
// assets/app.js
(function () { 'use strict'
  var createApp = function () {
    // ---------------------
    // BEGIN NORMAL APP CODE
    // ---------------------
    // Main Vue instance must be returned and have a root
    // node with the id "app", so that the client-side
    // version can take over once it loads.

    return new Vue({
      template : `
      <div id="app">
        <div class="container">

          <div class="title">
            <h1>Todo App</h1>
          </div>

          <div class="new-task">
            <div class="add-new" v-on:click="addTask">
              <i class="fa fa-plus"></i>
            </div>
            <input id="todo-text" placeholder="New task" v-model="addInput" v-on:keyup.enter="addTask"></input>
          </div>

          <ul>
            <li v-for="(task, index) in tasks" class="row">
              <a class="remove" href="#" v-on:click.stop.prevent="removeThis(task, index)">
                <i class="fa fa-trash-o"></i>
              </a>
              <a class="completed" href="#" v-on:click.stop.prevent="completeThis(task)">
                <i class="fa fa-check"></i>
              </a>
              <span v-bind:class="{ finish : task.completed }">
              {{task.name}}
              </span>
            </li>
          </ul>

        </div>
      </div>`,
      data: {
        addInput : '',
        tasks: [

        ]
      },
      methods : {
        addTask : function() {
          if (this.addInput.trim() !== '') {

            var task = this.addInput.trim();

            this.$http.get(`/task/create?name=${task}`).then((response) => {
              console.log(response.body.id);
              this.tasks.push({
                id : response.body.id,
                name : task,
                completed : false
              });
            }, (response) => {
              console.log(response);
            });

            this.addInput = '';
          }
        },
        removeThis : function(el, index) {

          this.$http.get(`/task/destroy?id=${el.id}`).then((response) => {
            this.tasks.splice(index, 1);
          }, (response) => {
            console.log(response);
          });

        },
        completeThis : function(task) {

          this.$http.get(`/task/update/${task.id}?completed=${!task.completed}`).then((response) => {
            task.completed = !task.completed;
          }, (response) => {
            console.log(response);
          });

        }
      },
      created: function () {

        const inBrowser = typeof window !== 'undefined'

        if (inBrowser) {
          this.$http.get('/task').then((response) => {
            this.tasks = response.body;
          }, (response) => {
            console.log(response);
          });
        }

      }
    })

    // -------------------
    // END NORMAL APP CODE
    // -------------------
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = createApp
  } else {
    this.app = createApp()
  }
}).call(this)
