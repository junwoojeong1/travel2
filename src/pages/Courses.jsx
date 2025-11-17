```jsx
import React, { useState, useEffect, useRef } from 'react'


export default function Courses(){
const [points, setPoints] = useState(()=> JSON.parse(localStorage.getItem('tp_points')|| '[]'))
const [form, setForm] = useState({name:'', lat:'', lng:'', duration:'60', priority:5})
const [route, setRoute] = useState(null)
const dragIndex = useRef(null)
useEffect(()=> localStorage.setItem('tp_points', JSON.stringify(points)), [points])


function add(e){ e.preventDefault(); setPoints(p=>[{...form, id:Date.now().toString()}, ...p]); setForm({name:'', lat:'', lng:'', duration:'60', priority:5}) }
function onDragStart(i){ dragIndex.current = i }
function onDrop(i){ const j = dragIndex.current; if(j==null) return; setPoints(prev=>{ const arr=[...prev]; const [it]=arr.splice(j,1); arr.splice(i,0,it); return arr }); dragIndex.current = null }


function nearest(){ const withCoords = points.filter(p=>p.lat && p.lng); if(withCoords.length < 2){ setRoute([...points].sort((a,b)=>Number(b.priority)-Number(a.priority))); return; } const pts = points.map(p=>({...p, lat:Number(p.lat), lng:Number(p.lng)})); let cur = pts[0]; const visited=[cur]; const rem = pts.slice(1); function dist(a,b){ const dx=a.lat-b.lat; const dy=a.lng-b.lng; return Math.sqrt(dx*dx+dy*dy) } while(rem.length){ let ni=0; let nd=dist(cur,rem[0]); for(let i=1;i<rem.length;i++){ const d = dist(cur,rem[i]); if(d<nd){ nd=d; ni=i } } cur = rem.splice(ni,1)[0]; visited.push(cur) } visited.sort((a,b)=>Number(b.priority)-Number(a.priority)); setRoute(visited) }
function estimate(arr){ if(!arr) return 0; return arr.reduce((s,p)=>s + Number(p.duration||0),0) }


return (
<section>
<h2 className="text-lg font-semibold">코스 제작</h2>
<p className="text-sm text-slate-600">좌표가 있으면 자동으로 경로를 계산합니다.</p>


<form onSubmit={add} className="mt-4 grid sm:grid-cols-2 gap-3">
<input placeholder="명소명" className="p-2 rounded border" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} />
<input placeholder="lat" className="p-2 rounded border" value={form.lat} onChange={e=>setForm(f=>({...f, lat:e.target.value}))} />
<input placeholder="lng" className="p-2 rounded border" value={form.lng} onChange={e=>setForm(f=>({...f, lng:e.target.value}))} />
<input placeholder="체류시간(분)" className="p-2 rounded border" value={form.duration} onChange={e=>setForm(f=>({...f, duration:e.target.value}))} />
<input placeholder="우선순위(1-10)" className="p-2 rounded border" value={form.priority} onChange={e=>setForm(f=>({...f, priority:e.target.value}))} />
<div className="sm:col-span-2 flex gap-2">
<button className="px-4 py-2 rounded bg-white/60" type="submit">명소 추가</button>
<button type="button" onClick={nearest} className="px-4 py-2 rounded bg-white/60">자동 코스 생성</button>
<button type="button" onClick={()=>{
const blob = new Blob([JSON.stringify({points, route},null,2)],{type:'application/json'});
const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='course-plan.json'; a.click(); URL.revokeObjectURL(url);
}} className="px-4 py-2 rounded bg-white/60">JSON 내보내기</button>
</div>
</form>


<div className="mt-4 space-y-3">
{points.map((p,i)=> (
<div key={p.id} draggable onDragStart={()=>onDragStart(i)} onDragOver={(e)=>e.preventDefault()} onDrop={()=>onDrop(i)} className="flex justify-between items-center p-3 rounded-lg border bg-white/50">
<div>
<div className="font-semibold">{p.name}</div>
<div className="text-xs text-slate-500">체류 {p.duration}분 · 우선순위 {p.priority} · {p.lat && p.lng ? `(${p.lat}, ${p.lng})` : '좌표없음'}</div>
</div>
<div className="flex gap-2">
<button className="px-3 py-1 rounded bg-white/60" onClick={()=>setPoints(prev=>prev.filter(x=>x.id!==p.id))}>삭제</button>
</div>
</div>
))}
</div>


<div className="mt-4 p-3 bg-white/50 rounded-lg">
<h4 className="font-semibold">자동 생성된 코스 / 현재 코스</h4>
{route ? (
<ol className="mt-2 space-y-2">
{route.map(r=> (
<li key={r.id} className="p-2 border rounded">{r.name} — 체류 {r.duration}분</li>
))}
</ol>
) : <div className="text-xs text-slate-500">코스가 아직 생성되지 않았습니다.</div>}
<div className="text-xs text-slate-500 mt-2">총 예상 체류 시간: {estimate(route)} 분</div>
</div>
</section>
)
}
```
