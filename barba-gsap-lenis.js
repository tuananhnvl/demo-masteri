
const loadingScreen = document.querySelector('.loading-screen')
const loadingImg = document.querySelector('#banner-img')


const targetBGFull = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
const targetBGHalf = 'polygon(30% 20%, 70% 20%, 70% 60%, 30% 60%)'
const listClipGalleryBannerOff = ['5% 10%, 5% 10%, 5% 90%, 5% 90%', '100% 56%, 100% 56%, 100% 100%, 100% 100%', '100% 0%, 100% 0%, 100% 0%, 76% 33%', '41% 100%, 66% 100%, 70% 100%, 29% 100%']
const listClipGalleryBanner = ['5% 10%, 25% 10%, 25% 90%, 5% 90%', '77% 56%, 100% 56%, 100% 100%, 77% 100%', '84% 16%, 100% 10%, 100% 46%, 76% 33%', '41% 75%, 66% 79%, 70% 100%, 29% 100%']


function pageTransitionIn(data) {

  if (data.current.namespace === 'home') {
    console.log('out - home')
    return gsap
      .timeline()
      .to(document.querySelector('#content-banner'), { duration: .2, opacity: 0 }, "<")
      .to(document.querySelector('#banner-img'), { duration: .5, clipPath: targetBGHalf, transformOrigin: 'center center', ease: 'power1.out' })

  } else if (data.current.namespace === 'gallery') {
    console.log('out - aboutus')
    let targets = gsap.utils.toArray(data.current.container.children[0].children[1].children);

    return gsap
      .timeline()
      .add('start')
      .to(targets, {
        //opacity: 0.0,
        clipPath: (index) => `polygon(${listClipGalleryBannerOff[index]})`,
        duration: 0.5,
        ease: 'power1.in',
        stagger: 0.1
      }, 'start')
      .to(document.querySelector('#banner-img'), { duration: .5, clipPath: targetBGFull, transformOrigin: 'center center', ease: 'power1.out' })

  }

}
// Function to add and remove the page transition screen
function pageTransitionOut(container) {

  if (container.getAttribute('data-barba-namespace') === 'home') {
    return gsap
      .timeline({ delay: 0.2 }) // More readable to put it here
      .add('start') // Use a label to sync screen and content animation
      .to(document.querySelector('#banner-img'), {
        duration: 0.5,
        //scale : 1.0,
        clipPath: targetBGFull,
        transformOrigin: 'center center',
        ease: 'power1.out'
      }, 'start')
  }
  else if (container.getAttribute('data-barba-namespace') === 'gallery') {
    let targets = gsap.utils.toArray(container.children[0].children[1].children);
    return gsap
      .timeline({ delay: 0.2 }) // More readable to put it here
      .add('start') // Use a label to sync screen and content animation

      .fromTo(targets, {
        clipPath: (index) => `polygon(${listClipGalleryBannerOff[index]})`,
        duration: 0,
      }, {
        //opacity: 1.0,
        clipPath: (index) => `polygon(${listClipGalleryBanner[index]})`,
        duration: 0.5,
        ease: 'power1.in',
        stagger: 0.1
      }, 'start')
      .to(document.querySelector('#banner-img'), {
        duration: 0.5,
        //scale : 0.35,
        clipPath: targetBGHalf,
        transformOrigin: 'center center',
        ease: 'power1.out'
      }, "<")
  }


}

// Function to animate the content of each page
function contentAnimation(container) {


  // $(container.querySelector('.green-heading-bg')).addClass('show')


  if (container.getAttribute('data-barba-namespace') === 'home') {


    return gsap
      .timeline()

      .to(container.querySelector('#banner-img'), { duration: .5, clipPath: targetBGFull, transformOrigin: 'center center', ease: 'power1.out' })


  } else if (container.getAttribute('data-barba-namespace') === 'gallery') {

    let targets = gsap.utils.toArray(container.children[0].children[1].children);
    console.log('contentAnimation', targets)
    return gsap
      .timeline()
      .fromTo(targets, {
        clipPath: (index) => `polygon(${listClipGalleryBannerOff[index]})`,
        duration: 0,
      }, {
        duration: 0.5,
        ease: 'power1.in',
        stagger: -0.2,
        clipPath: (index) => `polygon(${listClipGalleryBanner[index]})`,
      })
    // .to(container.querySelector('#banner-img'), { duration: .5, clipPath: targetBGHalf, transformOrigin: 'center center'})
  }
}

$(function () {

  gsap.registerPlugin(ScrollTrigger)

  const update = (time, deltaTime, frame) => {
    lenis.raf(time * 1000)
  }

  const resize = (e) => {
    ScrollTrigger.refresh()
  }

  const lenis = new Lenis({
    duration: .7,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    infinite: false,
  })

  lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    // console.log({ scroll, limit, velocity, direction, progress })
    ScrollTrigger.update()
  })

  gsap.ticker.add(update)

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scroll = value
      }
      return lenis.scroll
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
  })

  ScrollTrigger.defaults({ scroller: document.body })

  window.addEventListener('resize', resize)


  barba.init({
    // We don't want "synced transition"
    // because both content are not visible at the same time
    // and we don't need next content is available to start the page transition
    // sync: true,
    transitions: [{
      // NB: `data` was not used.
      // But usually, it's safer (and more efficient)
      // to pass the right container as a paramater to the function
      // and get DOM elements directly from it
      async leave(data) {
        // Not needed with async/await or promises
        // const done = this.async();

        await pageTransitionIn(data)
        // No more needed as we "await" for pageTransition
        // And i we change the transition duration, no need to update the delay…
        // await delay(1000)

        // Not needed with async/await or promises
        // done()

        // Loading screen is hiding everything, time to remove old content!
        data.current.container.remove()
      },

      async enter(data) {
        await pageTransitionOut(data.next.container)
      },
      // Variations for didactical purpose…
      // Better browser support than async/await
      // enter({ next }) {
      //   return pageTransitionOut(next.container);
      // },
      // More concise way
      // enter: ({ next }) => pageTransitionOut(next.container),

      async once(data) {
        await contentAnimation(data.next.container);
      }
    }]
  });

});






