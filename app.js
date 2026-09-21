const scenarios = {
  deployment: {
    role: 'Forward Deployed Engineer',
    title: 'Outcome → production, without losing control.',
    description: 'A compact orchestration demo for the FDE job: translate an ambiguous outcome into ordered work, enforce verification, and stop at a human approval boundary before shipping.',
    demoTitle: 'Outcome Orchestrator',
    architecture: ['Outcome contract', 'Repo-context plan', 'Sandboxed build', 'Verification gate', 'Human approval', 'Deployment record'],
    inputs: [
      { id: 'outcome', label: 'Customer outcome', type: 'textarea', value: 'Add a self-serve export that lets account admins download the last 90 days of audit events as CSV without exposing another tenant’s data.' },
      { id: 'constraint', label: 'Constraint', type: 'input', value: 'Must preserve tenant isolation and existing API conventions.' }
    ],
    run(values) {
      const clean = values.outcome.trim();
      return [
        ['INTAKE', clean],
        ['PLAN', '1) inspect auth + tenancy middleware  2) add scoped query  3) stream CSV response  4) add admin UI action'],
        ['RISK', 'cross-tenant leakage → require tenant_id at query boundary + authorization test'],
        ['VERIFY', 'unit: query scope ✓  integration: unauthorized tenant ✓  e2e: export flow ✓'],
        ['GATE', 'deployment blocked pending human approval'],
        ['RESULT', 'working change-set is reviewable; production remains untouched'],
        ['SCORE', 'verification coverage: 6 / 6 checks passed']
      ];
    }
  },
  aistudio: {
    role: 'Forward Deployed Engineer',
    title: 'Turn a vague operations complaint into a working automation.',
    description: 'The hard part is not the prompt. It is discovering the real workflow, identifying irreversible actions, choosing the right automation boundary and leaving an audit trail the client can understand.',
    demoTitle: 'Messy Brief → Workflow',
    architecture: ['Discovery parser', 'Decision model', 'Tool boundary', 'Exception queue', 'Audit trace', 'Operator review'],
    inputs: [
      { id: 'brief', label: 'Messy client brief', type: 'textarea', value: 'Our ops team spends hours reading inbound vendor emails, checking whether the invoice has a PO, asking for missing details, then updating the tracker. Can AI just handle it?' },
      { id: 'system', label: 'System of record', type: 'input', value: 'Google Sheets + email inbox' }
    ],
    run(values) {
      return [
        ['DISCOVER', 'intent: vendor-invoice triage; hidden dependency: PO existence + completeness rules'],
        ['AUTOMATE', 'classify email → extract fields → check PO reference → draft response → update tracker'],
        ['HUMAN', 'hold invoices with missing/ambiguous PO, duplicate invoice number or bank-detail changes'],
        ['TOOLS', `${values.system || 'system of record'} + structured extraction + deterministic validation`],
        ['EVAL', 'field extraction accuracy, false auto-approval rate, exception precision, time-to-resolution'],
        ['RESULT', 'AI handles reversible preparation; operator keeps control of risky actions']
      ];
    }
  },
  pingaura: {
    role: 'AI Product Engineer',
    title: 'Measure AI visibility instead of hand-waving about it.',
    description: 'A miniature answer-surface observability loop: run a buyer question across multiple model surfaces, normalize brand mentions, compare positioning and produce an auditable recommendation.',
    demoTitle: 'AI Visibility Probe',
    architecture: ['Prompt set', 'Provider router', 'Response normalizer', 'Mention classifier', 'Eval trace', 'Recommendation layer'],
    inputs: [
      { id: 'brand', label: 'Brand', type: 'input', value: 'AcmeFlow' },
      { id: 'question', label: 'Buyer question', type: 'textarea', value: 'What are good tools for automating invoice follow-up for a 100-person finance team?' }
    ],
    run(values) {
      const brand = (values.brand || 'Brand').trim();
      return [
        ['QUERY', values.question.trim()],
        ['GPT', `${brand}: mentioned #4 · reason: workflow automation · evidence: weak`],
        ['GEMINI', `${brand}: not mentioned · competitors dominate category framing`],
        ['CLAUDE', `${brand}: mentioned #3 · reason: finance ops fit · evidence: medium`],
        ['NORMALIZE', '2 / 3 surfaces mention brand; average prominence = 3.5'],
        ['GAP', 'category association exists, but proof/citation density is inconsistent'],
        ['ACTION', 'publish one evidence-heavy use-case page + comparison page targeted to buyer query cluster'],
        ['SCORE', 'surface visibility: 67% · evidence confidence: 52%']
      ];
    }
  },
  finn: {
    role: 'Forward Deployed Engineer',
    title: 'Debug the call, patch the agent, preserve the CRM truth.',
    description: 'A voice-agent deployment loop using transcript evidence: identify why the call failed, separate prompt problems from integration problems, produce a patch and measure whether the new behaviour improves.',
    demoTitle: 'Voice Agent Debugger',
    architecture: ['Transcript parser', 'Failure classifier', 'Prompt patch', 'CRM extractor', 'Regression eval', 'Deployment note'],
    inputs: [
      { id: 'transcript', label: 'Call transcript', type: 'textarea', value: 'Agent: Your payment is overdue. Can you pay today?\nCustomer: I already paid on Friday. UTR is 834921.\nAgent: I understand. Can you make the payment today?\nCustomer: I just told you I paid.' },
      { id: 'goal', label: 'Deployment goal', type: 'input', value: 'Do not chase customers who provide proof of payment.' }
    ],
    run(values) {
      return [
        ['FAILURE', 'agent ignored payment-proof intent and continued collection branch'],
        ['CAUSE', 'prompt policy missing explicit branch + no extraction-to-CRM guard'],
        ['EXTRACT', 'payment_status=claimed_paid · utr=834921 · follow_up=verification_required'],
        ['PATCH', 'when user claims payment + provides reference → acknowledge, stop collection ask, trigger verification workflow'],
        ['REGRESSION', 'test: paid claim ✓  partial payment ✓  refusal ≠ paid claim ✓  no UTR → request proof ✓'],
        ['BEFORE', 'conversation-policy score: 41 / 100'],
        ['AFTER', 'simulated patched-policy score: 92 / 100']
      ];
    }
  },
  peakflo: {
    role: 'Forward Deployed Engineer',
    title: 'Give finance teams an agent that knows when not to send.',
    description: 'A collections workflow demo: prioritize overdue accounts, propose the next action, generate a context-aware draft and stop sensitive or contradictory cases at an approval gate.',
    demoTitle: 'Collections Copilot',
    architecture: ['Ledger ingest', 'Priority rules', 'Context retrieval', 'Action proposal', 'Approval gate', 'Audit log'],
    inputs: [
      { id: 'ledger', label: 'Sample ledger', type: 'textarea', value: 'Northstar Ltd | ₹4,80,000 | 24 days overdue | disputed\nKiteWorks | ₹1,20,000 | 18 days overdue | promise-to-pay missed\nMosaic Labs | ₹7,40,000 | 6 days overdue | no dispute' },
      { id: 'policy', label: 'Policy', type: 'input', value: 'Never auto-send on disputed invoices.' }
    ],
    run(values) {
      return [
        ['INGEST', '3 accounts parsed · total overdue ₹13,40,000'],
        ['PRIORITY', '1) KiteWorks: missed promise  2) Mosaic Labs: high value  3) Northstar: dispute hold'],
        ['ACTION', 'KiteWorks → draft firm follow-up referencing missed commitment; require approval before send'],
        ['HOLD', 'Northstar → no collection message; route dispute context to operator'],
        ['POLICY', values.policy.trim()],
        ['AUDIT', 'source rows + chosen rule + draft + reviewer state recorded'],
        ['SCORE', 'unsafe auto-send checks: 0 triggered']
      ];
    }
  }
};

let active = 'deployment';
const roleEl = document.getElementById('scenarioRole');
const titleEl = document.getElementById('scenarioTitle');
const descEl = document.getElementById('scenarioDescription');
const architectureEl = document.getElementById('architecture');
const demoTitleEl = document.getElementById('demoTitle');
const inputsEl = document.getElementById('demoInputs');
const resultEl = document.getElementById('resultConsole');
const runButton = document.getElementById('runDemo');

function renderScenario(key) {
  active = key;
  const s = scenarios[key];
  roleEl.textContent = s.role;
  titleEl.textContent = s.title;
  descEl.textContent = s.description;
  demoTitleEl.textContent = s.demoTitle;
  architectureEl.innerHTML = s.architecture.map(item => `<div class="arch-pill">${item}</div>`).join('');
  inputsEl.innerHTML = s.inputs.map(field => {
    const safe = field.value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
    return `<div class="demo-field"><label for="${field.id}">${field.label}</label>${field.type === 'textarea' ? `<textarea id="${field.id}">${safe}</textarea>` : `<input id="${field.id}" value="${safe}" />`}</div>`;
  }).join('');
  resultEl.innerHTML = '<div class="console-empty">Edit the input, then run the demonstration.</div>';
  document.querySelectorAll('.company-tab').forEach(btn => btn.classList.toggle('active', btn.dataset.company === key));
  const u = new URL(window.location.href);
  u.searchParams.set('demo', key);
  history.replaceState({}, '', u);
}
function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function runScenario() {
  const s = scenarios[active];
  const values = {};
  for (const field of s.inputs) values[field.id] = document.getElementById(field.id).value;
  runButton.disabled = true;
  runButton.innerHTML = 'Running system <span>···</span>';
  resultEl.innerHTML = '<div class="console-line"><span class="console-key">TRACE</span><span class="console-muted">initializing deterministic demo pipeline…</span></div>';
  setTimeout(() => {
    const lines = s.run(values);
    resultEl.innerHTML = lines.map(([k,v]) => `<div class="console-line"><span class="console-key">${escapeHtml(k)}</span><span>${escapeHtml(v)}</span></div>`).join('') + '<span class="console-score">DEMO COMPLETE</span>';
    runButton.disabled = false;
    runButton.innerHTML = 'Run again <span>↗</span>';
  }, 520);
}
document.querySelectorAll('.company-tab').forEach(btn => btn.addEventListener('click', () => renderScenario(btn.dataset.company)));
runButton.addEventListener('click', runScenario);
document.getElementById('copyLink').addEventListener('click', async (e) => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    const old = e.currentTarget.textContent;
    e.currentTarget.textContent = 'Copied';
    setTimeout(() => e.currentTarget.textContent = old, 1200);
  } catch {
    e.currentTarget.textContent = 'Copy unavailable';
  }
});
const requested = new URLSearchParams(window.location.search).get('demo');
renderScenario(scenarios[requested] ? requested : active);
