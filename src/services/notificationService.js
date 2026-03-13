import { supabase } from '../supabase';

class NotificationService {
  constructor() {
    this.permission = Notification.permission;
    this.settings = null;
    this.onNotificationReceived = null; // Callback for in-app toasts
    this.checkInterval = null;
    this.lastCheckedMinute = null;
    this.user = null;
  }

  async init(user) {
    if (!user) return;
    this.user = user;
    await this.loadSettings();
    // startChecking will be called from App.jsx useEffect
  }

  async loadSettings() {
    try {
      if (!this.user?.id) return;
      
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
      if (!this.user?.id) return false;
      
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

  async checkDeduplication(category, title) {
    if (!this.user?.id) return true;
    
    try {
      const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString();
      const { data, error } = await supabase
        .from('notifications_history')
        .select('id')
        .eq('user_id', this.user.id)
        .eq('category', category)
        .eq('title', title)
        .gte('created_at', twelveHoursAgo)
        .limit(1);

      if (error) {
        console.error('Error checking deduplication:', error);
        return false;
      }

      return data && data.length > 0;
    } catch (err) {
      console.error('Unexpected error in checkDeduplication:', err);
      return false;
    }
  }

  async send(category, title, body, options = {}) {
    // 0. Check settings
    if (!this.settings || !this.settings.enabled) return;
    const catKey = category.toLowerCase() === 'nutrição' ? 'nutricao' : 
                   category.toLowerCase() === 'finanças' ? 'financas' : 
                   category.toLowerCase();
                   
    if (this.settings[catKey] === false) return;

    // 1. Deduplication (12h window)
    const isDuplicate = await this.checkDeduplication(category, title);
    if (isDuplicate) {
      console.log(`[NotificationService] Deduplicated: ${category} - ${title}`);
      return;
    }

    console.log(`[NotificationService] Sending: ${category} - ${title}`);

    // 2. In-app Toast
    if (this.onNotificationReceived) {
      this.onNotificationReceived({ category, title, body, ...options });
    }

    // 3. Browser Native Notification
    if (this.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/logo192.png',
          ...options
        });
      } catch (err) {
        console.error('Error showing browser notification:', err);
      }
    }

    // 4. Save to History
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
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    
    console.log('[NotificationService] Starting scheduler (60s)...');
    this.checkInterval = setInterval(() => {
      const data = getData();
      this.checkScheduledNotifications(data);
    }, 60000);
    
    // Initial check
    setTimeout(() => {
      const data = getData();
      this.checkScheduledNotifications(data);
    }, 2000);
  }

  stopChecking() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
      console.log('[NotificationService] Scheduler stopped.');
    }
  }

  checkScheduledNotifications(data = {}) {
    const { 
      faculdadeData, 
      provas, 
      gymAttendance, 
      financeSummary, 
      sleepData, 
      nutritionTracker,
      haircareHistory 
    } = data;
    
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    const domDay = now.getDate();

    if (this.lastCheckedMinute === currentTime) return;
    this.lastCheckedMinute = currentTime;

    console.log(`[NotificationService] Periodic check at ${currentTime} (Day ${dayOfWeek})`);

    // --- SONO ---
    if (currentTime === '21:30') {
      this.send('Sono', 'Hora de desacelerar 😴', 'Faltam 30 minutos para dormir. Larga o celular em breve.');
    }
    if (currentTime === '22:00') {
      this.send('Sono', 'Hora de dormir 🛌', 'Desliga o celular agora e vai descansar. Amanhã você agradece.');
    }
    if (currentTime === '22:30') {
      const todayStr = now.toISOString().split('T')[0];
      const registeredToday = sleepData?.some(s => s.date === todayStr);
      if (!registeredToday) {
        this.send('Sono', 'Você registrou seu sono? 📋', 'Não esquece de marcar quanto tempo dormiu ontem no HubVida.');
      }
    }
    if (currentTime === '07:00') {
      this.send('Sono', 'Bom dia! ☀️', 'Como foi seu sono? Registra lá no módulo Sono.');
    }
    if (currentTime === '08:00' && sleepData?.length >= 3) {
      const last3 = sleepData.slice(-3);
      const avg = last3.reduce((acc, curr) => acc + (Number(curr.hours) || 0), 0) / 3;
      if (avg < 7) {
        this.send('Sono', 'Seu sono está abaixo do ideal ⚠️', 'Você dormiu menos de 7h nos últimos 3 dias. Prioriza o descanso.');
      }
    }

    // --- ACADEMIA ---
    const workoutDays = [2, 4, 5, 0]; // Ter, Qui, Sex, Dom
    if (workoutDays.includes(dayOfWeek) && currentTime === '16:30') {
      this.send('Academia', 'Dia de treino! 💪', 'Não esquece do treino de hoje. Consistência é tudo.');
    }
    if (workoutDays.includes(dayOfWeek) && currentTime === '21:00') {
      if (gymAttendance && gymAttendance[dayOfWeek] !== 'done') {
        this.send('Academia', 'Você treinou hoje? 👀', 'Não esqueça de registrar seu treino no HubVida.');
      }
    }
    if (dayOfWeek === 1 && currentTime === '08:00') {
      this.send('Academia', 'Nova semana, nova chance 🏆', 'Semana nova começando. Meta: 4 treinos. Você consegue.');
    }

    // --- NUTRIÇÃO ---
    if (currentTime === '08:30') {
      this.send('Nutricao', 'Creatina do dia 🧪', 'Já tomou seus 5g de creatina hoje?');
    }
    const waterHours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
    if (waterHours.includes(currentTime)) {
      this.send('Nutricao', 'Hora da água 💧', 'Bebe uma água agora. Seu corpo agradece.');
    }
    if (currentTime === '12:30') {
      const todayStr = now.toISOString().split('T')[0];
      // Updated nutritionTracker check: it might be an array of entries or an object with meals
      const hasLunch = nutritionTracker?.some?.(m => (m.type === 'Almoço' || m.meal_type === 'Almoço') && m.date === todayStr);
      if (!hasLunch) {
        this.send('Nutricao', 'Não esqueceu do almoço? 🍽️', 'Registra suas refeições no módulo de Nutrição.');
      }
    }
    if (currentTime === '20:00') {
      const todayStr = now.toISOString().split('T')[0];
      const todayMeals = nutritionTracker?.filter?.(m => m.date === todayStr) || [];
      if (todayMeals.length < 2) {
        this.send('Nutricao', 'Alimentação fraca hoje ⚠️', 'Você registrou menos de 2 refeições hoje. Cuida da nutrição!');
      }
    }

    // --- FACULDADE ---
    if (dayOfWeek === 1 && currentTime === '09:00') {
      const hasPendingAS = faculdadeData?.some(d => !d.checks?.as1 || !d.checks?.as2 || !d.checks?.as3 || !d.checks?.as4);
      if (hasPendingAS) {
        this.send('Faculdade', 'AS pendentes esta semana 📚', 'Você tem atividades de sistematização pendentes. Não deixa acumular!');
      }
    }
    if (provas) {
      provas.forEach(prova => {
        const provaDate = new Date(prova.date);
        const diffTime = provaDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const disciplina = prova.name || prova.disciplina || 'disciplina';

        if (currentTime === '08:00') {
          if (diffDays === 3) {
            this.send('Faculdade', 'Prova se aproximando ⏳', `Faltam 3 dias para a prova de ${disciplina}. Já começou a revisar?`);
          } else if (diffDays === 1) {
            this.send('Faculdade', 'Prova AMANHÃ! 🔴', `A prova de ${disciplina} é amanhã. Última revisão hoje!`);
          }
        }
        if (currentTime === '07:00' && diffDays === 0) {
          this.send('Faculdade', 'DIA DE PROVA 🎯', `Hoje é a prova de ${disciplina}. Respira fundo, você está preparado.`);
        }
      });
    }
    if (domDay > 20 && currentTime === '10:00') {
      const totalAS = faculdadeData?.length * 4 || 0;
      const completedAS = faculdadeData?.reduce((acc, curr) => {
        return acc + (curr.checks?.as1 ? 1 : 0) + (curr.checks?.as2 ? 1 : 0) + (curr.checks?.as3 ? 1 : 0) + (curr.checks?.as4 ? 1 : 0);
      }, 0) || 0;
      if (totalAS > 0 && (completedAS / totalAS) < 0.5) {
        this.send('Faculdade', 'Progresso das AS em risco ⚠️', 'Você está com menos de 50% das AS concluídas. Faltam poucos dias!');
      }
    }

    // --- FINANÇAS ---
    if (financeSummary?.income > 0) {
      const usage = (financeSummary.expense / financeSummary.income) * 100;
      if (usage >= 80) {
        this.send('Financas', '⚠️ Gasto Alto', 'Atenção! Você já usou 80% da sua receita este mês.');
      }
    }
    if (financeSummary?.available < 0) {
      this.send('Financas', 'Saldo negativo! 🚨', 'Seu saldo este mês está negativo. Revisa suas despesas agora.');
    }
    if (domDay === 25 && currentTime === '20:00') {
      const monthName = now.toLocaleString('pt-BR', { month: 'long' });
      this.send('Financas', 'Fim do mês chegando 📊', `Faltam poucos dias. Já fechou suas contas de ${monthName}?`);
    }

    // --- HAIRCARE ---
    const haircareProcedure = dayOfWeek === 2 ? 'Nutrição' : 
                             dayOfWeek === 4 ? 'Hidratação' : 
                             dayOfWeek === 0 ? 'Reconstrução + Acidificação' : null;
    
    if (haircareProcedure) {
      if (currentTime === '09:00') {
        this.send('Haircare', 'Dia de cabelo hoje! 💇', `Não esquece: hoje é dia de ${haircareProcedure}.`);
      }
    }
    
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const tomDayOfWeek = tomorrow.getDay();
    const tomProcedure = tomDayOfWeek === 2 ? 'Nutrição' : 
                         tomDayOfWeek === 4 ? 'Hidratação' : 
                         tomDayOfWeek === 0 ? 'Reconstrução' : null;
                         
    if (tomProcedure && currentTime === '10:00') {
      this.send('Haircare', 'Amanhã é dia de cabelo ✂️', `Prepara seus produtos. Amanhã é dia de ${tomProcedure}.`);
    }

    if (haircareHistory?.length > 0) {
      const lastH = new Date(haircareHistory[0].date);
      const diffH = Math.floor((now - lastH) / (1000 * 60 * 60 * 24));
      if (diffH >= 7 && currentTime === '11:00') {
        this.send('Haircare', 'Cadê o cronograma capilar? 👀', 'Faz 7 dias sem registro no Haircare. Tá seguindo o cronograma?');
      }
    }

    // --- GERAL / MOTIVAÇÃO ---
    if (dayOfWeek === 0 && currentTime === '20:00') {
      this.send('Geral', 'Planejamento semanal 📅', 'Amanhã começa uma nova semana. Já planejou seus objetivos?');
    }
    if (dayOfWeek === 5 && currentTime === '18:00') {
      this.send('Geral', 'Review da semana 🔍', 'Como foi sua semana? Abre o HubVida e vê seu progresso.');
    }
  }

  checkAndNotifyTrainingRegistration() {
    window.dispatchEvent(new CustomEvent('hubvida_check_training_reg'));
  }

  checkAndNotifyHaircare(now) {
     window.dispatchEvent(new CustomEvent('hubvida_check_haircare', { detail: { date: now } }));
  }
}

export const notificationService = new NotificationService();
