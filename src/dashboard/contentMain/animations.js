export const animateForm = (formClass) => {
  const form = document.querySelector(`.${formClass}`);
  form.animate(
    [
      {
        transform: `translate(0,150px)`,
        opacity: 0,
      },
      {
        transform: "translate(0,0)",
        opacity: 1,
      },
    ],
    {
      duration: 200,
      easing: "ease-out",
    }
  );
};
export const animateOpaquePanel = () => {
  const form = document.querySelector(`.opaquePanel`);
  form.animate(
    [
      {
        opacity: 0,
      },
      {
        opacity: 0.9,
      },
    ],
    {
      duration: 200,
      easing: "ease-out",
    }
  );
};
export const animateContentMain = () => {
  const form = document.querySelector(`.contentMainWrapper`);
  form.animate(
    [
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
    ],
    {
      duration: 100,
      easing: "ease-out",
    }
  );
};
export const animateLoginOrPass = () => {
  const form = document.querySelector(`.mainWrapper`);
  form.animate(
    [
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
    ],
    {
      duration: 250,
      easing: "ease-out",
    }
  );
};
