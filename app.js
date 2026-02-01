// MASTER DATA
const appData = {
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
        { name: "Supabase", url: "https://supabase.com/dashboard/" }, { name: "Gumloop", url: "https://www.gumloop.com/" }
    ]
};

// LOGIC ENGINE
let state = JSON.parse(localStorage.getItem('THE_GRID_V_AURORA')) || appData;

const save = () => {
    localStorage.setItem('THE_GRID_V_AURORA', JSON.stringify(state));
    render();
};

const render = () => {
    console.log("Grid Render Initiated...");
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const today = days[new Date().getDay()];
    
    // Pulse Calendar
    const cal = document.getElementById('calendar-bar');
    if(cal) cal.innerHTML = Object.entries(state.weeklyPlanner).map(([day, info]) => `
        <div class="flex flex-col items-center">
            <span class="${day === today ? 'text-cyan-400 font-bold' : 'text-slate-600'}">${day}</span>
            <div class="w-1 h-1 mt-1 ${day === today ? 'bg-cyan-400 shadow-[0_0_8px_#00E5FF]' : 'bg-transparent'}"></div>
        </div>
    `).join('');

    // Battlefield
    const list = document.getElementById('daily-list');
    if(list) list.innerHTML = state.dailyFocus.map(t => `
        <li class="flex justify-between items-center border-l border-transparent hover:border-cyan-500 pl-3">
            <span class="text-slate-400">${t}</span>
            <button data-task="${t}" data-action="remove" class="text-red-500/50 text-[9px]">REMOVE</button>
        </li>
    `).join('') || '<li class="text-slate-700 italic text-xs">Standing by...</li>';

    // Categories
    const catGrid = document.getElementById('category-grid');
    if(catGrid) catGrid.innerHTML = Object.entries(state.taskBank).map(([cat, tasks]) => `
        <div class="tron-glow p-5 rounded-sm">
            <h3 class="mono text-[9px] uppercase text-cyan-500/40 mb-4 tracking-widest">${cat}</h3>
            <div class="flex flex-wrap gap-2">
                ${tasks.map(t => `<button data-task="${t}" data-action="add" class="text-[10px] border border-cyan-900/40 px-2 py-1 text-slate-400 hover:border-cyan-400 transition-all">+ ${t}</button>`).join('')}
            </div>
        </div>
    `).join('');

    // Tools
    const subGrid = document.getElementById('subscription-grid');
    if(subGrid) subGrid.innerHTML = state.subscriptions.map(tool => `
        <a href="${tool.url}" target="_blank" class="tron-glow aspect-square flex items-center justify-center text-[8px] mono text-slate-500 hover:text-cyan-400 p-2 text-center">
            ${tool.name}
        </a>
    `).join('');
};

// Event Listeners
document.addEventListener('click', (e) => {
    const { task, action } = e.target.dataset;
    if (action === 'add' && task) {
        if (!state.dailyFocus.includes(task)) { state.dailyFocus.push(task); save(); }
    }
    if (action === 'remove' && task) {
        state.dailyFocus = state.dailyFocus.filter(t => t !== task); save();
    }
});

// Mode Switching
const trigger = document.getElementById('study-trigger');
const exit = document.getElementById('exit-focus');
if(trigger) trigger.onclick = () => document.getElementById('focus-view').classList.remove('hidden');
if(exit) exit.onclick = () => document.getElementById('focus-view').classList.add('hidden');

// Start
render();