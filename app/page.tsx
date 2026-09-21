import { ThriftEditHome } from '@/components/thrift-edit-home'
import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('id, name, category, size, price_kes, image_url, badge, stock_quantity')
    .eq('is_active', true)
    .gt('stock_quantity', 0)
    .order('created_at', { ascending: false })

  return <ThriftEditHome products={data ?? []} />
}
