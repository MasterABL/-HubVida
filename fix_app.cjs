const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf-8');
app = app.replace(/'hubvida_routinesData'/g, "'hubvida_routines_v2'");
app = app.replace(/icon: (Sun|Bus|Briefcase|BookOpen|FileText|Coffee|Target|Moon|Dumbbell|GraduationCap|Home|MapPin)([,}])/g, "icon: '$1'$2");
fs.writeFileSync('src/App.jsx', app, 'utf-8');
