<template>
  <div class="box-info">
    <div class="box-bar">
      <ul class="box-bar__list">
        <router-link
          to="/user-info/info"
          :class="{
            'box-bar__item': true,
            active: $route.path === '/user-info/info',
          }"
          >User info</router-link
        >
        <router-link
          to="/user-info/payment-history"
          :class="{
            'box-bar__item': true,
            active: $route.path === '/user-info/payment-history',
          }"
        >
          Payment history
        </router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

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

.box-bar__list a {
  font-weight: 600;
  padding: 10px 5px;
  color: #fff;
  margin-bottom: 5px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #c1c1c1;
  background: #ccc;
  width: 100%;
  display: block;
}

.box-bar__item.active {
  background: #4caf50;
  color: #fff;
}
</style>
