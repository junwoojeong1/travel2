```jsx
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Flights from './pages/Flights'
import Accommodation from './pages/Accommodation'
import Destinations from './pages/Destinations'
import Courses from './pages/Courses'


export default function App(){
return (
<div className="min-h-screen p-6">
<header className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-4">
<div>
<h1 className="text-2xl font-semibold">Travel Planner</h1>
<p className="text-sm text-slate-500 mt-1">Rounded glass UI — Modern • Clean • Mobile-friendly</p>
</div>
<nav className="flex gap-2">
<Link to="/" className="header-btn">홈</Link>
<Link to="/flights" className="header-btn">항공</Link>
<Link to="/accommodation" className="header-btn">숙박</Link>
<Link to="/destinations" className="header-btn">여행지</Link>
<Link to="/courses" className="header-btn">코스</Link>
</nav>
</header>


<main className="max-w-5xl mx-auto mt-6">
<div className="glass p-6">
<Routes>
<Route path="/" element={<Home/>} />
<Route path="/flights" element={<Flights/>} />
<Route path="/accommodation" element={<Accommodation/>} />
<Route path="/destinations" element={<Destinations/>} />
<Route path="/courses" element={<Courses/>} />
</Routes>
</div>
</main>
</div>
)
}
```
