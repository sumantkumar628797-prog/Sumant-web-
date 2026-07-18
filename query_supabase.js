import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://epzfiabwelmcpdlnnpwu.supabase.co', 'sb_publishable_KnNt3CWIV-MPKsWEciMZ1A_mEECIq1g');
async function run() {
  const { data, error } = await supabase.from('bookings').select('*');
  console.log(data, error);
}
run();
