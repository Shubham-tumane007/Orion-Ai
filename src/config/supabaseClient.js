import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rdjvvosnivlbtqftiapq.supabase.co'
const supabaseKey = 'sb_publishable_fIRDDzdZ_j75kT2KMWbN1w_sVk6m1kF'
export const supabase = createClient(supabaseUrl, supabaseKey)
