document.addEventListener('DOMContentLoaded', () => {
    const stateStart = document.getElementById('state-start');
    const statePlay = document.getElementById('state-play');
    const stateEnd = document.getElementById('state-end');
    
    const btnStart = document.getElementById('btn-start');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');
    
    const powerBar = document.getElementById('power-bar');
    const powerText = document.getElementById('power-text');
    const errorMsg = document.getElementById('error-msg');
    
    const timeElement = document.querySelector('#status-bar div:first-child');

    let powerLevel = 0;
    let lastFoot = null;
    let drainInterval = null;

    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        if (timeElement) {
            timeElement.innerText = `${hours}:${minutes}`;
        }
    }
    
    setInterval(updateClock, 1000);
    updateClock();

    btnStart.addEventListener('click', () => {
        stateStart.classList.add('hidden');
        statePlay.classList.remove('hidden');
        startGameLoop();
    });

    function startGameLoop() {
        drainInterval = setInterval(() => {
            if (powerLevel > 0) {
                powerLevel -= 0.6;
                updateUI();
            }
        }, 100);
    }

    function takeStep(foot) {
        if (foot === lastFoot) {
            showError();
            powerLevel = Math.max(0, powerLevel - 8);
        } else {
            powerLevel += 4.5;
            lastFoot = foot;
            
            const btn = foot === 'left' ? btnLeft : btnRight;
            btn.style.borderColor = '#2E5BFF';
            btn.style.boxShadow = '0 0 40px rgba(46,91,255,0.6)';
            btn.style.backgroundColor = 'rgba(46,91,255,0.1)';
            setTimeout(() => {
                btn.style.borderColor = 'rgba(255,255,255,0.1)';
                btn.style.boxShadow = 'none';
                btn.style.backgroundColor = 'transparent';
            }, 180);
        }

        if (powerLevel >= 100) {
            powerLevel = 100;
            triggerEndState();
        }
        updateUI();
    }

    function updateUI() {
        powerText.innerText = Math.floor(powerLevel) + '%';
        powerBar.style.width = powerLevel + '%';
        
        if(powerLevel > 85) {
            powerBar.style.backgroundColor = '#00FFFF';
            powerBar.style.boxShadow = '0 0 40px rgba(0, 255, 255, 1)';
        } else {
            powerBar.style.backgroundColor = '#2E5BFF';
            powerBar.style.boxShadow = '0 0 35px rgba(46, 91, 255, 1)';
        }
    }

    function showError() {
        errorMsg.style.opacity = '1';
        setTimeout(() => {
            errorMsg.style.opacity = '0';
        }, 900);
    }

    function triggerEndState() {
        clearInterval(drainInterval);
        setTimeout(() => {
            statePlay.classList.add('hidden');
            stateEnd.classList.remove('hidden');
        }, 350);
    }

    btnLeft.addEventListener('click', () => takeStep('left'));
    btnRight.addEventListener('click', () => takeStep('right'));
});