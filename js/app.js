import { appData } from './data.js';

console.log("ENGINE: Data module detected.");

const init = () => {
    try {
        const state = appData;
        console.log("ENGINE: State initialized with", state.subscriptions.length, "tools.");
        
        // Render Function
        const render = () => {
            const grid = document.getElementById('category-grid');
            if (!grid) throw new Error("DOM Element #category-grid not found");
            
            grid.innerHTML = Object.entries(state.taskBank).map(([cat, tasks]) => `
                <div class="tron-glow p-5 bg-white">
                    <h3 class="mono text-[9px] uppercase text-slate-400 mb-4">${cat}</h3>
                    <div class="flex flex-wrap gap-2">
                        ${tasks.map(t => `<button class="text-[10px] border border-gray-100 px-2 py-1">${t}</button>`).join('')}
                    </div>
                </div>
            `).join('');
            
            // Populate Tools
            const toolGrid = document.getElementById('subscription-grid');
            if (toolGrid) {
                toolGrid.innerHTML = state.subscriptions.map(s => `
                    <div class="tron-glow p-2 text-[8px] mono text-center">${s.name}</div>
                `).join('');
            }
        };

        render();
    } catch (err) {
        console.error("ENGINE_CRASH:", err);
        document.body.innerHTML += `<div style="position:fixed; bottom:0; left:0; background:red; color:white; padding:10px; font-family:monospace; z-index:9999">ERROR: ${err.message}</div>`;
    }
};

// Wait for DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}