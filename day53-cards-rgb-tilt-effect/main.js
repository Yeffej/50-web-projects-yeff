/** @type { Array<HTMLDivElement> } */
const cards = document.querySelectorAll(".card-wrapper");
const mouse = {
  x: 0,
  y: 0,
};

cards.forEach((card) => {
  card.userData = {
    rect: card.getBoundingClientRect(),
    isHover: false,
    angleX: 0,
    angleY: 0,
    currentAngle: {
      x: 0,
      y: 0,
    },
    targetAngle: {
      x: 0,
      y: 0,
    }
  };
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  cards.forEach((card) => {
    const rect = card.userData.rect;

    card.userData.isHover =
      isBetween(mouse.x, rect.left, rect.right) &&
      isBetween(mouse.y, rect.top, rect.bottom);

    if (card.userData.isHover) {
      const maxDistance = rect.right - (rect.left + rect.width / 2);
      let distanceX = mouse.x - (rect.left + rect.width / 2);
      let distanceY = rect.top + rect.height / 2 - mouse.y;
      distanceY /= maxDistance;

      const angleX = (Math.atan(distanceX) * 180) / Math.PI;
      const angleY = (Math.atan(distanceY) * 180) / Math.PI;
      card.userData.angleX = angleX * 0.20;
      card.userData.angleY = angleY * 0.25;
    }
  });
});

const clock = {
  start: performance.now(),
  current: performance.now(),
  elapsedTime: 0,
  deltaTime: 0
};

function animate() {
  const current = performance.now();
  clock.elapsedTime = (current - clock.start) / 1000;
  clock.deltaTime = (current - clock.current) / 1000;
  clock.current = current;

  cards.forEach((card) => {
    if (card.userData.isHover) {
      card.userData.targetAngle.x = card.userData.angleX;
      card.userData.targetAngle.y = card.userData.angleY;
    } else {
      card.userData.targetAngle.x = 0;
      card.userData.targetAngle.y = 0;
    }

    card.userData.currentAngle.x +=
      (card.userData.targetAngle.x - card.userData.currentAngle.x) * clock.deltaTime;
    card.userData.currentAngle.y +=
      (card.userData.targetAngle.y - card.userData.currentAngle.y) * clock.deltaTime;

    card.style.transform = `perspective(500px) rotateX(${card.userData.currentAngle.y}deg)
      rotateY(${card.userData.currentAngle.x}deg)`;
  });

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

function isBetween(value, pointA, pointB) {
  if (value >= pointA && value <= pointB) return true;

  return false;
}
