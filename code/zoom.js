// zoom.js

// Mencegah pinch zoom
document.addEventListener('touchstart', function (e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchmove', function (e) {
    if (e.scale !== 1) {
        e.preventDefault();
    }
}, { passive: false });

// Mencegah zoom dengan roda mouse + Ctrl
document.addEventListener('wheel', function (e) {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

// Mencegah zoom dengan double tap
document.addEventListener('dblclick', function (e) {
    e.preventDefault();
});