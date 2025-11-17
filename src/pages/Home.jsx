```jsx
import React from 'react'


// 고정 메시지(수정 불가)
const FIXED_MESSAGE = '여행을 시작해볼까요?'


export default function Home(){
return (
<section>
<h2 className="text-lg font-semibold">대표 페이지</h2>
<p className="text-sm text-slate-600">여행 기본 정보를 확인하세요. (기본 문구는 수정할 수 없습니다.)</p>


<div className="mt-4 grid sm:grid-cols-2 gap-4">
<div>
<label className="text-xs">여행 시작</label>
<input type="date" className="w-full p-2 rounded-lg border" />
<label className="text-xs mt-2 block">여행 종료</label>
<input type="date" className="w-full p-2 rounded-lg border" />
</div>


<div>
<label className="text-xs">기본 문구</label>
<div className="w-full p-4 rounded-lg border bg-white/70 font-medium text-lg">{FIXED_MESSAGE}</div>
<p className="text-xs text-slate-500 mt-2">이 메시지는 코드에 고정되어 있으며 편집이 불가능합니다.</p>
</div>
</div>
</section>
)
}
```
