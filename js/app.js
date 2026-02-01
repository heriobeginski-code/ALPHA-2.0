// We add a cache-buster (?v=1) to the import to force GitHub to load the new version
import { appData } from './data.js?v=1.1';

// 1. CLEAR STUCK STATE: If the site looks broken, we check for valid data
let savedData = localStorage.getItem('THE_GRID_USER_DATA');
let state;

try {
    state = savedData ? JSON.parse(savedData) : appData;
    // If state is empty because of a bad previous deploy, reset it
    if (!state || !state.taskBank) state = appData;
} catch (e) {
    state = appData;
}

function save() {
    localStorage.setItem('THE_GRID_USER_DATA', JSON.stringify(state));
    render();
}

// Global actions attached to window so HTML buttons can see them
window.addToDaily = (item) => {
    if (!state.dailyFocus.includes(item)) {
        state.dailyFocus.push(item);
        save();
    }
};

window.removeTask = (task) => {
    state.dailyFocus = state.dailyFocus.filter(t => t !== task);
    save();
};

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

function render() {
    // Render Daily Focus
    const dailyList = document.getElementById('daily-list');
    if (dailyList) {
        dailyList.innerHTML = state.dailyFocus.length 
            ? state.dailyFocus.map(task => `
                <li class="flex items-center justify-between group border-l-2 border-transparent hover:border-cyan-400 pl-2 transition-all">
                    <span class="text-slate-600">${task}</span>
                    <button onclick="removeTask('${task}')" class="opacity-0 group-hover:opacity-100 text-[10px] text-red-300">REMOVE</button>
                </li>
            `).join('')
            : `<li class="text-slate-300 italic text-xs">Waiting for commands...</li>`;
    }

    // Render Categories
    const catGrid = document.getElementById('category-grid');
    if (catGrid) {
        catGrid.innerHTML = Object.entries(state.taskBank).map(([cat, tasks]) => `
            <div class="tron-glow p-5 bg-white rounded-sm">
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
    }

    // Render Subscriptions
    const subGrid = document.getElementById('subscription-grid');
    if (subGrid) {
        subGrid.innerHTML = state.subscriptions.map(tool => `
            <a href="${tool.url}" target="_blank" class="tron-glow aspect-square flex items-center justify-center text-[8px] mono text-center p-2 grayscale hover:grayscale-0 hover:text-cyan-500">
                ${tool.name}
            </a>
        `).join('');
    }
}

// Quick Add Listener
const quickAdd = document.getElementById('quick-add');
if (quickAdd) {
    quickAdd.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value) {
            window.addToDaily(e.target.value);
            e.target.value = '';
        }
    });
}

// Initial Run
document.addEventListener('DOMContentLoaded', render);