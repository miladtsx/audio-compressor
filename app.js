const AudioCompressor = require('./lib/compress');

let dropArea = document.getElementById("drop-area")

    // Prevent default drag behaviors
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
        document.body.addEventListener(eventName, preventDefaults, false)
    })

    // Highlight drop area when item is dragged over it
    ;['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false)
    })

    ;['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
    })

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

function highlight(e) {
    dropArea.classList.add('highlight')
}

function unhighlight(e) {
    dropArea.classList.remove('active')
}

function handleDrop(e) {
    var dt = e.dataTransfer
    var files = dt.files

    handleFiles(files)
}

let uploadProgress = []
let progressBar = document.getElementById('progress-bar')

function initializeProgress(numFiles) {
    progressBar.value = 0
    uploadProgress = []

    for (let i = numFiles; i > 0; i--) {
        uploadProgress.push(0)
    }
}

function updateProgress([progress, eta]) {
    progressBar.value = progress;
    document.getElementById('eta').innerHTML = eta;
}

function finishProgress() {
    progressBar.visible = false;
}


function handleFiles(files) {
    files = [...files]
    initializeProgress(files.length)
    files.forEach(f => {
        clearUI();
        previewFile(f);
        compressFile(f);
    })
    // files.forEach(compressFile)
    // files.forEach(previewFile)
}

function formatBytes(a, b) { if (0 == a) return "0 Bytes"; var c = 1024, d = b || 2, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], f = Math.floor(Math.log(a) / Math.log(c)); return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f] }


function previewFile(file) {
    let name = file.name;
    let size = formatBytes(file.size);
    document.getElementById('fileName').innerHTML = `نام:‌ ${name}`;
    document.getElementById('fileSize').innerHTML = `حجم: ${size}`;

    progressBar.value = 100;
}

function clearUI() {
    progressBar.value = 0;
    document.getElementById('eta').innerHTML = '0:00';
    document.getElementById('fileName').innerHTML = `نام:‌ -`;
    document.getElementById('fileSize').innerHTML = `حجم: -`;
    document.getElementById('messageBox').innerHTML = '';
}


async function compressFile(file, i) {
    try {
        const compressor = new AudioCompressor(file, 32);
        compressor.addProgressCallbacks(updateProgress, finishProgress)

        await compressor.compressNow();

        messageToUser('info', 'فشرده‌سازی ظاهرا موفقیت‌آمیز بوده. یه پوشه به اسم compressed ساختم، فایل‌های فشرده اون توعه.');
    }
    catch (err) {
        clearUI();
        messageToUser('danger', err);
    }
}

function messageToUser(type, message) {
    let messageAlert = document.createElement('div');
    messageAlert.className = `alert alert-${type} alert-dismissible fade show`;
    messageAlert.setAttribute('role', 'alert');
    let id = Date.now()
    messageAlert.setAttribute('id', id);
    autoDismissAlert(id);
    messageAlert.innerHTML = message;

    let messageArea = document.getElementById('messageBox');
    messageArea.appendChild(messageAlert);
}

function autoDismissAlert(id) {
    setTimeout(() => {
        document.getElementById(id).remove();
    }, 60000);
}