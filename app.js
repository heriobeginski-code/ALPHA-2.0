import { appData } from './data.js';

let state = JSON.parse(localStorage.getItem('THE_GRID_V_AURORA')) || appData;

const save = () => {
    localStorage.setItem('THE_GRID_V_AURORA', JSON.stringify(state));
    render();
};

document.addEventListener('click', (e) => {
    const { task, action } = e.target.dataset;
    if (action === 'add' && task) {
        if (!state.dailyFocus.includes(task)) { state.dailyFocus.push(task); save(); }
    }
    if (action === 'remove' && task) {
        state.dailyFocus = state.dailyFocus.filter(t => t !== task); save();
    }
});

const render = () => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const today = days[new Date().getDay()];
    
    document.getElementById('calendar-bar').innerHTML = Object.entries(state.weeklyPlanner).map(([day, info]) => `
        <div class="flex flex-col items-center group cursor-help" title="${info.mission}">
            <span class="${day === today ? 'text-cyan-400 font-bold' : 'text-slate-600'}">${day}</span>
            <div class="w-1 h-1 mt-1 ${day === today ? 'bg-cyan-400 shadow-[0_0_8px_#00E5FF]' : 'bg-transparent'}"></div>
        </div>
    `).join('');

    document.getElementById('daily-list').innerHTML = state.dailyFocus.map(t => `
        <li class="flex justify-between items-center group border-l border-transparent hover:border-cyan-500 pl-3">
            <span class="text-slate-400">${t}</span>
            <button data-task="${t}" data-action="remove" class="opacity-0 group-hover:opacity-100 text-red-500/50 text-[9px]">DELETE</button>
        </li>
    `).join('') || '<li class="text-slate-700 italic text-xs">Standing by...</li>';

    document.getElementById('category-grid').innerHTML = Object.entries(state.taskBank).map(([cat, tasks]) => `
        <div class="tron-glow p-5 rounded-sm">
            <h3 class="mono text-[9px] uppercase text-cyan-500/50 mb-4 tracking-widest">${cat}</h3>
            <div class="flex flex-wrap gap-2">
                ${tasks.map(t => `<button data-task="${t}" data-action="add" class="text-[10px] border border-cyan-900/50 px-2 py-1 text-slate-400 hover:border-cyan-400 hover:text-cyan-400 transition-all">+ ${t}</button>`).join('')}
            </div>
        </div>
    `).join('');

    document.getElementById('subscription-grid').innerHTML = state.subscriptions.map(tool => `
        <a href="${tool.url}" target="_blank" class="tron-glow aspect-square flex items-center justify-center text-[8px] mono text-slate-500 hover:text-cyan-400 text-center p-2">
            ${tool.name}
        </a>
    `).join('');

    document.getElementById('study-nav').innerHTML = state.study.map(s => `
        <button onclick="document.getElementById('subject-title').innerText='${s.name}'; window.open('${s.url}', '_blank');" 
                class="block w-full text-left text-[10px] text-slate-500 hover:text-cyan-400 uppercase mono pl-4 border-l border-cyan-900/50 hover:border-cyan-400 py-1 transition-all">
            ${s.name}
        </button>
    `).join('');
};

document.getElementById('study-trigger').onclick = () => {
    document.getElementById('hub-view').classList.add('hidden');
    document.getElementById('focus-view').classList.remove('hidden');
};
document.getElementById('exit-focus').onclick = () => {
    document.getElementById('hub-view').classList.remove('hidden');
    document.getElementById('focus-view').classList.add('hidden');
};

render();