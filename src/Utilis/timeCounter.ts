export const timeCounter = (poczatkowyCzas: string, koncowyCzas: string) => {
  const [poczatkoweGodziny, poczatkoweMinuty] = poczatkowyCzas
    .split(":")
    .map(Number);
  const [koncoweGodziny, koncoweMinuty] = koncowyCzas.split(":").map(Number);

  const roznicaMinut =
    koncoweGodziny * 60 +
    koncoweMinuty -
    (poczatkoweGodziny * 60 + poczatkoweMinuty);

  const godziny = Math.floor(roznicaMinut / 60);
  const pozostaleMinuty = roznicaMinut % 60;

  return { godziny, minuty: pozostaleMinuty };
};
