// https://codepen.io/Mamboleoo/pen/JjdXPgR
export function createParticles(e: PointerEvent) {
  const button = e.target as HTMLButtonElement;
  const amount = 1;

  // Quick check if user clicked the button using a keyboard
  if (e.clientX === 0 && e.clientY === 0) {
    const bbox = button.getBoundingClientRect();
    const x = bbox.left + bbox.width / 2;
    const y = bbox.top + bbox.height / 2;
    for (let i = 0; i < amount; i++) {
      _createParticle(x, y);
    }
  } else {
    for (let i = 0; i < amount; i++) {
      _createParticle(e.clientX, e.clientY + window.scrollY);
    }
  }
}

function _createParticle(x: number, y: number) {
  const particle = document.createElement("particle");
  document.body.appendChild(particle);

  const width: number | string = Math.floor(Math.random() * 30 + 10);
  const height: number | string = width;
  const destinationX = (Math.random() - 0.5) * 200;
  const destinationY = (Math.random() - 0.5) * 200;
  const rotation = Math.random() * 520;

  particle.style.width = `${width}px`;
  particle.style.height = `${height}px`;
  const animation = particle.animate(
    [
      {
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotation}deg)`,
        opacity: 1,
      },
      {
        transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y + destinationY}px) rotate(${rotation}deg)`,
        opacity: 0,
      },
    ],
    {
      duration: Math.random() * 1000 + 1000,
      easing: "cubic-bezier(0.33, 1, 0.68, 1)",
    },
  );
  animation.onfinish = _removeParticle;
}

function _removeParticle(e: AnimationPlaybackEvent) {
  ((e.target! as Animation).effect as KeyframeEffect).target!.remove();
}
