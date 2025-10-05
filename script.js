// JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const display = document.getElementById('display');
    const millisecondsDisplay = document.getElementById('milliseconds');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const themeToggle = document.getElementById('themeToggle');
    const lapsContainer = document.getElementById('lapsContainer');
    
    // Stopwatch variables
    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval = null;
    let isRunning = false;
    let lapCount = 0;
    
    // Format time to always show two digits
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
    
    // Update the display with current time
    function updateDisplay() {
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;
        
        // Calculate hours, minutes, seconds, and milliseconds
        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((elapsedTime % 1000));
        
        // Update display
        display.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
        millisecondsDisplay.textContent = `.${milliseconds.toString().padStart(3, '0')}`;
    }
    
    // Start the stopwatch
    function startTimer() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(updateDisplay, 10); // Update every 10ms for smooth milliseconds
            isRunning = true;
            startBtn.disabled = true;
        }
    }
    
    // Stop the stopwatch
    function stopTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.disabled = false;
        }
    }
    
    // Reset the stopwatch
    function resetTimer() {
        stopTimer();
        elapsedTime = 0;
        display.textContent = "00:00:00";
        millisecondsDisplay.textContent = ".000";
        lapCount = 0;
        lapsContainer.innerHTML = '';
    }
    
    // Record a lap time
    function recordLap() {
        if (isRunning) {
            lapCount++;
            const lapTime = display.textContent + millisecondsDisplay.textContent;
            const lapItem = document.createElement('div');
            lapItem.className = 'lap-item';
            lapItem.innerHTML = `
                <span class="lap-number">Lap ${lapCount}</span>
                <span class="lap-time">${lapTime}</span>
            `;
            lapsContainer.prepend(lapItem);
            
            // Auto-scroll to show the latest lap
            lapsContainer.scrollTop = 0;
        }
    }
    
    // Toggle between light and dark themes
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        
        // Save theme preference to localStorage
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('stopwatch-theme', isDarkTheme ? 'dark' : 'light');
    }
    
    // Load saved theme preference
    function loadThemePreference() {
        const savedTheme = localStorage.getItem('stopwatch-theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.textContent = '☀️';
        }
    }
    
    // Event listeners
    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);
    lapBtn.addEventListener('click', recordLap);
    themeToggle.addEventListener('click', toggleTheme);
    
    // Initialize the application
    loadThemePreference();
});