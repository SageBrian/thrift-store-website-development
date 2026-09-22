'use server'

import { revalidatePath } from 'next/cache'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'

const adminClient = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } },
)

async function requireAdmin() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.app_metadata?.is_admin !== true) throw new Error('Admin access required')
  return user
}

function productInput(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  const slug = String(formData.get('slug') ?? '').trim().toLowerCase()
  const category = String(formData.get('category') ?? '').trim()
  const size = String(formData.get('size') ?? '').trim()
  const imageUrl = String(formData.get('image_url') ?? '').trim()
  const badge = String(formData.get('badge') ?? 'New in').trim()
  const priceKes = Number(formData.get('price_kes'))
  const stockQuantity = Number(formData.get('stock_quantity'))
  if (!name || !slug || !category || !size || !imageUrl || !Number.isInteger(priceKes) || priceKes <= 0 || !Number.isInteger(stockQuantity) || stockQuantity < 0) {
    throw new Error('Please provide valid product details')
  }
  return { name, slug, category, size, image_url: imageUrl, badge, price_kes: priceKes, stock_quantity: stockQuantity }
}

export async function createProduct(formData: FormData) {
  await requireAdmin()
  const { error } = await adminClient().from('products').insert(productInput(formData))
  if (error) throw new Error(error.code === '23505' ? 'That slug is already in use' : 'Unable to create product')
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function updateProduct(formData: FormData) {
  await requireAdmin()
  const id = String(formData.get('id') ?? '')
  if (!id) throw new Error('Missing product id')
  const input = productInput(formData)
  const { error } = await adminClient().from('products').update({ ...input, updated_at: new Date().toISOString() }).eq('id', id)
  if (error) throw new Error(error.code === '23505' ? 'That slug is already in use' : 'Unable to update product')
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function toggleProduct(formData: FormData) {
  await requireAdmin()
  const id = String(formData.get('id') ?? '')
  const isActive = String(formData.get('is_active')) === 'true'
  const { error } = await adminClient().from('products').update({ is_active: !isActive, updated_at: new Date().toISOString() }).eq('id', id)
  if (error) throw new Error('Unable to update product status')
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function adjustInventory(formData: FormData) {
  await requireAdmin()
  const productId = String(formData.get('product_id') ?? '')
  const quantityChange = Number(formData.get('quantity_change'))
  const reason = String(formData.get('reason') ?? '').trim()
  if (!productId || !Number.isInteger(quantityChange) || quantityChange === 0 || !reason) throw new Error('Enter a valid inventory adjustment')
  const client = adminClient()
  const { data: product, error: readError } = await client.from('products').select('stock_quantity').eq('id', productId).single()
  if (readError || !product || product.stock_quantity + quantityChange < 0) throw new Error('Adjustment would create invalid stock')
  const { error: movementError } = await client.from('inventory_movements').insert({ product_id: productId, quantity_change: quantityChange, reason })
  if (movementError) throw new Error('Unable to record inventory movement')
  const { error } = await client.from('products').update({ stock_quantity: product.stock_quantity + quantityChange, updated_at: new Date().toISOString() }).eq('id', productId)
  if (error) throw new Error('Unable to update stock')
  revalidatePath('/')
  revalidatePath('/admin')
}
