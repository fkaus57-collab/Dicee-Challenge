const images = [
  document.querySelector(".img1"),
  document.querySelector(".img2"),
];
const heading = document.querySelector("h1");
const startButton = document.createElement("button");
startButton.id = "start-game";
startButton.type = "button";
startButton.textContent = "게임 시작";
const controls = document.createElement("div");
controls.className = "controls";
controls.append(startButton);
document.querySelector(".container").append(controls);
heading.textContent = "주사위 게임";
heading.setAttribute("aria-live", "polite");
heading.setAttribute("aria-atomic", "true");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let isRolling = false;

// 애니메이션 전에 주사위 이미지를 미리 불러옵니다.
for (let face = 1; face <= 6; face++) {
  const image = new Image();
  image.src = `images/dice${face}.png`;
}
const rollDice = () => Math.floor(Math.random() * 6) + 1;
function showDice(values, final = false) {
  images.forEach((image, index) => {
    image.src = `images/dice${values[index]}.png`;
    if (final) image.alt = `Player ${index + 1} 주사위: ${values[index]}`;
  });
}
showDice([6, 6], true);

startButton.addEventListener("click", () => {
  if (isRolling) return;
  isRolling = true;
  startButton.disabled = true;
  startButton.textContent = "굴리는 중…";
  heading.textContent = "주사위를 굴리는 중…";
  images.forEach((image) => image.classList.add("rolling"));
  // 움직임 줄이기 설정에서는 빠른 눈금 전환도 생략합니다.
  const animation = reducedMotion.matches
    ? null
    : window.setInterval(() => {
        showDice([rollDice(), rollDice()]);
      }, 90);
  window.setTimeout(
    () => {
      window.clearInterval(animation);
      const values = [rollDice(), rollDice()];
      showDice(values, true);
      images.forEach((image) => image.classList.remove("rolling"));
      const [first, second] = values;
      const result =
        first === second
          ? "무승부!"
          : first > second
            ? "🎉 Player 1 승리!"
            : "🎉 Player 2 승리!";
      heading.textContent = `${result} (${first} : ${second})`;
      startButton.textContent = "다시 시작";
      startButton.disabled = false;
      isRolling = false;
    },
    reducedMotion.matches ? 150 : 1200,
  );
});
//주석달기
