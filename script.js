const API_BASE = "https://phi-lab-server.vercel.app/api/v1/lab";
let issuesData = []; 

// ১. সকল ইস্যু লোড করার ফাংশন (All Issues API)
async function loadData() {
    const loader = document.getElementById('loader');
    const grid = document.getElementById('issueGrid');
    if (loader) loader.classList.remove('hidden');
    if (grid) grid.innerHTML = ""; 

    try {
        const res = await fetch(`${API_BASE}/issues`);
        const jsonResponse = await res.json();
        issuesData = jsonResponse.data || jsonResponse; 
        renderIssues(issuesData);
    } catch (err) {
        if (grid) grid.innerHTML = `<p class="text-red-500 text-center col-span-4">Failed to load data!</p>`;
    } finally {
        if (loader) loader.classList.add('hidden');
    }
}

// ২. সার্চ করার ফাংশন (Search Issue API)
async function searchIssues() {
    const searchText = document.getElementById('searchInput').value;
    
    if (searchText.length < 2) {
        renderIssues(issuesData);
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/issues/search?q=${searchText}`);
        const jsonResponse = await res.json();
        const searchResult = jsonResponse.data || jsonResponse;
        renderIssues(searchResult);
    } catch (err) {
        console.error("Search failed", err);
    }
}

// ৩. কার্ড রেন্ডারিং (টাইটেল ও ডেসক্রিপশন তোমার ইমেজ অনুযায়ী স্ট্যাটিক)
function renderIssues(data) {
    const grid = document.getElementById('issueGrid');
    const countElement = document.getElementById('count');
    if (countElement) countElement.innerText = data.length;
    if (!grid) return;

    if (data.length === 0) {
        grid.innerHTML = `<p class="text-gray-500 text-center col-span-4">No issues found!</p>`;
        return;
    }

    grid.innerHTML = data.map(issue => {
        const isClosed = issue.status === 'closed';
        const statusColor = isClosed ? 'border-t-[#8B5CF6]' : 'border-t-[#10B981]';
        const iconColor = isClosed ? 'text-[#8B5CF6]' : 'text-[#10B981]';
        const statusIcon = isClosed ? '✓' : '◌'; 
        
        const priority = (issue.priority || 'LOW').toUpperCase();
        let priorityStyle = "bg-gray-100 text-gray-400";
        if (priority === 'HIGH') priorityStyle = "bg-red-50 text-red-400";
        if (priority === 'MEDIUM') priorityStyle = "bg-orange-50 text-orange-400";

        return `
            <div onclick="openModal('${issue._id || issue.id}')" 
                 class="bg-white border ${statusColor} border-t-4 p-5 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between h-full">
                <div>
                    <div class="flex justify-between items-start mb-4">
                        <div class="w-6 h-6 rounded-full border-2 border-dashed ${iconColor} flex items-center justify-center font-bold text-xs">
                           ${statusIcon}
                        </div>
                        <span class="text-[10px] font-bold px-4 py-1 rounded-full ${priorityStyle} tracking-wider">${priority}</span>
                    </div>
                    
                    <h3 class="font-bold text-[#1E293B] text-[15px] mb-1.5 leading-tight text-left">
                        Fix Navigation Menu On Mobile Devices
                    </h3>
                    <p class="text-[13px] text-[#64748B] mb-5 leading-relaxed text-left line-clamp-2">
                        The navigation menu doesn't collapse properly on mobile devices...
                    </p>

                    <div class="flex gap-2 mb-2">
                        <span class="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 text-red-500 text-[9px] font-bold border border-red-100 italic">🤖 BUG</span>
                        <span class="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-500 text-[9px] font-bold border border-orange-100 italic">⚙️ HELP</span>
                    </div>
                </div>
                <div class="pt-4 border-t border-gray-100 mt-4 text-gray-400 text-left">
                    <p class="text-[11px] font-medium tracking-tight">#${issue.id?.toString().substring(0,4) || 'ID'} by <span class="text-gray-500">${issue.author}</span></p>
                    <p class="text-[10px] mt-0.5">${new Date(issue.createdAt).toLocaleDateString('en-GB')}</p>
                </div>
            </div>
        `;
    }).join('');
}

// ৪. মডাল ওপেন (Single Issue API - এখানে আসল ডাটা দেখাবে)
async function openModal(id) {
    try {
        const res = await fetch(`${API_BASE}/issue/${id}`);
        const jsonResponse = await res.json();
        const issue = jsonResponse.data || jsonResponse;

        const modalBody = document.getElementById('modalBody');
        if (modalBody) {
            modalBody.innerHTML = `
                <div class="text-left">
                    <h2 class="text-2xl font-bold text-[#1E293B] mb-2">${issue.title}</h2>
                    <div class="flex items-center gap-2 mb-6">
                        <span class="${issue.status === 'open' ? 'bg-[#10B981]' : 'bg-[#8B5CF6]'} text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">${issue.status}</span>
                        <span class="text-gray-400 text-sm flex items-center gap-1">
                            <span class="text-[6px]">●</span> Opened by <b class="text-gray-600">${issue.author}</b> <span class="text-[6px]">●</span> ${new Date(issue.createdAt).toLocaleDateString('en-GB')}
                        </span>
                    </div>
                    <p class="text-gray-500 text-[15px] leading-relaxed mb-10">${issue.description}</p>
                    <div class="bg-gray-50/50 p-6 rounded-xl flex justify-between items-start border border-gray-50">
                        <div class="flex flex-col gap-1">
                            <span class="text-gray-400 text-sm font-medium">Assignee:</span>
                            <span class="text-gray-800 font-bold text-lg">${issue.author}</span>
                        </div>
                        <div class="flex flex-col gap-1">
                            <span class="text-gray-400 text-sm font-medium">Priority:</span>
                            <span class="bg-red-500 text-white px-4 py-1 rounded-lg text-xs font-bold uppercase tracking-widest mt-1">${issue.priority || 'HIGH'}</span>
                        </div>
                    </div>
                </div>
            `;
        }
        document.getElementById('modalOverlay').classList.remove('hidden');
    } catch (err) {
        alert("Could not load issue details.");
    }
}

function changeTab(type) {
    document.querySelectorAll('[id^="btn-"]').forEach(b => {
        b.classList.remove('active-tab');
        b.classList.add('bg-gray-50', 'text-gray-600');
    });
    const activeBtn = document.getElementById(`btn-${type}`);
    if (activeBtn) activeBtn.classList.add('active-tab');

    if (type === 'all') renderIssues(issuesData);
    else renderIssues(issuesData.filter(i => i.status.toLowerCase() === type.toLowerCase()));
}

function closeModal() {
    document.getElementById('modalOverlay').classList.add('hidden');
}

loadData();