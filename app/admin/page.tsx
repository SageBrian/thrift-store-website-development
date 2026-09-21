import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, category, size, price_kes, stock_quantity, is_active, updated_at')
    .order('updated_at', { ascending: false })

  return (
    <main className="min-h-screen bg-[#f9f7f2] px-5 py-10 text-[#2c2926] sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between border-b border-[#ded9d0] pb-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b7455]">The Thrift Edit</p>
            <h1 className="mt-2 font-serif text-5xl tracking-[-0.05em]">Inventory</h1>
          </div>
          <a href="/" className="text-[11px] font-semibold uppercase tracking-[0.16em] underline underline-offset-4">View storefront</a>
        </div>
        {error ? <p className="mt-8 text-sm text-red-700">Unable to load inventory.</p> : (
          <div className="mt-8 overflow-x-auto border border-[#ded9d0] bg-white/40">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="border-b border-[#ded9d0] text-[10px] uppercase tracking-[0.16em] text-[#81776d]"><tr><th className="px-5 py-4">Product</th><th className="px-5 py-4">Category</th><th className="px-5 py-4">Size</th><th className="px-5 py-4">Price</th><th className="px-5 py-4">Stock</th><th className="px-5 py-4">Status</th></tr></thead>
              <tbody>{products?.map((product) => <tr key={product.id} className="border-b border-[#ded9d0] last:border-0"><td className="px-5 py-4 font-serif text-lg">{product.name}</td><td className="px-5 py-4">{product.category}</td><td className="px-5 py-4">{product.size}</td><td className="px-5 py-4">KSh {product.price_kes.toLocaleString('en-KE')}</td><td className="px-5 py-4 font-medium">{product.stock_quantity}</td><td className="px-5 py-4">{product.is_active ? 'Active' : 'Hidden'}</td></tr>)}</tbody>
            </table>
          </div>
        )}
        <p className="mt-6 text-xs leading-5 text-[#81776d]">This inventory view is server-only and reads directly from Supabase. Add admin authentication before exposing <code>/admin</code> publicly.</p>
      </div>
    </main>
  )
}
