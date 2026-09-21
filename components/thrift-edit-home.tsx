'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Menu,
  Search,
  Shirt,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react'

const products = [
  { name: 'Linen wrap dress', category: 'Dresses', size: 'S', price: 2400, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85', tone: 'New in' },
  { name: 'Relaxed denim jacket', category: 'Jackets', size: 'M', price: 1800, image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=85', tone: 'One only' },
  { name: 'Soft cotton shirt', category: 'Tops', size: 'M', price: 1200, image: 'https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85', tone: 'New in' },
  { name: 'Pleated midi skirt', category: 'Skirts', size: 'S', price: 1600, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d27?auto=format&fit=crop&w=900&q=85', tone: 'One only' },
]

const categories = [
  { name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80' },
  { name: 'Tops', image: 'https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=80' },
  { name: 'Denim', image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=700&q=80' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=700&q=80' },
]

const money = (value: number) => `KSh ${value.toLocaleString('en-KE')}`

export function ThriftEditHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const filtered = useMemo(() => products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())), [search])

  return (
    <main className="min-h-screen bg-[#f9f7f2] text-[#2c2926]">
      <div className="border-b border-[#ded9d0] bg-[#ebe6dc] px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-[#686057] sm:text-[11px]">
        New finds added weekly · Nairobi, Kenya
      </div>
      <header className="sticky top-0 z-30 border-b border-[#ded9d0]/80 bg-[#f9f7f2]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-12">
          <a href="#top" className="font-serif text-[22px] tracking-[-0.04em] text-[#272421] sm:text-2xl">The Thrift Edit<span className="text-[#9b7455]">.</span></a>
          <nav className="hidden items-center gap-9 text-[12px] font-medium uppercase tracking-[0.16em] text-[#5d5750] lg:flex">
            <a className="text-[#292622]" href="#top">Home</a><a className="transition-colors hover:text-[#9b7455]" href="#shop">Shop</a><a className="transition-colors hover:text-[#9b7455]" href="#categories">Categories</a><a className="transition-colors hover:text-[#9b7455]" href="#story">Our story</a>
          </nav>
          <div className="flex items-center gap-1">
            <button aria-label="Search" onClick={() => setSearchOpen(!searchOpen)} className="rounded-full p-3 transition-colors hover:bg-[#ebe6dc]"><Search size={18} strokeWidth={1.6} /></button>
            <button aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)} className="rounded-full p-3 transition-colors hover:bg-[#ebe6dc] lg:hidden">{menuOpen ? <X size={19} strokeWidth={1.6} /> : <Menu size={19} strokeWidth={1.6} />}</button>
          </div>
        </div>
        {searchOpen && <div className="border-t border-[#ded9d0] px-5 py-3 lg:absolute lg:right-12 lg:top-20 lg:w-80 lg:border lg:bg-[#f9f7f2]"><label className="sr-only" htmlFor="site-search">Search pieces</label><div className="flex items-center gap-2 border-b border-[#aaa197] pb-2"><Search size={16} /><input autoFocus id="site-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the edit" className="w-full bg-transparent text-sm outline-none placeholder:text-[#938b81]" /></div></div>}
        {menuOpen && <nav className="flex flex-col gap-5 border-t border-[#ded9d0] px-5 py-6 text-sm uppercase tracking-[0.16em] lg:hidden"><a href="#top" onClick={() => setMenuOpen(false)}>Home</a><a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a><a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a><a href="#story" onClick={() => setMenuOpen(false)}>Our story</a></nav>}
      </header>

      <section id="top" className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 pt-8 sm:px-8 sm:pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-12 lg:pb-24 lg:pt-16">
        <div className="order-2 max-w-lg lg:order-1">
          <p className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9b7455]"><Sparkles size={14} /> Curated second-hand style</p>
          <h1 className="font-serif text-[clamp(3.3rem,8vw,6.5rem)] leading-[0.9] tracking-[-0.065em] text-[#302b27]">Style should<br /><em className="font-normal text-[#9b7455]">be personal.</em></h1>
          <p className="mt-7 max-w-sm text-base leading-7 text-[#6f675f]">Carefully selected thrift and second-hand pieces, each with its own story. Find something that feels entirely yours.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4"><a href="#shop" className="inline-flex items-center gap-3 bg-[#302b27] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.17em] text-[#f9f7f2] transition-colors hover:bg-[#9b7455]">Shop the collection <ArrowRight size={15} /></a><a href="#story" className="text-[11px] font-semibold uppercase tracking-[0.17em] text-[#5e554d] underline decoration-[#c9bcae] underline-offset-8">Our story</a></div>
          <div className="mt-14 flex gap-10 border-t border-[#ded9d0] pt-5 text-[11px] uppercase tracking-[0.13em] text-[#81776d]"><span><strong className="block font-serif text-2xl font-normal text-[#302b27]">01</strong> piece per find</span><span><strong className="block font-serif text-2xl font-normal text-[#302b27]">100%</strong> hand-picked</span></div>
        </div>
        <div className="relative order-1 aspect-[0.86] overflow-hidden bg-[#ddd5ca] lg:order-2 lg:aspect-[1.05]">
          <img src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1400&q=88" alt="Neutral-toned clothing on a rail" className="h-full w-full object-cover object-center" />
          <div className="absolute bottom-4 left-4 bg-[#f9f7f2]/90 px-4 py-3 backdrop-blur-sm"><p className="text-[10px] uppercase tracking-[0.18em] text-[#81776d]">The new edit</p><p className="mt-1 font-serif text-lg">Quietly distinctive</p></div>
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-8 flex items-end justify-between border-b border-[#ded9d0] pb-5"><div><p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b7455]">Just in</p><h2 className="font-serif text-4xl tracking-[-0.045em] sm:text-5xl">New arrivals</h2></div><a href="#shop" className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#625950] sm:flex">View all <ArrowRight size={14} /></a></div>
        {search && <p className="mb-6 text-sm text-[#81776d]">Showing {filtered.length} result{filtered.length === 1 ? '' : 's'} for “{search}”</p>}
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4">{filtered.map((product) => <article key={product.name} className="group"><div className="relative aspect-[0.78] overflow-hidden bg-[#ebe6dc]"><img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /><button aria-label={`Save ${product.name}`} className="absolute right-3 top-3 rounded-full bg-[#f9f7f2]/85 p-2 text-[#4d463f] opacity-0 transition-opacity group-hover:opacity-100"><Heart size={16} strokeWidth={1.6} /></button><span className="absolute bottom-3 left-3 bg-[#f9f7f2]/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#6c6258]">{product.tone}</span></div><div className="pt-3"><div className="flex items-start justify-between gap-2"><h3 className="font-serif text-[17px] leading-tight sm:text-lg">{product.name}</h3><p className="whitespace-nowrap text-[13px] font-medium">{money(product.price)}</p></div><p className="mt-1 text-[11px] uppercase tracking-[0.13em] text-[#8b8177]">{product.category} · Size {product.size}</p></div></article>)}</div>
      </section>

      <section id="categories" className="bg-[#e8e1d6] px-5 py-16 sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto max-w-7xl"><div className="mb-8 flex items-end justify-between"><div><p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b7455]">Explore by mood</p><h2 className="font-serif text-4xl tracking-[-0.045em] sm:text-5xl">Find your feel</h2></div></div><div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">{categories.map((category, index) => <a href="#shop" key={category.name} className={`group relative aspect-[0.82] overflow-hidden bg-[#d5cbc0] ${index === 1 ? 'lg:translate-y-8' : ''}`}><img src={category.image} alt={`${category.name} collection`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#221d1a]/70 to-transparent p-4 pt-14"><span className="font-serif text-2xl text-white">{category.name}</span><ArrowRight className="ml-2 inline text-white" size={16} /></div></a>)}</div></div></section>

      <section id="story" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-24 lg:px-12 lg:py-28"><div className="relative aspect-square max-w-md overflow-hidden bg-[#ded5c9]"><img src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=85" alt="A curated clothing rack in a warm boutique" className="h-full w-full object-cover" /><div className="absolute bottom-5 right-5 bg-[#f9f7f2] px-4 py-3"><p className="font-serif text-lg">Wear it well.</p></div></div><div className="max-w-md"><p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b7455]">A little more slowly</p><h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.045em] sm:text-5xl">Every piece is unique.<br /><em className="font-normal text-[#9b7455]">Once it&apos;s gone, it&apos;s gone.</em></h2><p className="mt-6 text-base leading-7 text-[#6f675f]">The Thrift Edit is a small, thoughtful collection of second-hand clothing for people who like their style with a little history. Every piece is hand-picked in Nairobi and ready for its next chapter.</p><a href="#shop" className="mt-8 inline-flex items-center gap-3 border-b border-[#9b7455] pb-2 text-[11px] font-semibold uppercase tracking-[0.17em]">Discover the edit <ArrowRight size={15} /></a></div></section>

      <footer className="bg-[#302b27] px-5 py-12 text-[#e9e2d8] sm:px-8 lg:px-12"><div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]"><div><p className="font-serif text-2xl">The Thrift Edit<span className="text-[#c39b78]">.</span></p><p className="mt-4 max-w-xs text-sm leading-6 text-[#bdb2a6]">One-of-a-kind second-hand finds, thoughtfully selected in Nairobi.</p></div><div><p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-[#aa9a8b]">Explore</p><div className="flex flex-col gap-3 text-sm text-[#ded4c8]"><a href="#shop">Shop all</a><a href="#categories">Categories</a><a href="#story">Our story</a></div></div><div><p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-[#aa9a8b]">Contact</p><div className="flex flex-col gap-3 text-sm text-[#ded4c8]"><a href="https://wa.me/254700000000">WhatsApp us</a><a href="#top">Instagram</a></div></div><div className="border-t border-[#5a514a] pt-6 sm:col-span-2 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"><p className="font-serif text-xl">Good clothes, better stories.</p><p className="mt-3 text-sm leading-6 text-[#bdb2a6]">New pieces land here often. Come back and see what found its way to us.</p><a href="#shop" className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#dcc0a5]">Shop new arrivals <ArrowRight size={14} /></a></div></div><div className="mx-auto mt-12 max-w-7xl border-t border-[#5a514a] pt-5 text-[10px] uppercase tracking-[0.13em] text-[#93867a]">© 2026 The Thrift Edit · Made for the next chapter</div></footer>
    </main>
  )
}

export function AdminPreview() { return <div className="sr-only"><Check /><Shirt /><ShoppingBag /><ChevronDown /></div> }
