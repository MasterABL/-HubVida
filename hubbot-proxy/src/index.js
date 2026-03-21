export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowedOrigins = [
      env.ALLOWED_ORIGIN,
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:4173',
      'http://localhost:4174',
    ].filter(Boolean);

    const isAllowed = allowedOrigins.some(o => origin.startsWith(o));

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': isAllowed ? origin : (env.ALLOWED_ORIGIN || '*'),
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Só aceita POST
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Valida origin
    if (!isAllowed) {
      return new Response('Forbidden', { status: 403 });
    }

    // Valida que a secret existe
    if (!env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Sanitizar — só permite campos esperados, força modelo e limita tokens
    const safeBody = {
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: Math.min(body.max_tokens || 300, 500), // máximo 500 tokens
      system: typeof body.system === 'string' ? body.system.slice(0, 3000) : '',
      messages: Array.isArray(body.messages)
        ? body.messages.slice(0, 10).map(m => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: typeof m.content === 'string' ? m.content.slice(0, 2000) : '',
          }))
        : [],
    };
    
    console.log('[Worker] Body recebido:', JSON.stringify(safeBody));

    // Chamar API Anthropic
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(safeBody),
    });

    const data = await anthropicRes.json();
    console.log('[Worker] Status Anthropic:', anthropicRes.status);
    console.log('[Worker] Resposta Anthropic:', JSON.stringify(data));

    return new Response(JSON.stringify(data), {
      status: anthropicRes.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
      },
    });
  },
};
