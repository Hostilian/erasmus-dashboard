document.addEventListener('DOMContentLoaded', () => {
  // Application Data States
  let researchData = null;
  let coursesData = null;
  let selectedCourses = new Set();
  
  // Navigation & Tab Switching
  const navButtons = document.querySelectorAll('nav button, .btn-secondary');
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
      populateDebunked();
      populateAcademicPathway();
    } catch (error) {
      console.error("Error loading research/courses database:", error);
    }
  }

  // Populate Research Dossier
  function populateResearchDossier() {
    const dossierNav = document.getElementById('dossier-nav-list');
    const dossierContent = document.getElementById('dossier-active-content');
    
    if (!researchData) return;
    
    const sections = [
      { id: 'gr', title: 'General Relativity', data: researchData.general_relativity, type: 'gr' },
      { id: 'qg', title: 'Quantum Gravity', data: researchData.quantum_gravity, type: 'qg' },
      { id: 'warp', title: 'Warp Mechanics', data: researchData.warp_mechanics, type: 'warp' },
      { id: 'lit', title: 'Literature Dossier', data: researchData.literature, type: 'lit' }
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
    wrapper.innerHTML = '';
    
    const h2 = document.createElement('h2');
    h2.className = 'section-title-glow';
    h2.innerHTML = `<span>⚡</span> ${sec.title}`;
    wrapper.appendChild(h2);
    
    if (sec.type === 'gr') {
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
      limitDiv.innerHTML = `<strong>Antigravity Implications:</strong> ${sec.data.limits_on_antigravity}`;
      wrapper.appendChild(limitDiv);
      
    } else if (sec.type === 'qg') {
      const p = document.createElement('p');
      p.style.marginBottom = '2rem';
      p.textContent = sec.data.summary;
      wrapper.appendChild(p);
      
      const subTitle = document.createElement('h3');
      subTitle.textContent = 'Candidate Theories';
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
        <h4 style="color: var(--accent-magenta);">Core Barriers to Unified Field Theory</h4>
        <ul style="margin-top: 0.5rem; padding-left: 1.25rem;">
          ${sec.data.challenges.map(c => `<li style="margin-bottom: 0.5rem;">${c}</li>`).join('')}
        </ul>
      `;
      wrapper.appendChild(challengesDiv);
      
    } else if (sec.type === 'warp') {
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
        <h4 style="color: var(--accent-pink);">The Exotic Matter Requirement</h4>
        <p>${sec.data.exotic_matter.explanation}</p>
        <p style="margin-top: 0.5rem; font-style: italic; color: var(--text-secondary);">Current Status: ${sec.data.exotic_matter.status}</p>
      `;
      wrapper.appendChild(exotic);
      
      const limitsDiv = document.createElement('div');
      limitsDiv.innerHTML = `
        <h3 style="margin-bottom: 1rem;">Primary Physical Barriers</h3>
        <ul style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;">
          ${sec.data.limitations.map(l => `<li>${l}</li>`).join('')}
        </ul>
      `;
      wrapper.appendChild(limitsDiv);
      
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

  // Populate Pseudoscience Debunked
  function populateDebunked() {
    const listWrapper = document.getElementById('debunked-list-container');
    if (!researchData || !listWrapper) return;
    
    listWrapper.innerHTML = '';
    researchData.debunked_pseudoscience.items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'debunk-card';
      card.innerHTML = `
        <div class="debunk-header">
          <h3>${item.name}</h3>
          <span class="status-badge">DEBUNKED</span>
        </div>
        <div class="debunk-grid">
          <div class="debunk-box claim">
            <h4>❌ Pseudoscience Claim</h4>
            <p>${item.claim}</p>
          </div>
          <div class="debunk-box fact">
            <h4>✅ Verifiable Physical Reality</h4>
            <p>${item.scientific_fact}</p>
          </div>
        </div>
        <div class="debunk-proof">
          <strong>Direct Scientific Refutation:</strong> ${item.proof_of_debunk}
        </div>
      `;
      listWrapper.appendChild(card);
    });
  }

  // Populate Academic Planner Pathway
  function populateAcademicPathway() {
    const timelineWrapper = document.getElementById('pathway-timeline');
    const checklistWrapper = document.getElementById('checklist-container');
    if (!coursesData || !timelineWrapper || !checklistWrapper) return;
    
    timelineWrapper.innerHTML = '';
    checklistWrapper.innerHTML = '';
    
    coursesData.forEach((course, idx) => {
      // Timeline Card
      const timelineItem = document.createElement('div');
      timelineItem.className = `timeline-item ${idx === 0 ? 'active' : ''}`;
      timelineItem.innerHTML = `
        <div class="timeline-card">
          <div class="course-meta">
            <span class="course-code">${course.code}</span>
            <span class="course-credits">${course.credits} Credits • ${course.term}</span>
          </div>
          <h3>${course.title}</h3>
          <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${course.description}</p>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">
            <strong>Prerequisites:</strong> ${course.prerequisites.join(', ')}
          </div>
          <strong style="font-size: 0.85rem; display: block; margin-top: 0.5rem;">Syllabus Content:</strong>
          <ul class="syllabus-list">
            ${course.syllabus_topics.map(t => `<li>${t}</li>`).join('')}
          </ul>
          <div class="relevance-box">
            <strong>Relevance to Gravity:</strong> ${course.relevance}
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
          <span class="checklist-code">${course.code} (${course.credits} Cr)</span>
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
    let missingPrereqs = [];
    
    selectedCourses.forEach(id => {
      const course = coursesData.find(c => c.id === id);
      if (course) {
        totalCredits += course.credits;
        selectedCount++;
        
        // Check prerequisites
        course.prerequisites.forEach(prereqName => {
          // Check if prereq matches any of the existing course titles that are selected
          const reqCourse = coursesData.find(c => c.title === prereqName);
          if (reqCourse && !selectedCourses.has(reqCourse.id)) {
            missingPrereqs.push(`"${course.title}" requires "${prereqName}"`);
          }
        });
      }
    });
    
    // Update UI Stats
    document.getElementById('credits-val').textContent = totalCredits;
    document.getElementById('courses-val').textContent = selectedCount;
    
    // Handle Alerts
    const alertDiv = document.getElementById('prereq-warning');
    if (missingPrereqs.length > 0) {
      alertDiv.innerHTML = `
        <strong>⚠️ Prerequisite Warnings:</strong>
        <ul style="margin-top: 0.5rem; padding-left: 1rem;">
          ${missingPrereqs.map(p => `<li>${p}</li>`).join('')}
        </ul>
      `;
      alertDiv.classList.add('active');
    } else {
      alertDiv.classList.remove('active');
    }
  }

  // ----------------------------------------------------
  // HTML5 Canvas Spacetime Gravity Simulator
  // ----------------------------------------------------
  const canvas = document.getElementById('gravity-canvas');
  const ctx = canvas.getContext('2d');
  
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
  const btnWarp = document.getElementById('mode-warp');
  const btnClear = document.getElementById('btn-clear-sim');
  const btnToggleWarp = document.getElementById('btn-toggle-warp');
  
  // Setup Placements Modes
  btnPositive.addEventListener('click', () => setPlacementMode('positive'));
  btnNegative.addEventListener('click', () => setPlacementMode('negative'));
  btnParticle.addEventListener('click', () => setPlacementMode('particle'));
  btnWarp.addEventListener('click', () => setPlacementMode('warp'));
  
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
  
  function setPlacementMode(mode) {
    placementMode = mode;
    
    // Update Button Classes
    btnPositive.classList.remove('active');
    btnNegative.classList.remove('active');
    btnParticle.classList.remove('active');
    btnWarp.classList.remove('active');
    
    if (mode === 'positive') btnPositive.classList.add('active');
    if (mode === 'negative') btnNegative.classList.add('active');
    if (mode === 'particle') btnParticle.classList.add('active');
    if (mode === 'warp') btnWarp.classList.add('active');
  }
  
  function updateSimStatus() {
    document.getElementById('mass-count').textContent = masses.length;
    document.getElementById('particle-count').textContent = particles.length;
    document.getElementById('warp-status').textContent = isWarpBubbleActive ? "Active (Alcubierre Metric)" : "Inactive";
  }

  // Handle Canvas Resizing
  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.width * 0.625; // Keep 16:10 aspect ratio
  }
  
  window.addEventListener('resize', resizeCanvas);
  
  // Interactive Mass/Particle placement via click
  canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    // Translate click to local canvas coordinates
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;
    
    // Check if clicked close to an existing mass to delete it
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
    
    // Perform Mode Placement
    if (placementMode === 'positive') {
      masses.push({ x: clickX, y: clickY, mass: 60, type: 'positive', color: 'var(--accent-cyan)' });
    } else if (placementMode === 'negative') {
      masses.push({ x: clickX, y: clickY, mass: -60, type: 'negative', color: 'var(--accent-magenta)' });
    } else if (placementMode === 'particle') {
      // Spawn orbital test particle
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
  
  // Track Mouse movement for warp craft destination
  canvas.addEventListener('mousemove', (e) => {
    if (placementMode === 'warp' || isWarpBubbleActive) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      warpCraft.targetX = (e.clientX - rect.left) * scaleX;
      warpCraft.targetY = (e.clientY - rect.top) * scaleY;
    }
  });

  // Calculate spacetime warping for any point (x, y)
  function getWarpedPoint(x, y) {
    let dxTotal = 0;
    let dyTotal = 0;
    
    // Standard Masses Curve
    masses.forEach(m => {
      let dx = m.x - x;
      let dy = m.y - y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist > 15) {
        // Force calculations (attractive for +, repulsive for -)
        let force = m.mass / (dist + 40); 
        let factor = Math.min(Math.abs(force) * 35, dist * 0.85);
        
        dxTotal += (dx / dist) * factor * (m.mass > 0 ? 1 : -1);
        dyTotal += (dy / dist) * factor * (m.mass > 0 ? 1 : -1);
      }
    });
    
    // Alcubierre Warp Metric Bubble effect
    if (isWarpBubbleActive) {
      let dx = warpCraft.x - x;
      let dy = warpCraft.y - y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist < warpCraft.bubbleRadius) {
        // Inside warp bubble, spacetime is warped dynamically.
        // Ahead of craft (in direction of movement) space is contracted (positive mass effect)
        // Behind craft, space is expanded (negative mass effect)
        
        // Let's compute travel vector
        let tx = warpCraft.targetX - warpCraft.x;
        let ty = warpCraft.targetY - warpCraft.y;
        let tDist = Math.sqrt(tx*tx + ty*ty);
        
        if (tDist > 2) {
          let dirX = tx / tDist;
          let dirY = ty / tDist;
          
          // Project the point relative to craft coordinate frame
          // Dot product: how far along the craft movement is this point
          let projection = dx * dirX + dy * dirY; 
          
          // Ahead if projection < 0 (pointing in direction of dirX/dirY)
          let warpFactor = Math.sin((dist / warpCraft.bubbleRadius) * Math.PI); // Strongest in center of bubble wall
          let intensity = 25 * warpFactor;
          
          if (projection < 0) {
            // Contracting space in front
            dxTotal += dirX * intensity;
            dyTotal += dirY * intensity;
          } else {
            // Expanding space behind
            dxTotal -= dirX * intensity;
            dyTotal -= dirY * intensity;
          }
        }
      }
    }
    
    return { x: x + dxTotal, y: y + dyTotal };
  }

  // Particle System Update Loop
  function updateParticles() {
    particles.forEach((p, idx) => {
      let ax = 0;
      let ay = 0;
      
      // Forces from placed masses
      masses.forEach(m => {
        let dx = m.x - p.x;
        let dy = m.y - p.y;
        let distSqr = dx*dx + dy*dy;
        let dist = Math.sqrt(distSqr);
        
        if (dist > 10) {
          // Accel = G*M/r^2 (mass can be negative, which repels)
          let strength = m.mass * 2.0;
          ax += (dx / dist) * (strength / (distSqr + 100));
          ay += (dy / dist) * (strength / (distSqr + 100));
        }
      });
      
      // Update Physics
      p.vx += ax;
      p.vy += ay;
      
      // Apply slight cosmic drag to keep orbits stabilized
      p.vx *= 0.998;
      p.vy *= 0.998;
      
      p.x += p.vx;
      p.y += p.vy;
      
      // Record trail
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > 30) p.trail.shift();
      
      // Out of bounds cleanup
      if (p.x < -100 || p.x > canvas.width + 100 || p.y < -100 || p.y > canvas.height + 100) {
        particles.splice(idx, 1);
        updateSimStatus();
      }
    });
  }

  // Draw everything
  function drawSimulator() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Spacetime Grid
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
    ctx.lineWidth = 1;
    
    const gridSpacing = 28;
    const lineSegments = 16;
    
    // Draw Vertical Grid Lines
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
    
    // Draw Horizontal Grid Lines
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
    
    // Draw Placed Masses with glowing gradients
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
    
    // Draw Test Particles and trails
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
      ctx.shadowBlur = 0; // reset glow
    });
    
    // Update and Draw Alcubierre Warp Spacecraft
    if (isWarpBubbleActive) {
      // Linear interpolate craft position toward mouse target
      warpCraft.x += (warpCraft.targetX - warpCraft.x) * 0.08;
      warpCraft.y += (warpCraft.targetY - warpCraft.y) * 0.08;
      
      // Draw Warp Bubble ring
      ctx.beginPath();
      let ringGrd = ctx.createRadialGradient(warpCraft.x, warpCraft.y, warpCraft.bubbleRadius - 8, warpCraft.x, warpCraft.y, warpCraft.bubbleRadius + 4);
      ringGrd.addColorStop(0, 'rgba(139, 92, 246, 0)');
      ringGrd.addColorStop(0.5, 'rgba(167, 139, 250, 0.25)');
      ringGrd.addColorStop(0.8, 'rgba(192, 132, 252, 0.4)');
      ringGrd.addColorStop(1, 'rgba(139, 92, 246, 0)');
      
      ctx.fillStyle = ringGrd;
      ctx.arc(warpCraft.x, warpCraft.y, warpCraft.bubbleRadius + 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw Spacecraft Icon
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'var(--accent-cyan)';
      
      ctx.beginPath();
      // Draw a triangle ship pointing toward movement
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

  // Main Loop
  function simLoop() {
    updateParticles();
    drawSimulator();
    animationFrameId = requestAnimationFrame(simLoop);
  }
  
  function initSimulator() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    resizeCanvas();
    updateSimStatus();
    simLoop();
  }

  // Load resources on initial run
  loadDatabases();
});
