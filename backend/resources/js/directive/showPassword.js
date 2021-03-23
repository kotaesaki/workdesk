import Vue from 'vue'

Vue.directive('show-password', {
  inserted(el) {
    let clone = el.cloneNode()
    clone.id =''
    clone.type = 'text'
    clone.style.display = 'none'
    clone.addEventListener('input', function(e){
      let inputEvent = document.createEvent('Event')
      inputEvent.initEvent('input', true, false)
      el.value = e.target.value
      el.dispatchEvent(inputEvent)
    })
    el.parentNode.insertBefore(clone, el)

    let icons = {
      show: '&#x1F441;',
      hide: '&#x1F576;'
    }
    let a = document.createElement('a')
    a.style.position = 'absolute'
    a.style.cursor = 'pointer'
    a.style.fontSize = clone.style.fontSize
    a.style.color = clone.style.color
    a.textDecoration = 'none'
    a.innerHTML = icons.show
    a.addEventListener('click', function(e) {
      if (clone.style.display === 'none') {
        e.target.innerHTML = icons.hide
        el.style.display = 'none'
        clone.style.display = ''
        clone.value = el.value
        clone.focus()
      } else {
        e.target.innerHTML = icons.show
        clone.style.display = 'none'
        el.style.display = ''
        el.value = clone.value
        el.focus()
      }
      e.preventDefault()
    
    })
    document.body.appendChild(a)

    function alignElement(target) {
      let rect = el.getBoundingClientRect()
      const clientWidth = target.clientWidth
      const clientHeight = target.clientHeight
      const left = rect.right - Math.round(clientWidth) - 10
      const top = rect.top + Math.round(rect.height * 0.5) - Math.round(clientHeight * 0.5)
      target.style.left = window.pageXOffset + left +'px'
      target.style.top = window.pageYOffset + top +'px'
    }
    alignElement(a)
    window.addEventListener('resize', function() {
      alignElement(a)
    })
  },
})