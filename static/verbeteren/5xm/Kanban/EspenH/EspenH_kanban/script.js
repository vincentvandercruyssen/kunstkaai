// global state helpers
const columnIds = ['backlog', 'in-progress', 'done'];
const MAX_PER_COLUMN = 5; // limit for each column
let draggedItem = null;

const board = document.querySelector('.kanban-board');

// --- initialization ----------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
    loadBoard();
    attachBoardListeners();
    attachControlListeners();
    updateCounts();
    attachListObservers();
});

// creates a task element and wires events
// creates a task element and wires events
function createTask(text, columnId, color) {
    const item = document.createElement('div');
    item.className = 'kanban-item';
    item.draggable = true;
    item.setAttribute('role', 'listitem');
    item.dataset.id = Date.now(); // simple unique id

    // wrap the text so we can easily update it without affecting buttons
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = text;
    item.appendChild(span);

    if (color) {
        item.style.backgroundColor = color;
        item.dataset.color = color;
    }
    addDragHandlers(item);
    return item;
}

// wire drag events to a single task element
function addDragHandlers(item) {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
}

// open inline editor for a task item
function openInlineEditor(item) {
    if (item.querySelector('.task-editor')) return; // already editing
    item.draggable = false;
    const text = item.querySelector('.task-text').textContent.trim();
    const color = item.dataset.color || '#dddddd';

    const editor = document.createElement('div');
    editor.className = 'task-editor';

    const input = document.createElement('input');
    input.type = 'text';
    input.value = text;
    input.className = 'editor-input';

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = color;
    colorInput.className = 'editor-color';

    const save = document.createElement('button');
    save.className = 'save-btn';
    save.textContent = 'Save';

    const cancel = document.createElement('button');
    cancel.className = 'cancel-btn';
    cancel.textContent = 'Cancel';

    editor.appendChild(input);
    editor.appendChild(colorInput);
    editor.appendChild(save);
    editor.appendChild(cancel);

    // hide current text and append editor
    item.querySelector('.task-text').style.display = 'none';
    item.appendChild(editor);

    input.focus();

    save.addEventListener('click', () => {
        const newText = input.value.trim();
        const newColor = colorInput.value;
        if (newText) item.querySelector('.task-text').textContent = newText;
        item.style.backgroundColor = newColor;
        item.dataset.color = newColor;
        closeInlineEditor(item);
        saveBoard();
        updateCounts();
    });

    cancel.addEventListener('click', () => {
        closeInlineEditor(item);
    });

    // pressing Enter saves, Esc cancels
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') save.click();
        if (e.key === 'Escape') cancel.click();
    });
}

function closeInlineEditor(item) {
    const editor = item.querySelector('.task-editor');
    if (!editor) return;
    editor.remove();
    const span = item.querySelector('.task-text');
    if (span) span.style.display = '';
    item.draggable = true;
}

function attachBoardListeners() {
    // drag/drop delegation on lists
    board.addEventListener('dragenter', e => {
        if (e.target.classList.contains('kanban-list')) {
            e.target.classList.add('over');
        }
    });
    board.addEventListener('dragleave', e => {
        if (e.target.classList.contains('kanban-list')) {
            e.target.classList.remove('over');
        }
    });
    board.addEventListener('dragover', e => {
        if (!e.target.classList.contains('kanban-list')) return;
        const list = e.target;
        // prevent dragging into a full column from another column
        if (list.children.length >= MAX_PER_COLUMN && list !== draggedItem.parentElement) {
            return;
        }
        e.preventDefault();
        const after = getDragAfterElement(list, e.clientY);
        if (after == null) {
            list.appendChild(draggedItem);
        } else {
            list.insertBefore(draggedItem, after);
        }
        // update counts live while dragging
        updateCounts();
    });
    board.addEventListener('drop', e => {
        if (e.target.classList.contains('kanban-list')) {
            const list = e.target;
            e.target.classList.remove('over');
            // if we've somehow exceeded the limit, move back and alert
            if (list.children.length > MAX_PER_COLUMN && list !== draggedItem.parentElement) {
                alert('Cannot move task: destination column is full');
                draggedItem.parentElement.appendChild(draggedItem);
            }
            saveBoard();
            updateCounts();
        }
    });

    // click delegation for edit/delete
    board.addEventListener('click', e => {
        if (e.target.classList.contains('delete-btn')) {
            const item = e.target.closest('.kanban-item');
            item.remove();
            saveBoard();
            updateCounts();
        }
        if (e.target.classList.contains('edit-btn')) {
            const item = e.target.closest('.kanban-item');
            openInlineEditor(item);
        }
    });

    board.addEventListener('dblclick', e => {
        const item = e.target.closest('.kanban-item');
        if (item) {
            openInlineEditor(item);
        }
    });
}

// attach mutation observers to lists so counts update immediately
function attachListObservers() {
    const observer = new MutationObserver(debounce(() => {
        updateCounts();
    }, 50));

    columnIds.forEach(id => {
        const list = document.getElementById(id + '-list');
        if (list) observer.observe(list, { childList: true, subtree: false });
    });
}

// simple debounce utility
function debounce(fn, wait) {
    let t;
    return function(...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}

function attachControlListeners() {
    document.getElementById('add-task-btn').addEventListener('click', () => {
        const input = document.getElementById('new-task-input');
        const colorInput = document.getElementById('new-task-color');
        const text = input.value.trim();
        const color = colorInput.value;
        const backlogList = document.getElementById('backlog-list');
        if (backlogList.children.length >= MAX_PER_COLUMN) {
            alert('Backlog is full (max ' + MAX_PER_COLUMN + ' tasks)');
            return;
        }
        if (text) {
            addTask(text, 'backlog', color);
            input.value = '';
            colorInput.value = '#dddddd';
            updateCounts();
        }
    });
    document.getElementById('new-task-input').addEventListener('keyup', e => {
        if (e.key === 'Enter') document.getElementById('add-task-btn').click();
    });
    document.getElementById('reset-board-btn').addEventListener('click', () => {
        if (confirm('Remove all tasks?')) {
            columnIds.forEach(id => {
                document.getElementById(id + '-list').innerHTML = '';
            });
            // clear storage so loadBoard starts empty
            localStorage.removeItem('kanbanBoard');
            updateCounts();
            // reload to ensure fresh initial state (no leftover event handlers)
            setTimeout(() => location.reload(), 80);
        }
    });
}

function addTask(text, columnId, color) {
    const list = document.getElementById(columnId + '-list');
    if (list.children.length >= MAX_PER_COLUMN) {
        // shouldn't really happen if callers check, but safe guard
        alert('Cannot add task: column is full');
        return;
    }
    const item = createTask(text, columnId, color);
    appendDeleteBtn(item);
    list.appendChild(item);
    // ensure buttons work and inline editor binds properly
    // (delegated handlers cover edit/delete/dblclick)
    saveBoard();
    updateCounts();
}


function appendDeleteBtn(item) {
    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.textContent = '✕';
    del.title = 'Delete task';
    item.appendChild(del);
    const edit = document.createElement('button');
    edit.className = 'edit-btn';
    edit.textContent = '✎';
    edit.title = 'Edit task';
    item.appendChild(edit);
}

// make edit button and double-click open the inline editor
// (delegated handling is already set up in attachBoardListeners)

// drag event handlers
function dragStart() {
    draggedItem = this;
    this.classList.add('dragging');
}
function dragEnd() {
    this.classList.remove('dragging');
    draggedItem = null;
    // persist state after drag completes
    saveBoard();
    updateCounts();
}

// helper used in dragover
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.kanban-item:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// persistence to localStorage
function saveBoard() {
    const data = {};
    columnIds.forEach(id => {
        const list = document.getElementById(id + '-list');
        data[id] = [...list.children].map(li => {
            const textSpan = li.querySelector('.task-text');
            return {
                text: textSpan ? textSpan.textContent.trim() : '',
                color: li.dataset.color || ''
            };
        });
    });
    localStorage.setItem('kanbanBoard', JSON.stringify(data));
}


function loadBoard() {
    const saved = localStorage.getItem('kanbanBoard');
    if (saved) {
        const data = JSON.parse(saved);
        columnIds.forEach(id => {
            const list = document.getElementById(id + '-list');
            list.innerHTML = '';
            (data[id] || []).forEach(item => addTask(item.text, id, item.color));
        });
        updateCounts();
    }
}

function updateCounts() {
    columnIds.forEach(id => {
        const countEl = document.getElementById('count-' + id);
        if (countEl) {
            const count = document.getElementById(id + '-list').children.length;
            countEl.textContent = count + '/' + MAX_PER_COLUMN;
            // highlight when full
            if (count >= MAX_PER_COLUMN) {
                countEl.style.color = 'red';
            } else {
                countEl.style.color = '';
            }
        }
    });
}


