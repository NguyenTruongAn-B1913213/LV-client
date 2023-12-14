<template>
    <div class="footer">
        <div class="TrangChu-component7">
            <div class="">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="map">
                            <h3 style="margin-bottom: 40px;">Bản Đồ</h3>
                        </div>
                        <div class="area-map" style="text-align: center;">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.1138985817765!2d105.10441467459489!3d10.007449772907407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0b533c8767f8b%3A0x7145ba5a58fdebbb!2zUGjDsm5nIGtow6FtIMSQYSBraG9hIFRydW5nIENhbmc!5e0!3m2!1svi!2s!4v1692109923401!5m2!1svi!2s"
                                width="600" height="400" style="border:0;" allowfullscreen="" loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>

                    <div class="col-sm-6 contact">
                        <div class=" row info-contact">
                            <div class="map">
                                <h3>Liên Hệ</h3>
                            </div>
                            <ul>
                                <li><i class="fa fa-mobile-alt"></i><span>Hotline: 088 874 3399</span></li>
                                <li><i class="fa fa-phone"></i><span>Phone: 088 874 3399</span></li>
                                <li><i class="fa fa-envelope"></i><span>Email: contact@demo.com</span></li>
                                <li><i class="fa fa-map-marker-alt"></i><span>205 Lạc Hồng, P.Vĩnh Hiệp, TP.Rạch Giá, T.Kiên
                                        Giang</span></li>
                            </ul>


                        </div>
                        <!-- <div class="info-contact-2">
                            <div class="map">
                                <h3>Đăng Ký Nhận Bản Tin</h3>
                            </div>
                            <div class="nhap-email-gui-di">
                                <input type="text" placeholder="Nhập Email Của Bạn...." class="cell-email">
                                <button class="send" type="submit">Gửi Đi</button>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="main-footer">
            <div class="footer-logo">
                <img src="https://bizweb.dktcdn.net/100/378/435/themes/755692/assets/logo.png?1663489820792" alt="">
            </div>
            <div class="social">
                <ul>
                    <li>
                        <router-link to="#"><i class="fab fa-instagram"></i></router-link>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/pkdktrungcang"><i class="fab fa-facebook"></i></a>
                    </li>
                    <li>
                        <router-link to="#"><i class="fab fa-twitter"></i></router-link>
                    </li>
                    <li>
                        <router-link to="#"><i class="fab fa-youtube"></i></router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "footer-page"
}
</script>

<style scoped>
.TrangChu-component7 {
    position: relative;
}

.footer {
    background: #66bde6;
}

.main-footer {
    display: flex;
    justify-content: space-between;
}

.footer-logo img {
    width: 200px;
    margin: 10px 50px;
}

.social {
    display: flex;
    justify-content: center;
    align-items: center;
}

.social ul {
    display: flex;
    list-style: none;
}

.social ul li {
    cursor: pointer;
    font-size: 35px;
    margin-left: 10px;
    margin-right: 25px;
    color: white;
}

.social ul li i {
    color: white;
}

.info-contact {
    display: block;

}

.map {}

.info-contact ul {
    margin-left: 150px;
}

.info-contact ul li {
    /* text-align: center; */
}

.info-contact-2 {
    margin-left: 100px;
}

.map {
    margin-bottom: 10px;
}

.map h3 {
    text-align: center;
    font-size: bold;
    font-size: 40;
    color: white;
    margin-top: 20px;
}

.contact .info-contact ul {
    color: black;

}

.contact .info-contact ul li {
    list-style: none;
    margin-top: 20px;
    font-size: 16px;
    letter-spacing: 2px;
    width: 600px;
    font-size: 20px;
}

.contact .info-contact ul li:not(:last-of-type) {
    border-bottom: 2px solid black;
    line-height: 40px;
}

.contact .info-contact ul li i {
    margin-right: 10px;
    color: #66bde6;
}

.nhap-email-gui-di .cell-email {
    width: 75%;
}

.nhap-email-gui-di .send {
    border: 1px dashed black;
    color: white;
}
</style>
