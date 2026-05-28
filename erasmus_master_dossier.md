# Erasmus+ Master Research Dossier & Continuation Prompt

This document serves as both a **comprehensive research analysis** of the Erasmus+ options for Porto (Portugal) and Lleida (Spain), and a **State Continuation Prompt** for the Antigravity agent system to maintain its train of thought and resume work seamlessly without losing context.

---

## 🔁 Part 1: Antigravity Continuation System Prompt
*If execution times out or restarts, the next agent must read this block first to align on history, state, and tasks.*

```markdown
=========================================
SYSTEM STATE: CONTINUATION PROMPT
=========================================
ROLE:
You are Antigravity, an elite combined Academic Advisor, Web Developer, Relocation Specialist, and DevOps Engineer.

USER PROFILE:
- Name: Eren Ozturk
- Major: BSc Informatics (PEF, CZU Prague)
- Current Location: Prague, Czech Republic (Non-EU Passport Holder with CZ Student Residence Permit)
- Email: hostiliann@gmail.com
- Professional Background: Working software developer & data analyst
- Key Lifestyle Interests: Climbing & indoor/outdoor bouldering
- Travel Companion: Relocating with a pet cat

TARGET UNIVERSITIES (WINTER SEMESTER STUDY MOBILITY):
1. Primary Match: Universidade Portucalense (UPT) — Porto, Portugal
2. Secondary Match: Universitat de Lleida (UdL) — Lleida, Spain

WORKSPACE PATHS:
- Directory: c:/Users/Hostilian/Downloads/erasmus
- Course Mapping (UdL): [lleida_course_alternatives.md](file:///c:/Users/Hostilian/Downloads/erasmus/lleida_course_alternatives.md)
- Main Dossier: [erasmus_master_dossier.md](file:///c:/Users/Hostilian/Downloads/erasmus/erasmus_master_dossier.md)
- Letter Generator: [generate_docx_letters.py](file:///c:/Users/Hostilian/Downloads/erasmus/generate_docx_letters.py)

RESOLVED PROGRESS:
1. Complete analysis of UPT (Porto) and UdL (Lleida) course catalogs done.
2. Financial rates, accommodation costs, climbing gym locations, travel logistics, and cat relocation requirements have been fully researched.
3. Draft email for PEF Outgoing Coordinator (Veronika Brecklová) is generated.

NEXT TASKS IN PIPELINE:
1. Wait for user feedback on the research and email draft.
2. Edit `generate_docx_letters.py` to add custom motivation letter generators for Porto (UPT) and Lleida (UdL), linking Eren's background in software engineering, bouldering, and cat travel into the text.
3. Run the generator script to create the final `.docx` letters.
4. Support the student in finalizing and submitting their application portfolio.
=========================================
```

---

## 📊 Part 2: Comparative Erasmus+ Analysis

### 1. Academic Course Mapping

#### Porto — Universidade Portucalense (UPT)
*   **Department/Faculty:** Department of Science and Technology (Informatics Engineering / Information Systems for Management).
*   **Language of Instruction:** English supported (study materials, exams, and projects in English; classes may have mixed teaching but professors adapt to English).
*   **Course Matching (All 4 available in Winter Semester):**
    1.  **Operating Systems:** *Sistemas Operativos* (2nd Year, 1st Sem). Focuses on CPU scheduling, memory management, and shell environments.
    2.  **Web Technologies:** *Tecnologias Web* (2nd Year, 1st Sem). Focuses on full-stack web development, client/server models.
    3.  **Statistics:** *Estatística e Análise de Dados* OR *Técnicas Estatísticas* (1st/2nd Year, 1st Sem). Focuses on probability, regression, and data tools.
    4.  **Accounting:** *Contabilidade Geral* (1st Year, 1st Sem). Taught under the Department of Economics & Management (Cross-department selection is permitted).
*   **Verdict:** UPT offers a **100% clean fit** for the Winter semester without requiring alternative course substitutions.

#### Lleida — Universitat de Lleida (UdL)
*   **Department/Faculty:** Escola Politècnica Superior (EPS) for Informatics; Facultat de Dret, Economia i Turisme (FDET) for Accounting/ADE.
*   **Language of Instruction:** Catalan/Spanish, with limited English-taught options. Professors permit exams/projects in English.
*   **Course Matching (Required Winter Alternatives):**
    1.  **Operating Systems:** *Sistemes Operatius* (9 ECTS, Winter, EPS) OR *Administració i Manteniment de Sistemes i Aplicacions* (6 ECTS, Winter, EPS).
    2.  **Web Technologies:** *Projecte Web* is Spring-only. **Winter Alternatives:** *Web dinàmica* (6 ECTS, Winter, EPS - Digital Design) OR *Disseny Centrat en l'Usuari* (6 ECTS, Winter, EPS - UX/UI focus).
    3.  **Statistics:** *Estadística i Optimització* is Spring-only. **Winter Alternative:** *Estadística Avançada* (6 ECTS, Winter, FDET - Business Administration).
    4.  **Accounting:** *Fonaments de Comptabilitat* (6 ECTS, Winter, FDET).
*   **Verdict:** UdL requires coordinator approval for the Web Tech and Statistics alternatives, but it is highly feasible since they are within the same schools.

---

### 2. Financial Breakdown (Grant vs. Cost of Living)

*   **Erasmus+ Monthly Base Grant (CZU to Spain/Portugal):** **€600 / month**
*   **Green Travel Top-Up:** **€50** one-time + up to 4 days of additional travel grant if traveling by train/bus.
*   **Social/Fewer Opportunities Top-Up:** **€250 / month** (if criteria are met).

#### Cost of Living & Net Balances

| Monthly Category | Porto, Portugal (T0 Studio) | Porto, Portugal (Shared Flat) | Lleida, Spain (T0 Studio) | Lleida, Spain (Shared Flat) |
| :--- | :---: | :---: | :---: | :---: |
| **Rent** | €600 – €900 | €300 – €600 | €360 – €450 | €200 – €375 |
| **Utilities & Net** | €130 – €170 | €60 – €100 (Shared) | €138 – €185 | €60 – €90 (Shared) |
| **Groceries** | €200 – €300 | €200 – €300 | €200 – €300 | €200 – €300 |
| **Climbing Pass** | €40 – €50 | €40 – €50 | €38 – €45 | €38 – €45 |
| **Public Transport** | €30 – €40 | €30 – €40 | €20 – €30 | €20 – €30 |
| **Total Expenses** | **€1,000 – €1,460** | **€630 – €1,090** | **€756 – €1,010** | **€518 – €840** |
| **Erasmus Grant** | +€600 | +€600 | +€600 | +€600 |
| **Net Monthly Balance** | **-€400 to -€860** | **-€30 to -€490** | **-€156 to -€410** | **+€82 to -€240** |

*   **Economic Verdict:** **Lleida is significantly cheaper.** Sharing a flat in Lleida is the only option where the Erasmus grant can cover your entire rent and nearly all grocery expenses (giving you a +€82 surplus to a small -€240 deficit). Porto will require significant personal savings to supplement the grant, especially if you opt for a private studio (T0).

---

### 3. Pet Relocation (Prague to Destination)

Traveling with your cat within the EU requires matching veterinary standards. Because you are traveling within the EU (Czech Republic to Spain/Portugal), no quarantine is needed if rules are met:

*   **Veterinary Checklist:**
    1.  **ISO Microchip:** Compliant with ISO 11784/11785. *Must be inserted before the rabies vaccine.*
    2.  **EU Pet Passport:** Issued by your local Prague veterinarian, showing microchip ID and owner details.
    3.  **Active Rabies Vaccine:** Must be administered *at least 21 days* prior to boarding.
    4.  *No Echinococcus (tapeworm) treatment is required for cats entering Spain or Portugal.*

*   **Airline & Transport Selection:**

| Airline | Route Focus | In-Cabin Weight Limit (Pet+Carrier) | Carrier Maximum Dimensions | Pet Fee (Approx.) |
| :--- | :--- | :---: | :---: | :---: |
| **Vueling** | Prague to Barcelona (Direct) | **10 kg (22 lbs)** — *Best for larger cats* | 45 x 39 x 21 cm (soft-sided) | €50 – €60 |
| **TAP Portugal** | Prague to Lisbon/Porto | **8 kg (17 lbs)** | 45 x 30 x 23 cm (soft-sided) | €70 |
| **Iberia** | Prague to Madrid/Barcelona | **8 kg (17 lbs)** | 45 x 35 x 25 cm (soft-sided) | €50 |

*   **Lleida Connection Tip:** Fly Prague to Barcelona (BCN) with Vueling (taking advantage of their generous 10kg cabin limit), and then take the high-speed AVE/Renfe train directly to Lleida-Pirineus (1 hour 15 mins, €10–€50). Cats are allowed on Renfe trains in a carrier.
*   **Porto Connection Tip:** Fly Prague to Porto (OPO) via TAP Air Portugal or Lufthansa (8kg limit).

---

### 4. Climbing & Bouldering Scene

#### Porto, Portugal (Indoor Focused)
*   **Indoor Gyms:** 
    *   *São Rock Climbing:* Near Campanhã metro station, very popular among international students, cooperative community events.
    *   *Proa Climbing Center:* Modern bouldering area with top-tier route setting.
    *   *The North Wall* & *Zone Climb:* Solid, social gyms with varied grade options.
*   **Outdoor Access:** Limited nearby. You will need to travel north towards Braga/Galicia or east to inland national parks (e.g. Serra da Estrela) for real rock.

#### Lleida, Spain (Outdoor Sport Climbing Capital)
*   **Indoor Gyms:**
    *   *Boulder Indoor:* Massive 1,700 m² training facility with lead climbing (up to 12 meters) and high-quality bouldering. Monthly membership is only **€38 – €45**, making it exceptionally cheap.
    *   *FANATIC:* Dedicated bouldering wall.
*   **Outdoor Crags (World-Class):** Lleida is a global climbing mecca. Within a 30 to 60-minute drive, you have access to:
    *   *Santa Linya & Oliana:* Famous for historic hard routes.
    *   *Terradets & Camarasa:* Incredible multi-pitch and single-pitch limestone sport routes.
    *   *El Cogul:* Top-tier local bouldering sector on sandstone.
    *   *Margalef & Siurana:* World-famous sectors just south in the Tarragona province.

---

### 5. Non-EU Visa & Student Mobility (Directive 2016/801)

Since you hold a Turkish passport with a valid Czech student residence permit, you are protected under **Intra-EU Student Mobility (EU Directive 2016/801)**:

*   **How it Works:** You do not need to apply for a brand-new national visa from scratch in Prague. Instead, you are allowed to study in Spain or Portugal for up to 360 days under your existing Czech residency, but **formal notification is mandatory**.
*   **Spain Procedure:** The Universitat de Lleida's International Relations Office (ORI) must submit a notification of mobility (*Autorización de movilidad de alumnos de la Unión Europea*) to the Spanish Delegation of Government (*Delegación del Gobierno*) at least 1 month before your arrival.
*   **Portugal Procedure:** The Universidade Portucalense (UPT) must notify the Portuguese Agency for Integration, Migration and Asylum (AIMA) regarding your mobility. You may also need to register your presence with AIMA/police within 30 days of arrival.
*   **Next Action:** Once nominated, you must immediately contact the host university’s international office to request that they initiate the **Directive 2016/801 student mobility notification** on your behalf.
