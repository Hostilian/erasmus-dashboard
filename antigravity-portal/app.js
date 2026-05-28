document.addEventListener('DOMContentLoaded', () => {
  // Application Data States
  let researchData = null;
  let coursesData = null;
  let selectedCourses = new Set();
  let selectedUniversity = 'UPT Porto';
  
  // Navigation & Tab Switching
  const navButtons = document.querySelectorAll('nav button, .btn, .cta-buttons button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  function switchTab(tabId) {
    // Update Nav Buttons
    document.querySelectorAll('nav button').forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    // Update Tab Panes
    tabPanes.forEach(pane => {
      if (pane.id === tabId) {
        pane.classList.add('active');
        // If switching to simulator, trigger resize/init
        if (tabId === 'simulator') {
          setTimeout(initSimulator, 50);
        }
      } else {
        pane.classList.remove('active');
      }
    });
  }
  
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      if (tabId) switchTab(tabId);
    });
  });

  // Fetch and Populate Databases
  async function loadDatabases() {
    try {
      const [resResponse, coursesResponse] = await Promise.all([
        fetch('research.json'),
        fetch('courses.json')
      ]);
      
      researchData = await resResponse.json();
      coursesData = await coursesResponse.json();
      
      populateResearchDossier();
      populateAcademicPathway();
      initCostCalculator();
      initChecklist();
    } catch (error) {
      console.error("Error loading research/courses database:", error);
    }
  }

  // Populate Research Dossier
  function populateResearchDossier() {
    const dossierNav = document.getElementById('dossier-nav-list');
    const dossierContent = document.getElementById('dossier-active-content');
    
    if (!researchData || !dossierNav || !dossierContent) return;
    
    const sections = [
      { id: 'acad', title: 'Academic Mapping', data: researchData.academics, type: 'acad' },
      { id: 'fin', title: 'Grants & Finances', data: researchData.finances, type: 'fin' },
      { id: 'visa', title: 'Immigration & Visa', data: researchData.visa, type: 'visa' },
      { id: 'house', title: 'Student Housing', data: researchData.housing, type: 'house' },
      { id: 'pet', title: 'Pet Relocation', data: researchData.pet_travel, type: 'pet' },
      { id: 'climb', title: 'Climbing Scene', data: researchData.climbing, type: 'climb' },
      { id: 'lit', title: 'Legal & Lit Citations', data: researchData.literature, type: 'lit' }
    ];
    
    dossierNav.innerHTML = '';
    sections.forEach((sec, idx) => {
      const btn = document.createElement('button');
      btn.textContent = sec.title;
      btn.className = idx === 0 ? 'active' : '';
      btn.addEventListener('click', () => {
        dossierNav.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderDossierSection(sec);
      });
      dossierNav.appendChild(btn);
    });
    
    // Render first section by default
    renderDossierSection(sections[0]);
  }

  function renderDossierSection(sec) {
    const wrapper = document.getElementById('dossier-active-content');
    if (!wrapper) return;
    wrapper.innerHTML = '';
    
    const h2 = document.createElement('h2');
    h2.className = 'section-title-glow';
    h2.innerHTML = `<span>⚡</span> ${sec.title}`;
    wrapper.appendChild(h2);
    
    if (sec.type === 'acad') {
      const p = document.createElement('p');
      p.style.marginBottom = '2rem';
      p.textContent = sec.data.summary;
      wrapper.appendChild(p);
      
      sec.data.key_principles.forEach(pr => {
        const div = document.createElement('div');
        div.className = 'theory-block';
        div.innerHTML = `
          <h4>${pr.name}</h4>
          <p>${pr.description}</p>
        `;
        wrapper.appendChild(div);
      });
      
      const limitDiv = document.createElement('div');
      limitDiv.className = 'relevance-box';
      limitDiv.innerHTML = `<strong>CZU Approvals & Credit Transfers:</strong> ${sec.data.limits_on_antigravity}`;
      wrapper.appendChild(limitDiv);
      
    } else if (sec.type === 'fin') {
      const p = document.createElement('p');
      p.style.marginBottom = '2rem';
      p.textContent = sec.data.summary;
      wrapper.appendChild(p);
      
      const subTitle = document.createElement('h3');
      subTitle.textContent = 'Grant Structures';
      subTitle.style.margin = '1.5rem 0 1rem 0';
      wrapper.appendChild(subTitle);
      
      sec.data.candidate_theories.forEach(theory => {
        const div = document.createElement('div');
        div.className = 'theory-block';
        div.innerHTML = `
          <h4>${theory.name}</h4>
          <p>${theory.description}</p>
        `;
        wrapper.appendChild(div);
      });
      
      const challengesDiv = document.createElement('div');
      challengesDiv.className = 'theory-block';
      challengesDiv.innerHTML = `
        <h4 style="color: var(--accent-magenta);">Core Relocation & Work Challenges</h4>
        <ul style="margin-top: 0.5rem; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;">
          ${sec.data.challenges.map(c => `<li>${c}</li>`).join('')}
        </ul>
      `;
      wrapper.appendChild(challengesDiv);
      
    } else if (sec.type === 'visa') {
      const p = document.createElement('p');
      p.style.marginBottom = '1.5rem';
      p.textContent = sec.data.summary;
      wrapper.appendChild(p);
      
      const mech = document.createElement('p');
      mech.style.marginBottom = '2rem';
      mech.innerHTML = `<strong>Mechanism:</strong> ${sec.data.mechanism}`;
      wrapper.appendChild(mech);
      
      const exotic = document.createElement('div');
      exotic.className = 'theory-block';
      exotic.innerHTML = `
        <h4 style="color: var(--accent-pink);">Required Documentation</h4>
        <p>${sec.data.exotic_matter.explanation}</p>
        <p style="margin-top: 0.5rem; font-style: italic; color: var(--text-secondary);">Application Status: ${sec.data.exotic_matter.status}</p>
      `;
      wrapper.appendChild(exotic);
      
      const limitsDiv = document.createElement('div');
      limitsDiv.innerHTML = `
        <h3 style="margin-bottom: 1rem;">Primary Limits & Rules</h3>
        <ul style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;">
          ${sec.data.limitations.map(l => `<li>${l}</li>`).join('')}
        </ul>
      `;
      wrapper.appendChild(limitsDiv);
      
    } else if (sec.type === 'house' || sec.type === 'pet' || sec.type === 'climb') {
      const p = document.createElement('p');
      p.style.marginBottom = '2rem';
      p.textContent = sec.data.summary;
      wrapper.appendChild(p);
      
      sec.data.items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'debunk-card';
        div.style.marginBottom = '1.5rem';
        div.innerHTML = `
          <div class="debunk-header">
            <h3>${item.name}</h3>
          </div>
          <div class="debunk-grid">
            <div class="debunk-box claim" style="background: rgba(255, 255, 255, 0.02);">
              <h4 style="color: var(--accent-cyan);">🔍 Topic Inquiry</h4>
              <p>${item.claim}</p>
            </div>
            <div class="debunk-box fact" style="background: rgba(0, 240, 255, 0.02);">
              <h4 style="color: #6ee7b7;">✅ Verified Reality</h4>
              <p style="color: var(--text-primary);">${item.scientific_fact}</p>
            </div>
          </div>
          <div class="debunk-proof" style="background: rgba(139, 92, 246, 0.05); border-color: rgba(139, 92, 246, 0.2);">
            <strong>Relocation Guideline:</strong> ${item.proof_of_debunk}
          </div>
        `;
        wrapper.appendChild(div);
      });
      
    } else if (sec.type === 'lit') {
      const grid = document.createElement('div');
      grid.className = 'literature-grid';
      
      sec.data.forEach(lit => {
        const div = document.createElement('div');
        div.className = 'lit-card';
        div.innerHTML = `
          <div class="lit-citation">${lit.citation}</div>
          <div class="lit-meta">
            <span class="lit-tag">${lit.topic}</span>
            <span>Category: ${lit.type}</span>
          </div>
        `;
        grid.appendChild(div);
      });
      wrapper.appendChild(grid);
    }
  }

  // Populate Academic Planner Pathway
  function populateAcademicPathway() {
    const timelineWrapper = document.getElementById('pathway-timeline');
    const checklistWrapper = document.getElementById('checklist-container');
    const btnUniPorto = document.getElementById('btn-uni-porto');
    const btnUniLleida = document.getElementById('btn-uni-lleida');
    const btnUniKosice = document.getElementById('btn-uni-kosice');
    
    if (!coursesData || !timelineWrapper || !checklistWrapper) return;
    
    // Setup university toggle listeners
    btnUniPorto.addEventListener('click', () => {
      btnUniPorto.classList.add('active');
      btnUniLleida.classList.remove('active');
      if (btnUniKosice) btnUniKosice.classList.remove('active');
      selectedUniversity = 'UPT Porto';
      selectedCourses.clear();
      renderCourses();
    });
    
    btnUniLleida.addEventListener('click', () => {
      btnUniLleida.classList.add('active');
      btnUniPorto.classList.remove('active');
      if (btnUniKosice) btnUniKosice.classList.remove('active');
      selectedUniversity = 'UdL Lleida';
      selectedCourses.clear();
      renderCourses();
    });

    if (btnUniKosice) {
      btnUniKosice.addEventListener('click', () => {
        btnUniKosice.classList.add('active');
        btnUniPorto.classList.remove('active');
        btnUniLleida.classList.remove('active');
        selectedUniversity = 'TUKE Košice';
        selectedCourses.clear();
        renderCourses();
      });
    }

    renderCourses();
  }

  function renderCourses() {
    const timelineWrapper = document.getElementById('pathway-timeline');
    const checklistWrapper = document.getElementById('checklist-container');
    
    timelineWrapper.innerHTML = '';
    checklistWrapper.innerHTML = '';
    
    const filteredCourses = coursesData.filter(c => c.university === selectedUniversity);
    
    filteredCourses.forEach((course, idx) => {
      // Timeline Card
      const timelineItem = document.createElement('div');
      timelineItem.className = `timeline-item ${idx === 0 ? 'active' : ''}`;
      timelineItem.innerHTML = `
        <div class="timeline-card">
          <div class="course-meta">
            <span class="course-code">${course.code}</span>
            <span class="course-credits">${course.ects} ECTS • ${course.term}</span>
          </div>
          <h3>${course.title}</h3>
          <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${course.description}</p>
          <strong style="font-size: 0.85rem; display: block; margin-top: 0.5rem; color: var(--accent-cyan);">Syllabus Content:</strong>
          <ul class="syllabus-list">
            ${course.syllabus_topics.map(t => `<li>${t}</li>`).join('')}
          </ul>
          <div class="relevance-box">
            <strong>Equivalency & Relevance:</strong> ${course.relevance}
          </div>
        </div>
      `;
      timelineWrapper.appendChild(timelineItem);
      
      // Checklist Item
      const checklistItem = document.createElement('div');
      checklistItem.className = 'checklist-item';
      checklistItem.dataset.id = course.id;
      checklistItem.innerHTML = `
        <input type="checkbox" id="chk-${course.id}">
        <div class="checklist-text">
          <span class="checklist-title">${course.title}</span>
          <span class="checklist-code">${course.code} (${course.ects} ECTS)</span>
        </div>
      `;
      
      const checkbox = checklistItem.querySelector('input');
      checklistItem.addEventListener('click', (e) => {
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
        toggleCourse(course.id, checkbox.checked);
      });
      
      checklistWrapper.appendChild(checklistItem);
    });

    updatePlannerStats();
  }

  // Course Selector Logic
  function toggleCourse(courseId, isChecked) {
    const checklistItem = document.querySelector(`.checklist-item[data-id="${courseId}"]`);
    if (isChecked) {
      selectedCourses.add(courseId);
      if (checklistItem) checklistItem.classList.add('selected');
    } else {
      selectedCourses.delete(courseId);
      if (checklistItem) checklistItem.classList.remove('selected');
    }
    
    updatePlannerStats();
  }

  function updatePlannerStats() {
    let totalCredits = 0;
    let selectedCount = 0;
    
    selectedCourses.forEach(id => {
      const course = coursesData.find(c => c.id === id);
      if (course) {
        totalCredits += course.ects;
        selectedCount++;
      }
    });
    
    // Update UI Stats
    document.getElementById('credits-val').textContent = totalCredits;
    document.getElementById('courses-val').textContent = selectedCount;
    
    // Warning alerts (min 20 ECTS, recommended 30 ECTS)
    const alertDiv = document.getElementById('prereq-warning');
    if (selectedCount > 0 && totalCredits < 24) {
      alertDiv.innerHTML = `
        <strong>⚠️ Credit Load Warning:</strong>
        <p style="margin-top: 0.25rem;">You have selected ${totalCredits} ECTS. CZU Prague requires a minimum of 24 ECTS (ideally 30) for full-time winter semester mobility approval.</p>
      `;
      alertDiv.classList.add('active');
    } else {
      alertDiv.classList.remove('active');
    }
  }

  // ----------------------------------------------------
  // Interactive Cost Calculator Tab Logic
  // ----------------------------------------------------
  let calcCity = 'Porto';
  let calcHousing = 'studio';

  function initCostCalculator() {
    const btnCityPorto = document.getElementById('calc-city-porto');
    const btnCityLleida = document.getElementById('calc-city-lleida');
    const btnCityKosice = document.getElementById('calc-city-kosice');
    const btnHousingStudio = document.getElementById('calc-housing-studio');
    const btnHousingShared = document.getElementById('calc-housing-shared');

    const sliderRent = document.getElementById('slider-rent');
    const sliderGroceries = document.getElementById('slider-groceries');
    const sliderUtilities = document.getElementById('slider-utilities');
    const sliderClimbing = document.getElementById('slider-climbing');
    const sliderTransport = document.getElementById('slider-transport');

    const chkSocial = document.getElementById('chk-social-grant');

    if (!btnCityPorto) return;

    // Listeners for City Selection
    btnCityPorto.addEventListener('click', () => {
      btnCityPorto.classList.add('active');
      btnCityLleida.classList.remove('active');
      if (btnCityKosice) btnCityKosice.classList.remove('active');
      calcCity = 'Porto';
      applyCityDefaults();
    });
    btnCityLleida.addEventListener('click', () => {
      btnCityLleida.classList.add('active');
      btnCityPorto.classList.remove('active');
      if (btnCityKosice) btnCityKosice.classList.remove('active');
      calcCity = 'Lleida';
      applyCityDefaults();
    });
    if (btnCityKosice) {
      btnCityKosice.addEventListener('click', () => {
        btnCityKosice.classList.add('active');
        btnCityPorto.classList.remove('active');
        btnCityLleida.classList.remove('active');
        calcCity = 'Kosice';
        applyCityDefaults();
      });
    }

    // Listeners for Housing Selection
    btnHousingStudio.addEventListener('click', () => {
      btnHousingStudio.classList.add('active');
      btnHousingShared.classList.remove('active');
      calcHousing = 'studio';
      applyHousingDefaults();
    });
    btnHousingShared.addEventListener('click', () => {
      btnHousingShared.classList.add('active');
      btnHousingStudio.classList.remove('active');
      calcHousing = 'shared';
      applyHousingDefaults();
    });

    // Slider change events
    [sliderRent, sliderGroceries, sliderUtilities, sliderClimbing, sliderTransport].forEach(slider => {
      slider.addEventListener('input', updateCalculatorOutputs);
    });

    chkSocial.addEventListener('change', updateCalculatorOutputs);

    // Initial run
    applyCityDefaults();
  }

  function applyCityDefaults() {
    const sliderRent = document.getElementById('slider-rent');
    const sliderUtilities = document.getElementById('slider-utilities');
    const sliderClimbing = document.getElementById('slider-climbing');
    const sliderTransport = document.getElementById('slider-transport');

    if (calcCity === 'Porto') {
      if (calcHousing === 'studio') {
        sliderRent.min = 550; sliderRent.max = 1000; sliderRent.value = 750;
      } else {
        sliderRent.min = 300; sliderRent.max = 600; sliderRent.value = 450;
      }
      sliderUtilities.value = 150;
      sliderClimbing.value = 45;
      sliderTransport.value = 35;
    } else if (calcCity === 'Lleida') {
      if (calcHousing === 'studio') {
        sliderRent.min = 350; sliderRent.max = 500; sliderRent.value = 400;
      } else {
        sliderRent.min = 200; sliderRent.max = 380; sliderRent.value = 285;
      }
      sliderUtilities.value = 90;
      sliderClimbing.value = 40;
      sliderTransport.value = 15;
    } else { // Kosice
      if (calcHousing === 'studio') {
        sliderRent.min = 300; sliderRent.max = 650; sliderRent.value = 450;
      } else {
        sliderRent.min = 150; sliderRent.max = 450; sliderRent.value = 250;
      }
      sliderUtilities.value = 80;
      sliderClimbing.value = 40;
      sliderTransport.value = 0;
    }

    updateCalculatorOutputs();
  }

  function applyHousingDefaults() {
    const sliderRent = document.getElementById('slider-rent');
    if (calcCity === 'Porto') {
      if (calcHousing === 'studio') {
        sliderRent.min = 550; sliderRent.max = 1000; sliderRent.value = 750;
      } else {
        sliderRent.min = 300; sliderRent.max = 600; sliderRent.value = 450;
      }
    } else if (calcCity === 'Lleida') {
      if (calcHousing === 'studio') {
        sliderRent.min = 350; sliderRent.max = 500; sliderRent.value = 400;
      } else {
        sliderRent.min = 200; sliderRent.max = 380; sliderRent.value = 285;
      }
    } else { // Kosice
      if (calcHousing === 'studio') {
        sliderRent.min = 300; sliderRent.max = 650; sliderRent.value = 450;
      } else {
        sliderRent.min = 150; sliderRent.max = 450; sliderRent.value = 250;
      }
    }
    updateCalculatorOutputs();
  }

  function updateCalculatorOutputs() {
    const sliderRent = document.getElementById('slider-rent');
    const sliderGroceries = document.getElementById('slider-groceries');
    const sliderUtilities = document.getElementById('slider-utilities');
    const sliderClimbing = document.getElementById('slider-climbing');
    const sliderTransport = document.getElementById('slider-transport');
    const chkSocial = document.getElementById('chk-social-grant');

    const rent = parseInt(sliderRent.value);
    const groceries = parseInt(sliderGroceries.value);
    const utilities = parseInt(sliderUtilities.value);
    const climbing = parseInt(sliderClimbing.value);
    const transport = parseInt(sliderTransport.value);

    // Update Slider text
    document.getElementById('slider-rent-val').textContent = `€${rent}`;
    document.getElementById('slider-groceries-val').textContent = `€${groceries}`;
    document.getElementById('slider-utilities-val').textContent = `€${utilities}`;
    document.getElementById('slider-climbing-val').textContent = `€${climbing}`;
    document.getElementById('slider-transport-val').textContent = `€${transport}`;

    // Calculations
    const totalExpenses = rent + groceries + utilities + climbing + transport;
    let baseGrant = 600;
    if (chkSocial.checked) {
      baseGrant += 250;
    }

    const netBalance = baseGrant - totalExpenses;
    const coveragePct = Math.round((baseGrant / totalExpenses) * 100);

    // Update fields
    document.getElementById('calc-expenses-total').textContent = `€${totalExpenses}`;
    document.getElementById('calc-grant-total').textContent = `+€${baseGrant}`;
    
    const balanceDiv = document.getElementById('calc-net-balance');
    const badgeDiv = document.getElementById('calc-balance-badge');
    const progressBar = document.getElementById('calc-coverage-bar');
    const progressText = document.getElementById('calc-coverage-pct');

    balanceDiv.textContent = `${netBalance >= 0 ? '+' : ''}€${netBalance}`;
    
    if (netBalance >= 0) {
      balanceDiv.style.color = '#6ee7b7'; // Green
      badgeDiv.textContent = 'Surplus';
      badgeDiv.style.background = 'rgba(16, 185, 129, 0.1)';
      badgeDiv.style.color = '#10b981';
      badgeDiv.style.borderColor = 'rgba(16, 185, 129, 0.2)';
    } else {
      balanceDiv.style.color = 'var(--accent-magenta)'; // Magenta/Red
      badgeDiv.textContent = 'Deficit';
      badgeDiv.style.background = 'rgba(239, 68, 68, 0.1)';
      badgeDiv.style.color = 'var(--accent-magenta)';
      badgeDiv.style.borderColor = 'rgba(239, 68, 68, 0.2)';
    }

    progressText.textContent = `${coveragePct}%`;
    progressBar.style.width = `${Math.min(coveragePct, 100)}%`;
    if (coveragePct >= 100) {
      progressBar.style.background = 'linear-gradient(90deg, #10b981, #6ee7b7)';
    } else {
      progressBar.style.background = 'linear-gradient(90deg, var(--accent-blue), var(--accent-cyan))';
    }
  }

  // ----------------------------------------------------
  // Application Checklist Storage Logic
  // ----------------------------------------------------
  function initChecklist() {
    const taskCheckboxes = document.querySelectorAll('.chk-task');
    
    // Load state
    taskCheckboxes.forEach(chk => {
      const savedState = localStorage.getItem(chk.id);
      if (savedState === 'checked') {
        chk.checked = true;
        chk.parentElement.style.opacity = '0.6';
        chk.parentElement.style.textDecoration = 'line-through';
      }
      
      // Toggle listener
      chk.addEventListener('change', () => {
        if (chk.checked) {
          localStorage.setItem(chk.id, 'checked');
          chk.parentElement.style.opacity = '0.6';
          chk.parentElement.style.textDecoration = 'line-through';
        } else {
          localStorage.removeItem(chk.id);
          chk.parentElement.style.opacity = '1';
          chk.parentElement.style.textDecoration = 'none';
        }
      });
    });
  }

  // ----------------------------------------------------
  // HTML5 Canvas Spacetime Gravity Simulator
  // ----------------------------------------------------
  const canvas = document.getElementById('gravity-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  
  let masses = [];
  let particles = [];
  let animationFrameId = null;
  let isWarpBubbleActive = false;
  
  // Placement Mode: 'positive', 'negative', 'orbiting', 'warp'
  let placementMode = 'positive';
  let warpCraft = { x: 0, y: 0, targetX: 0, targetY: 0, bubbleRadius: 80 };
  
  // Simulator UI Buttons
  const btnPositive = document.getElementById('mode-positive');
  const btnNegative = document.getElementById('mode-negative');
  const btnParticle = document.getElementById('mode-particle');
  const btnClear = document.getElementById('btn-clear-sim');
  const btnToggleWarp = document.getElementById('btn-toggle-warp');
  
  if (canvas && btnPositive) {
    // Setup Placements Modes
    btnPositive.addEventListener('click', () => setPlacementMode('positive'));
    btnNegative.addEventListener('click', () => setPlacementMode('negative'));
    btnParticle.addEventListener('click', () => setPlacementMode('particle'));
    
    btnClear.addEventListener('click', () => {
      masses = [];
      particles = [];
      isWarpBubbleActive = false;
      btnToggleWarp.textContent = "Start Warp Drive (Alcubierre)";
      btnToggleWarp.classList.remove('active');
      updateSimStatus();
    });
    
    btnToggleWarp.addEventListener('click', () => {
      isWarpBubbleActive = !isWarpBubbleActive;
      if (isWarpBubbleActive) {
        btnToggleWarp.textContent = "Collapse Warp Bubble";
        btnToggleWarp.classList.add('active');
        setPlacementMode('warp');
        
        // Auto-place craft in center
        warpCraft.x = canvas.width / 2;
        warpCraft.y = canvas.height / 2;
        warpCraft.targetX = warpCraft.x;
        warpCraft.targetY = warpCraft.y;
      } else {
        btnToggleWarp.textContent = "Start Warp Drive (Alcubierre)";
        btnToggleWarp.classList.remove('active');
        setPlacementMode('positive');
      }
      updateSimStatus();
    });
  }
  
  function setPlacementMode(mode) {
    placementMode = mode;
    
    btnPositive.classList.remove('active');
    btnNegative.classList.remove('active');
    btnParticle.classList.remove('active');
    
    if (mode === 'positive') btnPositive.classList.add('active');
    if (mode === 'negative') btnNegative.classList.add('active');
    if (mode === 'particle') btnParticle.classList.add('active');
  }
  
  function updateSimStatus() {
    const mcEl = document.getElementById('mass-count');
    const pcEl = document.getElementById('particle-count');
    const wsEl = document.getElementById('warp-status');
    
    if (mcEl) mcEl.textContent = masses.length;
    if (pcEl) pcEl.textContent = particles.length;
    if (wsEl) wsEl.textContent = isWarpBubbleActive ? "Active (Alcubierre)" : "Inactive";
  }

  // Handle Canvas Resizing
  function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.width * 0.625; // Keep 16:10 aspect ratio
  }
  
  if (canvas) {
    window.addEventListener('resize', resizeCanvas);
    
    // Interactive Mass/Particle placement via click
    canvas.addEventListener('mousedown', (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;
      
      let clickedMassIdx = -1;
      masses.forEach((m, idx) => {
        let dx = m.x - clickX;
        let dy = m.y - clickY;
        if (Math.sqrt(dx*dx + dy*dy) < 20) {
          clickedMassIdx = idx;
        }
      });
      
      if (clickedMassIdx !== -1) {
        masses.splice(clickedMassIdx, 1);
        updateSimStatus();
        return;
      }
      
      if (placementMode === 'positive') {
        masses.push({ x: clickX, y: clickY, mass: 60, type: 'positive', color: 'var(--accent-cyan)' });
      } else if (placementMode === 'negative') {
        masses.push({ x: clickX, y: clickY, mass: -60, type: 'negative', color: 'var(--accent-magenta)' });
      } else if (placementMode === 'particle') {
        particles.push({
          x: clickX,
          y: clickY,
          vx: 1.5,
          vy: -1.0,
          trail: [],
          color: '#ffffff'
        });
      } else if (placementMode === 'warp') {
        warpCraft.targetX = clickX;
        warpCraft.targetY = clickY;
      }
      
      updateSimStatus();
    });
    
    canvas.addEventListener('mousemove', (e) => {
      if (placementMode === 'warp' || isWarpBubbleActive) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        warpCraft.targetX = (e.clientX - rect.left) * scaleX;
        warpCraft.targetY = (e.clientY - rect.top) * scaleY;
      }
    });
  }

  function getWarpedPoint(x, y) {
    let dxTotal = 0;
    let dyTotal = 0;
    
    masses.forEach(m => {
      let dx = m.x - x;
      let dy = m.y - y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist > 15) {
        let force = m.mass / (dist + 40); 
        let factor = Math.min(Math.abs(force) * 35, dist * 0.85);
        dxTotal += (dx / dist) * factor * (m.mass > 0 ? 1 : -1);
        dyTotal += (dy / dist) * factor * (m.mass > 0 ? 1 : -1);
      }
    });
    
    if (isWarpBubbleActive) {
      let dx = warpCraft.x - x;
      let dy = warpCraft.y - y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist < warpCraft.bubbleRadius) {
        let tx = warpCraft.targetX - warpCraft.x;
        let ty = warpCraft.targetY - warpCraft.y;
        let tDist = Math.sqrt(tx*tx + ty*ty);
        
        if (tDist > 2) {
          let dirX = tx / tDist;
          let dirY = ty / tDist;
          let projection = dx * dirX + dy * dirY; 
          let warpFactor = Math.sin((dist / warpCraft.bubbleRadius) * Math.PI);
          let intensity = 25 * warpFactor;
          
          if (projection < 0) {
            dxTotal += dirX * intensity;
            dyTotal += dirY * intensity;
          } else {
            dxTotal -= dirX * intensity;
            dyTotal -= dirY * intensity;
          }
        }
      }
    }
    
    return { x: x + dxTotal, y: y + dyTotal };
  }

  function updateParticles() {
    particles.forEach((p, idx) => {
      let ax = 0;
      let ay = 0;
      
      masses.forEach(m => {
        let dx = m.x - p.x;
        let dy = m.y - p.y;
        let distSqr = dx*dx + dy*dy;
        let dist = Math.sqrt(distSqr);
        
        if (dist > 10) {
          let strength = m.mass * 2.0;
          ax += (dx / dist) * (strength / (distSqr + 100));
          ay += (dy / dist) * (strength / (distSqr + 100));
        }
      });
      
      p.vx += ax;
      p.vy += ay;
      p.vx *= 0.998;
      p.vy *= 0.998;
      p.x += p.vx;
      p.y += p.vy;
      
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > 30) p.trail.shift();
      
      if (p.x < -100 || p.x > canvas.width + 100 || p.y < -100 || p.y > canvas.height + 100) {
        particles.splice(idx, 1);
        updateSimStatus();
      }
    });
  }

  function drawSimulator() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
    ctx.lineWidth = 1;
    
    const gridSpacing = 28;
    const lineSegments = 16;
    
    for (let x = 0; x < canvas.width; x += gridSpacing) {
      ctx.beginPath();
      for (let i = 0; i <= lineSegments; i++) {
        let y = (i / lineSegments) * canvas.height;
        let wp = getWarpedPoint(x, y);
        if (i === 0) ctx.moveTo(wp.x, wp.y);
        else ctx.lineTo(wp.x, wp.y);
      }
      ctx.stroke();
    }
    
    for (let y = 0; y < canvas.height; y += gridSpacing) {
      ctx.beginPath();
      for (let i = 0; i <= lineSegments; i++) {
        let x = (i / lineSegments) * canvas.width;
        let wp = getWarpedPoint(x, y);
        if (i === 0) ctx.moveTo(wp.x, wp.y);
        else ctx.lineTo(wp.x, wp.y);
      }
      ctx.stroke();
    }
    
    masses.forEach(m => {
      let radGrd = ctx.createRadialGradient(m.x, m.y, 2, m.x, m.y, 24);
      if (m.type === 'positive') {
        radGrd.addColorStop(0, '#ffffff');
        radGrd.addColorStop(0.2, 'rgba(0, 240, 255, 1)');
        radGrd.addColorStop(0.6, 'rgba(0, 150, 255, 0.3)');
        radGrd.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        radGrd.addColorStop(0, '#ffffff');
        radGrd.addColorStop(0.2, 'rgba(255, 0, 170, 1)');
        radGrd.addColorStop(0.6, 'rgba(200, 0, 150, 0.3)');
        radGrd.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      
      ctx.fillStyle = radGrd;
      ctx.beginPath();
      ctx.arc(m.x, m.y, 24, 0, Math.PI * 2);
      ctx.fill();
    });
    
    particles.forEach(p => {
      if (p.trail.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.moveTo(p.trail[0].x, p.trail[0].y);
        for (let i = 1; i < p.trail.length; i++) {
          ctx.lineTo(p.trail[i].x, p.trail[i].y);
        }
        ctx.stroke();
      }
      
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#ffffff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    
    if (isWarpBubbleActive) {
      warpCraft.x += (warpCraft.targetX - warpCraft.x) * 0.08;
      warpCraft.y += (warpCraft.targetY - warpCraft.y) * 0.08;
      
      ctx.beginPath();
      let ringGrd = ctx.createRadialGradient(warpCraft.x, warpCraft.y, warpCraft.bubbleRadius - 8, warpCraft.x, warpCraft.y, warpCraft.bubbleRadius + 4);
      ringGrd.addColorStop(0, 'rgba(139, 92, 246, 0)');
      ringGrd.addColorStop(0.5, 'rgba(167, 139, 250, 0.25)');
      ringGrd.addColorStop(0.8, 'rgba(192, 132, 252, 0.4)');
      ringGrd.addColorStop(1, 'rgba(139, 92, 246, 0)');
      
      ctx.fillStyle = ringGrd;
      ctx.arc(warpCraft.x, warpCraft.y, warpCraft.bubbleRadius + 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'var(--accent-cyan)';
      
      ctx.beginPath();
      let tx = warpCraft.targetX - warpCraft.x;
      let ty = warpCraft.targetY - warpCraft.y;
      let angle = Math.atan2(ty, tx);
      
      ctx.save();
      ctx.translate(warpCraft.x, warpCraft.y);
      ctx.rotate(angle);
      ctx.moveTo(12, 0);
      ctx.lineTo(-8, -8);
      ctx.lineTo(-4, 0);
      ctx.lineTo(-8, 8);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      
      ctx.shadowBlur = 0;
    }
  }

  function simLoop() {
    updateParticles();
    drawSimulator();
    animationFrameId = requestAnimationFrame(simLoop);
  }
  
  function initSimulator() {
    if (!canvas) return;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    resizeCanvas();
    updateSimStatus();
    simLoop();
  }

  // Load resources on initial run
  loadDatabases();
});
