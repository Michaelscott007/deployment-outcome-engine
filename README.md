# Applied AI / Forward Deployed Engineer — Proof of Work

Interactive proof-of-work by Jainil Trivedi for Applied AI, AI Product Engineering, and Forward Deployed Engineering roles.

## Live scenarios

The site contains five deterministic, company-specific demonstrations:

- `?demo=deployment` — outcome → plan → verification → approval gate
- `?demo=aistudio` — messy operations brief → safe automation workflow
- `?demo=pingaura` — multi-surface AI brand visibility probe
- `?demo=finn` — voice transcript failure analysis → prompt/CRM patch
- `?demo=peakflo` — finance collections prioritization → human-gated action

All demo data and outputs are simulated. They exist to demonstrate system design, product judgment, evaluation logic, safety boundaries, and implementation quality — not to imply customer deployments or fabricated metrics.

## Technical shape

- Dependency-free static frontend
- Deterministic interactive demos
- Explicit human approval boundaries
- Visible evaluation and system traces
- Mobile-responsive UI
- No build step

## Run locally

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

GitHub Pages deployment is defined in `.github/workflows/deploy-pages.yml` and runs on pushes to `main` once Pages is configured to use **GitHub Actions**.

## Contact

Jainil Trivedi  
Email: jainil.planck@gmail.com  
Phone: +91 63548 09722
