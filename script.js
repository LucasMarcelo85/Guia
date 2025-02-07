document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            checkbox.parentElement.style.textDecoration = "line-through";
            checkbox.parentElement.style.opacity = "0.6";
        } else {
            checkbox.parentElement.style.textDecoration = "none";
            checkbox.parentElement.style.opacity = "1";
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://127.0.0.1:3000/load') // Alterado para chamar o backend corretamente
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar dados: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.querySelectorAll('.save-state').forEach(checkbox => {
                checkbox.checked = data[checkbox.dataset.id] || false;
            });
        })
        .catch(error => console.error("Erro ao carregar dados:", error));

    document.querySelectorAll('.save-state').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const saveData = {};
            document.querySelectorAll('.save-state').forEach(box => {
                saveData[box.dataset.id] = box.checked;
            });

            fetch('http://127.0.0.1:3000/save', { // Alterado para a URL correta
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saveData)
            })
            .catch(error => console.error('Erro ao salvar dados:', error));
        });
    });
});
