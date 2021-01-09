<template>
  <div>
    <button @click="showModal = true">{{ buttonText }}</button>
    <teleport to="body">
      <div v-if="showModal" class="modal" @click="showModal = false">
        <div class="inner-modal" @click.stop>
          <h1>{{ title }}</h1>
          <form v-if="useForm" @submit.prevent="CloseModal">
            <slot></slot>
          </form>
          <slot v-else></slot>
          <button class="close" @click="showModal = false">X</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  props: {
    buttonText: String,
    title: String,
    useForm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    CloseModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.modal {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  transition: 500ms;
}
.inner-modal {
  background: #fafafa;
  position: relative;
  width: 400px;
  height: 80%;
  padding: 15px 30px;
  box-sizing: border-box;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  font-family: sans-serif;
  border-radius: 25px;
}
h1 {
  font-weight: 800;
  color: #6743eb;
  padding: 0;
  margin: 0;
}
.close {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #fdd;
  border: none;
  font-family: sans-serif;
  text-align: center;
  vertical-align: middle;
  height: 35px;
  width: 35px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 50%;
  color: #aa0000;
}

.close:hover {
  cursor: pointer;
  background: #ff1133;
  color: white;
}

button {
  background: #5566dd;
  border: none;
  margin: 15px;
  padding: 15px 18px;
  border-radius: 0.5em;
  color: white;
}
</style>