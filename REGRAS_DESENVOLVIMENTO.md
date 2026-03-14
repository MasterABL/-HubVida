# Regras Permanentes de Desenvolvimento — HubVida

## ANTES DE QUALQUER COMMIT
- [ ] npm run build roda sem erros
- [ ] npx eslint src --ext .jsx,.js retorna 0 erros
- [ ] App abre no navegador sem ErrorBoundary
- [ ] Testado em desktop 1440px e mobile 390px

## ERROS RECORRENTES — NUNCA REPETIR

### 1. Export faltando
ERRADO: function Faculdade() { ... }
CERTO:  export default function Faculdade() { ... }

### 2. Import sem uso (no-unused-vars)
ERRADO: import { Icon, X } from 'lucide-react' (se Icon não for usado)
CERTO:  import { X } from 'lucide-react'

### 3. Object Injection Sink
ERRADO: obj[varDinamica]
CERTO:  obj?.[varDinamica] ou validar com hasOwnProperty

### 4. Hook fora de ordem / useEffect sem cleanup
ERRADO: setInterval sem return () => clearInterval(...)
CERTO:  useEffect(() => { const t = setInterval(...); return () => clearInterval(t) }, [])

### 5. Sidebar some ao rolar
CAUSA:  position não é fixed ou z-index insuficiente
CERTO:  position: fixed; top: 0; left: 0; height: 100vh; z-index: 100;

### 6. Notificações duplicadas
CAUSA:  scheduler registrado sem cleanup no useEffect
CERTO:  verificar se notificação do mesmo tipo já existe nas últimas 12h

### 7. Dados undefined sem tratamento
ERRADO: data.items.map(...)  (se data puder ser null)
CERTO:  data?.items?.map(...) ?? []

## PADRÃO DE COMMIT
git add . && git commit -m "tipo: descrição clara do que foi feito" && git push origin main

## STACK DO PROJETO
- React + Vite + Tailwind CSS v4
- Supabase (Auth + DB)
- Cloudflare Pages (deploy automático via push na main)
- ESLint com security plugin ativado
