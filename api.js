const axios = require('axios')
const { remote, ipcRenderer } = require('electron')

const { BrowserWindow, Menu } = remote
let posts = []
this.initMenu()

function renderPost (posts) {
  posts.forEach(element => {
    document.querySelector('#posts').innerHTML = document.querySelector('#posts').innerHTML +
          `<li class="list-group-item d-flex align-item-center" preview-image="${element.data.preview.images[0].source.url}" >
          <img src="${element.data.thumbnail}" alt="thumb" class="thumbnail">
          <div>${element.data.title}</div>
        </li> `
  })

  this.addEventListeners()
}
axios.get('https://www.reddit.com/r/aww.json')
  .then(res => {
    posts = res.data.data.children
    console.log(posts)
    this.renderPost(posts)
  })
  .catch(err => {
    console.log(err)
  })
function addEventListeners () {
  document.querySelectorAll('.list-group-item').forEach(element => {
    element.addEventListener('click', function () {
      let previewWindow = new BrowserWindow({ width: 500, height: 500 })

      previewWindow.on('close', function () {
        previewWindow = null
      })
      previewWindow.loadURL('file://' + __dirname + '/image.html?image=' + this.getAttribute('preview-image'))

      previewWindow.show()
    })
  })
}

function initMenu () {
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        { label: 'New Window' },
        {
          label: 'Settings',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            ipcRenderer.send('toggle-settings')
          }
        },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q'
        }
      ]
    }
  ])

  Menu.setApplicationMenu(menu)
}
