const map = L.map('map').setView([35.52198, 51.49887], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const mokebs=[
{
name:'هیئت امیرالمومنین ع',
type:'پذیرایی',
address:'مسیر خیابانی قرچک تا حرم حضرت عبدالعظیم(ع)',
services:'ظرفیت ۲۰۰۰ نفر',
lat:35.44054,
lng:51.57129
},
{
name:'گروه جهادی شهید بقرایی',
type:'پذیرایی',
address:'مسیر خیابانی قرچک تا حرم حضرت عبدالعظیم(ع)',
services:'پذیرایی',
lat:35.44782,
lng:51.56091
},
{
name:'حوزه امام حسین ع',
type:'خدماتی',
address:'مسیر خیابانی قرچک تا حرم حضرت عبدالعظیم(ع)',
services:'خدماتی',
lat:35.45531,
lng:51.54962
},
{
name:'گروه جهادی شهید کیوان تاجیک',
type:'پذیرایی',
address:'مسیر خیابانی قرچک تا حرم حضرت عبدالعظیم(ع)',
services:'پذیرایی',
lat:35.46377,
lng:51.53810
},
{
name:'محبین الائمه',
type:'پذیرایی',
address:'مسیر خیابانی قرچک تا حرم حضرت عبدالعظیم(ع)',
services:'ظرفیت ۵۰۰۰ نفر',
lat:35.47221,
lng:51.52688
},
{
name:'خیریه حضرت زینب س',
type:'پذیرایی',
address:'مسیر خیابانی قرچک تا حرم حضرت عبدالعظیم(ع)',
services:'پذیرایی',
lat:35.48164,
lng:51.51473
},
{
name:'هیئت اباعبدالله الحسین',
type:'پذیرایی',
address:'مسیر خیابانی قرچک تا حرم حضرت عبدالعظیم(ع)',
services:'ظرفیت ۲۰۰۰۰ نفر',
lat:35.49130,
lng:51.50320
},
];

let markers = [];

function color(t){
if(t==='فرهنگی')return '#2196f3';
if(t==='پذیرایی')return '#22c55e';
if(t==='خدماتی')return '#ff9800';
return '#ef4444';
}

function show(data){
markers.forEach(m=>map.removeLayer(m));
markers=[];

data.forEach(x=>{
let icon=L.divIcon({
html:`<div style="background:${color(x.type)};width:22px;height:22px;border-radius:50%;border:3px solid white"></div>`,
className:''
});

let m=L.marker([x.lat,x.lng],{icon}).addTo(map);

m.bindPopup(`
<h3>${x.name}</h3>
<p>📍 ${x.address}</p>
<p>🏷️ ${x.type}</p>
<p>🍵 ${x.services}</p>
`);

markers.push(m);
});

document.getElementById('mokebCount').innerText=data.length;
}

function filterMokeb(t){
show(t==='all'?mokebs:mokebs.filter(x=>x.type===t));
}

document.getElementById('search').oninput=function(){
show(mokebs.filter(x=>x.name.includes(this.value)));
}

show(mokebs);

// مختصات جدید
const start = [35.44054, 51.57129];
const destination = [35.60342, 51.42645];

L.marker(start).addTo(map).bindPopup("📍 مبدا");
L.marker(destination).addTo(map).bindPopup("🏁 مقصد");
// ساخت مسیر واقعی خیابانی
fetch(`https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`)
.then(res => res.json())
.then(data => {

    const route = data.routes[0].geometry.coordinates.map(c => [
        c[1],
        c[0]
    ]);

    L.polyline(route, {
        color:"#1976d2",
        weight:6
    }).addTo(map);

    map.fitBounds(route);
});

map.fitBounds([start, destination], {
    padding: [40, 40]
});
