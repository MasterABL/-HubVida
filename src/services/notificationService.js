import { supabase } from '../supabase';

class NotificationService {
  constructor() {
    this.permission = Notification.permission;
    this.settings = null;
    this.onNotificationReceived = null; // Callback for in-app toasts
    this.checkInterval = null;
    this.lastCheckedMinute = null;
  }

  async init(user) {
    if (!user) return;
    this.user = user;
    await this.loadSettings();
    this.startChecking();
  }

  async loadSettings() {
    try {
      const { data, error } = await supabase
        .from('user_notification_settings')
        .select('*')
        .eq('user_id', this.user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Settings don't exist, create default
        const { data: newData, error: createError } = await supabase
          .from('user_notification_settings')
          .insert({ user_id: this.user.id })
          .select()
          .single();
        
        if (!createError) this.settings = newData;
      } else if (!error) {
        this.settings = data;
      }
    } catch (err) {
      console.error('Error loading notification settings:', err);
    }
  }

  async updateSettings(updates) {
    try {
      const { data, error } = await supabase
        .from('user_notification_settings')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('user_id', this.user.id)
        .select()
        .single();

      if (!error) {
        this.settings = data;
        return true;
      }
    } catch (err) {
      console.error('Error updating notification settings:', err);
    }
    return false;
  }

  async requestPermission() {
    const permission = await Notification.requestPermission();
    this.permission = permission;
    return permission;
  }

  async send(category, title, body, options = {}) {
    if (!this.settings || !this.settings[category.toLowerCase()] || !this.settings.enabled) {
      // If the specific category or global toggle is disabled, don't send anything
      // Note: Some categories like system might not be in settings, so we should be careful
      if (this.settings && this.settings[category.toLowerCase()] === false) return;
    }

    // 1. In-app Toast
    if (this.onNotificationReceived) {
      this.onNotificationReceived({ category, title, body, ...options });
    }

    // 2. Browser Native Notification
    if (this.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/logo192.png', // Fallback to a default icon
        ...options
      });
    }

    // 3. Save to History
    try {
      if (this.user?.id) {
        await supabase.from('notifications_history').insert({
          user_id: this.user.id,
          category,
          title,
          body
        });
      }
    } catch (err) {
      console.error('Error saving notification to history:', err);
    }
  }

  startChecking(getData) {
    if (this.checkInterval) clearInterval(this.checkInterval);
    
    // Check every minute
    this.checkInterval = setInterval(() => this.checkScheduledNotifications(getData()), 60000);
    this.checkScheduledNotifications(getData()); // Initial check
  }

  checkScheduledNotifications(data = {}) {
    const { faculdadeData, provas } = data;
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    
    if (this.lastCheckedMinute === currentTime) return;
    this.lastCheckedMinute = currentTime;

    const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

    // FACULDADE
    // Lembrete de AS pendente: toda segunda-feira às 09:00
    if (dayOfWeek === 1 && currentTime === '09:00') {
      const hasPendingAS = faculdadeData?.some(d => !d.checks.as1 || !d.checks.as2 || !d.checks.as3 || !d.checks.as4);
      if (hasPendingAS) {
        this.send('Faculdade', '📚 AS Pendentes', 'Você tem AS pendentes esta semana. Não deixa pra última hora!');
      }
    }

    // Lembrete de Prova: 3 dias antes e no dia da prova às 08:00
    if (currentTime === '08:00' && provas) {
      provas.forEach(prova => {
        const provaDate = new Date(prova.date);
        const diffTime = provaDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 3) {
          this.send('Faculdade', '⚠️ Prova em breve', `Prova de ${prova.name} em 3 dias — ${prova.date}`);
        } else if (diffDays === 0) {
          this.send('Faculdade', '🔴 Prova HOJE!', `A prova de ${prova.name} é HOJE! Sucesso.`);
        }
      });
    }

    // ACADEMIA
    // Lembrete de treino no dia (Ter/Qui/Sex/Dom) às 16:30
    const workoutDays = [2, 4, 5, 0];
    const preferredWorkoutTime = this.settings?.hora_treino_lembrete || '16:30';
    if (workoutDays.includes(dayOfWeek) && currentTime === preferredWorkoutTime) {
      this.send('Academia', '💪 Dia de Treino!', 'Upper A te esperando.');
    }
    // Lembrete de registrar treino 22:00
    if (workoutDays.includes(dayOfWeek) && currentTime === '22:00') {
      // Check if registered (this would need app state, maybe pass it in)
      this.checkAndNotifyTrainingRegistration();
    }

    // SONO
    // Lembrete para dormir: todo dia às 21:30
    const sleepTime = this.settings?.hora_dormir || '22:00';
    // Calculate 30 min before
    const [h, m] = sleepTime.split(':').map(Number);
    let remH = h;
    let remM = m - 30;
    if (remM < 0) {
      remM += 60;
      remH -= 1;
    }
    const reminderSleepTime = remH.toString().padStart(2, '0') + ':' + remM.toString().padStart(2, '0');
    
    if (currentTime === reminderSleepTime) {
      this.send('Sono', '😴 Hora de Desacelerar', 'Daqui 30 minutos é hora de dormir.');
    }
    // Lembrete registro sono 07:00
    if (currentTime === '07:00') {
      this.send('Sono', '☀️ Bom dia!', 'Como foi seu sono? Registra lá no HubVida.');
    }

    // NUTRIÇÃO
    // Água a cada 2h entre 08:00 e 20:00
    const waterHours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
    if (waterHours.includes(currentTime)) {
      this.send('Nutricao', '💧 Hora de beber água!', 'Já tomou hoje?');
    }
    // Creatina 08:30
    if (currentTime === '08:30') {
      this.send('Nutricao', '🧪 Creatina do dia', 'Já tomou os 5g?');
    }

    // HAIRCARE
    // Today at 10:00 if wash day
    if (currentTime === '10:00') {
        this.checkAndNotifyHaircare(now);
    }

    // FINANÇAS
    // Dia 28 às 20:00
    if (now.getDate() === 28 && currentTime === '20:00') {
      this.send('Financas', '📊 Fechamento do Mês', 'Faltam poucos dias pro fim do mês. Já fechou as contas?');
    }
  }

  // These methods will be connected to the App state via callbacks or context
  checkAndNotifyTrainingRegistration() {
    // This will be called via a ref or event from App.jsx
    window.dispatchEvent(new CustomEvent('hubvida_check_training_reg'));
  }

  checkAndNotifyHaircare(now) {
     window.dispatchEvent(new CustomEvent('hubvida_check_haircare', { detail: { date: now } }));
  }
}

export const notificationService = new NotificationService();
