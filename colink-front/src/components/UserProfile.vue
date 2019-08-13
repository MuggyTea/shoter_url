<template>
<v-card
class="prof mx-auto"
max-width="100%"
>
<v-img
v-if="userinfo.backgroundPhoto"
:src="userinfo.backgroundPhoto"
height="200px"
>
</v-img>
<v-img
v-else
height="200px"
src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
>
</v-img>
<v-col
class="align-center justify-center layout text-center"
cols="12"
sm="6"
md="8"
>
<v-avatar
color="grey lighten-4"
size="70px"
>
<img
v-if="userinfo.photoURL"
:src="userinfo.photoURL"
alt="profile"
>
<span v-else></span>
</v-avatar>
</v-col>
<v-card-title class="name align-end justify-center fill-height">
    {{ userinfo.displayName }}
        <ul class="icon">
      <li class="twitter"><a :href="userinfo.twitterURL" target="_blank"><font-awesome-icon :icon="['fab', 'twitter']" /></a></li>
    </ul>
</v-card-title>

<v-card-text>
    <span class="txt">
        <span>{{ userinfo.description }}</span>
    </span>
</v-card-text>
</v-card>
</template>

<script>
export default {
  name: 'UserProfile',
  computed: {
    userinfo () {
      return this.$store.getters['auth/user']
    }
  }
}
</script>

<style>
/* プロフィール */
.prof {
    padding-top: 20px;
    padding-bottom: 20px;
}
.prof .icatch{
    margin:0;
}
.prof .circle_icon{
    width:70px;
    height:70px;
    border-radius:50%;
    overflow: hidden;
    border:4px solid #fff;
    margin:-50px auto 0 auto;
}
.prof .name{
    padding:0 15px;
    text-align: center;
    font-size:18px;
    font-weight:500;
    /*color:#249bd2;*/
    margin:14px 0;
}
.prof .icon{
    margin:14px 0 0 0;
    text-align: center;
    padding:0 15px;
}
.prof .icon li{
    display: inline-block;
    margin:0 2px;
    width:45px;
    height:45px;
    line-height:45px;
    text-align: center;
    font-size:22px;
    border-radius: 50%;
    background-color: #6cc655;
}
.prof .icon li a{
    display: block;
    color:#fff;
}
.prof .icon li.facebook{
    background:#3b5998;
}
.prof .icon li.twitter{
    background:#55acee;
}
.prof .icon li.of_site{
    background: #f0ad4e;
}
.prof .icon li.insta{
    background-image: linear-gradient(-135deg,#1400c8,#b900b4,#f50000);
}
.prof .irai_btn{
    margin:20px auto 0 auto;
}
.prof .irai_btn a{
    display: block;
    width: 270px;
    height: 55px;
    line-height: 50px;
    color: #FFF;
    text-decoration: none;
    text-align: center;
    background-color: #4ba9d4;
    border-bottom: solid 5px #2c86af;
    border-radius: 5px;
    margin: 0 auto;
}
.prof .irai_btn a:active{
    margin-top: 6px;
    border-bottom: none;
    -webkit-transform: translateY(6px);
    transform: translateY(6px);
}
.prof .irai_btn a:hover {
    background-color: #f9c500;/*ボタン色*/
    border-bottom: solid 6px #f39800; /*下線色*/
}
</style>
