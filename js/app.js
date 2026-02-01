/* === MASTER DATA (Hardcoded to prevent import errors) === */
const masterData = {
    dailyFocus: [],
    taskBank: {
        chores: ["Deep Clean House", "Inventory/Restock", "House Tidy", "Pets – Daily"],
        work: ["Instagram – Light", "AI Course – Theory", "Outreach", "Email Wipe"],
        clients: ["Video Client A", "Video Client B", "App Dev Sync"]
    },
    weeklyPlanner: {
        MON: { mission: "Run + Video Client A", length: "1-2h" },
        TUE: { mission: "Gym + App Dev", length: "2-3h" },
        WED: { mission: "Run + Video Client B", length: "1-2h" },
        THU: { mission: "Gym + App Dev", length: "2-3h" },
        FRI: { mission: "Run + Video Client B", length: "1-2h" },
        SAT: { mission: "Review + Prep", length: "2-4h" },
        SUN: { mission: "Gym + Job Apps", length: "2h" }
    },
    study: [
        { name: "Mathematics", url: "https://www.khanacademy.org/math/" },
        { name: "AI Specialization", url: "https://platform.outskill.com/" },
        { name: "Language Protocol", url: "https://learn.mangolanguages.com/login" },
        { name: "Writing Analysis", url: "#" }
    ],
    subscriptions: [
        { name: "Perplexity", url: "https://www.perplexity.ai/" }, { name: "Canva", url: "https://www.canva.com/" },
        { name: "Julius AI", url: "https://julius.ai/" }, { name: "Lovable", url: "https://lovable.dev" },
        { name: "Lyzr Studio", url: "https://studio.lyzr.ai/" }, { name: "Fireflies", url: "https://app.fireflies.ai/" },
        { name: "Bolt", url: "https://bolt.new/" }, { name: "NotebookLM", url: "https://notebooklm.google/" },
        { name: "OpenAI", url: "https://openai.com/" }, { name: "LinkedIn", url: "https://www.linkedin.com/" },
        { name: "ElevenLabs", url: "https://elevenlabs.io/" }, { name: "HeyGen", url: "https://app.heygen.com/" },
        { name: "G-Sheets", url: "https://docs.google.com/spreadsheets" }, { name: "Supabase", url: "https://supabase.com/dashboard/" },
        { name: "Gumloop", url: "https://www.gumloop.com/" }, { name: "n8n", url: "https://n8n.io/" }
    ]
};

/* === LOGIC === */
const STORAGE_KEY = 'THE_GRID_FINAL_V1';
let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || masterData;

// Force data integrity
if (!state.taskBank) state = masterData;

const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    render();
};

// Global Actions
window.toggleMode = (isFocus) => {
    document.getElementById('hub-view').classList.toggle('hidden', isFocus);
    document.getElementById('focus-view').classList.toggle('hidden', !isFocus);
};

// Event Delegation for Buttons
document.addEventListener('click', (e) => {
    const task = e.target.dataset.task;
    const action = e.target.dataset.action;
    if (action === 'add' && task) {
        if (!state.dailyFocus.includes(task)) { state.dailyFocus.push(task); save(); }
    }
    if (action === 'remove' && task) {
        state.dailyFocus = state.dailyFocus.filter(t => t !== task); save();
    }
});

const render = () => {
    console.log("System Rendering...");

    // 1. Calendar
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const today = days[new Date().getDay()];
    const calEl = document.getElementById('calendar-bar');
    if (calEl) {
        calEl.innerHTML = Object.entries(state.weeklyPlanner).map(([day, info]) => `
            <div class="flex flex-col items-center">
                <span class="${day === today ? 'text-cyan-500 font-bold' : 'text-slate-300'}">${day}</span>
                <div class="w-1 h-1 mt-1 ${day === today ? 'bg-cyan-500' : 'bg-transparent'}"></div>
            </div>
        `).join('');
    }

    // 2. Daily List
    const dailyEl = document.getElementById('daily-list');
    if (dailyEl) {
        dailyEl.innerHTML = state.dailyFocus.map(t => `
            <li class="flex justify-between items-center group border-l-2 border-transparent hover:border-cyan-400 pl-3">
                <span class="text-slate-600">${t}</span>
                <button data-task="${t}" data-action="remove" class="opacity-0 group-hover:opacity-100 text-red-300 text-[9px]">REMOVE</button>
            </li>
        `).join('') || '<li class="text-slate-300 italic text-xs">Waiting for command...</li>';
    }

    // 3. Categories
    const catEl = document.getElementById('category-grid');
    if (catEl) {
        catEl.innerHTML = Object.entries(state.taskBank).map(([cat, tasks]) => `
            <div class="tron-glow p-5 bg-white">
                <h3 class="mono text-[9px] uppercase text-slate-400 mb-4 tracking-widest font-bold">${cat}</h3>
                <div class="flex flex-wrap gap-2">
                    ${tasks.map(t => `<button data-task="${t}" data-action="add" class="text-[10px] border border-gray-100 px-2 py-1 hover:border-cyan-400">+ ${t}</button>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // 4. Tools
    const subEl = document.getElementById('subscription-grid');
    if (subEl) {
        subEl.innerHTML = state.subscriptions.map(tool => `
            <a href="${tool.url}" target="_blank" class="tron-glow aspect-square flex items-center justify-center text-[8px] p-2 grayscale hover:grayscale-0 hover:text-cyan-500">
                ${tool.name}
            </a>
        `).join('');
    }

    // 5. Study
    const studyEl = document.getElementById('study-nav');
    if (studyEl) {
        studyEl.innerHTML = state.study.map(s => `
            <button onclick="document.getElementById('subject-title').innerText='${s.name}'; window.open('${s.url}', '_blank');" 
                    class="block w-full text-left text-[10px] text-slate-400 hover:text-cyan-500 uppercase mono pl-4 border-l border-transparent hover:border-cyan-400 py-1 transition-all">
                ${s.name}
            </button>
        `).join('');
    }
};

// Initialize listeners
document.getElementById('study-trigger').onclick = () => window.toggleMode(true);
document.getElementById('exit-focus').onclick = () => window.toggleMode(false);
document.getElementById('quick-add').onkeypress = (e) => {
    if(e.key === 'Enter' && e.target.value) {
        if(!state.dailyFocus.includes(e.target.value)) {
            state.dailyFocus.push(e.target.value);
            e.target.value = '';
            save();
        }
    }
};

render();