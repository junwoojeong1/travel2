```jsx
export default function Flights(){
const [offers, setOffers] = useState(()=> JSON.parse(localStorage.getItem('tp_flights')|| 'null') || [])
useEffect(()=> localStorage.setItem('tp_flights', JSON.stringify(offers)), [offers])
const [form, setForm] = useState({airline:'', from:'', to:'', depart:'', arrive:'', price:'', duration:''})
const dragIndex = useRef(null)


function add(e){ e.preventDefault(); setOffers(o=>[{...form, id:Date.now().toString()}, ...o]); setForm({airline:'', from:'', to:'', depart:'', arrive:'', price:'', duration:''}) }
function onDragStart(i){ dragIndex.current = i }
function onDrop(i){ const j = dragIndex.current; if(j==null) return; setOffers(prev=>{ const arr=[...prev]; const [it]=arr.splice(j,1); arr.splice(i,0,it); return arr }) ; dragIndex.current = null }
function sortBy(key){ setOffers(o=>[...o].sort((a,b)=> Number(a[key]||0) - Number(b[key]||0))) }


return (
<section>
<h2 className="text-lg font-semibold">항공편 계획</h2>
<p className="text-sm text-slate-600">항공권을 추가하고 드래그로 순서를 바꿀 수 있습니다.</p>


<form onSubmit={add} className="mt-4 grid sm:grid-cols-3 gap-3">
<input placeholder="항공사" className="p-2 rounded border" value={form.airline} onChange={e=>setForm(f=>({...f, airline:e.target.value}))} />
<input placeholder="출발지" className="p-2 rounded border" value={form.from} onChange={e=>setForm(f=>({...f, from:e.target.value}))} />
<input placeholder="도착지" className="p-2 rounded border" value={form.to} onChange={e=>setForm(f=>({...f, to:e.target.value}))} />
<input placeholder="출발시간" className="p-2 rounded border" value={form.depart} onChange={e=>setForm(f=>({...f, depart:e.target.value}))} />
<input placeholder="도착시간" className="p-2 rounded border" value={form.arrive} onChange={e=>setForm(f=>({...f, arrive:e.target.value}))} />
<input placeholder="가격" className="p-2 rounded border" value={form.price} onChange={e=>setForm(f=>({...f, price:e.target.value}))} />
<input placeholder="소요시간(분)" className="p-2 rounded border" value={form.duration} onChange={e=>setForm(f=>({...f, duration:e.target.value}))} />
<div className="sm:col-span-3 flex gap-2">
<button className="px-4 py-2 rounded bg-white/60" type="submit">항공편 추가</button>
<button type="button" onClick={()=>sortBy('price')} className="px-4 py-2 rounded bg-white/60">가격순</button>
<button type="button" onClick={()=>sortBy('duration')} className="px-4 py-2 rounded bg-white/60">시간순</button>
</div>
</form>


<div className="mt-4 space-y-3">
{offers.map((of,i)=> (
<div key={of.id} draggable onDragStart={()=>onDragStart(i)} onDragOver={(e)=>e.preventDefault()} onDrop={()=>onDrop(i)} className="flex justify-between items-center p-3 rounded-lg border bg-white/50">
<div>
<div className="font-semibold">{of.airline} — {of.from} → {of.to}</div>
<div className="text-xs text-slate-500">{of.depart} → {of.arrive} · {of.duration}분 · {of.price}원</div>
</div>
<div className="flex gap-2">
<button className="px-3 py-1 rounded bg-white/60" onClick={()=>alert('선택됨')}>선택</button>
<button className="px-3 py-1 rounded bg-white/60" onClick={()=>setOffers(prev=>prev.filter(x=>x.id!==of.id))}>삭제</button>
</div>
</div>
))}
</div>
</section>
)
}
```
