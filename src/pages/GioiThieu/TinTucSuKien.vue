<template>
    <div class="TinTucSuKien">
        <div class="container TinTucSuKien_Content">
            <div class="row TinTucSuKien_Main">
                <div class="col-xl-9 col_TinTucSuKien_New">
                    <div class="title_TinTucSuKien">
                        <h2 class="titleUnderline_TinTucSuKien">Danh Mục : Tin Tức Sự Kiện</h2>
                    </div>
                    <div class="row">
                        <div class="col-xl-4" v-for="(news, index) in newsList" :key="index">
                            <div class="card">
                                <img class="card-img-top" :src="news.img" alt="">
                                <div class="card-body">
                                    <div class="dateTime mb-2 mt-2">
                                        <i class="fa fa-calendar-alt"></i>
                                        <span class="ml-2">{{ news.ngayDang }}</span>
                                    </div>
                                    <router-link to="#">
                                        <h4 class="card-title">{{ news.tieuDe }}</h4>
                                    </router-link>
                                    <!-- <p class="card-text">Nguyên nhân gây rụng tóc Rụng tóc là chứng xảy ra...</p> -->
                                    <router-link to="#">
                                        <span>Xem Tất Cả</span>
                                        <i class="fa fa-angle-double-right"></i>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav aria-label="Page navigation example" id="pagination">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Previous" @click="previousPage">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span class="sr-only">Previous</span>
                                </a>
                            </li>
                            <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber"
                                :class="{ 'active': pageNumber === page }">
                                <a class="page-link" href="#" @click="changePage(pageNumber)">{{ pageNumber }}</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Next" @click="nextPage">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <!-- <div class="row">
                        <div class="col-xl-4">
                            <div class="card">
                                <img class="card-img-top" src="../../assets/TinTucSuKien/img_2.jpg" alt="">
                                <div class="card-body">
                                    <div class="dateTime mb-2 mt-2">
                                        <i class="fa fa-calendar-alt"></i>
                                        <span class="ml-2">15/07/2020</span>
                                    </div>
                                    <div class="dateTime"></div>
                                    <router-link to="#">
                                        <h4 class="card-title">Đã tìm ra cách trị đồi mồi an toàn, hiệu quả thấy rõ sau 4
                                            buổi thực hiện</h4>
                                    </router-link>
                                    <p class="card-text">Nguyên nhân gây rụng tóc Rụng tóc là chứng xảy ra...</p>
                                    <router-link to="#">
                                        <span>Xem Tất Cả</span>
                                        <i class="fa fa-angle-double-right"></i>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>

                <div class="col-xl-3">
                    <h2 class="titleUnderline_TinTucSuKien">Bài Viết Mới</h2>
                    <div class="BaiVietMoi_Content">
                        <ul class="BaiVietMoi_Main">
                            <li>
                                <span>Đã tìm ra cách trị đồi mồi an toàn, hiệu quả thấy rõ sau 4 buổi thực hiện</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            newsList: [],
            page: 1,
            totalPages: 0,

        }
    },
    mounted() {
        this.fetchNews();

    },
    methods: {
        async fetchNews() {
            const res = await axios.get(`http://localhost:3000/api/get-tintuc?page=${this.page}`)
            this.newsList = res.data.news;
            this.totalPages = res.data.totalPages
            console.log(this.totalPages)
        },
        previousPage() {
            if (this.page > 1) {
                this.page--;
                this.fetchNews();
            }
        },
        nextPage() {
            if (this.page < this.totalPages) {
                this.page++;
                this.fetchNews();
            }
        },
        changePage(pageNumber) {
            if (pageNumber != this.page) {
                this.page = pageNumber
                this.fetchNews();
            }
        }
    },

}
</script>

<style scoped>
.titleUnderline_TinTucSuKien {
    text-align: center;
    margin-top: 30px;
}

.titleUnderline_TinTucSuKien::after {
    background-color: #66bde6;
    content: '';
    display: block;
    height: 3px;
    margin: auto;
    position: relative;
    top: 9px;
    width: 80px;
    margin-bottom: 50px;
}

.card {
    border: none;
    margin-bottom: 40px;
}

.card-body {
    padding: 0;
}

.card-body h4 {
    font-size: 20px;
    color: black;
}

.card-body a:hover {
    text-decoration: none;
}
</style>

