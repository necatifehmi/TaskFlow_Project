document.addEventListener('DOMContentLoaded', () => {
    // DOM Elementleri
    const taskTableBody = document.getElementById('taskTableBody');
    const taskForm = document.getElementById('taskForm');
    const taskModal = document.getElementById('taskModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');

    // Metrik Elementleri
    const statTotal = document.getElementById('statTotal');
    const statPending = document.getElementById('statPending');
    const statCompleted = document.getElementById('statCompleted');
    const taskCountBadge = document.getElementById('taskCountBadge');
    const progressPercentage = document.getElementById('progressPercentage');
    const progressCircle = document.querySelector('.progress-circle-wrapper');

    // Modal Kontrolleri
    const openModal = () => taskModal.classList.add('active');
    const closeModal = () => {
        taskModal.classList.remove('active');
        taskForm.reset();
    };

    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelModalBtn.addEventListener('click', closeModal);

    // --- API İşlemleri ---

    // 1. Tüm Görevleri Getir ve Ekrana Bas
    async function fetchTasks() {
        try {
            const response = await fetch('/api/tasks');
            const tasks = await response.json();
            renderTasks(tasks);
            updateStats(tasks);
        } catch (error) {
            console.error('Görevler çekilirken hata oluştu:', error);
        }
    }

    // Tabloyu Oluşturma
    function renderTasks(tasks) {
        taskTableBody.innerHTML = '';

        if (tasks.length === 0) {
            taskTableBody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; color: var(--text-secondary); padding: 2rem;">
                        Henüz eklenmiş bir görev bulunmuyor.
                    </td>
                </tr>`;
            return;
        }

        tasks.forEach(task => {
            const tr = document.createElement('tr');
            
            // Durum sınıfını belirle
            let statusClass = 'status-yapilacak';
            if (task.status === 'Yapılıyor') statusClass = 'status-yapiliyor';
            if (task.status === 'Tamamlandı') statusClass = 'status-tamamlandi';

            tr.innerHTML = `
                <td><strong>${escapeHtml(task.title)}</strong></td>
                <td><span class="badge">${escapeHtml(task.category)}</span></td>
                <td>
                    <span class="status-badge ${statusClass}" onclick="toggleStatus(${task.id}, '${task.status}')">
                        ${task.status}
                    </span>
                </td>
                <td>
                    <button class="btn-icon" onclick="deleteTask(${task.id})" title="Sil" style="color: var(--color-red);">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            `;
            taskTableBody.appendChild(tr);
        });
    }

    // 2. Yeni Görev Ekleme
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value;
        const category = document.getElementById('taskCategory').value;

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, category })
            });

            if (response.ok) {
                closeModal();
                fetchTasks();
            }
        } catch (error) {
            console.error('Görev eklenirken hata oluştu:', error);
        }
    });

    // 3. Görev Durumunu Değiştirme (Yapılacak -> Yapılıyor -> Tamamlandı)
    window.toggleStatus = async (id, currentStatus) => {
        let newStatus = 'Yapılacak';
        if (currentStatus === 'Yapılacak') newStatus = 'Yapılıyor';
        else if (currentStatus === 'Yapılıyor') newStatus = 'Tamamlandı';

        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                fetchTasks();
            }
        } catch (error) {
            console.error('Durum güncellenirken hata oluştu:', error);
        }
    };

    // 4. Görev Silme
    window.deleteTask = async (id) => {
        if (!confirm('Bu görevi silmek istediğinize emin misiniz?')) return;

        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchTasks();
            }
        } catch (error) {
            console.error('Görev silinirken hata oluştu:', error);
        }
    };

    // 5. Metrik Kartlarını ve Tamamlanma Grafiğini Güncelleme
    function updateStats(tasks) {
        const total = tasks.length;
        const pending = tasks.filter(t => t.status !== 'Tamamlandı').length;
        const completed = tasks.filter(t => t.status === 'Tamamlandı').length;

        statTotal.textContent = total;
        statPending.textContent = pending;
        statCompleted.textContent = completed;
        taskCountBadge.textContent = `${total} Görev`;

        // Yüzde Hesaplama
        const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
        progressPercentage.textContent = `${percentage}%`;

        // Conic Gradient Grafik Güncellemesi
        if (progressCircle) {
            progressCircle.style.background = `conic-gradient(var(--accent-color) ${percentage * 3.6}deg, var(--border-color) 0deg)`;
        }
    }

    // Yardımcı: HTML Enjeksiyonunu Önleme (XSS Koruması)
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // İlk Yüklemede Görevleri Çek
    fetchTasks();
});