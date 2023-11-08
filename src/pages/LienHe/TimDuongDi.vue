<template>
    <div class="TimDuongDi">
        <div class="container">
            <h2 class="title_TimDuongDi">Tìm Đường Đi</h2>
            <div class="row">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19751.975969194333!2d105.09778055625267!3d10.010614283695363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0b533c8767f8b%3A0x7145ba5a58fdebbb!2zUGjDsm5nIGtow6FtIMSQYSBraG9hIFRydW5nIENhbmc!5e1!3m2!1svi!2s!4v1692860429006!5m2!1svi!2s"
                    width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>

        <div class="form_LienHe_TimDuongDi">
            <div class="container">
                <div class="row row_TimDuongDi">
                    <div class="col-6">
                        <h2>FORM LIÊN HỆ</h2>
                        <form>
                            <div class="form-group">
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    placeholder="Họ và Tên">
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control" id="exampleInputPassword1" placeholder="Email">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Điện Thoại">
                            </div>
                            <div class="form-group">
                                <textarea name="noidung" id="" cols="70%" class="form-control" rows="8"
                                    placeholder="Nội Dung"></textarea>
                            </div>
                            <div class="buttonSend ">
                                <button>
                                    <div class="svg-wrapper-1">
                                        <div class="svg-wrapper">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                                height="24">
                                                <path fill="none" d="M0 0h24v24H0z"></path>
                                                <path fill="currentColor"
                                                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z">
                                                </path>
                                            </svg>
                                        </div>
                                    </div>
                                    <span>Gửi</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div class="col-6 col_TimDuongDi">
                        <h2>THÔNG TIN LIÊN HỆ</h2>
                        <div class="DiaChi">
                            <ul>
                                <li><i class="fa fa-map-marker-alt"></i><span>Địa chỉ:</span></li>
                                <li><span>Số 123 Đường Phan Chu Trinh, Quận 10, TP.HCM</span></li>
                                <li><span>Email: contact@demo.com</span></li>
                                <li><span>Phone: 0123.456.789</span></li>
                            </ul>
                        </div>
                        <div class="GioMoCua">
                            <ul>
                                <li><i class="fa fa-clock"></i><span>Giờ mở cửa:</span></li>
                                <li><span>Thứ 2 - Chủ nhật: 9:00 AM - 20:00 PM</span></li>
                            </ul>
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

<style scoped>
.title_TimDuongDi {
    text-align: center;
    margin: 40px 0;

}

.title_TimDuongDi::after {
    background-color: #66bde6;
    content: '';
    display: block;
    height: 4px;
    margin: 0;
    position: relative;
    top: 9px;
    width: 100px;
    border-radius: 20px;
    margin: auto;
}

/* button Gửi */
.buttonSend {
    display: flex;
    justify-content: left;
    text-align: center;
    padding: 20px 0;
}

button {
    font-family: inherit;
    font-size: 18px;
    background: linear-gradient(to bottom, #4dc7d9 0%, #66a6ff 100%);
    color: white;
    padding: 0.8em 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    /* box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2); */
    transition: all 0.3s;
}

button:hover {
    transform: translateY(-3px);
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
}

button:active {
    transform: scale(0.95);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

button span {
    display: block;
    margin-left: 0.4em;
    transition: all 0.3s;
}

button svg {
    width: 18px;
    height: 18px;
    fill: white;
    transition: all 0.3s;
}

button .svg-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 30px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    margin-right: 0.5em;
    transition: all 0.3s;
}

button:hover .svg-wrapper {
    background-color: rgba(255, 255, 255, 0.5);
}

button:hover svg {
    transform: rotate(45deg);
}


/* ------------------------ */
.form_LienHe_TimDuongDi {
    background: #F9F5EC;
    margin-top: 40px;
}
.DiaChi {
    background: #ffff;
    padding: 20px 0;
    margin-bottom: 20px;
}
.GioMoCua {
    background: #ffff;
    padding: 20px 0;
}
.row_TimDuongDi{
    padding: 50px 0;
}
.row_TimDuongDi h2 {
    margin-bottom: 50px;
    font-weight: 350;
}
.col_TimDuongDi ul li {
    list-style: none;
    letter-spacing: 1px;
}
.col_TimDuongDi li:first-child{
    margin-bottom: 20px;
}
.col_TimDuongDi li i:first-child{
    color: #66a6ff;
    font-size: 20px;
    margin-right: 10px;
}
.col_TimDuongDi li:first-child span{
    font-size: 20px;
    font-weight: bold;
}
</style>>