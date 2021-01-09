<template>
  <div class="hello">
    <button @click="LogState">Log State</button>
    <button @click="AddRandomTask">Add random task</button>

    <!-- Could this all be in its own component? -->
    <modal
      :title="'Create Task'"
      ref="modal"
      :useForm="true"
      :buttonText="'+ Create Task'"
    >
      <div class="form-item">
        <label for="task-name">Task Name: </label>
        <input
          v-model="taskName"
          id="task-name"
          type="text"
          placeholder="Task name"
        />
      </div>
      <div class="form-item">
        <label for="task-date">Due Date: </label>
        <input v-model="taskDate" id="task-date" type="date" />
      </div>
      <div class="form-textarea">
        <label for="task-description">Description: </label>

        <ckeditor
          v-model="taskDetail"
          :editor="editor"
          :config="editorConfig"
        ></ckeditor>
      </div>
      <button class="submit-button" type="submit" @click="Submit">
        Submit
      </button>
    </modal>

    <!-- Make Separate Component -->
    <div style="display: flex; flex-direction: row">
      <div
        class="list"
        v-for="(list, listIndex) in lists"
        :key="list.name + listIndex"
      >
        <p class="list-title">{{ list.name }}</p>
        <div v-for="(task, cardIndex) in list.tasks" :key="cardIndex">
          <task-card
            @remove-card="RemoveCard(cardIndex, listIndex)"
            :name="task.name"
            :date="task.date"
            :details="task.details"
            :id="task.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import { reactive, ref } from "vue";
import { uuid } from "vue-uuid";
import { useStore } from "vuex";
import { key } from "./store";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TaskCard from "./TaskCard";
import Modal from "./Modal.vue";

export default Vue.extend({
  components: { Modal, TaskCard },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        placeholder: "Write something here...",
      },
    };
  },
  setup() {
    const store = useStore(key);
    let taskName = ref("");
    let taskDate = ref("");
    let taskDetail = ref("");
    let tasks = reactive([
      {
        id: uuid.v1(),
        name: "Test Card",
        date: "1/20/2021",
        details: "<p>This is just some filler</p>",
      },
      {
        id: uuid.v1(),
        name: "a",
      },
      {
        id: uuid.v1(),
        name: "b",
      },
      {
        id: uuid.v1(),
        name: "c",
      },
      {
        id: uuid.v1(),
        name: "d",
      },
      {
        id: uuid.v1(),
        name: "e",
      },
    ]);
    // eslint-disable-next-line
    let lists = reactive([
      {
        name: "todo",
        tasks: tasks,
      },
      {
        name: "completed",
        tasks: [],
      },
    ]);
    let modalVisability = ref(false);

    function LogState() {
      console.log(store.state.lists);
    }

    function AddRandomTask() {


      console.log("Random Task Adding...");
      store.commit("AddTask", {
        listID: "default",
        task: {
          id: uuid.v1(),
          title: "New Task" + ((Math.random() * 10) % 10),
          dueDate: new Date().toLocaleDateString(),
          details: "Nothing to see here.",
        },
      });
    }

    function testerFunc(evt) {
      console.log("Captured", evt);
    }

    // eslint-disable-next-line
    function RemoveCard(CardID, ListID) {
      console.log(CardID, ListID);
      let preTask = lists[ListID].tasks.splice(CardID, 1);

      let newCard = {
        ...preTask[0],
      };

      ListID != 1 ? lists[ListID + 1].tasks.push(newCard) : null;
    }

    function Submit() {
      let task = {
        id: uuid.v1(),
        name: taskName.value,
        date: taskDate.value,
        details: taskDetail.value,
      };

      console.log(task);

      taskName.value = "";
      taskDate.value = "";
      taskDetail.value = "";

      tasks.push(task);
    }

    return {
      taskName,
      taskDate,
      taskDetail,
      modalVisability,
      Submit,
      testerFunc,
      RemoveCard,
      lists,
      LogState,
      AddRandomTask,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  display: flex;
  flex-direction: column;
  background-color: #34a;
  min-width: 300px;
  max-width: 350px;
  padding: 8px 20px 20px 20px;
  margin: 0px 15px;
  border-radius: 15px;
  max-height: 70vh;
  overflow: auto;
}

.list-title {
  font-weight: 700;
  color: white;
  font-size: 24px;
}

h3 {
  margin: 40px 0 0;
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img {
  object-fit: contain;
  width: 100%;
  height: 125px;
}
.form-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0px;
}

label {
  font-weight: 700;
}

.form-item input {
  padding: 5px 8px;
  border-radius: 5px;
  border: 1px solid rgb(204, 204, 204);
  background: #eee;
  font-family: sans-serif;
  width: 50%;
  height: 25px;
}

.form-textarea {
  display: flex;
  flex-direction: column;
}

.form-textarea textarea {
  margin-top: 15px;
  max-height: 200px;
  font-family: sans-serif;
  padding: 5px;
  box-sizing: border-box;
  resize: none;
  border: 1px solid #666;
  border-radius: 5px;
  overflow: auto;
}

.submit-button {
  position: absolute;
  bottom: 15px;
  right: 30px;
  background: #6743eb;
  border: none;
  padding: 15px 18px;
  border-radius: 5px;
  color: white;
}
</style>
