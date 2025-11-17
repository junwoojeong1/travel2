```jsx
import React, { useState, useEffect } from 'react'


export default function Destinations(){
const [dest, setDest] = useState(()=> JSON.parse(localStorage.getItem('tp_destinations')|| 'null') || [])
const [prefs, setPrefs] = useState(()=> JSON.parse(localStorage.getItem('tp_prefs')|| 'null') || {culture:5,nature:5,food:5,budget:5,distance:5})
const [plan, setPlan] = useState(null)
useEffect(()=> localStorage.setItem('tp_destinations', JSON.stringify(dest)), [dest])
useEffect(()=> localStorage.setItem('tp_prefs', JSON.stringify(prefs)), [prefs])


function score(d){ const w = prefs; return d.culture*w.culture + d.nature*w.nature + d.food*w.food - d.cost*w.budget - d.distance*(w.distance/10) }
function generate(){ const ranked = [...dest].map(d=>({...d, score:score(d)})).sort((a,b)=>b.score-a.score); setPlan(ranked.slice(0,3)) }


return (
<section>
<h2 className="text-lg font-semibold">여행지 계획</h2>
<p className="text-sm text-slate-600">선호에 따라 여행지 우선순위를 계산합니다.</p>


<div className="mt-4 grid sm:grid-cols-2 gap-4">
<div className="p-4 bg-white/50 rounded-lg">
<h3 className="font-semibold">선호도</h3>
{['culture','nature','food','budget','distance'].map(k=> (
<div key={k} className="mt-2">
<label className="text-xs capitalize">{k}</label>
<input type="range" min={1} max={10} value={prefs[k]} onChange={e=>setPrefs(p=>({...p,[k]:Number(e.target.value)}))} className="w-full" />
</div>
))}
<div className="mt-3 flex gap-2">
<button onClick={generate} className="px-3 py-2 rounded bg-white/60">일정 생성</button>
<button onClick={()=>setDest(d=>[...d].sort((a,b)=>a.name.localeCompare(b.name)))} className="px-3 py-2 rounded bg-white/60">정렬</button>
</div>
</div>


<div className="p-4 bg-white/50 rounded-lg">
<h3 className="font-semibold">추천 여행지</h3>
<div className="mt-3 space-y-2">
{dest.length ? dest.map(d=> (
<div key={d.id} className="p-2 border rounded">
<div className="font-semibold">{d.name}</div>
<div className="text-xs text-slate-500">{d.summary}</div>
</div>
)) : <div className="text-xs text-slate-500">샘플 여행지를 추가하세요.</div>}
</div>
</div>
</div>


<div className="mt-4 p-4 bg-white/50 rounded-lg">
<h3 className="font-semibold">생성된 샘플 일정</h3>
{plan ? (
<ol className="mt-2 space-y-2">
{plan.map((p,idx)=> (
<li key={idx} className="p-2 border rounded">{p.name} — (score: {Math.round(p.score)})</li>
))}
</ol>
) : <div className="text-xs text-slate-500">일정을 생성하려면 선호도를 설정하세요.</div>}
</div>
</section>
)
}
```
