<template>
  <div class="card">
    <button class="delete-button" @click="RemoveCard($event)">X</button>
    <h4 class="name">{{ name }}</h4>
    <p v-if="date" class="date">
      Due: {{ new Date(date).toLocaleDateString() }}
    </p>
    <p v-else class="date">No Due Date</p>
    <div class="details" v-html="details"></div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "John Doe",
    },
    date: {
      type: String,
    },
    details: {
      type: String,
    },
    id: String,
  },
  methods: {
    RemoveCard() {
      this.$emit("RemoveCard", this.$props.id);
    },
  },
};
</script>

<style>
.card {
  filter: drop-shadow(2px 3px 20px #00000031);
  background-color: #fcfcfc;
  padding: 20px 25px;
  margin: 15px 5px;
  border-radius: 10px;
}

.date,
.name,
.details,
p {
  margin: 0;
  padding: 0;
}

.name {
  font-size: 26px;
  margin: 20px 0px 5px 5px;
}

.date {
  font-size: 14px;
  margin: 3px 0px 15px 0px;
  color: #888;
}

.delete-button {
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: none;
  cursor: pointer;
}
</style>