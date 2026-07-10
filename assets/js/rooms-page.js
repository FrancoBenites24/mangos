/* Interactions for habitaciones.html. */
MangosUI.ready(() => {
  MangosUI.initThemeToggle();
  MangosUI.initMobileDrawer();

  const filterRooms = MangosUI.initRoomsFilter({
    cardSelector: ".room-card",
    respectHiddenRooms: false,
  });

  const defaultFilter = new URLSearchParams(window.location.search).get("filter");
  if (defaultFilter) filterRooms(defaultFilter);

  MangosUI.initRoomCardFlip();
  MangosUI.initRoomsCarouselDots({ gridSelector: ".rooms-grid" });
});
