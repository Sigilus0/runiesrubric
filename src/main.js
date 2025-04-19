let counter = 0;
let button2Score = 0;
let button2PressCount = 0;
let button5Score = 0;
let button6Score = 0;
let button6PressCount = 0;
let button7Score = 0;
let button11Score = 0;
let button12Score = 0;

const actionHistory = [];

const counterDisplay = document.getElementById('counter');
const statusDisplay = document.getElementById('status');
const buttonGrid = document.getElementById('buttonGrid');

// Helper: Set a cookie
function setCookie(name, value, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Helper: Get a cookie
function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
}

// Save state
function getAppState() {
  const allButtons = document.querySelectorAll('.button-grid button');
  return {
    counter,
    button2Score,
    button2PressCount,
    button5Score,
    button6Score,
    button6PressCount,
    button7Score,
    button11Score,
    button12Score,
    buttons: Array.from(allButtons).map(btn => ({
      text: btn.textContent,
      active: btn.classList.contains('active'),
      disabled: btn.disabled
    }))
  };
}

function saveState() {
  const state = getAppState();
  setCookie('buttonAppState', JSON.stringify(state));
}

// Load state
function loadStateFromData(parsed) {
  counter = parsed.counter;
  button2Score = parsed.button2Score;
  button2PressCount = parsed.button2PressCount;
  button5Score = parsed.button5Score;
  button6Score = parsed.button6Score;
  button6PressCount = parsed.button6PressCount;
  button7Score = parsed.button7Score;
  button11Score = parsed.button11Score;
  button12Score = parsed.button12Score;

  const buttons = document.querySelectorAll('.button-grid button');
  parsed.buttons.forEach((btnState, i) => {
    const btn = buttons[i];
    btn.textContent = btnState.text;
    btn.disabled = btnState.disabled;
    if (btnState.active) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  updateDisplay();
}

function loadState() {
  const state = getCookie('buttonAppState');
  if (!state) return;
  try {
    const parsed = JSON.parse(state);
    loadStateFromData(parsed);
  } catch (e) {
    console.error('Failed to load state from cookie:', e);
  }
}

// Button setup
for (let i = 1; i <= 16; i++) {
  const btn = document.createElement("button");
  btn.textContent = `Button ${i}`;
  btn.dataset.index = i;

  switch (i) {
    case 1: {
      btn.textContent = 'Cold Open';
      btn.addEventListener("click", function () {
        const was1Active = btn.classList.contains('active');
        btn.classList.toggle('active');
        counter += was1Active ? -10 : 10;
        btn.textContent = was1Active ? `Cold Open` : "Cold Open (10)";

        actionHistory.push({type: 1, added: !was1Active});
        updateDisplay();
        saveState();
      });
      break;
    }
    case 2: {
      btn.textContent = 'Mundane Tasks';
      btn.addEventListener("click", function () {
        button2PressCount++;
        button2Score += button2PressCount;
        counter += button2PressCount;
        btn.textContent = `Mundane Tasks (${button2Score})`;

        actionHistory.push({type: 2, score: button2Score, count: button2PressCount});
        updateDisplay();
        saveState();
      });
      break;
    }
    case 3: {
      btn.textContent = 'Dreams / Hallucinations';
      btn.addEventListener("click", function () {
        const was3Active = btn.classList.contains('active');
        btn.classList.toggle('active');
        let button3Score = 0;
        const b10 = document.querySelector('[data-index="10"]');
        b10.classList.contains('active') ? button3Score = 10 : button3Score = 3
        counter += was3Active ? -button3Score : button3Score;
        btn.textContent = was3Active ? `Dreams / Hallucinations` : `Dreams / Hallucinations (${button3Score})`;
        if (was3Active && b10.classList.contains('active')) b10.textContent = `No Rules Monster (5)`;

        actionHistory.push({type: 3, added: !was3Active, score: button3Score});
        updateDisplay();
        saveState();
      });
      break;
    }
    case 4: {
        btn.textContent = 'Forced Bad End';
        btn.addEventListener("click", function () {
          const was4Active = btn.classList.contains('active');
          btn.classList.toggle('active');
          counter += was4Active ? -3 : 3;
          btn.textContent = was4Active ? `Forced Bad End` : "Forced Bad End (3)";

          actionHistory.push({type: 4, added: !was4Active});
          updateDisplay();
          saveState();
        });
      break;
      }
    case 5: {
        btn.textContent = 'Non-Puzzles';
        btn.addEventListener("click", function () {
          button5Score++;
          counter++;
          btn.textContent = `Non-Puzzles (${button5Score})`;

          actionHistory.push({type: 5, count: button5Score});
          updateDisplay();
          saveState();
        });
      break;
      }
    case 6: {
      btn.textContent = 'Cheap Popscares';
      btn.addEventListener("click", function () {
        button6PressCount++;
        button6Score += button6PressCount;
        counter += button6PressCount;
        btn.textContent = `Cheap Popscares (${button6Score})`;

        actionHistory.push({type: 6, score: button6Score, count: button6PressCount});
        updateDisplay();
        saveState();
      });
      break;
    }
    case 7: {
      btn.textContent = 'Stoopid Steam Achievements';
      btn.addEventListener("click", function () {
        button7Score++;
        counter++;
        btn.textContent = `Stoopid Steam Achievements (${button7Score})`;

        actionHistory.push({type: 7, count: button7Score});
        updateDisplay();
        saveState();
      });
      break;
    }
    case 8: {
      btn.textContent = 'Everyone\'s Creepy';
      btn.addEventListener("click", function () {
        const was8Active = btn.classList.contains('active');
        btn.classList.toggle('active');
        counter += was8Active ? -3 : 3;
        btn.textContent = was8Active ? `Everyone\'s Creepy` : "Everyone\'s Creepy (3)";

        actionHistory.push({type: 8, added: !was8Active});
        updateDisplay();
        saveState();
      });
      break;
    }
    case 9: {
      btn.textContent = 'Maze Chases';
      btn.addEventListener("click", function () {
        const was9Active = btn.classList.contains('active');
        btn.classList.toggle('active');
        counter += was9Active ? -4 : 4;
        btn.textContent = was9Active ? `Maze Chases` : "Maze Chases (4)";

        actionHistory.push({type: 9, added: !was9Active});
        updateDisplay();
        saveState();
      });
      break;
    }
    case 10: {
        btn.textContent = 'No Rules Monster';
        btn.addEventListener("click", function () {
          const was10Active = btn.classList.contains('active');
          btn.classList.toggle('active');
          let button10Score = 0;
          const b3 = document.querySelector('[data-index="3"]');
          b3.classList.contains('active') ? button10Score = 12 : button10Score = 5
          counter += was10Active ? -button10Score : button10Score;
          btn.textContent = was10Active ? `No Rules Monster` : `No Rules Monster (${button10Score})`;
          if (was10Active && b3.classList.contains('active')) b3.textContent = `Dreams / Hallucinations (3)`;

          actionHistory.push({type: 10, added: !was10Active, score: button10Score});
          updateDisplay();
          saveState();
        });
      break;
      }
    case 11: {
        btn.textContent = 'Generic +1';
        btn.addEventListener("click", function () {
          button11Score++;
          counter++;
          btn.textContent = `Generic +1 (${button11Score})`;

          actionHistory.push({type: 11, count: button11Score});
          updateDisplay();
          saveState();
        });
      break;
      }
    case 12: {
        btn.textContent = 'Generic -1';
        btn.addEventListener("click", function () {
          button12Score--;
          counter--;
          btn.textContent = `Generic -1 (${button12Score})`;

          actionHistory.push({type: 12, count: button12Score});
          updateDisplay();
          saveState();
        });
      break;
      }
    case 13: {
        btn.textContent = 'Undo';
        btn.addEventListener('click', () => {
          if (actionHistory.length === 0) return;
          const lastAction = actionHistory.pop();

          switch (lastAction.type) {
            case 1: {
              const target = document.querySelector('[data-index="1"]');
              target.classList.toggle('active');
              counter += lastAction.added ? -10 : 10;
              target.textContent = lastAction.added ? `Cold Open` : "Cold Open (10)";
              break;
            }
            case 2: {
              counter -= lastAction.count;
              button2Score -= lastAction.count;
              button2PressCount--;

              const b2 = document.querySelector('[data-index="2"]');
              b2.textContent = button2Score > 0 ? `Mundane Tasks (${button2Score})` : "Mundane Tasks";
              break;
            }
            case 3: {
              const target = document.querySelector('[data-index="3"]');
              target.classList.toggle('active');
              counter += lastAction.added ? -lastAction.score : lastAction.score;
              target.textContent = lastAction.added ? `Dreams / Hallucinations` : `Dreams / Hallucinations (${lastAction.score})`;
              break;
            }
            case 4: {
              const target = document.querySelector('[data-index="4"]');
              target.classList.toggle('active');
              counter += lastAction.added ? -3 : 3;
              target.textContent = lastAction.added ? `Forced Bad End` : "Forced Bad End (3)";
              break;
            }
            case 5: {
              button5Score--;
              counter--;
              const b5 = document.querySelector('[data-index="5"]');
              b5.textContent = button5Score > 0 ? `Non-Puzzles (${button5Score})` : "Non-Puzzles";
              break;
            }
            case 6: {
              counter -= lastAction.count;
              button6Score -= lastAction.count;
              button6PressCount--;

              const b6 = document.querySelector('[data-index="6"]');
              b6.textContent = button6Score > 0 ? `Cheap Popscares (${button6Score})` : "Cheap Popscares";
              break;
            }
            case 7: {
              button7Score--;
              counter--;
              const b7 = document.querySelector('[data-index="7"]');
              b7.textContent = button7Score > 0 ? `Stoopid Steam Achievements (${button7Score})` : "Stoopid Steam Achievements";
              break;
            }
            case 8: {
              const target = document.querySelector('[data-index="8"]');
              target.classList.toggle('active');
              counter += lastAction.added ? -3 : 3;
              target.textContent = lastAction.added ? `Everyone\'s Creepy` : "Everyone\'s Creepy (3)";
              break;
            }
            case 9: {
              const target = document.querySelector('[data-index="9"]');
              target.classList.toggle('active');
              counter += lastAction.added ? -4 : 4;
              target.textContent = lastAction.added ? `Maze Chases` : "Maze Chases (4)";
              break;
            }
            case 10: {
              const target = document.querySelector('[data-index="10"]');
              target.classList.toggle('active');
              counter += lastAction.added ? -lastAction.score : lastAction.score;
              target.textContent = lastAction.added ? `No Rules Monster` : `No Rules Monster (${lastAction.score})`;
              break;
            }
            case 11: {
              button11Score--;
              counter--;
              const b11 = document.querySelector('[data-index="11"]');
              b11.textContent = button11Score > 0 ? `Generic +1 (${button11Score})` : "Generic +1";
              break;
            }
            case 12: {
              button12Score++;
              counter++;
              const b12 = document.querySelector('[data-index="12"]');
              b12.textContent = button12Score < 0 ? `Generic -1 (${button12Score})` : "Generic -1";
              break;
            }
            case 14: {
              loadStateFromData(lastAction.previousState);
              break;
            }
            default:
              console.warn("Unknown undo action:", lastAction);
          }

          updateDisplay();
          saveState();
        });
      break;
      }
    case 14: {
        btn.textContent = `Reset`;
        btn.addEventListener("click", function () {
          //Save current for undo
          const previousState = getAppState();
          actionHistory.push({type: 14, previousState});

          // Reset specific states
          counter = 0;
          button2Score = 0;
          button2PressCount = 0;
          button5Score = 0;
          button6Score = 0;
          button6PressCount = 0;
          button7Score = 0;
          button11Score = 0;
          button12Score = 0;

          // Reset all button states
          const allButtons = document.querySelectorAll('.button-grid button');
          allButtons.forEach((b, idx) => {
            b.classList.remove('active');
            b.disabled = false;
          });
          document.querySelector('[data-index="1"]').textContent = 'Cold Open';
          document.querySelector('[data-index="2"]').textContent = 'Mundane Tasks';
          document.querySelector('[data-index="3"]').textContent = 'Dreams / Hallucinations';
          document.querySelector('[data-index="4"]').textContent = 'Forced Bad End';
          document.querySelector('[data-index="5"]').textContent = 'Non-Puzzles';
          document.querySelector('[data-index="6"]').textContent = 'Cheap Popscares';
          document.querySelector('[data-index="7"]').textContent = 'Stoopid Steam Achievements';
          document.querySelector('[data-index="8"]').textContent = `Everyone\'s Creepy`;
          document.querySelector('[data-index="9"]').textContent = `Maze Chases`;
          document.querySelector('[data-index="10"]').textContent = 'No Rules Monster';
          document.querySelector('[data-index="11"]').textContent = 'Generic +1';
          document.querySelector('[data-index="12"]').textContent = 'Generic -1';


          updateDisplay();
          saveState();
        });
      break;
      }
    case 15: {
        // Download state with filename prompt
        btn.textContent = `Download Save`;
        btn.addEventListener('click', () => {
          const state = getAppState();
          let filename = prompt("Enter a name for your saved state:", "button-app-state");

          if (filename === null) return; // User cancelled
          filename = filename.trim() || "button-app-state";
          if (!filename.endsWith(".json")) filename += ".json";

          const blob = new Blob([JSON.stringify(state, null, 2)], {type: 'application/json'});
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          URL.revokeObjectURL(url);
        });
        break;
      }
      case 16: {
        // Upload state
        btn.textContent = `Upload Save`;
        btn.addEventListener('click', () => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.json';
          input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function (event) {
              try {
                const uploadedState = JSON.parse(event.target.result);
                loadStateFromData(uploadedState);
                saveState(); // Save the uploaded state to cookie too
              } catch (err) {
                alert('Invalid state file.');
              }
            };
            reader.readAsText(file);
          });
          input.click();
        });
        break;
      }
    default:
      console.warn("Unknown button initialization");
  }
  buttonGrid.appendChild(btn);
}

function updateDisplay() {
  let failedScore = 25;
  counterDisplay.textContent = `Score: ${counter} / ${failedScore}`;
  const isPass = counter < failedScore;
  statusDisplay.textContent = `Status: ${isPass ? 'Not Dropped' : 'Dropped'}`;
  statusDisplay.classList.remove('status-pass', 'status-fail');
  statusDisplay.classList.add(isPass ? 'status-pass' : 'status-fail');
}

// Load saved state on startup
loadState();
updateDisplay();