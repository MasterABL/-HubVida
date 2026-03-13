import { supabase } from '../src/supabase.js';

async function checkTables() {
  console.log('Checking tables...');
  
  const { data: settingsData, error: settingsError } = await supabase
    .from('user_notification_settings')
    .select('*')
    .limit(1);

  if (settingsError) {
    console.error('Error fetching user_notification_settings:', settingsError.message);
  } else {
    console.log('user_notification_settings table exists.');
  }

  const { data: historyData, error: historyError } = await supabase
    .from('notifications_history')
    .select('*')
    .limit(1);

  if (historyError) {
    console.error('Error fetching notifications_history:', historyError.message);
  } else {
    console.log('notifications_history table exists.');
  }
}

checkTables();
