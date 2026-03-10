const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

// 1. Add Import
if (!content.includes("import { ScrollReveal }")) {
  content = content.replace("import { SplashScreen } from './components/SplashScreen';", "import { SplashScreen } from './components/SplashScreen';\nimport { ScrollReveal } from './components/ScrollReveal';");
}

// 2. Add IntersectionObserver to App
const observerCode = `
  // --- SCROLL SPY (Atualiza Aba Ativa ao rolar a página) ---
  useEffect(() => {
    if (!isAppReady) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    const sections = document.querySelectorAll('.module-section');
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [isAppReady]);
`;

if (!content.includes("SCROLL SPY")) {
  content = content.replace("const [isAppReady, setIsAppReady] = useState(false);", "const [isAppReady, setIsAppReady] = useState(false);\n" + observerCode);
}

// 3. Update the Nav OnClick
const oldNavClick = `onClick={() => {
                setActiveTab(item.name);
                setIsMobileMenuOpen(false); // Fecha o menu no mobile após clicar
              }}`;
const newNavClick = `onClick={() => {
                const element = document.getElementById(item.name);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                setIsMobileMenuOpen(false); // Fecha o menu no mobile após clicar
              }}`;
content = content.replace(oldNavClick, newNavClick);

// 4. Transform the big return block into sequential items.
const oldReturnStart = `{activeTab === 'Visão Geral' ? (`;
const oldReturnEnd = `          )}
        </div>
      </main>`;

const newContentLayout = `
          {/* ALL COMPONENTS RENDERED SEQUENTIALLY FOR SCROLL REVEAL */}
          <div className="space-y-32 pb-32">
            
            <div id="Visão Geral" className="scroll-mt-24 module-section">
              <ScrollReveal delay={50}>
                <VisaoGeral
                  setActiveTab={setActiveTab}
                  englishLevel={englishLevel}
                  financeSummary={financeSummary}
                  activeMonth={activeMonth}
                  routinesData={routinesData}
                  activeRoutine={activeRoutine}
                  visaoGeralMetrics={visaoGeralMetrics}
                  radarData={radarData}
                  avisosPortal={avisosPortal}
                  setAvisosPortal={setAvisosPortal}
                  provas={provas}
                  setProvas={setProvas}
                />
              </ScrollReveal>
            </div>

            <div id="Ph.D. Roadmap" className="scroll-mt-24 module-section">
              <ScrollReveal delay={50}>
                <Roadmap
                  crData={crData}
                  newCr={newCr}
                  setNewCr={setNewCr}
                  handleAddCr={handleAddCr}
                  handleDeleteCr={handleDeleteCr}
                  activeRoadmapTab={activeRoadmapTab}
                  setActiveRoadmapTab={setActiveRoadmapTab}
                  expandedYear={expandedYear}
                  setExpandedYear={setExpandedYear}
                />
              </ScrollReveal>
            </div>

            <div id="Rotina Diária" className="scroll-mt-24 module-section">
              <ScrollReveal delay={50}>
                <Rotina
                  routinesData={routinesData}
                  activeRoutine={activeRoutine}
                  setActiveRoutine={setActiveRoutine}
                  newRoutineTask={newRoutineTask}
                  setNewRoutineTask={setNewRoutineTask}
                  handleAddRoutineTask={handleAddRoutineTask}
                  handleToggleRoutineTask={handleToggleRoutineTask}
                  handleRemoveRoutineTask={handleRemoveRoutineTask}
                  gymAttendance={gymAttendance}
                  setGymAttendance={setGymAttendance}
                />
              </ScrollReveal>
            </div>

            <div id="Nutrição & Base" className="scroll-mt-24 module-section">
              <ScrollReveal delay={50}>
                <Nutricao 
                  dailyTracker={nutritionTracker}
                  setDailyTracker={setNutritionTracker}
                />
              </ScrollReveal>
            </div>

            <div id="Controle de Sono" className="scroll-mt-24 module-section">
              <ScrollReveal delay={50}>
                <Sono 
                   sleepGoal={sleepGoal} setSleepGoal={setSleepGoal}
                   sleepData={sleepData} setSleepData={setSleepData}
                />
              </ScrollReveal>
            </div>

            <div id="Academia (Treino)" className="scroll-mt-24 module-section">
              <ScrollReveal delay={50}>
                <Treino 
                  workoutProfile={workoutProfile}
                  setWorkoutProfile={setWorkoutProfile}
                  workouts={workouts}
                  setWorkouts={setWorkouts}
                />
              </ScrollReveal>
            </div>

            <div id="Brain Dump" className="scroll-mt-24 module-section">
              <ScrollReveal delay={50}>
                <BrainDump 
                  notes={brainDumpNotes}
                  setNotes={setBrainDumpNotes}
                />
              </ScrollReveal>
            </div>

            <div id="Produção Acadêmica" className="scroll-mt-24 module-section">
              <ScrollReveal delay={50}>
                <Producao
                  newProd={newProd}
                  setNewProd={setNewProd}
                  productions={productions}
                  handleAddProduction={handleAddProduction}
                  handleDeleteProduction={handleDeleteProduction}
                  newIdea={newIdea}
                  setNewIdea={setNewIdea}
                  handleAddIdea={handleAddIdea}
                  ideas={ideas}
                  setIdeas={setIdeas}
                />
              </ScrollReveal>
            </div>

            <div id="Competências" className="scroll-mt-24 module-section">
              <ScrollReveal delay={50}>
                <Competencias
                  radarData={radarData}
                  englishLevel={englishLevel}
                  setEnglishLevel={setEnglishLevel}
                  hardSkills={hardSkills}
                  handleUpdateHardSkill={handleUpdateHardSkill}
                  handleRemoveHardSkill={handleRemoveHardSkill}
                  newSkill={newSkill}
                  setNewSkill={setNewSkill}
                  handleAddHardSkill={handleAddHardSkill}
                  softSkills={softSkills}
                  calculateSoftSkillProgress={calculateSoftSkillProgress}
                  handleToggleSoftSkill={handleToggleSoftSkill}
                  englishStreak={englishStreak}
                  setEnglishStreak={setEnglishStreak}
                  habits={habits}
                  setHabits={setHabits}
                />
              </ScrollReveal>
            </div>

            <div id="Faculdade (ADM)" className="scroll-mt-24 module-section">
              <ScrollReveal delay={50}>
                <Faculdade
                  faculdadeData={faculdadeData}
                  expandedSubject={expandedSubject}
                  setExpandedSubject={setExpandedSubject}
                  handleUpdateFaculdade={handleUpdateFaculdade}
                  calculateFinalGrade={calculateFinalGrade}
                />
              </ScrollReveal>
            </div>

            <div id="Finanças" className="scroll-mt-24 module-section">
              <ScrollReveal delay={50}>
                <Financas
                  financeSummary={financeSummary}
                  activeMonth={activeMonth}
                  setActiveMonth={setActiveMonth}
                  currentMonthFinances={currentMonthFinances}
                  handleToggleFinanceStatus={handleToggleFinanceStatus}
                  handleDeleteFinance={handleDeleteFinance}
                  newTransaction={newTransaction}
                  setNewTransaction={setNewTransaction}
                  handleAddTransaction={handleAddTransaction}
                  MONTHS={MONTHS}
                />
              </ScrollReveal>
            </div>

          </div>
        </div>
      </main>`;

const startIndex = content.indexOf(oldReturnStart);
const endIndex = content.indexOf(oldReturnEnd) + oldReturnEnd.length;

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newContentLayout + content.substring(endIndex);
  fs.writeFileSync(appPath, content, 'utf8');
  console.log("SUCCESS");
} else {
  console.log("FAILED to find bounds");
}
