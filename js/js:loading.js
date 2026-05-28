<script>

window.addEventListener("load", () => {

  const loading =
    document.getElementById("loading");

  setTimeout(() => {

    loading.classList.add("hide");

  }, 2500);

  setTimeout(() => {

    loading.remove();

  }, 4200);

});

</script>