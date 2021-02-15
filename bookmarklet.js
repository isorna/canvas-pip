/**
 * Global variables
 */
if (typeof pictureInPictureGlobals) {
  window.pictureInPictureGlobals = {
    $canvases: [],
    $video: null,
    curCanvasIndex: 0
  }
}

/**
 * This will run every time you press the bookmarklet
 */
(() => {
  /**
   * Collect all canvases in all frames
   */
  // Get the ones on the current page
  if (!pictureInPictureGlobals.$canvases.length) {
    const $canvases = document.querySelectorAll('canvas')
    if ($canvases) pictureInPictureGlobals.$canvases.push(...$canvases)
  }
  
  // Get the ones in iframes
  const $iframes = document.querySelectorAll('iframe')
  if ($iframes) {
    $iframes.forEach($iframe => {
      const $canvases = $iframe.contentWindow.document.querySelectorAll('canvas')
      if ($canvases) pictureInPictureGlobals.$canvases.push(...$canvases)  
    })
  }
  
  /**
   * Picture in picture
   */
  if (pictureInPictureGlobals.$canvases.length) {
    const $targetCanvas = pictureInPictureGlobals.$canvases[pictureInPictureGlobals.curCanvasIndex]

    // Create video element
    if (!pictureInPictureGlobals.$video) {
      pictureInPictureGlobals.$video = document.createElement('video')
      pictureInPictureGlobals.$video.style.display = 'none'
      document.body.appendChild(pictureInPictureGlobals.$video)
    }

    // Set source
    pictureInPictureGlobals.$video.width = $targetCanvas.width
    pictureInPictureGlobals.$video.height = $targetCanvas.height
    console.log($targetCanvas)
    pictureInPictureGlobals.$video.srcObject = $targetCanvas.captureStream()

    // Start pip
    pictureInPictureGlobals.$video.onloadedmetadata = () => {
      pictureInPictureGlobals.$video.play()
    }
    pictureInPictureGlobals.$video.onplay = () => {
      pictureInPictureGlobals.$video.requestPictureInPicture()
    }
  
  // No canvases 😥
  } else {
    alert('No canvases found 😥')
  }

  if (++pictureInPictureGlobals.curCanvasIndex === pictureInPictureGlobals.$canvases.length) {
    pictureInPictureGlobals.curCanvasIndex = 0
  }
})()