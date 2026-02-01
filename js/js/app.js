import { appData } from './data.js';

let state = JSON.parse(localStorage.getItem('gridTasks')) || { ...appData, dailyFocus: [] };

const save = () => {
    localStorage.setItem('gridTasks', JSON.stringify(state));
    render();
};

const render = () => {
    // 1. Calendar
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const today = days[new Date().getDay()];
    document.getElementById('calendar-bar').innerHTML = Object.keys(state.weeklyPlanner).map(day => `
        <span class="${day === today ? 'text-cyan-400 font-bold' : 'text-slate-700'}">${day}</span>
    `).join('');

    // 2. Battlefield
    document.getElementById('daily-list').innerHTML = (state.dailyFocus || []).map(t => `
        <li class="flex justify-between items-center text-slate-400 text-xs border-l border-cyan-900 pl-2">
            ${t} <button onclick="window.removeTask('${t}')" class="text-red-500/40 text-[9px] hover:text-red-400">X</button>
        </li>
    `).join('') || '<li class="text-slate-800 italic text-[10px]">NO_DATA_LINKED</li>';

    // 3. Task Categories
    document.getElementById('category-grid').innerHTML = Object.entries(state.taskBank).map(([cat, tasks]) => `
        <div class="tron-glow p-4 rounded-sm">
            <h3 class="mono text-[9px] text-cyan-500/40 mb-3 uppercase tracking-widest font-bold">${cat}</h3>
            <div class="flex flex-wrap gap-2">
                ${tasks.map(t => `<button onclick="window.addTask('${t}')" class="text-[10px] border border-cyan-900/40 px-2 py-1 hover:border-cyan-400 text-slate-400 font-light">+ ${t}</button>`).join('')}
            </div>
        </div>
    `).join('');

    // 4. Armory Icons
    document.getElementById('subscription-grid').innerHTML = state.subscriptions.map(tool => `
        <a href="${tool.url}" target="_blank" class="tron-glow aspect-square flex items-center justify-center text-[7px] mono text-slate-500 hover:text-cyan-400 text-center p-1 uppercase leading-tight">
            ${tool.name}
        </a>
    `).join('');
};

// Global Exposure
window.addTask = (t) => { 
    if(!state.dailyFocus.includes(t)) { 
        state.dailyFocus.push(t); 
        save();
    } 
};

window.removeTask = (t) => { 
    state.dailyFocus = state.dailyFocus.filter(x => x !== t); 
    save();
};

// Quick Input
document.getElementById('quick-add').addEventListener('keypress', (e) => {
    if(e.key === 'Enter' && e.target.value) {
        window.addTask(e.target.value.trim());
        e.target.value = '';
    }
});

render();