```jsx
import React, { useState, useEffect, useRef } from 'react'


export default function Accommodation(){
const [places, setPlaces] = useState(()=> JSON.parse(localStorage.getItem('tp_places')|| 'null') || [])
useEffect(()=> localStorage.setItem('tp_places', JSON.stringify(places)), [places])
const [form, setForm] = useState({name:'', location:'', price:'', nights:'', amenities:''})
const dragIndex = useRef(null)


function add(e){ e.preventDefault(); setPlaces(p=>[{...form, id:Date.now().toString()}, ...p]); setForm({name:'', location:'', price:'', nights:'', amenities:''}) }
function onDragStart(i){ dragIndex.current = i }
function onDrop(i){ const j = dragIndex.current; if(j==null) return; setPlaces(prev=>{ const arr=[...prev]; const [it]=arr.splice(j,1); arr.splice(i,0,it); return arr }); dragIndex.current = null }


return (
<section>
<h2 className="text-lg font-semibold">숙박 및 기타</h2>
<p className="text-sm text-slate-600">숙소와 기타 편의시설을 추가하세요.</p>


<form onSubmit={add} className="mt-4 grid sm:grid-cols-2 gap-3">
<input placeholder="숙소명" className="p-2 rounded border" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} />
<input placeholder="위치" className="p-2 rounded border" value={form.location} onChange={e=>setForm(f=>({...f, location:e.target.value}))} />
<input placeholder="가격/박" className="p-2 rounded border" value={form.price} onChange={e=>setForm(f=>({...f, price:e.target.value}))} />
<input placeholder="숙박일수" className="p-2 rounded border" value={form.nights} onChange={e=>setForm(f=>({...f, nights:e.target.value}))} />
<input placeholder="편의시설" className="p-2 rounded border" value={form.amenities} onChange={e=>setForm(f=>({...f, amenities:e.target.value}))} />
<div className="sm:col-span-2 flex gap-2">
<button className="px-4 py-2 rounded bg-white/60" type="submit">숙소 추가</button>
<button type="button" onClick={()=>setPlaces(p=>[...p].sort((a,b)=>Number(a.price||0)-Number(b.price||0)))} className="px-4 py-2 rounded bg-white/60">가격순 정렬</button>
</div>
</form>


<div className="mt-4 space-y-3">
{places.map((p,i)=> (
<div key={p.id} draggable onDragStart={()=>onDragStart(i)} onDragOver={(e)=>e.preventDefault()} onDrop={()=>onDrop(i)} className="flex justify-between items-center p-3 rounded-lg border bg-white/50">
<div>
<div className="font-semibold">{p.name} · {p.location}</div>
<div className="text-xs text-slate-500">{p.nights}박 · {p.price}원/박 · {p.amenities}</div>
</div>
<div className="flex gap-2">
<button className="px-3 py-1 rounded bg-white/60" onClick={()=>alert('예약 연동은 별도 연동 필요')}>예약 연동</button>
<button className="px-3 py-1 rounded bg-white/60" onClick={()=>setPlaces(prev=>prev.filter(x=>x.id!==p.id))}>삭제</button>
</div>
</div>
))}
</div>
</section>
)
}
```
