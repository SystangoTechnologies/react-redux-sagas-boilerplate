
let installingWorker = ''
const isLocalhost = Boolean(
  window.location.hostname === 'localhost'
  // [::1] is the IPv6 localhost address.
  || window.location.hostname === '[::1]'
  // 127.0.0.1/8 is considered localhost for IPv4.
  || window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
  ),
)

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href)
    if (publicUrl.origin !== window.location.origin) {
      return
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`
      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config)
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service '
            + 'worker. To learn more, visit https://bit.ly/CRA-PWA',
          )
        })
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config)
      }
    })
  }
}

if (installingWorker) {
  installingWorker.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
      installingWorker.skipWaiting()
    }
  })
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        installingWorker = registration.installing
        if (installingWorker == null) {
          return
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log(
                'New content is available and will be used when all '
                + 'tabs for this page are closed. See https://bit.ly/CRA-PWA.',
              )
              const { body } = document
              body.className = 'show'
              document.getElementById('reload').addEventListener('click', () => {
                if (!installingWorker.waiting) {
                  // installingWorker.postMessage('skipWaiting');
                  navigator.serviceWorker.ready.then((registrationSW) => {
                    registrationSW.unregister().then(() => {
                      caches.keys().then(function (names) {
                        // delete the available cache for
                        caches.delete('workbox-precache')
                        caches.delete('images')
                        caches.delete('api-cache')
                      })
                      window.location.reload()
                    })
                  })
                }
              })
              if (config && config.onUpdate) {
                config.onUpdate(registration)
              }
            } else if (config && config.onSuccess) {
              config.onSuccess(registration)
            }
          }
        }
      }
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error)
    })
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type')
      if (
        response.status === 404
        || (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload()
          })
        })
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config)
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.',
      )
    })
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister()
    })
  }
}
