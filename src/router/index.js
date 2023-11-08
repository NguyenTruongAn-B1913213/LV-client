import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home/Home.vue";
import CoSoVatChat from "../pages//GioiThieu/CoSoVatChat.vue";
import DoiNguBacSi from "../pages/GioiThieu/DoiNguBacSi.vue";
import TinTucSuKien from "../pages/GioiThieu/TinTucSuKien.vue";
import ChiTietLKBN from "../pages/DatLichKham/chitietLKBN.vue";
import BacSiTuVan from "../pages/LienHe/BacSiTuVan.vue";
import TimDuongDi from "../pages/LienHe/TimDuongDi.vue";
import DangKyND from "../pages/DangNhap/DangKiND.vue";
import DangKyBS from "../pages/DangNhap/DangKiBS.vue";
import DatLichKham from "../pages/DatLichKham/DatLichKham.vue";
import NoiKhoa from "../pages/ChuyenKhoa/NoiKhoa.vue";
import DangNhap from "../pages/DangNhap/DangNhap.vue";
import CapNhatThongTin from "../pages/DatLichKham/CapNhatThongTin";
import XemLich from "../pages/DatLichKham/XemLich";
import Bacsi from "../bacsi/bacsi.vue";
import LichLamViec from "../bacsi/LichLamViec.vue";
import createLichLamViec from "../admin/CreateLichLV.vue";
import XNLichKham from "../admin/xacnhanLick.vue";
import ChiTietLK from "../admin/chitietLK.vue";
// import ReportTemplate from "../pages/ReportTemplate/ReportTemplate.vue";
import ThemThuoc from "../bacsi/Listthuoc.vue";
import IncidentReport from "../pages/ReportTemplate/IncidentReport.vue";
import BSLichKham from "../bacsi/xemlichKham.vue";
import ListBS from "../admin/ListBS.vue";
import admin from "../admin/admin.vue";
import ttBS from "../admin/ttBS.vue";
import ttPK from "../admin/TTPhongKham.vue";
import xemlichBS from "../bacsi/reportBS.vue";
import thongke from "../admin/ThongKe.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // Giới Thiệu
  {
    path: "/CoSoVatChat",
    name: "CoSoVatChat",
    component: CoSoVatChat,
  },
  {
    path: "/bacsi",
    name: "bacsi",
    component: Bacsi,
  },

  {
    path: "/them-thuoc/:id",
    name: "themthuoc",
    component: ThemThuoc,
  },
  {
    path: "/xemlichBS/:id",
    name: "xemlichBS",
    component: xemlichBS,
  },
  {
    path: "/admin",
    name: "admin",
    component: admin,
  },
  {
    path: "/thongke",
    name: "thongke",
    component: thongke,
  },
  {
    path: "/XNLichKham",
    name: "XNLichKham",
    component: XNLichKham,
  },
  {
    path: "/Thong-tin-PhongKham/:id",
    name: "ttPK",
    component: ttPK,
  },
  {
    path: "/ChiTietLK/:id",
    name: "ChiTietLK",
    component: ChiTietLK,
  },
  {
    path: "/ListBS",
    name: "ListBS",
    component: ListBS,
  },
  {
    path: "/Thong-tin-BS/:id",
    name: "ttBS",
    component: ttBS,
  },
  {
    path: "/BSLichKham",
    name: "LichKhamBS",
    component: BSLichKham,
  },
  //------------
  // {
  //   path: "/ReportTemplate",
  //   name: "ReportTemplate",
  //   component: ReportTemplate,
  // },
  //-----------------
  {
    path: "/IncidentReport/:id",
    name: "IncidentReport",
    component: IncidentReport,
  },
  {
    path: "/bacsi/LichLamViec/:id",
    name: "LichLamViec",
    component: LichLamViec,
  },
  {
    path: "/admin/LichLamViec/:id",
    name: "createLichLamViec",
    component: createLichLamViec,
  },
  {
    path: "/DoiNguBacSi",
    name: "DoiNguBacSi",
    component: DoiNguBacSi,
  },

  {
    path: "/DangKiNguoiDung",
    name: "DangKiNguoiDung",
    component: DangKyND,
  },
  {
    path: "/DangKiBS",
    name: "DangKiBS",
    component: DangKyBS,
  },
  {
    path: "/TinTucSuKien",
    name: "TinTucSuKien",
    component: TinTucSuKien,
  },
  {
    path: "/CapNhatThongTin/:id",
    name: "CapNhatThongTin",
    component: CapNhatThongTin,
  },
  {
    path: "/ChiTietLKBN/:id",
    name: "ChiTietLKBN",
    component: ChiTietLKBN,
  },
  {
    path: "/XemLich",
    name: "XemLich",
    component: XemLich,
  },

  // Liên Hệ
  {
    path: "/BacSiTuVan",
    name: "BacSiTuVan",
    component: BacSiTuVan,
  },
  {
    path: "/TimDuongDi",
    name: "TimDuongDi",
    component: TimDuongDi,
  },
  {
    path: "/DatLichKham",
    name: "DatLichKham",
    component: DatLichKham,
  },
  {
    path: "/NoiKhoa",
    name: "NoiKhoa",
    component: NoiKhoa,
  },
  {
    path: "/DangNhap",
    name: "DangNhap",
    component: DangNhap,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
