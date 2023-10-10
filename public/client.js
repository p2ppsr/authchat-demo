// Demo code created with the sole purpose of testing Authrite protected sockets
new window.Authrite.Authrite().connect('http://localhost:3000')
  .then((io) => {
    const form = document.querySelector('form')
    const input = document.querySelector('#input')
    const messages = document.querySelector('#chat')
    const BabbageSDK = window.BabbageSDK

    let connectionId
    let identityKey = 'unknown'

    // Temp solution for checking if a user is authenticated with their MetaNet Client
    const checkAuthentication = async () => {
      let authenticated = false
      while (!authenticated) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        try {
          await BabbageSDK.isAuthenticated()
          document.getElementById('chatContainer').style.visibility = 'visible'
          document.getElementById('status').innerText = ''
          authenticated = true
          identityKey = await BabbageSDK.getPublicKey({ identityKey: true })
        } catch (e) {
          // handle error
          document.getElementById('chatContainer').style.visibility = 'hidden'
          document.getElementById('status').innerText = 'Babbage MetaNet Client is required!'
        }
      }
      // Once authenticated return true
      connectionId = io.socket.id
      return true
    }
    checkAuthentication()

    form.addEventListener('submit', function (e) {
      e.preventDefault()
      if (input.value) {
        io.emit('chatMessage', { text: input.value, identityKey })
        input.value = ''
      }
    })

    io.on('chatMessage', function (msg) {
      console.log('Signature verified!')
      const li = document.createElement('li')
      const div = document.createElement('div')
      div.classList.add('message', 'last')
      div.textContent = msg.text

      // Differentiate user messages
      if (msg.id === connectionId) {
        li.classList.add('sent', 'messages')
        div.classList.add('sent-color')
      } else {
        li.classList.add('received', 'messages')
        div.classList.add('received-color')
        document.getElementById('identityKey').innerText = 'Msg from: ' + msg.identityKey
      }

      li.appendChild(div)

      checkTypingIndicator()
      messages.appendChild(li)
    })

    let typingTimer
    const doneTypingInterval = 1500
    let isTyping = false
    input.addEventListener('input', () => {
      // Clear typing timer and start a new one
      if (typingTimer) {
        clearTimeout(typingTimer)
      }
      typingTimer = setTimeout(() => { io.emit('stoppedTyping', 'false') }, doneTypingInterval)

      // User is typing, emit typing event
      if (!isTyping) {
        isTyping = true
        io.emit('typing', identityKey)
        console.log('should be typing....')
      }
    })

    io.on('typing', (msg) => {
      if (connectionId !== msg.id) {
        console.log('typing ', msg)
        if (!document.getElementById('typingIndicator')) {
          const li = document.createElement('li')
          li.id = 'typingIndicator'
          const div = document.createElement('div')
          div.classList.add('message', 'last')
          div.textContent = 'typing...'
          li.classList.add('received', 'messages')
          li.appendChild(div)
          messages.appendChild(li)
        }
      }
    })

    io.on('stoppedTyping', async (data) => {
      isTyping = false
      checkTypingIndicator()
    })

    const checkTypingIndicator = () => {
      const li = document.getElementById('typingIndicator')
      if (li) {
        messages.removeChild(li)
      }
    }
  })
  .catch((error) => {
    console.error(error)
  })
