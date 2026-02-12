import './style.css';

document.getElementById('save-btn').addEventListener('click', async () => {
    const diaryData = {
        entry_date: document.getElementById('date').value,
        mood_score: parseInt(document.getElementById('mood').value),
        notes: document.getElementById('notes').value
    };

    try {
        const response = await fetch('/api/entry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(diaryData),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Entry saved!');
        } else {
            alert('Error: ' + result.error);
        }
    } catch (err) {
        console.error('Fetch error:', err);
    }
});
