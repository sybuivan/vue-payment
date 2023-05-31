<template>
  <div v-if="user">
    <div class="transaction-box">
      <h2 class="transaction-title">Edit user</h2>
      <form class="transaction-form" @submit="editUser">
        <label for="fullName" class="transaction-label">Full name:</label>
        <input
          type="text"
          id="fullName"
          v-model="user.fullName"
          required
          class="transaction-input"
        />

        <label for="Email" class="transaction-label">Email:</label>
        <input
          type="text"
          id="Email"
          v-model="user.email"
          required
          class="transaction-input"
        />
        <label for="Address" class="transaction-label">Address:</label>
        <input
          type="text"
          id="Address"
          v-model="user.address"
          required
          class="transaction-input"
        />
        <label for="remaining-amount" class="transaction-label"
          >Remaining amount:</label
        >
        <input
          type="number"
          id="remaining-amount"
          v-model="user.remainingAmount"
          required
          class="transaction-input"
        />

        <button type="submit" class="transaction-button">Edit user</button>
      </form>
    </div>
  </div>
</template>
<script></script>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
      loggedIn: (state) => state.loggedIn,
    }),
  },
  mounted() {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (!this.loggedIn) {
      // Chưa đăng nhập, chuyển hướng đến trang đăng nhập
      this.$router.push('/login');
    }
  },

  methods: {
    ...mapMutations(['editInfoUser']),
    editUser(event) {
      event.preventDefault();
      this.editInfoUser(this.user);
      alert('Edit user successfully');
    },
  },
};
</script>

<style>
.box-info {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}
.box-bar {
  width: 30%;
}

.box-bar__list {
  list-style: none;
}

.box-bar__list li {
  font-weight: 600;
  padding: 10px 5px;
  color: #fff;
  margin-bottom: 5px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #c1c1c1;
}

.transaction-box {
  width: 60%;
  margin: auto;
}
.transaction-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.transaction-form {
  display: flex;
  flex-direction: column;
}

.transaction-label {
  margin-bottom: 10px;
}

.transaction-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.transaction-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.transaction-button:hover {
  background-color: #0056b3;
}
</style>
