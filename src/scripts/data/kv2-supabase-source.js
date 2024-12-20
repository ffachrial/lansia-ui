import CONFIG from "../globals/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

class KV2SupabaseSource {
    static async getPosbinduResidents() {
        try {
            const { data: residents, error } = await supabase
                .from('resident_kv2')
                .select('*')
                .lt('tgl_lahir', new Date(new Date().setFullYear(new Date().getFullYear() - 15)).toISOString().split('T')[0]);

            if (error) {
                throw error;
            }

            return residents;
        } catch (error) {
            console.error('Error getting residents:', error);
            throw error;
        }
    }
    static async getAllResidents() {
        try {
            const { data: residents, error } = await supabase.from('resident_kv2').select('*');
            if (error) throw error;
            return residents;
        } catch (error) {
            console.error('Error getting residents:', error);
            // Provide user feedback here
            return [];
        }
    }

    static async getResidentById(id) {
        try {
            const { data: resident, error } = await supabase
                .from('resident_kv2')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                throw error;
            }

            return resident;
        } catch (error) {
            console.error('Error getting resident:', error);
            throw error;
        }
    }
}

export default KV2SupabaseSource;