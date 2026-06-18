document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const timeDisplay = document.getElementById('timeDisplay');
    const statusText = document.getElementById('statusText');
    const meterContainer = document.getElementById('meterContainer');

    let isRunning = false;
    let timerInterval;
    let secondsElapsed = 0;
    let isSavingModeEnabled = false;

    const DEMO_ORANGE_THRESHOLD = 360;
    const DEMO_RED_THRESHOLD = 480;

    const STATE_COLORS = {
        GOOD: '#0006ff',
        WARNING: '#65ff0b',
        DANGER: '#fe0000'
    };
    let audioCtx = null;
    let hasPlayedSound = false;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function playSubtleBeep() {
        if (!audioCtx) return;

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.5);
    }

    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function updateMeterState(seconds) {
        if (seconds < DEMO_ORANGE_THRESHOLD) {
            document.documentElement.style.setProperty('--current-color', STATE_COLORS.GOOD);
            statusText.textContent = "Ideaal";
        } else if (seconds >= DEMO_ORANGE_THRESHOLD && seconds < DEMO_RED_THRESHOLD) {
            document.documentElement.style.setProperty('--current-color', STATE_COLORS.WARNING);
            statusText.textContent = "Let op";
        } else if (seconds >= DEMO_RED_THRESHOLD) {
            document.documentElement.style.setProperty('--current-color', STATE_COLORS.DANGER);
            statusText.textContent = "Limiet Bereikt";

            if (!hasPlayedSound) {
                playSubtleBeep();
                hasPlayedSound = true;
            }
        }
    }

    function startShower() {
        initAudio();
        isRunning = true;
        hasPlayedSound = false;
        secondsElapsed = 0;

        if (isSavingModeEnabled) {
            document.body.classList.add('saving-mode');
        }

        startBtn.textContent = 'Stop Douche';
        startBtn.classList.add('stop');
        meterContainer.classList.add('active');

        updateMeterState(secondsElapsed);
        timeDisplay.textContent = formatTime(secondsElapsed);

        timerInterval = setInterval(() => {
            secondsElapsed++;
            timeDisplay.textContent = formatTime(secondsElapsed);
            updateMeterState(secondsElapsed);
        }, 1000);
    }

    function stopShower() {
        isRunning = false;
        clearInterval(timerInterval);

        startBtn.textContent = 'Start Douche';
        startBtn.classList.remove('stop');
        meterContainer.classList.remove('active');
        document.body.classList.remove('saving-mode');

        document.documentElement.style.setProperty('--current-color', STATE_COLORS.GOOD);
        statusText.textContent = "Klaar";
    }

    startBtn.addEventListener('click', () => {
        if (isRunning) {
            stopShower();
        } else {
            startShower();
        }
    });

    // CTA button: reuse start/stop logic
    const ctaBtn = document.getElementById('ctaBtn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            // visually press the existing start button for consistent UX
            startBtn.click();
        });
    }

    const statsBtn = document.getElementById('statsBtn');
    const statsOverlay = document.getElementById('statsOverlay');
    const closeStatsBtn = document.getElementById('closeStatsBtn');
    const barChart = document.getElementById('barChart');

    const weeklyData = [
        { dag: 'Ma', seconden: 270 },
        { dag: 'Di', seconden: 390 },
        { dag: 'Wo', seconden: 210 },
        { dag: 'Do', seconden: 480 },
        { dag: 'Vr', seconden: 330 },
        { dag: 'Za', seconden: 540 },
        { dag: 'Zo', seconden: 300 }
    ];

    function getBarColor(seconden) {
        if (seconden < DEMO_ORANGE_THRESHOLD) return 'color-good';
        if (seconden < DEMO_RED_THRESHOLD) return 'color-warning';
        return 'color-danger';
    }

    function getNiceMax(maxVal) {
        if (maxVal <= 5) return 5;
        if (maxVal <= 10) return 10;
        if (maxVal <= 15) return 15;
        return Math.ceil(maxVal / 5) * 5;
    }

    function renderBarChart() {
        barChart.innerHTML = '';
        const yAxis = document.getElementById('yAxis');
        yAxis.innerHTML = '';

        const maxSeconds = Math.max(...weeklyData.map(d => d.seconden));
        const maxMinutes = maxSeconds / 60;
        const niceMax = getNiceMax(maxMinutes);
        const tickCount = 5;
        for (let i = tickCount; i >= 0; i--) {
            const value = Math.round((niceMax / tickCount) * i);
            const label = document.createElement('span');
            label.className = 'y-label';
            label.textContent = `${value}m`;
            label.style.bottom = `${(i / tickCount) * 100}%`;
            yAxis.appendChild(label);
        }

        const dayLabelsContainer = document.getElementById('dayLabels');
        dayLabelsContainer.innerHTML = '';

        const scaleMax = niceMax * 60;

        weeklyData.forEach((item, index) => {
            const column = document.createElement('div');
            column.className = 'bar-column';

            const bar = document.createElement('div');
            bar.className = `bar ${getBarColor(item.seconden)}`;
            const heightPercent = scaleMax > 0 ? (item.seconden / scaleMax) * 100 : 0;
            bar.style.height = '0%';

            const valueLabel = document.createElement('span');
            valueLabel.className = 'bar-value';
            valueLabel.textContent = `${(item.seconden / 60).toFixed(1)}`;
            bar.appendChild(valueLabel);

            const dayLabel = document.createElement('span');
            dayLabel.className = 'bar-label';
            dayLabel.textContent = item.dag;

            column.appendChild(bar);
            barChart.appendChild(column);
            dayLabelsContainer.appendChild(dayLabel);

            setTimeout(() => {
                bar.style.height = `${heightPercent}%`;
            }, 100 + index * 80);
        });

        const totalSec = weeklyData.reduce((sum, d) => sum + d.seconden, 0);
        const avgSec = totalSec / weeklyData.length;
        const bestDay = weeklyData.reduce((best, d) => d.seconden < best.seconden ? d : best);

        document.getElementById('avgTime').textContent = `${(avgSec / 60).toFixed(1)} min`;
        document.getElementById('totalTime').textContent = `${(totalSec / 60).toFixed(0)} min`;
        document.getElementById('bestDay').textContent = `${bestDay.dag} (${(bestDay.seconden / 60).toFixed(1)}m)`;
    }

    function openStats() {
        renderBarChart();
        statsOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeStats() {
        statsOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    statsBtn.addEventListener('click', openStats);
    closeStatsBtn.addEventListener('click', closeStats);

    statsOverlay.addEventListener('click', (e) => {
        if (e.target === statsOverlay) {
            closeStats();
        }
    });

    const infoBtn = document.getElementById('infoBtn');
    const infoOverlay = document.getElementById('infoOverlay');
    const closeInfoBtn = document.getElementById('closeInfoBtn');
    const startFromInfoBtn = document.getElementById('startFromInfoBtn');

    function openInfo() {
        infoOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeInfo() {
        infoOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    infoBtn.addEventListener('click', () => {
        isSavingModeEnabled = !isSavingModeEnabled;
        if (isSavingModeEnabled) {
            infoBtn.textContent = 'Waterbesparing: AAN';
            infoBtn.style.color = 'var(--state-warning)';
            infoBtn.style.borderColor = 'rgba(101, 255, 11, 0.4)';
            if (isRunning) {
                document.body.classList.add('saving-mode');
            } else {
                openInfo();
            }
        } else {
            infoBtn.textContent = 'Waterbesparing';
            infoBtn.style.color = '';
            infoBtn.style.borderColor = '';
            if (isRunning) {
                document.body.classList.remove('saving-mode');
            }
        }
    });

    closeInfoBtn.addEventListener('click', closeInfo);

    startFromInfoBtn.addEventListener('click', () => {
        closeInfo();
        if (!isRunning) {
            startShower();
        }
    });

    infoOverlay.addEventListener('click', (e) => {
        if (e.target === infoOverlay) {
            closeInfo();
        }
    });
});
