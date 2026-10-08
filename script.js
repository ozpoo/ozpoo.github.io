function main() {
  return document.querySelector('main')
}

function apply_meta() {
  const meta = main().querySelector('template[data-title]')
  if (meta) document.title = meta.dataset.title
}

function load_page(path, push = true) {
  fetch('content/' + path)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok')
      return response.text()
    })
    .then(data => {
      window.scrollTo(0, 0)
      main().innerHTML = data
      apply_meta()
      if (push) history.pushState(null, '', path)
    })
    .catch(error => {
      console.error('Error loading file:', error)
      main().textContent = 'Failed to load content.'
    })
}

window.addEventListener('popstate', () => {
  load_page(location.pathname.split('/').pop() || 'index.html', false)
})

function set_active_page() {
  // update nav active
}

function navigate(path) {
  load_page(path)
  set_active_page(path)
}

function init_dynamic_load() {
  for (const link of document.querySelectorAll('a')) {
    link.onclick = function (e) {
      e.preventDefault()
      const origin = window.location.origin
      if (!this.href.startsWith(origin)) return
      e.preventDefault()
      navigate(this.href.replace(origin, ''))
    }
  }
}

document.fonts.ready.then(() => {
  document.documentElement.toggleAttribute('loading-fonts', false)
})

init_dynamic_load()