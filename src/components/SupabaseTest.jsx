import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

export function SupabaseTest() {
  const [data, setData] = useState('Buscando...');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function test() {
      try {
        const { data: fetch, error: fetchError } = await supabase
          .from('app_state')
          .select('chave')
          .limit(5);

        if (fetchError) {
          setError(JSON.stringify(fetchError));
        } else {
          setData(JSON.stringify(fetch));
        }
      } catch (err) {
        setError(String(err));
      }
    }
    test();
  }, []);

  return (
    <div style={{ padding: 20, background: 'black', color: 'lime', zIndex: 9999, position: 'fixed', bottom: 0, left: 0, fontSize: 12 }}>
      <h3>SUPABASE TEST</h3>
      <p>Data: {data}</p>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}
