// ===============================
// ساخت نقشه
// ===============================

const map = L.map("map").setView([35.4305, 51.5705], 13);

// نقشه OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap"
}).addTo(map);

// ===============================
// اطلاعات موکب‌ها
// ===============================

const mokebs = [
{
    name:"موکب امام حسن مجتبی (ع)",
    lat:35.420,
    lng:51.565,
    address:"مسجد جامع قرچک",
    services:"🍲 غذا<br>☕ چای<br>🚻 سرویس بهداشتی"
},
{
    name:"موکب حضرت زینب (س)",
    lat:35.426,
    lng:51.571,
    address:"بلوار امام رضا",
    services:"💧 آب معدنی<br>🍵 چای<br>🛏 استراحت"
},
{
    name:"موکب شهدای قرچک",
    lat:35.432,
    lng:51.578,
    address:"سه راه کارخانه",
    services:"🍲 غذا<br>🚑 خدمات درمانی"
},
{
    name:"موکب حضرت رقیه (س)",
    lat:35.439,
    lng:51.585,
    address:"جاده قدیم ری",
    services:"☕ چای<br>🥤 شربت"
},
{
    name:"موکب حضرت ابوالفضل (ع)",
    lat:35.446,
    lng:51.592,
    address:"ورودی شهرری",
    services:"🍲 غذا<br>🛏 محل استراحت<br>🚑 خدمات درمانی"
}
];

// ===============================
// آیکون موکب
// ===============================

const markerIcon = L.icon({
    iconUrl:"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize:[25,41],
    iconAnchor:[12,41]
});

// ===============================
// نمایش موکب‌ها
// ===============================

mokebs.forEach(item=>{

    L.marker([item.lat,item.lng],{icon:markerIcon})
    .addTo(map)
    .bindPopup(`
        <h3>${item.name}</h3>

        <b>📍 آدرس:</b><br>
        ${item.address}

        <br><br>

        <b>خدمات:</b><br>
        ${item.services}

        <br><br>

        <a target="_blank"
        href="https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}">
        🚗 مسیریابی
        </a>
    `);

});

// ===============================
// مسیر
// ===============================

const route = [

[35.420,51.565],
[35.426,51.571],
[35.432,51.578],
[35.439,51.585],
[35.446,51.592]

];

L.polyline(route,{
    color:"#FFD700",
    weight:6,
    opacity:0.9
}).addTo(map);

// ===============================
// موقعیت کاربر
// ===============================

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(function(pos){

const lat = pos.coords.latitude;
const lng = pos.coords.longitude;

L.circleMarker([lat,lng],{
radius:8,
color:"blue",
fillColor:"blue",
fillOpacity:1
})
.addTo(map)
.bindPopup("📍 موقعیت شما");

});

}

// ===============================
// جستجو
// ===============================

const search=document.getElementById("search");

search.addEventListener("keyup",function(){

const txt=this.value.trim();

mokebs.forEach(item=>{

if(item.name.includes(txt)){

map.setView([item.lat,item.lng],16);

}

});

});