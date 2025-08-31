const loadingElement = document.createElement("div");
loadingElement.id = "loading";
loadingElement.textContent = "Loading...";
document.body.appendChild(loadingElement);

export function showLoading() {
  loadingElement.style.display = "block";
}
export function hideLoading() {
  loadingElement.style.display = "none";
}
