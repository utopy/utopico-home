(function(){
  document.addEventListener("alpine:init", function() {
    Alpine.data("appdata", () => ({
      sidebarToggled: false
    }))
  })
})()
