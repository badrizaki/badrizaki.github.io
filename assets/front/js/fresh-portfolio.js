(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");

  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    };

    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isExpanded));
      navigation.classList.toggle("is-open", !isExpanded);
    });

    navigation.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const projectGrid = document.querySelector(".project-grid");
  const projectDialog = document.querySelector(".project-dialog");

  if (projectGrid && projectDialog instanceof HTMLDialogElement) {
    const dialogImage = projectDialog.querySelector(".project-dialog-image");
    const dialogType = projectDialog.querySelector(".project-dialog-type");
    const dialogTitle = projectDialog.querySelector("#project-dialog-title");
    const dialogDescription = projectDialog.querySelector(
      ".project-dialog-description",
    );
    const dialogLink = projectDialog.querySelector(".project-dialog-link");
    const closeButton = projectDialog.querySelector(".project-dialog-close");

    projectGrid.querySelectorAll(".project-card").forEach((card) => {
      const projectInfo = card.querySelector(".project-info");
      const title = projectInfo?.querySelector("h3")?.textContent?.trim();
      const projectImage = card.querySelector(".project-image");
      const image = projectImage?.querySelector("img");
      if (!projectInfo || !title || !projectImage || !image) return;

      const imageButton = document.createElement("button");
      imageButton.className = "project-image-preview";
      imageButton.type = "button";
      imageButton.setAttribute("aria-label", `Preview project: ${title}`);
      projectImage.insertBefore(imageButton, image);
      imageButton.append(image);

      const actions = document.createElement("div");
      actions.className = "project-actions";

      const existingLink = projectInfo.querySelector(".project-link");
      if (existingLink) actions.append(existingLink);

      const previewButton = document.createElement("button");
      previewButton.className = "project-preview-trigger";
      previewButton.type = "button";
      previewButton.textContent = "Preview ↗";
      previewButton.setAttribute("aria-label", `Preview project: ${title}`);
      actions.append(previewButton);
      projectInfo.append(actions);
    });

    const closeDialog = () => {
      if (projectDialog.open) projectDialog.close();
      document.body.classList.remove("dialog-open");
    };

    projectGrid.addEventListener("click", (event) => {
      if (!(event.target instanceof Element)) return;
      const previewButton = event.target.closest(
        ".project-preview-trigger, .project-image-preview",
      );
      const card = previewButton?.closest(".project-card");
      if (!card || !dialogImage || !dialogType || !dialogTitle || !dialogDescription || !dialogLink) {
        return;
      }

      const image = card.querySelector(".project-image img");
      const type = card.querySelector(".project-type");
      const title = card.querySelector(".project-info h3");
      const description = card.querySelector(".project-description");
      const projectLink = card.querySelector(".project-link");
      if (!image || !title || !description) return;

      dialogImage.src = image.getAttribute("src") || "";
      dialogImage.alt = image.alt;
      dialogType.textContent = type?.textContent?.trim() || "";
      dialogTitle.textContent = title.textContent.trim();
      dialogDescription.textContent = description.textContent.trim();

      if (projectLink instanceof HTMLAnchorElement) {
        dialogLink.href = projectLink.href;
        dialogLink.hidden = false;
      } else {
        dialogLink.removeAttribute("href");
        dialogLink.hidden = true;
      }

      projectDialog.showModal();
      document.body.classList.add("dialog-open");
    });

    closeButton?.addEventListener("click", closeDialog);
    projectDialog.addEventListener("click", (event) => {
      if (event.target === projectDialog) closeDialog();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && projectDialog.open) {
        event.preventDefault();
        event.stopPropagation();
        closeDialog();
      }
    }, true);
    projectDialog.addEventListener("close", () => {
      document.body.classList.remove("dialog-open");
    });
  }

  const parallaxItems = [...document.querySelectorAll("[data-parallax]")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (parallaxItems.length && !reduceMotion.matches) {
    let ticking = false;

    const updateParallax = () => {
      const viewportHeight = window.innerHeight;
      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.parallax);
        const bounds = item.getBoundingClientRect();
        const distance = bounds.top + bounds.height / 2 - viewportHeight / 2;
        item.style.setProperty("--parallax-y", `${distance * speed * -0.18}px`);
      });
      ticking = false;
    };

    const requestParallaxUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
    window.addEventListener("resize", requestParallaxUpdate);
    updateParallax();
  }
})();
