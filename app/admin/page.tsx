import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'
import { adjustInventory, createProduct, toggleProduct, updateProduct } from './actions'

export const dynamic = 'force-dynamic'

const money = (value: number) => `KSh ${value.toLocaleString('en-KE')}`

export default async function AdminPage() {
  const sessionClient = await createServerClient()
  const { data: { user } } = await sessionClient.auth.getUser()
  const isAdmin = user?.app_metadata?.is_admin === true

  if (!user || !isAdmin) {
    return (
      <main className="min-h-screen bg-[#f9f7f2] px-5 py-16 text-[#2c2926] sm:px-10">
        <div className="mx-auto max-w-lg border border-[#ded9d0] bg-white/50 p-8 sm:p-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b7455]">The Thrift Edit</p>
          <h1 className="mt-3 font-serif text-4xl tracking-[-0.05em]">Admin access required</h1>
          <p className="mt-4 text-sm leading-6 text-[#6f675f]">Sign in with an approved admin account to manage products and stock. Admin access is controlled by the Supabase user app metadata flag <code>is_admin</code>.</p>
          <a href="/" className="mt-8 inline-flex bg-[#302b27] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f9f7f2]">Return to storefront</a>
        </div>
      </main>
    )
  }

  const adminClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { autoRefreshToken: false, persistSession: false } })
  const { data: products, error } = await adminClient.from('products').select('id, name, slug, category, size, price_kes, image_url, badge, stock_quantity, is_active, updated_at').order('updated_at', { ascending: false })

  return (
    <main className="min-h-screen bg-[#f9f7f2] px-5 py-10 text-[#2c2926] sm:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-end justify-between gap-5 border-b border-[#ded9d0] pb-6">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b7455]">The Thrift Edit</p><h1 className="mt-2 font-serif text-5xl tracking-[-0.05em]">Inventory</h1><p className="mt-2 text-sm text-[#81776d]">Signed in as {user.email}</p></div>
          <a href="/" className="text-[11px] font-semibold uppercase tracking-[0.16em] underline underline-offset-4">View storefront</a>
        </header>

        <section className="mt-8 border border-[#ded9d0] bg-white/40 p-5 sm:p-7">
          <h2 className="font-serif text-2xl">Add a product</h2>
          <form action={createProduct} className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <input name="name" required placeholder="Product name" className="border border-[#cfc6bb] bg-transparent px-3 py-3 text-sm outline-none" />
            <input name="slug" required placeholder="slug-name" className="border border-[#cfc6bb] bg-transparent px-3 py-3 text-sm outline-none" />
            <input name="category" required placeholder="Category" className="border border-[#cfc6bb] bg-transparent px-3 py-3 text-sm outline-none" />
            <input name="size" required placeholder="Size" className="border border-[#cfc6bb] bg-transparent px-3 py-3 text-sm outline-none" />
            <input name="price_kes" required type="number" min="1" placeholder="Price (KES)" className="border border-[#cfc6bb] bg-transparent px-3 py-3 text-sm outline-none" />
            <input name="stock_quantity" required type="number" min="0" placeholder="Stock" className="border border-[#cfc6bb] bg-transparent px-3 py-3 text-sm outline-none" />
            <input name="badge" defaultValue="New in" placeholder="Badge" className="border border-[#cfc6bb] bg-transparent px-3 py-3 text-sm outline-none" />
            <input name="image_url" required type="url" placeholder="Image URL" className="border border-[#cfc6bb] bg-transparent px-3 py-3 text-sm outline-none" />
            <button className="bg-[#302b27] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f9f7f2] sm:col-span-2 lg:col-span-4 lg:justify-self-start">Add product</button>
          </form>
        </section>

        {error ? <p className="mt-8 text-sm text-red-700">Unable to load inventory.</p> : <section className="mt-8 overflow-x-auto border border-[#ded9d0] bg-white/40"><table className="w-full min-w-[1050px] text-left text-sm"><thead className="border-b border-[#ded9d0] text-[10px] uppercase tracking-[0.16em] text-[#81776d]"><tr><th className="px-4 py-4">Product</th><th className="px-4 py-4">Category / size</th><th className="px-4 py-4">Price</th><th className="px-4 py-4">Stock</th><th className="px-4 py-4">Status</th><th className="px-4 py-4">Actions</th></tr></thead><tbody>{products?.map((product) => <tr key={product.id} className="border-b border-[#ded9d0] align-top last:border-0"><td className="px-4 py-4"><p className="font-serif text-lg">{product.name}</p><p className="mt-1 text-xs text-[#81776d]">{product.slug}</p></td><td className="px-4 py-4">{product.category} · {product.size}</td><td className="px-4 py-4">{money(product.price_kes)}</td><td className="px-4 py-4 font-medium">{product.stock_quantity}</td><td className="px-4 py-4">{product.is_active ? 'Active' : 'Hidden'}</td><td className="px-4 py-4"><div className="flex flex-col gap-3"><form action={adjustInventory} className="flex gap-2"><input type="hidden" name="product_id" value={product.id} /><input name="quantity_change" required type="number" step="1" placeholder="+/-" className="w-16 border border-[#cfc6bb] bg-transparent px-2 py-2 text-sm" /><input name="reason" required placeholder="Reason" className="w-32 border border-[#cfc6bb] bg-transparent px-2 py-2 text-sm" /><button className="border border-[#302b27] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em]">Adjust</button></form><form action={toggleProduct}><input type="hidden" name="id" value={product.id} /><input type="hidden" name="is_active" value={String(product.is_active)} /><button className="text-left text-[10px] font-semibold uppercase tracking-[0.13em] text-[#9b7455] underline underline-offset-4">{product.is_active ? 'Hide product' : 'Publish product'}</button></form><details><summary className="cursor-pointer text-[10px] font-semibold uppercase tracking-[0.13em]">Edit details</summary><form action={updateProduct} className="mt-3 grid gap-2"><input type="hidden" name="id" value={product.id} /><input name="name" required defaultValue={product.name} className="border border-[#cfc6bb] bg-transparent px-2 py-2 text-sm" /><input name="slug" required defaultValue={product.slug} className="border border-[#cfc6bb] bg-transparent px-2 py-2 text-sm" /><div className="grid grid-cols-2 gap-2"><input name="price_kes" required type="number" min="1" defaultValue={product.price_kes} className="border border-[#cfc6bb] bg-transparent px-2 py-2 text-sm" /><input name="stock_quantity" required type="number" min="0" defaultValue={product.stock_quantity} className="border border-[#cfc6bb] bg-transparent px-2 py-2 text-sm" /></div><input name="category" required defaultValue={product.category} className="border border-[#cfc6bb] bg-transparent px-2 py-2 text-sm" /><input name="size" required defaultValue={product.size} className="border border-[#cfc6bb] bg-transparent px-2 py-2 text-sm" /><input name="badge" required defaultValue={product.badge} className="border border-[#cfc6bb] bg-transparent px-2 py-2 text-sm" /><input name="image_url" required type="url" defaultValue={product.image_url} className="border border-[#cfc6bb] bg-transparent px-2 py-2 text-sm" /><button className="bg-[#302b27] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#f9f7f2]">Save changes</button></form></details></div></td></tr>)}</tbody></table></section>}
        <p className="mt-6 text-xs leading-5 text-[#81776d]">Inventory adjustments are recorded in an immutable movement log. Product mutations are server-side and require an authenticated Supabase user with <code>app_metadata.is_admin = true</code>.</p>
      </div>
    </main>
  )
}
