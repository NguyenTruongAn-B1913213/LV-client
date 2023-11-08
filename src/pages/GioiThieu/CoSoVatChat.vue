<template>
  <div class="cosovatchat">
    <div class="main">
        <div class="Csvc-component1">
            <img src="../../assets/GioiThieu-img/slider1/csvc-h1.jpg" alt="">
        </div>

        <div class="Csvc-component2">
          <div class="container">
            <h3 class="title">Cở Sở Vật Chất</h3>
            <div class="row">
              <div class="col-6 MRI">
                <router-link to="#">
                  <img src="../../assets/GioiThieu-img/slider2/may-1.jpg" alt="">
                </router-link>
                <div class="overlay">
                  <h4>Máy Chụp MRI</h4>
                </div>
              </div>
              <div class="col-6 MRI">
                <router-link to="#">
                  <img src="../../assets/GioiThieu-img/slider2/may-2.jpg" alt="">
                </router-link>
                <div class="overlay">
                  <h4>Máy CT PHILIPS</h4>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-4 Phillips">
                <router-link to="#">
                  <img src="../../assets/GioiThieu-img/slider2/may-noi-soi-tmh.jpg" alt="">
                </router-link>
                <div class="overlay2">
                  <h4>Máy Nội Soi Tai Mũi Họng</h4>
                </div>
              </div>

              <div class="col-4 Phillips">
                <router-link to="#">
                  <img src="../../assets/GioiThieu-img/slider2/may-chup-xquang.jpg" alt="">
                </router-link>
                <div class="overlay2">
                  <h4>Máy Chụp X-QUANG</h4>
                </div>
              </div>

              <div class="col-4 Phillips">
                <router-link to="#">
                  <img src="../../assets/GioiThieu-img/slider2/may-sm-01.jpg" alt="">
                </router-link>
                <div class="overlay2">
                  <h4>Máy Siêu Âm DOPPLERI</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.cosovatchat{
  overflow-x: hidden;
}
.MRI{
  padding-left: 0;
  padding-right: 0;
  margin-bottom: 20px;
}
.Phillips{
  padding-left: 0;
  padding-right: 0;
  margin-bottom: 50px;
}

.MRI img{
  width: 550px;
}
.overlay2{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 350px;
  background: rgba(0, 0, 0, 0.421);
  text-align: center;
  padding: 10px 0;
  color: white;
}
.overlay{
  position: absolute;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.421);
  width:550px;
  text-align: center;
  padding: 10px 0;
  color: white;
}
.Phillips img{
  width: 350px;
}
.title{
  text-align: center;
  padding: 20px;
}
</style>

