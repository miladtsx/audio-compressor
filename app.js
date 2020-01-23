const compressHelper = require('./lib/compress');

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

function updateProgress(fileNumber, percent) {
    uploadProgress[fileNumber] = percent
    let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
    console.debug('update', fileNumber, percent, total)
    progressBar.value = total
}

function handleFiles(files) {
    files = [...files]
    initializeProgress(files.length)
    files.forEach(compressFile)
    files.forEach(previewFile)
}

function formatBytes(a, b) { if (0 == a) return "0 Bytes"; var c = 1024, d = b || 2, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], f = Math.floor(Math.log(a) / Math.log(c)); return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f] }


function previewFile(file) {
    let name = file.name;
    let size = formatBytes(file.size);
    document.getElementById('fileName').innerHTML = `نام:‌ ${name}`;
    document.getElementById('fileSize').innerHTML = `حجم: ${size}`;

    progressBar.value = 100;
}

function compressFile(file, i) {

    //Compress File 
    
    const compressor = new compressHelper('', '', 32);
    


    //   var url = 'https://api.cloudinary.com/v1_1/joezimim007/image/upload'
    //   var xhr = new XMLHttpRequest()
    //   var formData = new FormData()
    //   xhr.open('POST', url, true)
    //   xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

         // Update progress (can be used to show progress indicator)
    //   xhr.upload.addEventListener("progress", function(e) {
    //     updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
    //   })

    //   xhr.addEventListener('readystatechange', function(e) {
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //       updateProgress(i, 100) // <- Add this
    //     }
    //     else if (xhr.readyState == 4 && xhr.status != 200) {
    //       // Error. Inform the user
    //     }
    //   })

    //   formData.append('upload_preset', 'ujpu6gyk')
    //   formData.append('file', file)
    //   xhr.send(formData)


}