export const manifestConfig = {

        name: 'My Awesome PWApp',
        short_name: 'MyPWApp',
        description: 'My Awesome PWApp description',
        theme_color: '#696969',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        "screenshots" : [
            {
              "src": "screenshot1.png",
              "sizes": "1920x1080",
              "type": "image/png",
              "form_factor": "wide"
            },
            {
              "src": "screenshot2.png",
              "sizes": "1080x1920",
              "type": "image/png",
              "form_factor": "narrow"
            }
          ]
}