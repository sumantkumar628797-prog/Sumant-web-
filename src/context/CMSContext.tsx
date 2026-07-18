import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  AGENCY_BRAND, 
  SERVICES_DATA, 
  PORTFOLIO_PROJECTS, 
  WHY_CHOOSE_US_DATA,
  TESTIMONIALS_DATA, 
  PRICING_PACKAGES, 
  FAQ_DATA 
} from '../data';

export interface CMSData {
  AGENCY_BRAND: typeof AGENCY_BRAND;
  SERVICES_DATA: typeof SERVICES_DATA;
  PORTFOLIO_PROJECTS: typeof PORTFOLIO_PROJECTS;
  WHY_CHOOSE_US_DATA: typeof WHY_CHOOSE_US_DATA;
  TESTIMONIALS_DATA: typeof TESTIMONIALS_DATA;
  PRICING_PACKAGES: typeof PRICING_PACKAGES;
  FAQ_DATA: typeof FAQ_DATA;
}

interface CMSContextType {
  data: CMSData;
  loading: boolean;
  updateData: (key: keyof CMSData, newData: any) => Promise<boolean>;
}

const defaultData: CMSData = {
  AGENCY_BRAND,
  SERVICES_DATA,
  PORTFOLIO_PROJECTS,
  WHY_CHOOSE_US_DATA,
  TESTIMONIALS_DATA,
  PRICING_PACKAGES,
  FAQ_DATA,
};

const CMSContext = createContext<CMSContextType>({
  data: defaultData,
  loading: true,
  updateData: async () => false,
});

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CMSData>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: settingsData, error } = await supabase
          .from('site_settings')
          .select('*');

        if (!error && settingsData && settingsData.length > 0) {
          const newData = { ...defaultData };
          settingsData.forEach(setting => {
            if (setting.content_key in newData) {
              newData[setting.content_key as keyof CMSData] = setting.content_value;
            }
          });
          setData(newData);
        }
      } catch (err) {
        console.error("Error fetching CMS data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const updateData = async (key: keyof CMSData, newData: any) => {
    try {
      setData(prev => ({ ...prev, [key]: newData }));
      
      const { error } = await supabase
        .from('site_settings')
        .upsert({ content_key: key, content_value: newData }, { onConflict: 'content_key' });
        
      if (error) {
        console.error("Supabase update error:", error);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Error updating CMS data:", err);
      return false;
    }
  };

  return (
    <CMSContext.Provider value={{ data, loading, updateData }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
