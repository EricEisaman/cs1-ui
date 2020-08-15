![](https://cdn.glitch.com/30d8e950-7373-42bb-b2dd-bd2ce059463a%2FCS1_logo_128.png?v=1597412966966)

# CS1 UI Research
____

Researching UI that will deliver buttery UX for users of the CS1 Game Engine.


Notes:

- When building into the CS1 Game Engine, I will make use of the CS1.Media.Sound Registry and Library.

- I will be updating the slider arrows interaction with mousedown , mouseup , and mouseleave to perform an animated slide while holding the mousedown on arrow.

- Move slider animations to raw anime.js code to take advantage of the frame update values.

```
AFRAME.ANIME({
  targets: '.clickable',
  translateX: 270,
  delay: 1000,
  direction: 'alternate',
  loop: 3,
  easing: 'easeInOutCirc',
  update: function(anim) {
    console.log(Math.round(anim.progress))
  }
})

```
<a href="https://animejs.com/documentation/#JSobject" target="_bland" rel="noopener noreferrer">ANIME DOCUMENTATION</a>