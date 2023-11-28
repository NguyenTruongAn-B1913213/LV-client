<template>
    <div class="addproduct-page">
        <div class="bg-avatar"></div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3">
                    <TheSideBarBacSi />
                </div>
                <div class="col-sm-9 Add-admin-product" style="margin-top: 0px;">
                    <div class="container">
                        <div class="row">
                            <div class=" col-sm-12">
                                <form class="main-add-content" style="padding-top: 20px;">
                                    <table class="table table-light">
                                        <thead>
                                            <tr class="content-main-thead">
                                                <!-- <th scope="col">ID</th> -->
                                                <th scope="col">Ngày</th>
                                                <th scope="row">Buổi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="content-main-tbody-product" v-for="(day, index) in LichLamViecID"
                                                :key="index">
                                                <td class="dateLamViec">{{ index }}</td>
                                                <td class="buoiLamViec">
                                                    <ul>
                                                        <li v-for="(schedule, i) in day" :key="i">{{ schedule
                                                        }}</li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <!-- <tr class="content-main-tbody-product" v-for="(group, index) in futureWorkDays"
                                                :key="index">
                                                <th scope="row">{{ group.ngay }}</th>
                                                <th scope="row">{{ group.buoi }}</th>
                                            </tr> -->
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import TheSideBarBacSi from '../bacsi/TheSideBar-BacSi.vue';
import { mapState } from 'vuex';
export default {
    components: {
        TheSideBarBacSi
    },
    data() {
        return {
            LichLamViecID: [],
            groupedSchedule: []

        };
    },
    computed: {
        ...mapState({
            userID: (state) => state.userID
        }),
    },
    created() {
        this.getDoctor();
    },
    methods: {
        async getDoctor() {
            try {
                const response = await axios.get(`http://localhost:3000/api/getID-bacsi/${this.userID}`)
                const doctorData = response.data;
                const resDateWork = await axios.get("http://localhost:3000/api/get-datework");
                const dateWorkData = resDateWork.data;
                this.sortAndSetWorkingDays(doctorData.ngayLamViec, dateWorkData);
                // const matchingDateWork = dateWorkData.filter(date => {
                //     return doctorData.ngayLamViec.includes(date._id);
                // });
                // const daysByWeek = {};
                // matchingDateWork.forEach(date => {
                //     if (!daysByWeek[date.thu]) {
                //         daysByWeek[date.thu] = [];
                //     }
                //     daysByWeek[date.thu].push(date.ca);
                // });
                // this.LichLamViecID = daysByWeek
                // console.log(this.LichLamViecID)
            } catch (error) {
                console.log(error)
            }
        },
        sortAndSetWorkingDays(userWorkingDays, allWorkingDays) {
            // Tạo một danh sách các ngày trong tuần và xác định thứ tự của chúng
            const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"];

            // Tạo một đối tượng để lưu trữ ngày làm việc theo thứ tự
            const sortedWorkingDays = {};

            // Duyệt qua danh sách ngày làm việc của người dùng
            userWorkingDays.forEach((workingDayId) => {
                // Tìm ngày làm việc trong tất cả các ngày làm việc
                const workingDay = allWorkingDays.find((day) => day._id === workingDayId);

                if (workingDay) {
                    const { thu, ca } = workingDay;

                    if (!sortedWorkingDays[thu]) {
                        sortedWorkingDays[thu] = [];
                    }

                    sortedWorkingDays[thu].push(ca);
                }
            });

            // Sắp xếp lại ngày làm việc theo thứ tự trong tuần
            const sortedWorkingDaysOfWeek = {};
            for (const day of daysOfWeek) {
                if (sortedWorkingDays[day]) {
                    sortedWorkingDaysOfWeek[day] = sortedWorkingDays[day];
                }
            }

            // Gán ngày làm việc đã sắp xếp cho biến LichLamViecID
            this.LichLamViecID = sortedWorkingDaysOfWeek;

            // In ra để kiểm tra
            console.log(this.LichLamViecID);
        }

        // filterAndGroupSchedule() {
        //     // Filter and group the schedule
        //     const today = new Date();
        //     this.futureWorkDays = this.LichLamViecID.filter((schedule) => {
        //         const scheduleDate = new Date(schedule.ngay);
        //         return scheduleDate > today;
        //     });

        //     const groupedSchedule = {};
        //     this.futureWorkDays.forEach((schedule) => {
        //         const key = schedule.ngay;
        //         if (!groupedSchedule[key]) {
        //             groupedSchedule[key] = {
        //                 ngay: schedule.ngay,
        //                 schedules: []
        //             };
        //         }
        //         groupedSchedule[key].schedules.push(schedule);

        //     });
        //     this.groupedSchedule = Object.values(groupedSchedule);
        //     console.log(this.groupedSchedule)
        // }
    }
};

</script>
  
<style>
.content-main-tbody-admin {
    margin: 0;
}

.buoiLamViec ul li {
    text-align: center;
    list-style: none;
}

.dateLamViec {
    text-align: center;
    border-top: 10px solid red;
}

.mainEdit-Product {
    display: flex;
    justify-content: center;
}

.EditProduct {
    background: rgb(145, 235, 11);
    border-radius: 10px;
    color: white;
    width: 40px;
    height: 40px;
    text-align: center;
    margin-top: 30px;
}

.delete {
    background: red;
    color: white;
    border-radius: 10px;
    width: 40px;
    height: 40px;
    margin-top: 18px;
    text-align: center;
    padding: 10px;
}

.img-product-page-admin {
    width: 70px;
}

.content-main-tbody td,
th {
    text-align: center;
    padding-top: 20px;
}

.title-product-admin {
    justify-content: center;
}

.table td,
.table th {
    vertical-align: middle;
    border-top: 1px solid black;
}

.Add-admin-product {
    margin-top: 0px;
}
</style>