import { appData } from './data.js';

// --- THE PURGE ---
// This clears old, broken versions of the app from your browser memory
const VERSION = "GRID_MASTER_V7";
let saved = localStorage.getItem(VERSION);
let state;

try {
    state = saved ? JSON.parse(saved) : appData;
    // Check if state is valid; if not, force a reset
    if (!state.subscriptions || state.subscriptions.length === 0) {
        state = appData;
    }
} catch (e) {
    state = appData;
}

const save = () => {
    localStorage.setItem(VERSION, JSON.stringify(state));
    render();
};

// --- EVENT DELEGATION (Prevents "Dead Buttons") ---
document.addEventListener('click', (e) => {
    const task = e.target.dataset.task;
    const action = e.target.dataset.action;

    if (action === 'add' && task) {
        if (!state.dailyFocus.includes(task)) {
            state.dailyFocus.push(task);
            save();
        }
    }
    if (action === 'remove' && task) {
        state.dailyFocus = state.dailyFocus.filter(t => t !== task);
        save();
    }
});

// --- UI HANDLERS ---
window.toggleMode = (isFocus) => {
    const hub = document.getElementById('hub-view');
    const focus = document.getElementById('focus-view');
    if (isFocus) {
        hub.classList.add('hidden');
        focus.classList.remove('hidden');
    } else {
        hub.classList.remove('hidden');
        focus.classList.add('hidden');
    }
};

const render = () => {
    console.log("Rendering Grid Protocol...");

    // 1. Calendar
    const calendar = document.getElementById('calendar-bar');
    if (calendar) {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const today = days[new Date().getDay()];
        calendar.innerHTML = Object.entries(state.weeklyPlanner).map(([day, info]) => `
            <div class="flex flex-col items-center">
                <span class="${day === today ? 'text-cyan-500 font-bold' : 'text-slate-300'}">${day}</span>
                <div class="w-1 h-1 mt-1 ${day === today ? 'bg-cyan-500 shadow-[0_0_8px_#00E5FF]' : 'bg-transparent'}"></div>
            </div>
        `).join('');
    }

    // 2. Daily List
    const daily = document.getElementById('daily-list');
    if (daily) {
        daily.innerHTML = state.dailyFocus.map(t => `
            <li class="flex justify-between items-center group border-l-2 border-transparent hover:border-cyan-400 pl-3">
                <span class="text-slate-600">${t}</span>
                <button data-task="${t}" data-action="remove" class="opacity-0 group-hover:opacity-100 text-red-300 text-[9px]">X</button>
            </li>
        `).join('') || '<li class="text-slate-300 italic">Clear.</li>';
    }

    // 3. Category Grid
    const catGrid = document.getElementById('category-grid');
    if (catGrid) {
        catGrid.innerHTML = Object.entries(state.taskBank).map(([cat, tasks]) => `
            <div class="tron-glow p-5 bg-white rounded-sm">
                <h3 class="mono text-[9px] uppercase text-slate-400 mb-4 tracking-widest">${cat}</h3>
                <div class="flex flex-wrap gap-2">
                    ${tasks.map(t => `<button data-task="${t}" data-action="add" class="text-[10px] border border-gray-100 px-2 py-1 hover:border-cyan-400">+ ${t}</button>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // 4. Subscriptions
    const subGrid = document.getElementById('subscription-grid');
    if (subGrid) {
        subGrid.innerHTML = state.subscriptions.map(tool => `
            <a href="${tool.url}" target="_blank" class="tron-glow aspect-square flex items-center justify-center text-[8px] p-2 grayscale hover:grayscale-0">
                ${tool.name}
            </a>
        `).join('');
    }
};

// Initial Logic
document.getElementById('study-trigger').onclick = () => window.toggleMode(true);
document.getElementById('exit-focus').onclick = () => window.toggleMode(false);

render();