import { appData } from './data.js';

// State Persistence
let state = JSON.parse(localStorage.getItem('THE_GRID_USER_DATA')) || appData;

function save() {
    localStorage.setItem('THE_GRID_USER_DATA', JSON.stringify(state));
    render();
}

// Actions
window.addToDaily = (item) => {
    if (!state.dailyFocus.includes(item)) {
        state.dailyFocus.push(item);
        save();
    }
};

window.toggleMode = (isFocus) => {
    document.getElementById('hub-view').classList.toggle('hidden', isFocus);
    document.getElementById('focus-view').classList.toggle('hidden', !isFocus);
};

// UI Rendering
function render() {
    // 1. Daily Focus
    const dailyList = document.getElementById('daily-list');
    dailyList.innerHTML = state.dailyFocus.length 
        ? state.dailyFocus.map(task => `
            <li class="flex items-center justify-between group border-l-2 border-transparent hover:border-cyan-400 pl-2 transition-all">
                <span class="text-slate-600">${task}</span>
                <button onclick="removeTask('${task}')" class="opacity-0 group-hover:opacity-100 text-[10px] text-slate-300">X</button>
            </li>
        `).join('')
        : `<li class="text-slate-300 italic text-xs">Battlefield clear...</li>`;

    // 2. Category Cards
    const catGrid = document.getElementById('category-grid');
    catGrid.innerHTML = Object.entries(state.taskBank).map(([cat, tasks]) => `
        <div class="tron-glow p-5 bg-white">
            <h3 class="mono text-[9px] uppercase text-slate-400 mb-4 tracking-widest">${cat}</h3>
            <div class="flex flex-wrap gap-2">
                ${tasks.map(t => `
                    <button onclick="addToDaily('${t}')" class="text-[10px] border border-gray-100 px-2 py-1 hover:border-cyan-400 hover:text-cyan-500 transition-all">
                        + ${t}
                    </button>
                `).join('')}
            </div>
        </div>
    `).join('');

    // 3. Subscriptions
    const subGrid = document.getElementById('subscription-grid');
    subGrid.innerHTML = state.subscriptions.map(tool => `
        <a href="${tool.url}" target="_blank" class="tron-glow aspect-square flex items-center justify-center text-[8px] mono text-center p-2 grayscale hover:grayscale-0 hover:text-cyan-500">
            ${tool.name}
        </a>
    `).join('');

    // 4. Header Calendar
    const calBar = document.getElementById('calendar-bar');
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const today = days[new Date().getDay()];
    calBar.innerHTML = Object.entries(state.weeklyPlanner).map(([day, info]) => `
        <div class="flex flex-col items-center ${day === today ? 'text-cyan-500' : 'text-slate-300'}">
            <span class="font-bold">${day}</span>
            <div class="w-1 h-1 rounded-full mt-1 ${day === today ? 'bg-cyan-500' : 'bg-transparent'}"></div>
        </div>
    `).join('');
}

// Global Clean-up function
window.removeTask = (task) => {
    state.dailyFocus = state.dailyFocus.filter(t => t !== task);
    save();
};

// Event Listeners
document.getElementById('quick-add').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.value) {
        window.addToDaily(e.target.value);
        e.target.value = '';
    }
});

document.getElementById('study-trigger').onclick = () => window.toggleMode(true);
document.getElementById('exit-focus').onclick = () => window.toggleMode(false);

// Start
render();