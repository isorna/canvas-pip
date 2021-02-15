# 🎨 Canvas PiPster

![A video walking through various websites. Whenever I click on the bookmarklet, the next available canvas on the page pops out](https://media.giphy.com/media/TvfIFj3dVou9hVZPWM/giphy.gif)

A bookmarklet that cycles through Canvas elements on a page and pops them out of the browser with [Picture in Picture API](https://developer.mozilla.org/en-US/docs/Web/API/Picture-in-Picture_API) by creating an empty video element set to the `srcObject` of a canvas on the page. This bookmarklet even scans iframes so it works great with online code sandboxes as well!

> 🚧 **Only works with Chrome so far.**

# Why I made this

I get inspired easily and sometimes I just want to see other peoples creations as I work or browse the web. This bookmarklet lets me bask in the wonders and delights of other people's work no matter what I'm doing or what app I have open!

# Fun links to try

- P5.js: https://p5js.org/examples/hello-p5-flocking.html
- Noisedeck: https://noisedeck.app/
- Three.js: https://threejs.org/examples/#webgl_animation_keyframes

# Usage

1. Right click bookmark bar and click <kbd>Add Page...</kbd>
2. In the URL field, paste the below code
3. Every time you click the Bookmarklet it will Picture in Picture the next available canvas on the page (including inside iframes)
4. Because browsers throttle tabs within the same browser window, it's best to have the target page in it's own browser window otherwise it will run slowly
5. If you'd rather build the bookmarklet yourself from the source then copy paste `./bookmarklet.js` into a [Bookmarklet Maker like this one](https://caiorss.github.io/bookmarklet-maker/) and use the generated code

```js
javascript:(function()%7B%2F**%0A%20*%20Global%20variables%0A%20*%2F%0Aif%20(typeof%20pictureInPictureGlobals%20%3D%3D%3D%20'undefined')%20%7B%0A%20%20window.pictureInPictureGlobals%20%3D%20%7B%0A%20%20%20%20%24canvases%3A%20%5B%5D%2C%0A%20%20%20%20%24video%3A%20null%2C%0A%20%20%20%20curCanvasIndex%3A%200%0A%20%20%7D%0A%7D%0A%0A%2F**%0A%20*%20This%20will%20run%20every%20time%20you%20press%20the%20bookmarklet%0A%20*%2F%0A(()%20%3D%3E%20%7B%0A%20%20%2F**%0A%20%20%20*%20Collect%20all%20canvases%20in%20all%20frames%0A%20%20%20*%2F%0A%20%20%2F%2F%20Get%20the%20ones%20on%20the%20current%20page%0A%20%20if%20(!pictureInPictureGlobals.%24canvases.length)%20%7B%0A%20%20%20%20const%20%24canvases%20%3D%20document.querySelectorAll('canvas')%0A%20%20%20%20if%20(%24canvases)%20pictureInPictureGlobals.%24canvases.push(...%24canvases)%0A%20%20%7D%0A%20%20%0A%20%20%2F%2F%20Get%20the%20ones%20in%20iframes%0A%20%20const%20%24iframes%20%3D%20document.querySelectorAll('iframe')%0A%20%20if%20(%24iframes)%20%7B%0A%20%20%20%20%24iframes.forEach(%24iframe%20%3D%3E%20%7B%0A%20%20%20%20%20%20const%20%24canvases%20%3D%20%24iframe.contentWindow.document.querySelectorAll('canvas')%0A%20%20%20%20%20%20if%20(%24canvases)%20pictureInPictureGlobals.%24canvases.push(...%24canvases)%20%20%0A%20%20%20%20%7D)%0A%20%20%7D%0A%20%20%0A%20%20%2F**%0A%20%20%20*%20Picture%20in%20picture%0A%20%20%20*%2F%0A%20%20if%20(pictureInPictureGlobals.%24canvases.length)%20%7B%0A%20%20%20%20const%20%24targetCanvas%20%3D%20pictureInPictureGlobals.%24canvases%5BpictureInPictureGlobals.curCanvasIndex%5D%0A%0A%20%20%20%20%2F%2F%20Create%20video%20element%0A%20%20%20%20if%20(!pictureInPictureGlobals.%24video)%20%7B%0A%20%20%20%20%20%20pictureInPictureGlobals.%24video%20%3D%20document.createElement('video')%0A%20%20%20%20%20%20pictureInPictureGlobals.%24video.style.display%20%3D%20'none'%0A%20%20%20%20%20%20document.body.appendChild(pictureInPictureGlobals.%24video)%0A%20%20%20%20%7D%0A%0A%20%20%20%20%2F%2F%20Set%20source%0A%20%20%20%20pictureInPictureGlobals.%24video.width%20%3D%20%24targetCanvas.width%0A%20%20%20%20pictureInPictureGlobals.%24video.height%20%3D%20%24targetCanvas.height%0A%20%20%20%20console.log(%24targetCanvas)%0A%20%20%20%20pictureInPictureGlobals.%24video.srcObject%20%3D%20%24targetCanvas.captureStream()%0A%0A%20%20%20%20%2F%2F%20Start%20pip%0A%20%20%20%20pictureInPictureGlobals.%24video.onloadedmetadata%20%3D%20()%20%3D%3E%20%7B%0A%20%20%20%20%20%20pictureInPictureGlobals.%24video.play()%0A%20%20%20%20%7D%0A%20%20%20%20pictureInPictureGlobals.%24video.onplay%20%3D%20()%20%3D%3E%20%7B%0A%20%20%20%20%20%20pictureInPictureGlobals.%24video.requestPictureInPicture()%0A%20%20%20%20%7D%0A%20%20%0A%20%20%2F%2F%20No%20canvases%20%F0%9F%98%A5%0A%20%20%7D%20else%20%7B%0A%20%20%20%20alert('No%20canvases%20found%20%F0%9F%98%A5')%0A%20%20%7D%0A%0A%20%20pictureInPictureGlobals.curCanvasIndex%20%2B%3D%201%0A%20%20if%20(pictureInPictureGlobals.curCanvasIndex%20%3D%3D%3D%20pictureInPictureGlobals.%24canvases.length)%20%7B%0A%20%20%20%20pictureInPictureGlobals.curCanvasIndex%20%3D%200%0A%20%20%7D%0A%7D)()%7D)()%3B
```